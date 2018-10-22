import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import {
  createControl,
  validate,
  validateForm
} from '../../form/formFramework';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import {
  createQuizQuestion,
  finishCreateQuiz
} from '../../store/actions/createQuizActions';

function createOptionControl(number) {
  return createControl(
    {
      label: `Option ${number}`,
      errorMessage: 'Value cant be empty',
      id: number
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Enter the question',
        errorMessage: 'Question cant be empty'
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}

class QuizCreator extends Component {
  state = {
    formControls: createFormControls(),
    rightAnswerId: 1,
    isFormValid: false
  };

  submitHandler = e => {
    e.preventDefault();
  };

  addQuestionHandler = e => {
    e.preventDefault();

    const { formControls } = this.state;

    const questionItem = {
      question: formControls.question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: formControls.option1.value, id: formControls.option1.id },
        { text: formControls.option2.value, id: formControls.option2.id },
        { text: formControls.option3.value, id: formControls.option3.id },
        { text: formControls.option4.value, id: formControls.option4.id }
      ]
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false
    });
  };

  createQuizHandler = async e => {
    e.preventDefault();

    this.setState({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false
    });
    this.props.finishCreateQuiz();
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            valid={control.valid}
            shouldValidate={!!control.validation}
            value={control.value}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  };

  selectChangeHandler = e => {
    this.setState({ rightAnswerId: +e.target.value });
  };

  render() {
    const { isFormValid } = this.state;
    const { quiz } = this.props;

    const select = (
      <Select
        label="Choose answer"
        value={this.state.rightAnswerId}
        onChange={e => this.selectChangeHandler(e)}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 }
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create Test</h1>
          <form onSubmit={e => this.submitHandler(e)}>
            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!isFormValid}
            >
              Add Question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={quiz.length === 0}
            >
              Create Test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quiz: state.create.quiz
});

export default connect(
  mapStateToProps,
  { createQuizQuestion, finishCreateQuiz }
)(QuizCreator);
