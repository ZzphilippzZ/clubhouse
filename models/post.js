const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema({
	author: [User],
	title: {
		type: String,
		maxlength: 25
	},
	body: {
		type: String,
		minlength: 1,
		trim: true,
		required: true
	},
	timestamp: {
		type: Date,
		default: moment(Date.now).fromNow(),
		required: true
	}
});
