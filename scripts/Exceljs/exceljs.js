const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('teste');

sheet.columns = [
    { header: 'description', key: 'description' },
    { header: 'valor', key: 'valor' },
    { header: 'data', key: 'data' }
];

document.querySelector("#saveButton").addEventListener("click", () => {
    const description = document.querySelector("#description").value;
    const amount = document.querySelector("#amount").value;
    const date = document.querySelector("#date").value;

    sheet.addRow({
        description: description,
        valor: amount,
        data: date
    });

    workbook.xlsx.writeFile('teste.xlsx')
        .then(() => {
            console.log('Arquivo salvo com sucesso!');
        })
        .catch((err) => {
            console.error('Erro ao salvar o arquivo:', err);
        });
});