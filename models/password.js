const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Password = new Schema({
	name: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});
