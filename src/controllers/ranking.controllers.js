import { db } from "../database/database.connection.js";

export async function URL(req, res){
    const {id} = req.params

    try {
        const url = await db.query(`SELECT id, "shortUrl", url FROM links WHERE id=$1;`, [id])
        if(url.rowCount === 0) return res.sendStatus(404)

        res.send(url.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function openURL(req, res) {
    const { shortUrl } = req.params;
    try {
        const exist = await db.query(`SELECT "shortUrl", "visitCount" FROM links WHERE "shortUrl"=$1;`, [shortUrl]);

        if (exist.rowCount === 0) return res.status(404).send("Url não existente");

        const view = exist.rows[0].visitCount + 1;
        console.log(view);

        await db.query(`UPDATE links SET "visitCount"=$1 WHERE "shortUrl"=$2;`, [view, shortUrl]);
       
        res.redirect(exist.rows[0].shortUrl)
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function ranking(req, res){
    try {
        const ranking = await db.query(`
            SELECT users.id, users.name, COUNT(links."url") AS "linksCount", SUM(links."visitCount") AS "visitCount"
            FROM users
            JOIN links ON users.id=links."userId"
            GROUP BY users.id, users.name;`)
        res.send(ranking.rows)
    } catch (err) {
        res.status(500).send(err.message);
    }
}