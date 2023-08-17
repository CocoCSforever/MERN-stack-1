const mongoose = require('mongoose')

const Schema = mongoose.Schema


// creates a new schema, we pass arguments to define the schema(what does a typical workout object/document look like)

// title, # of repetitions, load
// title can be an object where we define bits of information about how the title property looks
// it enforces the schema: only allows String instead of number

// timestamp
// when we try to create a new document, it auto-adds a created timestamp
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// model: apply a schema to a model and then use the model to interact with a collection of that name
// will pluralize 'Workout' to create a workout collection automatically
module.exports = mongoose.model('Workout', workoutSchema)

// find all workouts in workouts collection
// Workout.find()