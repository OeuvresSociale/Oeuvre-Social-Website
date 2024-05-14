import "../Styles/recover.css"
import React,{useEffect, useState} from "react"
import images from "../Assets/images.png"
import axios from "axios"
// import { useHistory } from "react-router-dom";

 const Recover= () => {
    const [email, setEmail]=useState('');
    const [otp, setOTP] = useState([]);
    // const history = useHistory();

    const handleSubmit =async (e) => {
        e.preventDefault();
        try{  
          const response = await axios.get("http://localhost:8000/api/generateOTP",email);
           console.log("email",email)
           setOTP(response.data);
           console.log("otp:",otp);
          //  history.push({ pathname: "/otp", state: { email } });
         }
         catch(error){
          console.error("Error in login:", error);
        }
       
    }
    return(
      <div className="recoverwrap">
        <div className="rewrapper">
          <div className="bluesection">
          <img src={images} alt="logo" className="logo" />
          <div className="titlee"> <h1>Belink</h1> </div>
          </div>
            <form onSubmit={handleSubmit}>
              <h2> Forgot Your Password?</h2>  
                <div className="input-box">
                   <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email Adress" id="email" name="email" required></input>
                 </div>
                 <button > Recover password </button> 
            </form>
        </div></div>
    )
}
export default Recover ;