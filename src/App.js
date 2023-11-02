import {v4 as uuidv4} from 'uuid'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import { useState } from "react"
import FeedbackData from "./data/FeedbackData"
import Card from "./components/shared/Card"
function App() {
    
    const [feedback, setFeedback] = useState(FeedbackData)
    // the function bellow will make the tranfer of the feedback to a form by using uuidv4 
    const addFeedback =(newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback])
    }
    const deleteFeedback =(id) => {
        if(window.confirm('Are you sure you want to delete')){
            setFeedback(feedback.filter((item) => item.id  !== id))
        }
       
    }
    // All the variables from the Feedback list, forms etc will be shown in bellow.
    return(
        <>
        
        <Header  />
        <div className="container">
            <FeedbackForm  handleAdd={addFeedback}/>
            <FeedbackStats feedback={feedback} />
            <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />

              
        </div>
        </>
    )
}

export default App 