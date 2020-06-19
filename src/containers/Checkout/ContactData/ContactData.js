import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };
  orderHandler = async (event) => {
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: 'Ekin',
          address: {
            street: 'Sumer',
            zipcode: '44444',
            country: 'TR',
          },
        },
      };
      await axios.post('/orders.json', order);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (e) {
      this.setState({ loading: false });
    }
  };
  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
