export async function shorten(req, res){
    const {url} = req.body
    try {
        res.send("shorten")
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteURL(req, res){
    try {
        res.send("deleteURL")
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function myURLS(req, res){
    try {
        res.send("myURLS")
    } catch (err) {
        res.status(500).send(err.message);
    }
}