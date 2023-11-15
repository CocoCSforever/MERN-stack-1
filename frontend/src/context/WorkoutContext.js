import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

// 1st: previous reliable state=={workous: null}
// 2rd: action that we'll pass into dispatch function
export const workoutsReducer = (state, action) => {
    // check the action type, what we want to do with the data
    switch (action.type) {
        case 'SET_WORKOUTS':
        // action.payload
        // because if we want to set all of the workouts then the payload property on the action that we pass into
        // the dispatch function would be an array of all of the workouts
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            // action.payload: a single new workout object
            // so we're adding that new workout to this array now we also want the rest of the workout data
            // ...state.workouts would be an array of pre-existing workout objects so we're taking all of
            // those and putting those in the array as well but first is the new one so we're
            // kind of adding that one to the top
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                // return true if we want that workout to remain in the new array
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            // state unchanged
            return state
    }
}

// provide context to our application component tree, so our component can access it

// children property represents whatever components or template WorkoutContextProvider(the component
// that's accepting the props) wraps. so in this case the children
// property represents the app component that we just wrapped inside the index.js

// if we output the children inside this provider component
// then essentially we're outputting the root app component
export const WorkoutsContextProvider = ({ children }) => {
    // return a template and it'sG be our workout context

    // can also useState and pass it to value, update whenever we add/remove workout
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    // type property is normally a string all caps that describe in words the state change that we want to make
    // CREATE_WORKOUT/SET_WORKOUTS
    // the second property is a payload property which represents any data we need to make this change so in
    // this case it would be an array of workouts objects

    // this argument inside it is known as an action
    // dispatch({type: 'SET_WORKOUTS', payload:[{}, {}]})


// WorkoutContext.Provider is the thing that basically needs to wrap whatever parts of our
// application needs access to the context. in our case we'll wrap the whole
// application/component tree so that every component has access to this context
    return (
        // what it needs to wrap is the root app component at the top of the component tree
        // value prop will be avai to our components: object of workout property, an array of workout objects
        // but this should be a dynamic value instead hard coding{workouts: []}here
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}


// we created this custom workouts context provider component which returns the actual provider
// of the context that we created. this is the provider that needs to wrap
// whatever components will need to access the context it represents——the workouts context in this case.
// it wraps the children property, taken into this component from the props
// and that children property represents whatever components this custom provider
// component that we made wraps and since it wraps the roots app component in
// index.js file it means that the children prop is that root app component

// since this provider right here wraps that root app component which in turn
// wraps all other components in our application. it means that all components
// will have access to our workouts context


// import { createContext } from 'react'

// export const workoutsContext = createContext()

// export const WorkoutsContextProvider = () => {
//     return (
//        <WorkoutContext.Provider value={{state, dispatch}}>
//             { children }
//        </WorkoutContext.Provider>
//     )
// }