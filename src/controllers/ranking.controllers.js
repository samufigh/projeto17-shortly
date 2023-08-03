import { db } from "../database/database.connection.js";

export async function userURLS(req, res){
    try {
        const urls = await db.query(`
            SELECT * FROM links;
        `)
        res.send(urls.rows)
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