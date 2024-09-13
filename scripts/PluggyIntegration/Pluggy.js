async function fetchConnectToken() {
  try {
    const response = await fetch('/api/getConnectToken');
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('Erro ao obter token de acesso:', err.message);
  }
}