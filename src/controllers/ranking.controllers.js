export async function userURLS(req, res){
    try {
        res.send("userURLS")
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