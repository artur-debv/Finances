const getAccessToken = async () => {
    const response = await fetch('https://auth.pluggy.ai/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: 'e79cba51-9b39-43e3-907e-45a7d6862108',
        client_secret: '3b3197f9-b65a-4888-99ba-5c4c92015c49',
        grant_type: 'client_credentials'
      })
    });
  
    const data = await response.json();
    return data.access_token;
  };
  