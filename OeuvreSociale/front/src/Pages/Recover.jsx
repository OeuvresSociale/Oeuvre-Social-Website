import "../Styles/recover.css"
import React,{useState} from "react"
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
            <img src="./assets/logo.png" alt="logo" className="logo" />
          </div>
            <form onSubmit={handleSubmit}>
              <h2> Forgot Your Password?</h2>  
                <div className="input-box">
                   <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Username" id="email" name="email" required></input>
                 </div>
                 <button type="submit"> Recover password </button> 
            </form>
        </div></div>
    )
}
export default Recover ;