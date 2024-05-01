import "../Styles/login.css"
import React,{useEffect, useState} from "react"
import axios from "axios";

 const Login = () => {
    const [email, setEmail]=useState('');
    const [pass, setPass] = useState('');
    
    // const handleSubmit = (e) => { 
    //     e.preventDefault();
    //     console.log(email); 
    // };
////////////////////////////////
const [formData, setFormData] = useState({
  email: '',
  password: ''
}); 

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};
          const handleSubmit =async () => {
            
            try {
              const response=await axios.post("http://localhost:8000/api//login",{
                email:formData.email,
                password:formData.password
              });
              const data = response.data;
            }catch(error){
              console.error("Error in login:", error);
            }
////////////////////////////////////////////
  } 
    return(
      <div className="loginwrap">
        <div className="wrapper">
          <div className="blue-section">
            <img src="./assets/logo.png" alt="logo" className="logo" />
          </div>
            <form onSubmit={handleSubmit}>
              <h1>Belink</h1>  
                <div className="input-box">
                   <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Username" id="email" name="email" required></input>
                 </div>
                 <div className="input-box">
                    <input type="password" onChange={(e)=>setPass(e.target.value)} value={pass} placeholder="Password" id="password" name="password"></input>
                  </div>
                  <div className="forget-pass">
                    <a href="/Recover"> Forgot password? </a>
                  </div>
                 <button type="submit"> Login </button> 
            </form>
        </div></div>
    )
}
export default Login ;