let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let remarkSchema = new Schema({
    content: {type: String, required: true},
    author: String,
    likes: {type: Number, default: 0},
    eventId: {type: Schema.Types.ObjectId, ref: "Event", required: true}
}, {timeseries: true});

let Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;