import { useState } from 'react';

const useField = (type) => {
    let [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(value = event.target.value)
    };

    const reset =  (evt) => {
        setValue(value = '');
    };


    return {
        type,
        value,
        onChange,
        reset
    }
};

export { useField };