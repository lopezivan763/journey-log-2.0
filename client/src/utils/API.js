export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };

  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  export const savePlace = (placeData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
  }

  const axios = require('axios');

  export const searchPlace = async (placeId, country, lang) => {
    const options = {
      method: 'GET',
      url: 'https://maps-data.p.rapidapi.com/place.php',
      params: {
        place_id: placeId,
        country,
        lang,
      },
      headers: {
        'X-RapidAPI-Key': '1715b24a43msh9b5023d4aa71c9bp108651jsn692826a37b09',
        'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
  
      // Extract specific fields from the response data
      const { name, full_address: address, website } = response.data;
  
      // Return an object with the extracted fields
      return {
        name,
        address,
        website
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to search for a place');
    }
  };