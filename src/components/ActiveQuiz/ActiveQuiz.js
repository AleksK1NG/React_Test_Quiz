import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = ({ answers, question, onAnswerClick, quizLength, answerNumber, state }) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>1.</strong>
        &nbsp; { question }
      </span>
      <small>{answerNumber} of {quizLength}</small>
    </p>
    <AnswersList
      state={state}
      onAnswerClick={onAnswerClick}
      answers={answers}
    />
  </div>
);

export default ActiveQuiz;
