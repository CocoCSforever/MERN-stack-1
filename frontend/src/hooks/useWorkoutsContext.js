import { WorkoutsContext } from '../context/WorkoutContext'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
// this hook returns to us the value of this context
// which is the value we passed into the provider component 
    const context = useContext(WorkoutsContext)

// we could just wrap the home component or some other sub tree of components and if that's the
// case it means you'd only ever be able to use this context within that tree of
// components and if it's being used outside that component tree then the context will be null
    if(!context){
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }

    return context
}