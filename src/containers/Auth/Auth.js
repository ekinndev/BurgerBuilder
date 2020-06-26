import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: { type: 'email', placeholder: 'Mail Adress' },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: { type: 'password', placeholder: 'Password' },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, []);
  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      },
    };
    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };
  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }
  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      shouldValidate={formElement.config.validation}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType='Success'>SUBMIT</Button>
      </form>
      <Button btnType='Danger' clicked={switchAuthModeHandler}>
        Switch to {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, isSignup) =>
      dispatch(actions.auth(email, pass, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};
const mapStatetoProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(auth);
