import React from 'react';
import { connect } from 'react-redux';
import BarChart from 'react-bar-chart';
import QuestionScreen from './question-screen';

const margin = {top: 20, right: 20, bottom: 30, left: 40};

class ResultScreen extends React.Component {

  state = {
    width: 500
  }

  componentDidMount = () => {
    window.onresize = () => this.setState({width: this.refs.root.offsetWidth});
  }

  render() {
    const { questions, userAnswers } = this.props, 
      correctAnswers = Object.keys(userAnswers).filter(qId => 
        userAnswers[qId] === (questions.find(ques => ques.id === qId).correct_answer)).length,
      wrongAns = 10 - correctAnswers,
      barChartData = [
        { text: 'Correct', value: ~~correctAnswers }, { text: 'Incorrect', value: ~~wrongAns }
      ];

    return (
      <div ref='root'>
        <div style={{width: '50%', marginTop: 25, marginBottom: 30 }}> 
          <BarChart ylabel='No of Questions'
            width={this.state.width}
            height={500}
            margin={margin}
            data={barChartData}
          />
        </div>
        <div style={{ marginTop: 20, justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 20 }}><b>Score :- </b>{correctAnswers} / 10</span>
          <button style={{ marginLeft: '78%' }} className="btn btn-info" onClick={() => this.props.playAgain()}>Play Again</button>
        </div>
        <QuestionScreen revealAnswerMode={true} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questionReducer.questions,
  userAnswers: state.questionReducer.userAnswers
});

export default connect(mapStateToProps)(ResultScreen);
