import React from 'react';
import Flag from './Flag';
import Language from './Language';
import Country from './Country';
import Weather from './Weather';

const CountryDetails = ({country, weather}) => {
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
            <Weather weather={weather} />
        </div>
    );
};

export default CountryDetails;