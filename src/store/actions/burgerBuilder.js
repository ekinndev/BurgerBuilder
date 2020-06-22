import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
  return {
    ingredientName: name,
    type: actionTypes.ADD_INGREDIENT,
  };
};
export const removeIngredient = (name) => {
  return {
    ingredientName: name,
    type: actionTypes.REMOVE_INGREDIENT,
  };
};
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
export const initIngredients = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('ingredients.json');
      dispatch(setIngredients(response.data));
    } catch (e) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
