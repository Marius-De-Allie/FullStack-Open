import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';

const App = () => {
  // Component state.
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log(response.data)
      setCountries([...countries, ...response.data])
      console.log(typeof countries)
    })
  }, []);

  const onSearch = (evt) => {
    let term = evt.target.value.trimStart();
    setSearchTerm(term);
    term = new RegExp(term, 'i');
    const results = countries.filter(country => country.name.match(term));
    setFilteredCountries(results);
  };

  const renderUI = () => {
      if(filteredCountries.length > 10) {
        return <p>Too many matches specify another filter</p>
  
      } else if(filteredCountries.length > 1) {
        return <CountryList countries={filteredCountries} show={showCountry} />
      } else if(filteredCountries.length === 1) {
        return filteredCountries.map(country => <CountryDetails key={country.numericCode} country={country} />)
      }
   
  };

  const showCountry = (countryCode) => {
    const result = filteredCountries.filter(country => country.numericCode === countryCode);
    setFilteredCountries(result);
    setSearchTerm('');
  };

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={onSearch} />
      {renderUI()}
    </div>
  );
}
export default App;
