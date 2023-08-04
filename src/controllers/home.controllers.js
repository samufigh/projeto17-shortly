import { nanoid } from "nanoid"
import { db } from "../database/database.connection.js"

export async function shorten(req, res) {
    const { url } = req.body
    const { user } = res.locals
    try {
        const shortUrl = nanoid(6)

        await db.query(`
            INSERT INTO links 
            (url, "shortUrl", "userId")
            VALUES ($1, $2, $3);`, [url, shortUrl, user.id])

        const response = await db.query(`
            SELECT id, "shortUrl" FROM links WHERE "userId"=$1 AND url=$2;`, [user.id, url])

        res.status(201).send(response.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteURL(req, res) {
    const { user } = res.locals
    const { id } = req.params
    try {
        const userId = await db.query(`SELECT "userId" FROM links WHERE id=$1;`, [id])

        if (userId.rowCount === 0) return res.status(404).send("Url não encontrada")
        if (userId.rows[0].userId !== user.id) return res.status(401).send("Url não pertence ao usuário!")
    

        await db.query(`DELETE FROM links WHERE id=$1;`, [id])
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function myURLS(req, res) {
    const { user } = res.locals
    try {
        const infoUser = await db.query(`
        SELECT users.id, users.name, SUM(links."visitCount") AS "visitCount"
        FROM users
        JOIN links ON users.id=links."userId"
        WHERE users.id=$1
        GROUP BY users.id, users.name;`, [user.id])

        const urls = await db.query(`
        SELECT links.id, links."shortUrl", links.url, SUM(links."visitCount") AS "visitCount"
        FROM links
        JOIN users ON users.id=links."userId"
        WHERE users.id=$1
        GROUP BY links.id, links."shortUrl", links.url;`, [user.id])

        const userUrls = {
            ...infoUser.rows[0],
            shortenedUrls: urls.rows,
        }
        res.send(userUrls)
    } catch (err) {
        res.status(500).send(err.message);
    }
}