import React from 'react';
import { connect } from 'react-redux';
import { markAnswer } from '../actions/question';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Loader from 'react-loader';
const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class QuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      attempted: []
    }
  }
  handleStep = (index, forward, back) => {
    let { activeStep } = this.state;
    if(!forward && !back) {
      this.setState({ activeStep: index });
    }
    else {
      if(forward && activeStep < 9) this.setState({ activeStep: activeStep + 1 });
      if(back && activeStep  > 0) this.setState({ activeStep: activeStep - 1 });
    }
  }

  answerClicked = (qId, answer) => {
    let { attempted } = this.state, index = ~~qId.split('_')[1];
    if(attempted.indexOf(index) === -1) attempted.push(index);
    this.props.markAnswer(qId, answer);
    this.setState({ attempted });
  }

  renderSteppers = () => (
    <Stepper nonLinear>
      {steps.map((label, index) => (
        <Step key={label}>
          <button 
            className='btn btn-primary' 
            style={{ backgroundColor: this.state.activeStep === index ? 'grey' : 
              this.state.attempted.indexOf(index) > -1 ? 'green' : 'red' , outline: 'none'
            }} 
            onClick={() => this.handleStep(index)}
          >
            {label}
          </button>
        </Step>
      ))}
    </Stepper>
  );

  renderAnswerButton = (serial, answer, qId) => {
    const { userAnswers, revealAnswerMode } = this.props, 
      isSelected = userAnswers[qId] && userAnswers[qId] === answer;
    return !revealAnswerMode ? (
      <span>
        {serial}. &nbsp;
        <button style={{ backgroundColor: isSelected ? 'green' : '#f7f8f9', minWidth: 200, outline: 'none' }} onClick={() => this.answerClicked(qId, answer)}>{answer}</button>
      </span>
    ) : (
      <span>
        {serial}. &nbsp;
        <button style={{ backgroundColor: serial === 'A' ? 'green' : isSelected ? 'red' : '#f7f8f9', minWidth: 200, outline: 'none' }}>{answer}</button>
      </span>
    )
  }

  renderQuestion = (question) => {
    const { revealAnswerMode, questions = [], userAnswers } = this.props;
    const currQues = question ? question : questions.find(ques => ques.id === `Question_${this.state.activeStep}`);
    const isCorrect = currQues ? userAnswers[currQues.id] === currQues.correct_answer : false;

    return currQues ? (
      <Card key={currQues.id} style={{ minHeight: 250 }}>
        <span style={{ marginTop: 15 , float: 'right' , marginRight: 10 }}>
          {!revealAnswerMode && <b>Answered - {this.state.attempted.length} / 10</b>}
          {revealAnswerMode && <span style={{ color: isCorrect ? 'green' : 'red'}}>{isCorrect ? 'You got this correct.' : 'Oops, you got this wrong.'}</span>}
        </span>
        <CardContent style={{ paddingTop: 50 }}>
          <span style={{ fontSize: 16 }}>
            <b>{currQues.question}</b>
          </span>
          <div style={{ marginTop: 20 }}>
            <div style={{ marginTop: 20 }} className="row">
              <div className="col-md-6">{this.renderAnswerButton('A', currQues.correct_answer, currQues.id)}</div>
              <div className="col-md-6">{this.renderAnswerButton('B', currQues.incorrect_answers[0], currQues.id)}</div>
            </div>
            <div style={{ marginTop: 20 }} className="row">
              <div className="col-md-6">{this.renderAnswerButton('C', currQues.incorrect_answers[1], currQues.id)}</div>
              <div className="col-md-6">{this.renderAnswerButton('D', currQues.incorrect_answers[2], currQues.id)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    ) : null;
  }

  render() {
    return !this.props.revealAnswerMode ? (
      <div>
        <div className="row" style={{ paddingTop: 12 }}>
          <div className="col-md-3"><span style={{ lineHeight: 3 }}><b>Color Code Reference</b></span></div>
          <div className="col-md-3"><button className='btn btn-primary' style={{ backgroundColor: 'grey' }}>Active Question</button></div>
          <div className="col-md-3"><button className='btn btn-primary' style={{ backgroundColor: 'green' }}>Answered</button></div>
          <div className="col-md-3"><button className='btn btn-primary' style={{ backgroundColor: 'red' }}>Un-attempted</button></div>
        </div>
        <hr />
        {this.renderSteppers()}
        <div></div>
        <Loader loaded={!this.props.isLoading}>
          {this.renderQuestion()}
          <div className="row" style={{ paddingTop: 20 }}>
            <div className="col-md-2">
              {this.state.activeStep > 0 && <button className='btn btn-info' onClick={() => this.handleStep(null, null, true)}>{`< previous`}</button>}
            </div>
            <div className="col-md-8"></div>
            <div className="col-md-2">
              {this.state.activeStep < 9 && <button className='btn btn-primary' style={{ marginLeft: 88 }} onClick={() => this.handleStep(null, true, null)}>{`next >`}</button>}
            </div>
          </div>
        </Loader>
        {this.state.attempted.length === 10 &&
          <div className="row" style={{ justifyContent: 'center' }}>
            <button disabled={this.state.attempted.length < 10} className='btn btn-primary' onClick={() => this.props.onQuizSubmit()}>Submit Quiz</button>
          </div>
        }
      </div>
    ):
    (
      <div>
        {this.props.questions.map(question => this.renderQuestion(question))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questionReducer.questions,
  userAnswers: state.questionReducer.userAnswers,
  isLoading: state.questionReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
  markAnswer: (qId, answer) => dispatch(markAnswer(qId, answer))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);
