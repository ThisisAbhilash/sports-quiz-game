import { DATA_LOADING, RECEIVE_QUESTIONS, ANSWER_MARKED } from '../actions/question';

export default (state = { isLoading: false, questions: [], userAnswers: {} }, action) => {
  switch (action.type) {
   case RECEIVE_QUESTIONS:
    return {
      ...state,
      isLoading: false,
      questions: action.questions,
      userAnswers: {}
    }

  case ANSWER_MARKED:
    return {
      ...state,
      userAnswers: {
        ...state.userAnswers,
        [action.questionId]: action.answer
      }
    }
  
  case DATA_LOADING:
    return {
      ...state,
      isLoading: true
    }
   default:
    return state
  }
 }