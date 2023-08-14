import axios from "axios";

export default async (req, res) => {
    const { email, password, retypePassword } = req;

    try{
        const res = await 
        axios.post('http://localhost:5000/api/sign-up', {
            email, 
            password, 
            retypePassword
        });

        if(res.status === 200){
            return console.log("Signin in successfully", res)
        } else {
            return console.log("Invalid credentials");
        }
    } catch(error){
        console.log('Erroe logging in:', error);
    }
};