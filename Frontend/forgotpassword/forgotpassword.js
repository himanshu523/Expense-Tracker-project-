function forgotpassword(e)
{
    e.preventDefault();
    const email = e.target.email.value;
    
    console.log(email);
    const forgotDetails={
        email,
    }
    try{
       const response = axios.post("http://localhost:3000/parrword/forgotpassword",forgotDetails);
       if(response.status ===202)
          {
             document.body.innerHTML+='<div style="color:red;">Mail Successfuly sent <div>';
          }
        else{
            throw new Error('something went wrong')
        }

       }
       catch(err)
       {
        document.body.innerHTML+=`<h3 style="color:red;">${err}<h3>`
       }
}