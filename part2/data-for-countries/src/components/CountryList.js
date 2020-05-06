import React from 'react';
import Country from './Country';


const CountryList = ({countries, show}) => (
    <ul>
        {countries.map(country => <Country key={country.name} country={country}  show={show} />)}
    </ul>
);

export default CountryList;