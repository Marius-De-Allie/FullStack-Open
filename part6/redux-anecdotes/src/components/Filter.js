import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = ({setFilter}) => {

    const handleChange = (event) => {
      const filterBy = event.target.value.trimStart();
      setFilter(filterBy);

    };
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} type="text" />
      </div>
    )
  };

  const mapDispatchToProps = ({
    setFilter
  });

  export default connect(null, mapDispatchToProps)(Filter);