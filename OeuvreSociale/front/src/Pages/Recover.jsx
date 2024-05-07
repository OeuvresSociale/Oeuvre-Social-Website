import "../Styles/recover.css"
import React,{useEffect, useState} from "react"
import images from "../Assets/images.png"

 const Recover= () => {
    const [email, setEmail]=useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
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
                 <button> Recover password </button> 
            </form>
        </div></div>
    )
}
export default Recover ;