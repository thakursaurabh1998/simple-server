import express from "express";

const baseUrl = process.env.DOWNSTREAM_BASE_URL;

const app = express();

app.use((req, res, next) => {
  console.info(
    `${new Date().toLocaleString().split(", ").at(1)} - ${req.originalUrl}`
  );
  next();
});

app.get("/", async (req, res) => {
  try {
    const response = await fetch(`${baseUrl}/downstream`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(429).send();
  }
});

app.get("/downstream", async (req, res) => {
  res.json({ hello: "world" });
});

function main(): void {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

main();
