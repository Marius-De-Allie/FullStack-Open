import { useState } from 'react';

const useField = type => {
    let [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(value = event.target.value)
    };

    return {
        type,
        value,
        onChange
    }
};

export { useField };