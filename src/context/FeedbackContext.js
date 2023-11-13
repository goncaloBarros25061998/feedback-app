import { createContext, useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";



const FeedbackContext = createContext()
export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([ ])

    const [feedbackEdit, setFeedbackEdit]= useState({
        item:{},
        edit: false
    })

    useEffect(() => {
        fethFeedback()
    }, [])
    // will make show the feedback by using the API
    const fethFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc")
        const data = await response.json()

       setFeedback(data)
       setIsLoading(false)
    }
    // to delete feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter((item) => item.id !== id))
        }


    }

    // Update feedback item
    const updateFeedback =  async(id, updItem) => {

        const response = await fetch(`/feedback/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            }
        } )
        const data = await response.json()

        setFeedback(
            feedback.map((item) => item.id === id  ? { ...item, 
                ...data } : item))
    }
    //  to add feedback and send to the db.json 
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    // for the edit button to update comment 
    const editFeedback = (item) => {
        setFeedbackEdit ({
            item,
            edit: true
        })
    }
    return( // it gives all methos values to the page  
    <FeedbackContext.Provider
        value={{
            feedback,
            feedbackEdit,
            isLoading,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
        }}
    >
        {children}
    </FeedbackContext.Provider>
    )
}

export default FeedbackContext