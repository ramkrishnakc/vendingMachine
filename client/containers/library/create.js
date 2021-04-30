import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash';

import Loading from '../../components/Loading';
import BarBottom from '../../components/BarBottom';
import Form from '../../components/Form';
import Input from '../../components/Input';
import {updateForm, submitForm} from './library.module';
import Option from './options';
import Validate from '../../../common/validation';

const schema = [
  {
    type: 'text',
    validation_type: 'string',
    name: 'name',
    label: 'Name',
    required: true,
  },
  {
    type: 'text',
    validation_type: 'string',
    name: 'author',
    label: 'Author',
    required: true,
  },
  {
    type: 'radio',
    validation_type: 'string',
    name: 'type',
    label: 'Book Type',
    placeholder: 'Select Book Type',
    options: Option.BOOK_TYPES,
    required: true,
  },
  {
    type: 'select',
    validation_type: 'string',
    name: 'category',
    label: 'Category',
    optionKeys: 'form.type',
    placeholder: 'Select Book Type before selecting Book Category',
    options: (item) => {
      if (typeof item === 'string') {
        return Option.BOOK_CATEGORIES[item];
      }
      if (item && item.value) {
        return Option.BOOK_CATEGORIES[item.value];
      }
      return [];
    },
    required: true,
  },
  {
    type: 'select',
    validation_type: 'string',
    name: 'language',
    label: 'Language',
    placeholder: 'Select Language for Book',
    options: Option.BOOK_LANGUAGES,
    required: true,
  },
  {
    type: 'number',
    validation_type: 'integer',
    name: 'quantity',
    label: 'Available Quantity',
    required: true,
  },
  {
    type: 'date',
    validation_type: 'date',
    name: 'published_date',
    label: 'Published Date',
    required: true,
  },
  {
    type: 'text-area',
    validation_type: 'string',
    name: 'description',
    label: 'Description',
    textareaRows: 3,
    validate: true,
  },
  {
    type: 'file',
    name: 'image',
    label: 'Image',
  },
];
export class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      files: null,
    };
  }

  submit = () => {
    const errors = Validate(this.props.form, {
      schema,
    });

    if (errors.valid) {
      this.setState({errors: {}});
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.props.form));

      if (this.state.files && this.state.files.length) {
        formData.append('file', this.state.files[0]);
      }

      return this.props.submitForm(formData);
    }
    return this.setState({errors});
  };

  handler = (item) => (value) => {
    this.props.updateForm({
      [item.name]: value,
    });
  };

  fileHandler = (files) => {
    this.setState({files});
  };

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <>
        <div className="cloumn large-6 medium-6 small-12">
          <Form>
            {schema.map((item) => {
              const value = get(this.props, ['form', item.name]);
              return (
                <Input
                  {...item}
                  value={value}
                  handler={this.handler(item)}
                  fileHandler={this.fileHandler}
                  selectHandler={this.handler(item)}
                  options={
                    typeof item.options === 'function'
                      ? item.options(get(this.props, item.optionKeys))
                      : item.options
                  }
                  error={this.state.errors[item.name]}
                />
              );
            })}
          </Form>
        </div>
        <BarBottom>
          <button type="button" className="button" onClick={this.submit}>
            Submit
          </button>
        </BarBottom>
      </>
    );
  }
}

Create.propTypes = {
  submitForm: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  form: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  form: state.library.create,
  loading: state.library.formSubmissionStarted,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateForm: (data) => dispatch(updateForm(data)),
    submitForm: (data) => dispatch(submitForm(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
