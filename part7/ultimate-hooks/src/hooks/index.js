import { useState } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    const getAll = () => {
            axios.get(baseUrl)
            .then((response => {
                setResources(response.data)

            }));
        };
  
    const create = (resource) => {
            axios.post(baseUrl, resource)
            .then(response => {
                setResources([...resources, response.data])
            });
            
    };
  
    const service = {
      create,
      getAll
    }
  
    return [
      resources, service
    ]
  };

  export { useResource };