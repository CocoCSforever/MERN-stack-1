// fetch all workouts and list them in the home page
import { useEffect, useState } from "react"

// components
import WorkoutDetails from '../components/WorkoutDetails'


// create a blank react component for the home page
// function returns a template
const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    // only wants to fire it once instead of every time the component is rendered
    // thus add 2rd argument: empty array. This's dependency array that only fire once when the component first renders
    // why cannot make the first function async?
    useEffect(() => {
        const fetchWorkouts = async () => {
            // const response = await fetch('http://localhost:40000/api/workouts')
            const response = await fetch('/api/workouts')
            // an array of workout objects
            const json = await response.json()
            
            if (response.ok){
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    
    return (
        <div className="home">
            {/* <h2>Home</h2> */}
            <div className="workouts">
                {/* only if we have a value of workouts, we start to map throught them */}
                {workouts && workouts.map((workout) => (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    )
}

export default Home


// Access to fetch at 'http://localhost:40000/api/workouts' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
// two ways to fix:
// 1. install package cores and use it on backend server to allow cross origin request
// 2. add a proxy field to the frontend package.json file
// "proxy": "http://localhost:40000",
// tell our react dev server to proxy any requests that it doesn't recognize to our api server at this address
// for this to work, we should make our requests without explicitly declaring the port number
// const response = await fetch('/api/workouts')
// since react wouldn't recognize this resource internally as a static asset or resourcing the react
// application, it will proxy the request to localhost port 4000 and then forward
// slash api forward slash workouts and as a byproduct this actually also removes
// the cross origin request error that we get in the console so this should fix the issue
// the issue during development however importantly this will only work during
// development and for production you need to make sure that every request points

