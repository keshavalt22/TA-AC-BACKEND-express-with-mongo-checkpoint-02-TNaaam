let express = require('express');
const { route } = require('.');
let router = express.Router();
let Event = require('../models/event');
let Remark = require('../models/remark');

router.get("/", (req, res, next) => {
    Event.find({}, (err, events) => {
        if(err) return next(err);
        res.render('events', {events});
    });
});

router.get("/new", (req, res, next) => {
    res.render("addEvent");
});

router.post("/", (req, res, next) => {
    Event.create(req.body, (err, createEvent) => {
        if(err) return next(err);
        res.redirect("/events");
    })
})

router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    Event.findById(id).populate("remarks").exec((err, event) => {
        if(err) return next(err);
        res.render('eventDetails', {event})
    })
});

router.get("/:id/likes", (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, event) => {
        if(err) return next(err);
        res.redirect("/events/" + id);
    });
});

router.get("/:id/edit", (req, res, next) => {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
        if(err) return next(err);
        res.render("editeventForm", {event});
    })
})

router.post("/:id", (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndUpdate(id, req.body, (err, updatedEvent) => {
        if(err) return next(err);
        res.redirect("/events/" + id);
    })
})

router.get("/:id/delete", (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndDelete(id, (err, event) => {
        if(err) return next(err);
        Remark.deleteMany({eventId: event.id}, (err, info) => {
            if(err) return next(err);
            res.redirect("/events");
        })
    })
});

router.post("/:id/remarks", (req, res, next) => {
    let id = req.params.id;
    req.body.eventId = id;
    Remark.create(req.body, (err, remark) => {
        if(err) return next(err);
        Event.findByIdAndUpdate(id, {$push: {remarks: remark._id}}, (err, updatedEvent) => {
            if(err) return next(err);
            res.redirect("/events/" + id);
        });
    });
});

module.exports = router;