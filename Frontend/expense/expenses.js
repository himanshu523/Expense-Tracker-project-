

const token  = localStorage.getItem('token');

const expansionDiv = document.getElementById('expansion');

async function saveToDb(e) {
    try{
        e.preventDefault();
        console.log(e.target.description.value);
        const addExpense = {
            expenseamount: e.target.amount.value,
            description: e.target.description.value,
            category: e.target.category.value
        }
        console.log(addExpense)
    
        const response = await axios.post('http://localhost:3000/expense/addExpense',addExpense,{ headers:{"Authorization":token}}).then(response => {
                alert(response.data.message)
                addNewExpensetoUI(response.data.expense);
        })

    } catch(err) {
        document.body.innerHTML += `<div style="color:red;">${err} </div>`
    }
}

//showPremiumUser

function showPremiumUser()
{
    document.getElementById('rzp-button1').style.visibility="hidden";
     document.getElementById('message').innerHTML+= "you are a premium user";
}

//parsejwt

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
// DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
    const decodeToken = parseJwt(token);
    const ispremium = decodeToken.ispremium;
    console.log(ispremium);
    if(ispremium)
    {
        showPremiumUser();
        showLeaderboard();
    }
    try{
        await axios.get('http://localhost:3000/expense/getExpense',{headers:{"Authorization":token}}).then(response => {
            response.data.expenses.forEach(expense => {
                addNewExpensetoUI(expense);
            })
        })
    } catch(err){
        showError(err);
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
        showError(err);
    }
}

// Delete Expense
function deleteExpense(e, expenseId) {
    try{
    axios.delete(`http://localhost:3000/expense/deleteExpense/${expenseId}`,{headers:{"Authorization":token}}).then((response) => {
        removeExpensefromUI(expenseId)
        alert(response.data.message)
    })
    } catch(err) {
       showError(err);
    }
}

// Remove from UI
function removeExpensefromUI(expenseId){
    const expenseElemId = `expense-${expenseId}`;
    document.getElementById(expenseElemId).remove();
}

//download
function download(){
    axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}

//show error

function showError(err)
{
    document.body.innerHTML+=`<div style="color:red">${err}<div>`
}

//showLeaderBoard

function showLeaderboard(){
    const inputElement = document.createElement("input");
    inputElement.type ="button";
    inputElement.value="show Leaderboard";
    inputElement.onclick = async()=>{
        const token = localStorage.getItem('token');
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderboard',{headers:{"Authorization":token}});
        

        var leaderboardElem = document.getElementById('leaderboard');
        leaderboardElem.innerHTML+='<h1>Leader Board<h1>'
        userLeaderBoardArray.data.forEach((userDetails)=>{
            leaderboardElem.innerHTML+=`<li> Name - ${userDetails.name} total expense ${userDetails.totalExpenses}`
        })
    }
    document.getElementById('message').appendChild(inputElement);
}

//razorpay

document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
        axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then((res) => {
             alert('You are a Premium User Now') ; 
             showPremiumUser();
             localStorage.setItem('token',res.data.token);
             showLeaderboard();          
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}










