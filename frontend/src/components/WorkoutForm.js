// fill out the form and submit, will add a new workout
import  { useState } from "react"


const WorkoutForm = () => {
    // create state for each of the diff properties of the new workout
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        // prevent the default action of the form being submitted(such as refreshing the page)
        e.preventDefault()

        // create dummy workout object
        const workout = {title, load, reps}

        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excercise Title:</label>
            <input 
                type="text"
                // when use types in the field, it'sG fire a function
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                // when use types in the field, it'sG fire a function
                onChange={(e) => setLoad(e.target.value)}
                value = {load}
            />

            <label>Reps:</label>
            <input 
                type="number"
                // when use types in the field, it'sG fire a function
                onChange={(e) => setReps(e.target.value)}
                value = {reps}
            />
            
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm