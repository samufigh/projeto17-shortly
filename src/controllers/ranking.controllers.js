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

export async function openURL(req, res){
    const {shortUrl} = req.params
    try {
        const exist = await db.query(`SELECT "shortUrl", "visitCount" FROM links WHERE "shortUrl"=$1;`, [shortUrl])
        console.log(exist.rows[0].visitCount)
        if (exist.rowCount === 0) return res.status(404).send("Url não existente")
        await db.query(`UPDATE links SET "visitCount"=$1 WHERE "shortUrl"=$2;`, [exist.rows[0].visitCount + 1, shortUrl])
    
        res.redirect(shortUrl)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function ranking(req, res){
    try {
        res.send("ranking")
    } catch (err) {
        res.status(500).send(err.message);
    }
}