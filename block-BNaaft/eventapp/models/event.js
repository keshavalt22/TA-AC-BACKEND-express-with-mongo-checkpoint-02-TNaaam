let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    host: String,
    startDate: Date,
    endDate: Date,
    location: String,
    likes: {type: Number, default: 0},
    remarks: [{ type: Schema.Types.ObjectId, ref: "Remark"}]
}, {timestamps: true});

let Event = mongoose.model('Event', eventSchema);

module.exports = Event;
