const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const authHeader = req.header['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token === null) return res.status(400).send("Invalid token.")
  try {
    const user = jwt.verify(token, "jwtPrivateKey");
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
