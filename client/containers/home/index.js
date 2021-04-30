import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
// import {get} from 'lodash';

// import Loading from '../../components/Loading';
// import BarBottom from '../../components/BarBottom';
// import Form from '../../components/Form';
// import Input from '../../components/Input';
import FontAwesomeIcon from '../../components/FontAwesomeLibrary';
import {fetchProducts} from './home.module';
import Navbar from '../../components/navbar';
import Loader from '../../components/Loader';
import Tile from '../../components/tile';
import Cart from '../../components/Cart';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

// import Option from './options';
// import Validate from '../../../common/validation';

// const schema = [
//   {
//     type: 'text',
//     validation_type: 'string',
//     name: 'name',
//     label: 'Name',
//     required: true,
//   },
//   {
//     type: 'text',
//     validation_type: 'string',
//     name: 'author',
//     label: 'Author',
//     required: true,
//   },
//   {
//     type: 'radio',
//     validation_type: 'string',
//     name: 'type',
//     label: 'Book Type',
//     placeholder: 'Select Book Type',
//     options: Option.BOOK_TYPES,
//     required: true,
//   },
//   {
//     type: 'select',
//     validation_type: 'string',
//     name: 'category',
//     label: 'Category',
//     optionKeys: 'form.type',
//     placeholder: 'Select Book Type before selecting Book Category',
//     options: (item) => {
//       if (typeof item === 'string') {
//         return Option.BOOK_CATEGORIES[item];
//       }
//       if (item && item.value) {
//         return Option.BOOK_CATEGORIES[item.value];
//       }
//       return [];
//     },
//     required: true,
//   },
//   {
//     type: 'select',
//     validation_type: 'string',
//     name: 'language',
//     label: 'Language',
//     placeholder: 'Select Language for Book',
//     options: Option.BOOK_LANGUAGES,
//     required: true,
//   },
//   {
//     type: 'number',
//     validation_type: 'integer',
//     name: 'quantity',
//     label: 'Available Quantity',
//     required: true,
//   },
//   {
//     type: 'date',
//     validation_type: 'date',
//     name: 'published_date',
//     label: 'Published Date',
//     required: true,
//   },
//   {
//     type: 'text-area',
//     validation_type: 'string',
//     name: 'description',
//     label: 'Description',
//     textareaRows: 3,
//     validate: true,
//   },
//   {
//     type: 'file',
//     name: 'image',
//     label: 'Image',
//   },
// ];

const x = [
  {
    product_name: 'Coca Cola',
    product_price: 20,
    product_stock: 10,
    product_image: null,
  },
  {
    product_name: 'Fanta',
    product_price: 30,
    product_stock: 0,
    product_image: null,
  },
  {
    product_name: 'Pizza',
    product_description: 'I am a pizza',
    product_price: 23,
    product_stock: 12,
    product_image: null,
  },
  {
    product_name: 'Sprite',
    product_description: '',
    product_price: 2,
    product_stock: 90,
    product_image: null,
  },
  {
    product_name: 'Roti',
    product_price: 12,
    product_stock: 17,
    product_image: null,
  },

  {
    product_name: 'Milk',
    product_price: 90,
    product_stock: 29,
    product_image: null,
  },
  {
    product_name: 'Momo',
    product_price: 105,
    product_stock: 0,
    product_image: null,
  },
  {
    product_name: 'Chowmin',
    product_price: 120,
    product_stock: 20,
    product_image: null,
  },
  {
    product_name: 'Biscuit',
    product_price: 32,
    product_stock: 15,
    product_image: null,
  },
];

export class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: 100,
      products: x.map((d) => ({...d, old_stock: d.product_stock})),
      cart: [],
      sliderHidden: true,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  // submit = () => {
  //   const errors = Validate(this.props.form, {
  //     schema,
  //   });

  //   if (errors.valid) {
  //     this.setState({errors: {}});
  //     const formData = new FormData();
  //     formData.append('data', JSON.stringify(this.props.form));

  //     if (this.state.files && this.state.files.length) {
  //       formData.append('file', this.state.files[0]);
  //     }

  //     return this.props.submitForm(formData);
  //   }
  //   return this.setState({errors});
  // };

  // handler = (item) => (value) => {
  //   this.props.updateForm({
  //     [item.name]: value,
  //   });
  // };

  // fileHandler = (files) => {
  //   this.setState({files});
  // };

  /* Handles all the logic related to adding item in cart */
  addToCart = (productItem) => (quantity) => {
    if (!quantity) return;

    // Show cart items after initially adding item to cart
    if (!this.state.cart.length) {
      this.setState({sliderHidden: false});
    }

    const {product_name: name, product_price: rate} = productItem;

    if (!productItem.product_added_in_cart) {
      this.setState((prevState) => ({
        cart: [...prevState.cart, {name, rate, quantity}],
        products: prevState.products.map((ele) =>
          ele.product_name === name
            ? {
                ...ele,
                product_added_in_cart: true,
                product_stock: ele.product_stock - quantity,
              }
            : ele
        ),
      }));
    } else {
      this.setState((prevState) => ({
        cart: prevState.cart.map((ele) =>
          ele.name === name ? {...ele, quantity: ele.quantity + quantity} : ele
        ),
        products: prevState.products.map((ele) =>
          ele.product_name === name
            ? {
                ...ele,
                product_stock: ele.product_stock - quantity,
              }
            : ele
        ),
      }));
    }
  };

  /* Handles logic related to removing item from cart */
  deleteFromCart = (cartItem) =>
    this.setState((prevState) => ({
      cart: prevState.cart.filter((ele) => ele.name !== cartItem.name),
      products: prevState.products.map((ele) =>
        ele.product_name === cartItem.name
          ? {
              ...ele,
              product_stock: ele.old_stock,
              product_added_in_cart: false,
            }
          : ele
      ),
    }));

  /* Handles logic related to update items added in cart */
  updateCart = (cartItem) => (quantity) =>
    this.setState((prevState) => ({
      cart: prevState.cart.map((ele) =>
        ele.name === cartItem.name ? {...ele, quantity} : ele
      ),
      products: prevState.products.map((ele) =>
        ele.product_name === cartItem.name
          ? {
              ...ele,
              product_stock: ele.old_stock - quantity,
            }
          : ele
      ),
    }));

  checkout = () => {};

  render() {
    return (
      <>
        <Navbar addProduct={() => {}} coins={this.state.coins} />
        <div className="main-content">
          <div className="content-row">
            {this.props.loading ? (
              <Loader />
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
                    {this.state.products.map((item) => {
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
                {/* slider */}
                <div className="slider-button-wrapper">
                  <div
                    className="slider-button"
                    onClick={() =>
                      this.setState((prevState) => ({
                        sliderHidden: !prevState.sliderHidden,
                      }))
                    }
                  >
                    <FontAwesomeIcon
                      className={cx({'hide-content': !this.state.sliderHidden})}
                      icon="angle-left"
                    />
                    <FontAwesomeIcon
                      className={cx({'hide-content': this.state.sliderHidden})}
                      icon="angle-right"
                    />
                  </div>
                </div>
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
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

Create.defaultProps = {
  loading: false,
};
Create.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  items: PropTypes.arrayOf().isRequired,
  // submitForm: PropTypes.func.isRequired,
  // updateForm: PropTypes.func.isRequired,
  // form: PropTypes.shape().isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  list: state.home.list,
  // loading: state.library.formSubmissionStarted,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (data) => dispatch(fetchProducts(data)),
    // submitForm: (data) => dispatch(submitForm(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
