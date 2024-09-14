async function openConnect() {
  try {
    const response = await fetch('/api/getConnectToken', { method: 'POST' });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const connectToken = data.connectToken;

    const pluggyConnect = new PluggyConnect({
      connectToken,
      onSuccess: (data) => {
        console.log('Conectado com sucesso:', data);
        fetchTransactions(data.accountId);
      },
      onError: (error) => {
        console.error('Erro ao conectar:', error);
      }
    });

    pluggyConnect.open();
  } catch (err) {
    console.error('Erro ao obter token de acesso:', err.message);
  }
}