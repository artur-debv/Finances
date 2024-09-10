const Pluggy = async () => {
    try {
      const response = await fetch('https://api.pluggy.ai/connect_token', {
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
  
      if (!response.ok) {
        
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Token de acesso:", data.access_token); 
      return data.access_token;
    } catch (error) {
      
      console.error("Erro ao obter token de acesso:", error.message);
    }
  };