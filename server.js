const crypto = require("crypto");
const express = require("express");
const app = express();
app.use(express.json());

const stock = [{ id: 10 }, { id: 30 }];

app.get("/", (req, res) => {
  res.send("mosaab bensalah");
});
app.get("/pieces", (req, res) => {
  res.status(200).send({ isValid: true, data: stock, name: "mosaab" });
});
app.get("/pieces/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const piece = stock.find((piece) => piece.id === id);

  res.status(200).send({ isValid: true, data: piece });
});

app.post("/pieces", (req, res) => {
  const id = crypto.randomBytes(8).toString("hex");
  console.log(req.body);
  const piece = { id, ...req.body };
  stock.push(piece);

  res.status(201).send({ isValid: true, data: piece });
});
app.put("/pieces/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const piece = stock.find((piece) => piece.id === id);
  if (data.hasOwnProperty("name")) {
    piece.name = req.body.name;
  }
  if (data.hasOwnProperty("quantity")) {
    piece.quantity = req.body.quantity;
  }
  if (data.hasOwnProperty("color")) {
    piece.color = req.body.color;
  }
  if (data.hasOwnProperty("prix")) {
    piece.prix = req.body.prix;
  }

  console.log(stock);
  res.status(201).send({ isValid: true, data: data });
});
app.delete("/pieces/:id", (req, res) => {
  const id = req.params.id;
  const piec = stock.filter((piece) => piece.id !== id);

  res.status(201).send({ isValid: true, data: piec });
});

app.listen(process.env.PORT || 80, () => {
  console.log("welcom to server 3000");
});
