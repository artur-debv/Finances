async function openConnect() {
    const data = await Pluggy();
    const connectToken = data.connectToken;

    const pluggyConnect = new pluggyConnect({
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
  }

  document.getElementById('connectButton').addEventListener('click', openConnect);