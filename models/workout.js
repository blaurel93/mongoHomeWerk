const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: { type: Number, required: true },
  exercises: [
    {
      type: { type: String, required: true },
      name: { type: String, required: true },
      duration: { type: Number, required: true },
      weight: { type: Number, required: true },
      reps: { type: Number, required: true },
      sets: { type: Number, required: true }
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);
// console.log(Workout);
module.exports = Workout;