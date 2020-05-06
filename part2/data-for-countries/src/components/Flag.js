import React from 'react';

const Flag = ({img, name}) => (
    <div>
        <img src={img} alt={`${name}'s flag`} width={300} height={150} />
    </div>
);

export default Flag;