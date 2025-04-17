import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  // fetching questions from the json server using GET method
  useEffect(() => {
    fetch('http://localhost:4000/questions')
  .then(res => res.json())
  .then(data => {
    
    setQuestions(data)
  })
  .catch(err => console.log(err))
  }, []);

  // updating state after delete
  function handleDelete(deletedQuestion){
    const remainingQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    console.log(remainingQuestions);
    
    setQuestions(remainingQuestions);
  }

  // updating state after changing the answer
  function handleChangeAnswer(changedQuestion){
    const changedAnswerQuestions = questions.map((question) => {
      if(question.id === changedQuestion.id){
        return changedQuestion
      }else {
        return question;
      }
    });
   
    
    setQuestions(changedAnswerQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */
        questions.map(question => {
         return <QuestionItem key={question.id} question={question} onDelete={handleDelete} onChangeAnswer={handleChangeAnswer}/>
        })
        
        }
        
      </ul>
    </section>
  );
}

export default QuestionList;
