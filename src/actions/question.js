
export const DATA_LOADING = 'DATA_LOADING';
const dataLoading = () => ({ type: DATA_LOADING });

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const fetchQuestion = () => {
  return function (dispatch) {
    dispatch(dataLoading());
    fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
      .then(r => r.json())
      .then(response => {
        //adding id field to each question in response
        const questions = response.results.map((question, index) => ({ ...question, id: `Question_${index}`}));
        dispatch(receiveQuestions(questions));
    });
  };
}
const receiveQuestions = questions => ({ type: RECEIVE_QUESTIONS, questions });

export const ANSWER_MARKED = 'ANSWER_MARKED';
export const markAnswer = (questionId, answer) => ({ type: ANSWER_MARKED, questionId, answer});