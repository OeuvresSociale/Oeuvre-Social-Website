import React , {useState} from "react";
import '../Styles/Modefyuser.css';

const Modefyuser   = ({closeModefy}) => {

    const [selectedGender, setSelectedGender] = useState(''); 

    const handleGenderChange = (e) => {
      setSelectedGender(e.target.value);
    };

    const [selectedrole, setSelectedrole] = useState(''); 

    const handleroleChange = (e) => {
      setSelectedrole(e.target.value);
    };

    const [selectedsitfam, setSelectedsitfam] = useState(''); 

    const handlesitfamChange = (e) => {
      setSelectedsitfam(e.target.value);
    };





    return (
<div className="mod">
<div className="formulairemodefy">
<div className="f3">
 <div style={{ width: '600px', height: '48px', marginRight: '20px',marginLeft:'20px' }} className="f4" > <span >Nom</span><input type="text"  placeholder="Nom" /></div>
 <div style={{ width: '575px', height: '48px', marginRight: '10px' }} className="f4"  > <span >Prénom</span><input type="text"placeholder="Prénom" /></div>

 </div >
 <div className="f3">
 <div style={{ width: '392px', height: '48px', marginRight: '12px',marginLeft:'20px' }} className="f4" > <span >ID</span><input type="text"  placeholder="ID" /></div>
 <div type="text" style={{ width: '390px', height: '48px', marginRight: '12px' }} className="f4"> <span >Salaire</span><input  placeholder="Salaire" /></div>
 <div style={{ width: '385px', height: '48px', marginRight: '10px' }} className="f4"> <span >Date de recrutement</span><input  style={{ width: '240px' }}  type="date" placeholder="date de recrutement"/></div>

 </div>
 <div className="f3">
 
 <div style={{ width: '595px', height: '48px', marginRight: '18px' ,marginLeft:'20px'}} className="f4"> <span >Address Email</span><input type="text"  placeholder="address email" /></div>
 <div style={{ width: '584px', height: '48px', marginRight: '10px' }}className="f4"> <span >Numéro de téléphone</span><input  type="text"  placeholder="numéro de téléphone" /></div>
 </div>
 <div className="f3">
 
 <div  style={{ width: '1200px', height: '48px', marginRight: '10px' ,marginLeft:'20px'}}className="f4"> <span >Compt bancaire</span><input type="text" placeholder="compte bancaire" /></div>
 </div>
 <div className="f3">
 <div style={{ width: '390px', height: '48px', marginRight: '10px', marginLeft:'20px' }}className="f4" >

 <span >Sexe</span>
      <div className="select-container">
        <select id="gender" name="gender" value={null} onChange={handleGenderChange}>
          <option value="">sexe</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
         
        </select>
       </div> 
      </div>
      <div style={{ width: '390px', height: '48px', marginRight: '10px' }}className="f4" >
      <span >Situation familliale</span>
      <div className="select-container">
        <select id="sitfam" name="sitfam" value={null} onChange={handlesitfamChange}>
          <option value="">situation familialle</option>
          <option value="Marié">Marié</option>
          <option value="célibataire">célibataire</option>
         
        </select>
       </div> 
      </div>
      <div style={{ width: '390px', height: '48px', marginRight: '10px' }}className="f4" >
      <span >Role</span>
      <div className="select-container">
        <select id="role" name="role" value={null} onChange={handleroleChange}>
          <option value="">role</option>
          <option value="président">président</option>
          <option value="trésorerie">trésorerie</option>
          <option value="membre">membre</option>
          <option value="employé">employé</option>
         
        </select>
        </div> 
      </div>


      

 
    

 </div>
 <div className="f3">
 {selectedsitfam === 'Marié' &&( <div style={{ width: '185px', height: '48px', marginLeft: '377px' }}className="f4">
 <span >Nombre d'enfants</span>
    <input type="text"  placeholder="nombre d'enfants" />
    
    
    </div>)}




<div className="btnsm">
    <button className="cancelm"    onClick={  ()=> closeModefy(false)}>Annuler</button> 
     <button className="addm"   onClick={  ()=> closeModefy(false)}>modifier</button>
</div>
 </div>
      

</div>






</div>

    )





}
export default Modefyuser;