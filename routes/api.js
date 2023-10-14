var express = require("express");
var router = express.Router();
var client = require("../utils/database");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.send("API is working properly");
});

// POST sql query to database
router.post("/db", async function (req, res, next) {
	try {
		// get formdata from request
		var data = req.body;
		console.log(data);

		if (data.query) {
			// query database
			var resp = await client.query(data.query);
			res.send(resp);
		} else {
			res.send("No query provided");
		}
	} catch (error) {
		res.send(JSON.stringify({ error: "Error connecting to database" }));
		console.log(error);
	}
});

router.post("/bubblechart", async function (req, res, next) {
	try {
		// query database
		var resp = await client.bubblechart();
		res.send(resp);
	} catch (error) {
		res.send(JSON.stringify({ error: "Error connecting to database" }));
		console.log(error);
	}
});

router.post("/location", async function (req, res, next) {
	try {
		// get formdata from request
		var data = req.body;
		console.log(data);

		if (data.query) {
			// query database
			var resp = await client.getEventsByLocation(data.query);
			res.send(resp);
		} else {
			res.send("No query provided");
		}
	} catch (error) {
		res.send(JSON.stringify({ error: "Error connecting to database" }));
		console.log(error);
	}
});

router.post("/genre", async function (req, res, next) {
	try {
		// get formdata from request
		var data = req.body;
		console.log(data);

		if (data.query) {
			// query database
			var resp = await client.getEventsByGenre(data.query);
			res.send(resp);
		} else {
			res.send("No query provided");
		}
	} catch (error) {
		res.send(JSON.stringify({ error: "Error connecting to database" }));
		console.log(error);
	}
});

module.exports = router;
