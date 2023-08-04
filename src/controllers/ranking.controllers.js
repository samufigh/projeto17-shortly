import { db } from "../database/database.connection.js";

export async function URL(req, res){
    const {id} = req.params

    try {
        const url = await db.query(`SELECT id, "shortUrl", url FROM links WHERE id=$1`, [id])
        if(url.rowCount === 0) return res.sendStatus(404)

        res.send(url.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function openURL(req, res){
    try {
        res.send("openURL")
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