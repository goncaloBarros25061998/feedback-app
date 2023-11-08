import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";



const FeedbackContext = createContext()
export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([{
        id: 1,
        text: 'this is feedback item 1',
        rating: 10,
    },
    {
        id: 2,
        text: 'this is feedback item 2',
        rating: 9,
    },
    {
        id: 3,
        text: 'this is feedback item 3',
        rating: 7,
    }
    

    ])

    const [feedbackEdit, setFeedbackEdit]= useState({
        item:{},
        edit: false
    })
    // to delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }


    }

    // Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => item.id === id  ? { ...item, 
                ...updItem } : item))
    }
    //  to add feedback 
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
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