import bcrypt from "bcrypt"
import { db } from "../database/database.connection.js"
import { v4 as uuid } from "uuid"

export async function register(req, res) {
    const { name, email, password, confirmPassword } = req.body
    const hash = bcrypt.hashSync(password, 10)
    try {
        if (confirmPassword !== password) return res.status(422).send("As senhas não coincidem!")
        const existingEmail = await db.query(`SELECT * FROM users WHERE email=$1;`, [email])
        if (existingEmail.rowCount > 0) return res.status(409).send("Esse email já está cadastrado")

        await db.query(`
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3);`, [name, email, hash])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await db.query(`SELECT id, email, password FROM users WHERE email=$1;`, [email])

        if (user.rows[0] && bcrypt.compareSync(password, user.rows[0].password)) {
            const token = uuid()
            await db.query(`DELETE FROM sessions WHERE "userId"=$1;`, [user.rows[0].id])

            await db.query(`
                INSERT INTO sessions ("userId", "token") 
                VALUES ($1, $2);`, [user.rows[0].id, token])

            res.send({token})

        } else if (!user.rows[0]) {
            return res.status(401).send("usuário não encontrado (email incorreto)");
        } else {
            return res.status(401).send("usuário não encontrado (senha incorreta)");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}