import React, { useEffect, useState } from "react";

function QuestionItem({ question, onDelete, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  const [rightAnswer, setRightAnswer] = useState(correctIndex);

  //function to handle delete of a question
  function handleDelete(){
    console.log(question);
    // deleting the question on the database
    
    fetch(` http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => onDelete(question))
    .catch(err => console.log(err))
  }

  // creating a function to allow changing answer
  useEffect(() => {
    
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: rightAnswer
      })
    })
    .then(res => res.json())
    .then(() => onChangeAnswer(question))
    .catch(err => console.log(err))
  }, [rightAnswer])
  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => setRightAnswer(e.target.value)} value={rightAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
