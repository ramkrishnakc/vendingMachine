import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Loading from '../../components/Loading';
import {fetchData} from './library.module';
import VirtualizedTable from '../../components/VirtualizedTable';

export class Manage extends React.Component {
  componentDidMount() {
    if (!this.props.data.length) {
      this.props.fetchData({method: 'get', endpoint: 'library'});
    }
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <>
        <VirtualizedTable
          tableData={this.props.data}
          columnHeaders={['Name', 'Author', 'Language', 'Category']}
          columnData={['name', 'author', 'language', 'category']}
        />
      </>
    );
  }
}

Manage.propTypes = {
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.library.list,
  loading: state.library.fetchingData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => dispatch(fetchData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
