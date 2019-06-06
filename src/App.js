import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from './actions/question';
import { QuestionScreen, ResultScreen } from './components';
import './App.css';

class App extends React.Component {
  state = {
    showingQuestionScreen: true
  }
  componentWillMount() {
    this.props.fetchQuestion();
  }
  onQuizSubmit = () => {
    this.setState({ showingQuestionScreen: false });
  }
  playAgain = () => {
    this.setState({ showingQuestionScreen: true }, () => this.props.fetchQuestion());
  }
  render() {
    const { showingQuestionScreen } = this.state;
    return (
      <div className="container">
        <div className="row header" style={{ justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Roboto', fontStyle: 'italic' }}>General Sports Quiz</span>
        </div>
        {showingQuestionScreen && <QuestionScreen revealAnswerMode={false} onQuizSubmit={() => this.onQuizSubmit()} />}
        {!showingQuestionScreen && <ResultScreen playAgain={() => this.playAgain()} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchQuestion: () => dispatch(fetchQuestion())
});


export default connect(null, mapDispatchToProps)(App);
