const dataParserForItems = (items) => {
    const currDate = new Date(); 
    const prevDate = new Date();
    prevDate.setMonth(prevDate.getMonth() - 1); 

    console.log("📌 Current Date:", currDate.toISOString());
    console.log("📌 Previous Month Date:", prevDate.toISOString());

    
    const filteredItems = items.filter((item) => {
        const expenseDate = new Date(item.date);
        console.log(" Checking Expense Date:", expenseDate.toISOString());
        return expenseDate >= prevDate && expenseDate <= currDate;
    });

    console.log("Filtered Expenses:", filteredItems);

    let parsedData = [];
    let total = 0;
    
    function formatDate(dateString) {
        const dateObj = new Date(dateString);
        return `${dateObj.getDate()} ${dateObj.toLocaleString("default", { month: "short" })}`;
    }

    filteredItems.forEach((item, index) => {
        const expenseEntry = {
            sno: index + 1,
            date: formatDate(item.date), 
            amount: item.amount, 
            category: item.category, 
        };
        total += item.amount; 
        parsedData.push(expenseEntry);
    });

    const body = parsedData.map((expense) => Object.values(expense));

    console.log("YYYY-MM-DD", body);
    console.log("DD Mon", total);

    return { body, total };
};

module.exports = dataParserForItems;
