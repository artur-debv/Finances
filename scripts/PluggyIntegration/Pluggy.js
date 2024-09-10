async function Pluggy() {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiOTc4NWE5Y2RlOGM1ZWQ4YmE0ZDc4ZWVkOTRhYzQ2OGE6OGI1NGQ0MTA3OGJhNTJlZDIzMWFjMjYzMjQ3ODM3MTBiZTRlZTBlMWQzZjQ2ZjAxZTcyODVmNDMxZmE1NGJlNzkzY2E3ZGRmMDVkZDgwOWZhZWU0NjRjYTQzMDU1MTJkMGUyZTlkMmVhOGE4NTM4YzEyZDNiYTNmZDBiN2M0OGU3ZWZiMTI1YTA4MTAyNGFjYTIzZWZiNmI1NzRhYmRlNiIsImlhdCI6MTcyNTk5NTkyOSwiZXhwIjoxNzI2MDAzMTI5fQ.J81DJOV7cFt2dw6-5a5Az8J1YKtbzGzBCCY20E3IXp1MN1eYTxPxGHkN2izApqMpUe6nDmyRUSPylzYK7vnn1xZuUSKXUqTEHcUg6nH4A0_fkVak7bV2ypGUwYUFfvsFCbSaOVaElEVi8aG7oMFC2t5W9wA6bUXiMzJBnixjdaeouszDN-2xqBlefypTyCh_xQC-mgZugjwJsai6roIPfacrJ2dUbVtLGrqbEiUa67rd_vdNpljBSpo-5ugY7o1rMu0zbiGx51Q2PdxeVFTSFOAUxfqEbKasNOH5r5YK0LJ76TNQpF0yfjeo75ft3C6dcXvtWU_vRrdVMEHRdUKn2Q'
    }
  };

  try {
    const response = await fetch('https://api.pluggy.ai/connect_token', options);
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
