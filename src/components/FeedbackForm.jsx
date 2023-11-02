import React, { Component, useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({handleAdd}) {

    const[text, setText] = useState('')
    const[rating, setRating] = useState('10')
    const[btnDisabled, setBtnDisabled] = useState(true)
    const[message, setMessage] = useState('')
    const handleTextChange = (e) => {
        //Statement to see if the text has >= 10 characets
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
        }else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        //it saves the text in the box
        setText(e.target.value)
    }
    // will send the rating and the text feedback
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length >10){
            const newFeedback = {
                text: text,
                rating
            }
            handleAdd(newFeedback)

            setText('')
        }
    }
    return(
      <Card>
        <form onSubmit={handleSubmit}>
            <h2> How would you rate your service with us?</h2>
          <RatingSelect select ={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input onChange ={handleTextChange}
                type="text" 
                placeholder='Write your review'
                value={text} />
                <Button type="submit" isDisable={btnDisabled}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
      </Card>
    )

}

export default FeedbackForm
