const express = require('express')
// move it to controllers
// const Workout = require('../models/workoutModel')

const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

/*
// GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workout'})
})

// POST a new workout
// change the function to an asynchronouse function

router.post('/', async (req, res) =>{
    // req.body
    const {title, load, reps} = req.body

    // try to create a new workout object
    try{
        const workout = await Workout.create({title, load, reps})
        // 200 as good 
        res.status(200).json(workout)
    }catch (error){
        // 400 error code
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'POST a new workout'})
})

// DELETE a workout
router.delete('/:id', (req, res) =>{
    res.json({mssg: 'DELETE a workout'})
})

// UPDATE a workout
router.patch('/:id', (req, res) =>{
    res.json({mssg: 'UPDATE a workout'})
})
*/


// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id',getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router