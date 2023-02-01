async function saveToLocalStorage(e) {
    try{
        e.preventDefault();
        console.log(e.target.description.value);
        const addExpense = {
            expenseamount: e.target.amount.value,
            description: e.target.description.value,
            category: e.target.category.value
        }
        console.log(addExpense)
    
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.post('http://localhost:3000/expense/addExpense',addExpense,{ headers:{"Authorization":token}}).then(response => {
                alert(response.data.message)
                addNewExpensetoUI(response.data.expense);
        })

    } catch(err) {
        document.body.innerHTML += `<div style="color:red;">${err} </div>`
    }
}
// DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
    try{
        const token = localStorage.getItem('token');
        await axios.get('http://localhost:3000/expense/getExpense',{headers:{"Authorization":token}}).then(response => {
            response.data.expenses.forEach(expense => {
                addNewExpensetoUI(expense);
            })
        })
    } catch(err){
        console.log(err)
    }
})

// Show Expense to DOM / UI
function addNewExpensetoUI(expense) {
    try{
    // After submit clear input field
    document.getElementById("amount").value = '';
    document.getElementById("description").value = '';
    document.getElementById("category").value = '';

    const parentElement = document.getElementById('expenseTracker');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
    } catch(err){
        console.log(err)
    }
}

// Delete Expense
function deleteExpense(e, expenseId) {
    try{
        const token  = localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/deleteExpense/${expenseId}`,{headers:{"Authorization":token}}).then((response) => {
        removeExpensefromUI(expenseId)
        alert(response.data.message)
    })
    } catch(err) {
        console.log(err)
    }
}

// Remove from UI
function removeExpensefromUI(expenseId){
    const expenseElemId = `expense-${expenseId}`;
    document.getElementById(expenseElemId).remove();
}