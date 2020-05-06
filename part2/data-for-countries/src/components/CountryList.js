import React from 'react';
import Country from './Country';


const CountryList = ({countries}) => (
    <ul>
        {countries.map(country => <Country key={country.name} country={country} />)}
    </ul>
);

export default CountryList;