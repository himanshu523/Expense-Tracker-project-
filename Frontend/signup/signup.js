async function signup(e){

    e.preventDefault();
    console.log(e.target.email.value);

    const signUpDetails ={
        name:e.target.name.value,
        email:e.target.email.value,
        password:e.target.password.value,
    }
         //console.log(signUpDetails); 
    try{

    

       const response = await axios.post("http://localhost:3000/user/addUser",signUpDetails);
      // console.log(response);
        if(response.status===201)
              {
                e.target.name.value="";
                e.target.email.value ="";
                e.target.password.value="";
                alert('user created successfully');
                window.location.href="../login/login.html"
                
              }
    
    }
    catch(err){
        if(err.response.status===403)
        {
          e.target.name.value="";
          e.target.email.value ="";
          e.target.password.value="";
              alert('user already exists');
        }
    
        
    }
   


}
