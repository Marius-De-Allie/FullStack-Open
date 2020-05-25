import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {

    const dispatch = useDispatch();

    const handleChange = (event) => {
      const filterBy = event.target.value.trimStart();
      dispatch(setFilter(filterBy));

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

  export default Filter;