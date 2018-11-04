const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

const api = require("./api");

app.use("/", api);
app.use("/api", api);

app.use((req, res) => {
	res.json({ error: true, errorMessage: "Endpoint not found" });
});

app.listen(port, () => console.log("\x1b[35m%s\x1b[0m", `**** Booru API server running at port ${port} ****`));
