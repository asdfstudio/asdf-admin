import axios from "axios";

export default async (req, res) => {
    const { email, password } = req;

    try{
        const res = await 
        axios.post('http://localhost:5000/api/login', {
            email,
            password
        });

        if(res.status === 200){
            return console.log("Logged in successfully", res)
        } else {
            return console.log("Invalid credentials");
        }
    } catch(error){
        console.log('Erroe logging in:', error);
    }
};