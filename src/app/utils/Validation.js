
const Validation = (values) =>{
    let errors= {}

  if(!values.username){
          errors.username="Username is Required."
        }
        else if (values.usernameTaken){
            errors.username="This username is already taken."
        }
        else if (values.usernameExists){
            errors.username="This username does not exist."
        }
        else {
            errors.username=""
        }

        if(!values.password){
          errors.password="Password is Required."
        }
        else if(values.incorrectPassword){
        errors.password="Password is incorrect."
        }
        else if (values.password.length < 8){
            errors.password="Password must be more than 8 charcters."
        }
        else{
            errors.password=""
        }

        const emailPattern =/^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if(!values.email){
          errors.email="Email is Required."
        }
        else if (!emailPattern.test(values.email)){
            errors.email="Invalid email address."
        }
        else{
            errors.email=""
        }
        return errors;
}

export default Validation ;