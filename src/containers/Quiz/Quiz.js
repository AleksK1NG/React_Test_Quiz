import React, { Component } from 'react';
import classes from './Quiz.module.css';
import { connect } from 'react-redux';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {
  fetchQuizById,
  quizAnswerClick,
  quizRetry
} from '../../store/actions/quizActions';

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }


  componentWillUnmount() {
    this.props.quizRetry();
  }


  render() {
    const {
      quiz,
      activeQuestion,
      answerState,
      isFinished,
      results,
      loading,
      quizAnswerClick,
      quizRetry
    } = this.props;
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer the questions</h1>
          {loading || !quiz ? (
            <Loader />
          ) : isFinished ? (
            <FinishedQuiz results={results} quiz={quiz} onRetry={quizRetry} />
          ) : (
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={quizAnswerClick}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
              results={results}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.quiz.results,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz,
  loading: state.quiz.loading
});

export default connect(
  mapStateToProps,
  {
    fetchQuizById,
    quizAnswerClick,
    quizRetry
  }
)(Quiz);
