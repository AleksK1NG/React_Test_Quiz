import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionTypes';
import axios from 'axios';

export const fetchQuizes = () => async dispatch => {
  dispatch(fetchQuizesStart());
  try {
    const { data } = await axios.get(
      `https://react-testquiz.firebaseio.com/quizes.json`
    );
    const quizes = [];
    Object.keys(data).forEach((key, index) => {
      quizes.push({ id: key, name: `Test #${index + 1}` });
    });

    dispatch(fetchQuizesSuccess(quizes));
  } catch (e) {
    dispatch(fetchQuizesError(e));
  }
};

export const fetchQuizesStart = () => ({
  type: FETCH_QUIZES_START,
  payload: 'payload'
});

export const fetchQuizesSuccess = payload => ({
  type: FETCH_QUIZES_SUCCESS,
  payload
});

export const fetchQuizesError = payload => ({
  type: FETCH_QUIZES_ERROR,
  payload
});

export const fetchQuizSuccess = quiz => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  };
};

export const fetchQuizById = quizId => async dispatch => {
  dispatch(fetchQuizesStart());
  try {
    const { data: quiz } = await axios.get(
      `https://react-testquiz.firebaseio.com/quizes/${quizId}.json`
    );
    dispatch(fetchQuizSuccess(quiz));
    console.log('From actions: ', quiz);
  } catch (e) {
    dispatch(fetchQuizesError(e));
  }
};

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    payload: { answerState, results }
  };
};

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ
  };
};

export const quizNextQuestion = number => ({
  type: QUIZ_NEXT_QUESTION,
  payload: number
});

export const quizAnswerClick = answerId => (dispatch, getState) => {
  const state = getState().quiz;
  if (state.answerState) {
    const key = Object.keys(state.answerState)[0];
    if (state.answerState[key] === 'success') {
      return;
    }
  }

  const question = state.quiz[state.activeQuestion];
  const results = state.results;

  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = 'success';
    }

    dispatch(quizSetState({ [answerId]: 'success' }, results));

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz());
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1));
      }
      window.clearTimeout(timeout);
    }, 500);
  } else {
    results[question.id] = 'error';
    dispatch(quizSetState({ [answerId]: 'error' }, results));
  }
};

const isQuizFinished = state => {
  return state.activeQuestion + 1 === state.quiz.length;
};

export const quizRetry = () => ({
  type: QUIZ_RETRY
});
