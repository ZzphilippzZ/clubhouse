const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Post = new Schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
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
		default: Date.now
	}
});

Post
.virtual('timeAgo')
.get(() => {
	return moment(this.timestamp).fromNow();
});

module.exports = mongoose.model('Post', Post);
