async function fetchTransactions(accountId) {
  try {
    const response = await fetch(`/api/getTransactions?accountId=${accountId}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const transactions = await response.json();
    console.log('Transações:', transactions);
  } catch (err) {
    console.error('Erro ao buscar transações:', err.message);
  }
}