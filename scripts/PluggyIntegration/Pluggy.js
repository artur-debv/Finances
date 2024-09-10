async function Pluggy() {
  try {
    const response = await fetch('https://api.pluggy.ai/connect_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: 'd21a9043-5f92-4c82-9498-c20797ec3c4d',
        client_secret: 'dfba0cb3-b925-4953-b6fc-a97aedab9909',
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
}