const cors = require("cors");
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_USERNAME, MONGO_DBNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_SRV } = process.env;

// console.log(
// 	"MONGO_USERNAME, MONGO_DBNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_SRV",
// 	MONGO_USERNAME,
// 	MONGO_DBNAME,
// 	MONGO_PASSWORD,
// 	MONGO_HOSTNAME,q
// 	MONGO_PORT,
// 	MONGO_SRV
// );

//let uri = "mongodb+srv://y2kb:4kYfOdsQvrI6yMdZ@pixelart.25dqilc.mongodb.net/test?retryWrites=true&w=majority";

if (MONGO_SRV === "true") {
	uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DBNAME}?retryWrites=true&w=majority`;
} else {
	uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;
}

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();
		// Establish and verify connection
		await client.db("pixelArt").command({ ping: 1 });
		console.log("Connected successfully to server mongoDB");
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);

app.use(express.json());

app.use(cors());

app.listen(8000, () => {
	console.log(`App server now listening on port ${8000}`);
});

app.get("/get", (req, res) => {
	const { table } = req.query;

	pool.query(`select * from ${table}`, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send(results);
		}
	});
});

//LOGIN (AUTHENTICATE USER)
app.post("/inscription", (req, res) => {
	const { table } = req.query;

	let nom = req.body.user.name;
	let password = req.body.user.password;

	const user = { nom, password };
	pool.query(`INSERT INTO account (name,password) VALUES ('${nom}','${password}')`, (err, results) => {
		if (err) {
			console.log("insert error");
			res.send(err);
		} else {
			res.send({ error: false, data: results, message: "user has been updated successfully." });
		}
	});
});
