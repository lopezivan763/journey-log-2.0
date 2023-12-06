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

const options = {
  method: 'GET',
  url: 'https://maps-data.p.rapidapi.com/place.php',
  params: {
    business_id: '0x47f4eb87e91f866d:0x9629fabb993eb66',
    country: 'fr',
    lang: 'en',
    place_id: 'ChIJk_grnPDq9EcRE7gOH9gAPZA'
  },
  headers: {
    'X-RapidAPI-Key': '1715b24a43msh9b5023d4aa71c9bp108651jsn692826a37b09',
    'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}