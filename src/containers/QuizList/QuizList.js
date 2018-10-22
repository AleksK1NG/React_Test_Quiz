import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizes } from '../../store/actions/quizActions';
import logo, { ReactComponent as ReactLogo } from '../../logo.svg'


class QuizList extends Component {
  renderQuizes = () => {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  componentDidMount() {
    this.props.fetchQuizes();

  }

  render() {
    const { loading, quizes } = this.props;
    return (
      <div className={classes.QuizList}>
        <div>
          <ReactLogo className={classes.Logo} alt="logo" />
          <h1>React tests list:</h1>
          {loading && quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quizes: state.quiz.quizes,
  loading: state.quiz.loading
});

export default connect(
  mapStateToProps,
  { fetchQuizes }
)(QuizList);
