import React from 'react'
import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'




function RatingSelect({select}) {
    //selection of the rating 
    const [selected, setSelected] = useState(10)
    const { feedbackEdit  } = useContext(FeedbackContext)
    // use effect bellow allows the user to see the rating while its changing the feedback
    useEffect(() => {
      setSelected(feedbackEdit.item.rating)

    },[feedbackEdit])
    const handleChange = (e) => {
        setSelected(+e.currentTarget.value)
        select(+e.currentTarget.value)
    }
    // How the ratings is show in the page
  return (
    <ul className='rating'>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  )
  
        
}

export default RatingSelect
