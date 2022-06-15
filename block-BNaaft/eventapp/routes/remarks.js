let express = require('express');
let router = express.Router();
let Remark = require('../models/remark');
let Event = require('../models/event');

router.get("/:id/likes", (req, res, next) => {
    let id = req.params.id;
    Remark.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, remark) => {
        if(err) return next(err);
        res.redirect("/events/" + remark.eventId);
    })
})



module.exports = router;