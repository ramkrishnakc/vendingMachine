import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';

import Navbar from '../../components/navbar';
import Loader from '../../components/loader';
import Tile from '../../components/tile';
import Cart from '../../components/cart';
import CheckoutPopup from '../../components/checkoutPopup';
import {info} from '../../components/notify';
import SlideButton from '../../components/slideButton';
import {fetchProducts, handleCheckout} from './home.module';

export class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      sliderHidden: true,
      openCheckoutPopup: false,
      coins: this.props.coins,
      products: this.props.products,
      random_id: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const obj = {};
    if (prevState.random_id !== nextProps.random_id) {
      obj.random_id = nextProps.random_id;
      obj.coins = nextProps.coins;
      obj.products = nextProps.products;
    }
    return obj;
  }

  componentDidMount() {
    this.props.fetch();
  }

  /* Handles all the logic related to adding item in cart */
  addToCart = productItem => quantity => {
    if (!quantity) return;

    // Show cart items after initially adding item to cart
    if (!this.state.cart.length) {
      this.setState({sliderHidden: false});
    }

    const {product_name: name, product_price: rate} = productItem;

    if (!productItem.product_added_in_cart) {
      this.setState(prevState => ({
        cart: [...prevState.cart, {name, rate, quantity}],
        products: prevState.products.map(ele =>
          ele.product_name === name
            ? {
                ...ele,
                product_added_in_cart: true,
                product_stock: ele.product_stock - quantity,
              }
            : ele
        ),
      }));

      info(`${productItem.product_name} added to the cart.`);
    } else {
      this.setState(prevState => ({
        cart: prevState.cart.map(ele =>
          ele.name === name ? {...ele, quantity: ele.quantity + quantity} : ele
        ),
        products: prevState.products.map(ele =>
          ele.product_name === name
            ? {
                ...ele,
                product_stock: ele.product_stock - quantity,
              }
            : ele
        ),
      }));

      info(`Cart updated for ${productItem.product_name}.`);
    }
  };

  /* Handles logic related to removing item from cart */
  deleteFromCart = cartItem => {
    this.setState(prevState => ({
      cart: prevState.cart.filter(ele => ele.name !== cartItem.name),
      products: prevState.products.map(ele =>
        ele.product_name === cartItem.name
          ? {
              ...ele,
              product_stock: ele.old_stock,
              product_added_in_cart: false,
            }
          : ele
      ),
    }));

    info(`${cartItem.name} removed from the Cart.`);
  };

  /* Handles logic related to update items added in cart */
  updateCart = cartItem => quantity =>
    this.setState(prevState => ({
      cart: prevState.cart.map(ele =>
        ele.name === cartItem.name ? {...ele, quantity} : ele
      ),
      products: prevState.products.map(ele =>
        ele.product_name === cartItem.name
          ? {
              ...ele,
              product_stock: ele.old_stock - quantity,
            }
          : ele
      ),
    }));

  /* Open checkout confirmation popup & set amount, total e.t.c */
  checkout = ({amount, total}) => {
    this.setState({
      openCheckoutPopup: true,
      amount,
      total,
    });
  };

  /* Hamndle purchase confirmation */
  handleConfirmation = () => {
    this.props.submit({
      coins: this.state.coins + this.state.total,
      products: this.state.cart
        .map(item => {
          const match = this.state.products.find(
            prod => prod.product_name === item.name
          );
          if (!match) {
            return null;
          }
          return {
            product_id: match.product_id,
            product_stock: match.product_stock,
          };
        })
        .filter(item => item),
    });

    this.setState({
      sliderHidden: true,
      openCheckoutPopup: false,
    });
  };

  render() {
    const loading = this.props.fetchingData || this.props.checkingOut;

    if (loading) {
      return <Loader />;
    }

    return (
      <>
        <Navbar addProduct={() => {}} coins={this.state.coins} />
        <div className="main-content">
          <div className="content-row">
            {!this.props.products.length ? (
              <div className="no-product-found">
                <h6>No products found!!!</h6>
              </div>
            ) : (
              <>
                {/* Display items available in machine */}
                <div
                  className={cx('content-list', {
                    'full-page-content': !this.state.cart.length,
                  })}
                >
                  <h3>Items currently available:</h3>
                  <div className="items-wrapper">
                    {this.state.products.map(item => {
                      let btnLabel = 'Add to Cart';
                      let btnDisable = false;

                      if (!item.product_stock) {
                        btnLabel = 'Not Available';
                        btnDisable = true;
                      }

                      return (
                        <Tile
                          key={`${item.product_name}_${item.product_stock}`}
                          name={item.product_name}
                          price={item.product_price}
                          stock={item.product_stock}
                          buttonOnClick={this.addToCart(item)}
                          buttonLabel={btnLabel}
                          buttonDisable={btnDisable}
                        />
                      );
                    })}
                  </div>
                </div>
                {/* slide button */}
                <SlideButton
                  sliderHidden={this.state.sliderHidden}
                  handleBtnClick={() =>
                    this.setState(prevState => ({
                      sliderHidden: !prevState.sliderHidden,
                    }))
                  }
                />
                {/* Display cart content */}
                <div
                  className={cx('content-description', {
                    'hide-content': this.state.sliderHidden,
                  })}
                >
                  <h3>Items in Cart:</h3>
                  <div className="activity-wrapper">
                    <Cart
                      items={this.state.cart}
                      productsList={this.state.products}
                      buttonLabel="Checkout"
                      handleCheckout={this.checkout}
                      deleteFromCart={this.deleteFromCart}
                      setQtyFunction={this.updateCart}
                      coins={this.state.coins}
                    />
                  </div>
                </div>
                {/* checkout popup */}
                <CheckoutPopup
                  contentStyle={{
                    borderRadius: '0px',
                    padding: '0px',
                    color: '#393d54',
                    background: '#eff0f3',
                    minHeight: 'calc(100% - 100px)',
                    minWidth: 'calc(100% - 100px)',
                    height: 'calc(100% - 100px)',
                    width: 'calc(100% - 100px)',
                    overflow: 'auto',
                  }}
                  open={this.state.openCheckoutPopup}
                  closePopup={() => this.setState({openCheckoutPopup: false})}
                  items={this.state.cart}
                  amount={this.state.amount}
                  total={this.state.total}
                  handleConfirm={this.handleConfirmation}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

Create.propTypes = {
  products: PropTypes.arrayOf().isRequired,
  coins: PropTypes.number.isRequired,
  checkingOut: PropTypes.bool.isRequired,
  fetchingData: PropTypes.bool.isRequired,
  fetch: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  random_id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  products: state.home.products,
  coins: state.home.coins,
  checkingOut: state.home.checkingOut,
  fetchingData: state.home.fetchingData,
  random_id: state.home.random_id,
});

const mapDispatchToProps = dispatch => {
  return {
    fetch: data => dispatch(fetchProducts(data)),
    submit: data => dispatch(handleCheckout(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
