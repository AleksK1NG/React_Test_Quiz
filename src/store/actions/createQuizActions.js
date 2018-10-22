import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';
import axios from 'axios';


export const createQuizQuestion = (item) => ({
  type: CREATE_QUIZ_QUESTION,
  payload: item
});

export const resetQuizCreation = () => ({
  type: RESET_QUIZ_CREATION,
});

export const finishCreateQuiz = () => async (dispatch, getState) => {
  await axios.post(`https://react-testquiz.firebaseio.com/quizes.json`, getState().create.quiz)
  dispatch(resetQuizCreation())
};

