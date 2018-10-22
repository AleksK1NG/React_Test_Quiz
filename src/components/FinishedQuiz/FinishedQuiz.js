import React from 'react';
import { Link } from 'react-router-dom';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';

const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[results[quizItem.id]]
          ];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>
              .&nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          );
        })}
      </ul>
      <p>
        Right answer is {successCount} of {quiz.length}
      </p>
      <div>
        <Button type="primary" onClick={onRetry}>
          Repeat
        </Button>
        <Link to="/">
          <Button type="success"  >
            Go to the Test list
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
