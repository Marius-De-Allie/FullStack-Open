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
  const [weather, setWeather] = useState({});
  

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log(response.data)
      setCountries([...countries, ...response.data])
      console.log(typeof countries)
    })
  }, []);

  useEffect(() => {
    if(filteredCountries.length === 1) {
      const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: searchTerm.toLowerCase()
      }
  
      console.log(params)
      
      axios.get('http://api.weatherstack.com/current', {params})
        .then(response => {
          const weather = response.data;
          console.log(weather);
          setWeather(weather);
        })
        .catch(e => {
          console.log(e);
      });
      setSearchTerm('');

    } else {
      // do nothing
    }
  }, [searchTerm]);



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
        const name = filteredCountries.map(country => country.name);
        
      
        return filteredCountries.map(country => 
          <CountryDetails 
            key={country.numericCode} 
            country={country} 
            weather={weather}
          />)
      }
   
  };

  const showCountry = (countryCode) => {
    setWeather({});
    const result = filteredCountries.filter(country => country.numericCode === countryCode);
    setFilteredCountries(result);
    setSearchTerm(result[0].name);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={onSearch} />
      {renderUI()}
    </div>
  );
}
export default App;
