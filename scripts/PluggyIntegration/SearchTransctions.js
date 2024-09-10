async function fetchTransactions(accountId) {
    const response = await fetch(`https://api.pluggy.ai/accounts/${accountId}/transactions`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiOGE1M2RiNmMzZGU4NWM3MWJmZWQxNWFmMjExMDYwMDY6MmUzYTk5NTQzNjQ1NTlhMTczYTAxZDFlMzI4MTI2Yjk0ZDEwYWI5ZjA1YjI0NTVmNGM2OWI4N2NlYWQ5ZGQ1YTgxOTEzMTIwYTc3MDk5MzMxYzk5NzM5YjgzNWU1ZmQwMGM5ZjliYjUxOWQ2YzVhNzc0ZmY1MmZkZmZmNmJlN2E2NjgzMDY3MjBhODA0NjQ1ZjU3Y2FhMzM4ZDdhNTA0MiIsImlhdCI6MTcyNTk5NzQ0OSwiZXhwIjoxNzI2MDA0NjQ5fQ.LR80Tvfltxh-AZ2jbTLSTE-zcuzJyecPYUTrrcPFM0vAXxzDO9xffuRkip4bwOorR0on8vwkWNS4vsriqLr41V7HeKKJ1CSKcR8eelxZDyCLi-ueOxctqdWlZAO82zj9OxwcwVo48BfMX1qJ7PikN8m3AJpv8YJnyUhsgXlvyy4zOoIjBKvnPWtO4lTz-G5xqecYbaCr4kLbp_serBrn4lNNidG5IvCJXH2ezPRXMjideg36o6o-MWXbTJGfuXViQrnmg1iiefwepbPUYStMRJAPYaHqEcSq7gNhuwMsPJ1b3ljhsq9YYSedlj3uih2RBJ-o8QiR1aFvSCrBv59CEQ'
      }
    });
    const transactions = await response.json();
    console.log('Transações:', transactions);
  }
  