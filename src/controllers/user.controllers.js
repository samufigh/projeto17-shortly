export async function login(req, res){
    try {
        res.send("login")
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function register(req, res){
    try {
        res.send("register")
    } catch (err) {
        res.status(500).send(err.message);
    }
}