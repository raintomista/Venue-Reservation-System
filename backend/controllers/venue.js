'use strict';
const db = require(__dirname + '/../lib/mysql');

exports.addVenue = (req, res, next) => {
	const data = {
		Name : req.body.Name,
		Capacity : req.body.Capacity,
		Details : req.body.Details,
		Status : req.body.Status,
		Longitude : req.body.Longitude,
		Latitude : req.body.Latitude
	}
	const query = "INSERT INTO venue(Name, Capacity, Details, Status, Longitude, Latitude) VALUES (?, ?, ?, ?, ?, ?)";
	const request = [data.Name, data.Capacity, data.Details, data.Status, data.Longitude, data.Latitude];
	db.query(query, request, function(err, rows) {
		if (err) {
			return res.send(500, {code: err.code});
		}
		res.send(rows);
	});
};

exports.getAll = (req, res, next) => {
	const query = "SELECT *"
		+ " FROM venue";
	db.query(query, (err, result) => {
		res.send(result);
	});
};

exports.editVenue = (req, res, next) => {
	const query = "UPDATE venue"
		+ " SET ?"
		+ " WHERE VenueId = ?";
	db.query(query, [req.body, req.params.venueid], (err, result) => {
		if (err) {
			return res.status(500).send({code: err.code});
		}
		res.send(result);
	});
};

exports.deleteVenue = (req, res, next) => {
	const query = "DELETE FROM venue"
		+ " WHERE VenueId = ?";
	db.query(query, [req.params.venueid], (err, result) => {
		if (err) {
			return res.status(500).send({code: err.code});
		}
		res.send(result);
	});
};