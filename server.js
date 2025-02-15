const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const SECRET_KEY = "supersecretkey";

app.use(cors());
app.use(bodyParser.json());


const users = [
  { username: "luis", password: "12345" },
  { username: "admin", password: "admin12345" },
  { username: "karina", password: "12345" },
];


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validacion de los campos vacios
  if (!username || !password) {
    return res.status(400).json({
      statusCode: 400,
      intDataMessage: [{ credentials: "Los campos no pueden estar vacíos" }],
    });
  }

  // Verificacion si el usuario existe
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      intDataMessage: [{ credentials: "Credenciales incorrectas" }],
    });
  }

  // Expira el token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1m" });

  return res.status(200).json({
    statusCode: 200,
    intDataMessage: [{ credentials: token }],
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
