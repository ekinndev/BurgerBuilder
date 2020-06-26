import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    props.onInıtIngredients();
  }, []);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };
  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseCountinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...props.ings };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (props.ings) {
    orderSummary = (
      <OrderSummary
        price={props.totalPrice}
        ingredients={props.ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseCountinueHandler}
      />
    );
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ordered={purchaseHandler}
          purchasable={updatePurchaseState(props.ings)}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          isAuth={props.isAuthenticated}
          price={props.totalPrice}
        />
      </Aux>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInıtIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(burgerBuilder, axios));
