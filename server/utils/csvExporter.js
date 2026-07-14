const generateCSV = (transactions) => {
    const header = ["ID", "Date", "Type", "Category", "Description", "Amount"].join(',');
    const rows = transactions.map((t) => {
        return [
            t.id,
            t.transaction_date,
            t.type,
            t.category_name || 'N/A',
            '"' + (t.description || "").replace(/"/g, '""') + '"',
            t.amount
        ].join(',');
    });
    return header + "\n" + rows.join("\n");
};
module.exports = { generateCSV };