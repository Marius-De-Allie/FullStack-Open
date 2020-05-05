import React, { Fragment } from 'react';

const SearchFilter = ({searchTerm, searchTermUpdate}) => (
    <Fragment>
        <label htmlFor="search">{`Filter shown with  `}</label>
        <input 
        type="text"
        placeholder="enter search term"
        value={searchTerm}
        onChange={searchTermUpdate}
        id="search"
        />
    </Fragment>
);

export default SearchFilter;