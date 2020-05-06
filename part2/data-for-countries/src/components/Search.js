import React, { Fragment } from 'react';

const Search = ({searchTerm, onSearch}) => (
    <Fragment>
        <label 
            htmlFor="search"
        >
            {`Find countries  `}
        </label>
        <input 
            type="text"
            value={searchTerm}
            onChange={(evt) => onSearch(evt)}
            placeholder="Please enter country"
        />
    </Fragment>
);

export default Search;