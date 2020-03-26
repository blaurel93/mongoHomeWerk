let db = require("../models")
const router = require("express").Router();

router.get("/api/workouts/range", function (req, res) {
    db.Workout.find({})
        .then(function (workouts) {
            res.json(workouts);
        })
        .catch(function (error) {
            res.json(error)
        });
});
router.get("/api/workouts", function (req, res) {
    db.Workout.find({})
        .then(function (workouts) {
            res.json(workouts);
        })
        .catch(function (error) {
            res.json(error)
        });
});
router.post("/api/workouts/range", function (req, res) {
    db.Workout.create({})
        .then(function (workouts) {
            res.json(workouts);
        })
        .catch(function (error) {
            res.json(error)
        });
});
router.put("/api/workouts/:id", function ({ body, params }, res) {
    db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            res.json(error)
        });
});

module.exports = router;