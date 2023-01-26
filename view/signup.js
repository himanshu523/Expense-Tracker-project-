async function signup(e){
    try{
        e.preventDefault();
        console.log(e.target.email.value);

        const signUpDetails ={
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value,
        }
        console.log(signUpDetails);

       const response = await axios.post("#",signUpDetails);
       if(response.status===200)
       {
        windows.location.href ="#";//change the page on successful login
       }
       else{
        throw new ErrorEvent('failed to login');
       }
    
    }
    catch(err)
    {
        document.body.innerHTML +=`<div style ="color:red;">${err}</div>`
    }

}