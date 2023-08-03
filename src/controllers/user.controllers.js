import bcrypt from "bcrypt"
import { db } from "../database/database.connection.js";

export async function login(req, res){
    try {
        res.send("login")
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function register(req, res){
        const {name, email, password, confirmPassword} = req.body
        const passwordString = password.toString()
        const hash = bcrypt.hashSync(passwordString, 10)
    try {
        if (confirmPassword !== password) return res.status(422).send("As senhas não coincidem!")
        const existingEmail = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
        if(existingEmail.rowCount > 0) return res.status(409).send("Esse email já está cadastrado")

        await db.query(`
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3);`, [name, email, hash])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message);
    }
}