const Workout = require('../models/workoutModel')
const  mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // empty {} to find all workouts, if just find one or a subset, pass through a property name
    // such as {reps: 20}. Sort by created date, -1 for descending order/newest one at the top
    // workouts stores all the workouts in an array
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req, res) => {
     // all the route parameters are stored on a params property
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid id'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
    // req.body
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try{
        const workout = await Workout.create({title, load, reps})
        // 200 as good 
        res.status(200).json(workout)
    }catch (error){
        // 400 error code
        res.status(400).json({error: error.message})

        // this error is created by mongoose
        // we created a mongoose model based on this schema right here and if
        // mongoose tries to save a new document to the database whereby the document
        // doesn't correspond or doesn't uphold this schema then it's going to throw
        // that error
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid id'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid id'})
    }

    // req.body is an object, we spread its properties by '...req.body' into a new object by {}
    // whatever properties on the body will be output in the updated object
    const workout = await Workout.findOneAndUpdate({_id: id}, {
       ...req.body
    })

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,    
    createWorkout,
    deleteWorkout,
    updateWorkout
}