import React from 'react';

const Country = ({country, show}) => (
    
    <li>{country.name} 
        <button
            onClick={() => show(country.numericCode)}
        >
            show
        </button>
    </li>

)

export default Country;