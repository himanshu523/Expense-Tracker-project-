async function login(e)
{
    e.preventDefault();
    const loginDetails={
        email :e.target.email.value,
        password:e.target.password.value,
    }
     try{
     const response = await axios.post("http://localhost:3000/user/login",loginDetails);
        if(response.status === 200)
        {   
            clearError();
            clearInput(e);
            confirm('user logged in successfully!');
            window.location.href="http://localhost:3000/expense";;
        }
      

     }catch(err)
     {
        console.log(err.response.status);
        
        if(err.response.status==404)
        {
            clearInput(e);
            clearError();
            const error =document.getElementById('error-text');
            error.innerHTML = '<h3>User doesnt exists</h3>';
            //alert('user doesnt exists');
        }
        else if(err.response.status==401)
        {
            clearInput(e);
            clearError();
            const error =document.getElementById('error-text');
            error.innerHTML = '<h3>wrong password</h3>';
           // alert('password is incorrect');
        }
    
       
     }
} 

function clearError()
{
    const err =document.getElementById('error-text');
    err.innerHTML = " ";
}
function clearInput(e)
{
    e.target.email.value="";
    e.target.password.value="";
}



