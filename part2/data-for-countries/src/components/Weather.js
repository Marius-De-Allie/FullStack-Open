import React, { Fragment } from 'react';

const Weather = ({weather}) => {
    const renderWeather = () => {
        const output = weather.location === undefined ||weather.current === undefined || weather.request === undefined
          ? 
          undefined
         :
        <Fragment>
            {weather.location !== undefined && <h3>{`Weather in ${weather.location.name}`}</h3>}
            {weather.current !== undefined && <p>{`temperature: ${weather.current.temperature}`}</p>}
            {weather.current.weather_descriptions !== undefined && <p>{weather.current.weather_descriptions[0]}</p>}
            <div>
                {weather.current.weather_icons !== undefined && <img src={weather.current.weather_icons[0]} alt={`${weather.location.name} weather icon`} />}
            </div>
            {weather.current.wind_speed && weather.current.wind_dir !== undefined && <p>{`windspeed: ${weather.current.wind_speed} mph. Wind Direction: ${weather.current.wind_dir}`}</p>}
        </Fragment>
        return output;
    };

    return (
        <div>
            {renderWeather()}
        </div>
    )
};

export default Weather;