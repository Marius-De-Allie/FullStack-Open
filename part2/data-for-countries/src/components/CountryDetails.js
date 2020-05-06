import React from 'react';
import Flag from './Flag';
import Language from './Language';
import Country from './Country';

const CountryDetails = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>{`capital: ${country.capital}`}</p>
            <p>{`population: ${country.population}`}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <Language key={language.name} language={language} />)}
            </ul>

            <Flag img={country.flag} name={country.name} />
        </div>
    );
};

export default CountryDetails;