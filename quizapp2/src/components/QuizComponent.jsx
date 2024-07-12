import React, { Component } from 'react';
import quizData from '../resources/quizData.json';

class QuizComponent extends Component {
  state = {
    activeQuestionIndex: 0,
  };

  navigateToPreviousQuestion = () => {
    this.setState(prevState => ({
      activeQuestionIndex:
        prevState.activeQuestionIndex === 0
          ? quizData.length - 1
          : prevState.activeQuestionIndex - 1,
    }));
  };

  navigateToNextQuestion = () => {
    this.setState(prevState => ({
      activeQuestionIndex:
        prevState.activeQuestionIndex === quizData.length - 1
          ? 0
          : prevState.activeQuestionIndex + 1,
    }));
  };

  confirmExit = () => {
    if (window.confirm('Do you really want to exit the quiz?')) {
      this.navigateToNextQuestion();
    }
  };

  render() {
    const { activeQuestionIndex } = this.state;
    const currentQuizItem = quizData[activeQuestionIndex];

    return (
      <React.Fragment>
        <h1>Quiz</h1>
        {currentQuizItem && (
          <React.Fragment>
            <section className="quiz-question">
              <h3>{currentQuizItem.questionText}</h3>
              <p>
                Question {activeQuestionIndex + 1} of {quizData.length}
              </p>
              <ul className="answer-choices">
                {['A', 'B', 'C', 'D'].map(choice => (
                  <li key={choice}>
                    <button>{currentQuizItem[`option${choice}`]}</button>
                  </li>
                ))}
              </ul>
            </section>
            <section className="navigation-controls">
              <button onClick={this.navigateToPreviousQuestion}>
                Previous Question
              </button>
              <button onClick={this.navigateToNextQuestion}>
                Next Question
              </button>
              <button onClick={this.confirmExit}>
                Exit Quiz
              </button>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QuizComponent;
