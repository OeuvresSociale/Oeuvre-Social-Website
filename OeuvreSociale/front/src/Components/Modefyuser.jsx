import '../Styles/Modefyuser.css';
import React , {useState,useEffect} from "react";
import axios from 'axios';

const Modefyuser = ({ closeModefy, selectedEmployee }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    _id:'',
    idEmployee: '',
    firstName: '',
    familyName: '',
    email: '',
    monthlySalary: '',
    role: '',
    sexe: '',
    phoneNumber: "",
    familysitution: "",
    bankAccount: "", 
    dateStartJob: "",
    numberOfChildren: ''
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
       _id: selectedEmployee._id,
        idEmployee: selectedEmployee.idEmployee,
        firstName: selectedEmployee.firstName,
        familyName: selectedEmployee.familyName,
        email: selectedEmployee.email, 
        phoneNumber: selectedEmployee.phoneNumber,
        bankAccount: selectedEmployee.bankAccount,
        monthlySalary: selectedEmployee.monthlySalary,
        dateStartJob: selectedEmployee.dateStartJob ? new Date(selectedEmployee.dateStartJob).toISOString().split('T')[0] : '',
        role: selectedEmployee.role,
        sexe: selectedEmployee.sexe,
        familysitution: selectedEmployee.familysitution,
        numberOfChildren: selectedEmployee.numberOfChild || ''
      });
    }
  }, [selectedEmployee]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [selectedGender, setSelectedGender] = useState('');
  const handleGenderChange = (e) => {
    const newValue = e.target.value;
    setSelectedGender(newValue);
    setFormData({
      ...formData,
      sexe: newValue
    });
  };

  const [selectedRole, setSelectedRole] = useState('');
  const handleRoleChange = (e) => {
    const newValue = e.target.value;
    setSelectedRole(newValue);
    setFormData({
      ...formData,
      role: newValue
    });
  };

  const [selectedSitFam, setSelectedSitFam] = useState('');
  const handleSitFamChange = (e) => {
    const newValue = e.target.value;
    setSelectedSitFam(newValue);
    setFormData({
      ...formData,
      familysitution: newValue
    });
  };

  useEffect(() => {
    setSelectedGender(formData.sexe);
  }, [formData.sexe]);

  useEffect(() => {
    setSelectedRole(formData.role);
  }, [formData.role]);

  useEffect(() => {
    setSelectedSitFam(formData.familysitution);
  }, [formData.familysitution]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/employee/${formData._id}`, formData);
      console.log('Employee updated successfully:', response.data);
      closeModefy(false);
    } catch (error) {
      console.error('Error updating user:', error.response.data);
      setError(error.response.data);
    }
  };

  const errorMessage = error && error.error ? error.error : "";

  return (
    <div className="mod">
      <div className="formulairemodefy">
        <div className="f3">
          <div style={{ width: '600px', height: '48px', marginRight: '20px', marginLeft: '20px' }} className="f4">
            <span>Nom</span>
            <input type="text" placeholder="Nom" name="familyName" value={formData.familyName} onChange={handleInputChange} />
          </div>
          <div style={{ width: '575px', height: '48px', marginRight: '10px' }} className="f4">
            <span>Prénom</span>
            <input type="text" placeholder="Prénom" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          </div>
        </div>
        <div className="f3">
          <div style={{ width: '392px', height: '48px', marginRight: '12px', marginLeft: '20px' }} className="f4">
            <span>ID</span>
            <input type="text" placeholder="ID" name="idEmployee" value={formData.idEmployee} onChange={handleInputChange} />
          </div>
          <div style={{ width: '390px', height: '48px', marginRight: '12px' }} className="f4">
            <span>Salaire</span>
            <input type="text" placeholder="Salaire" name="monthlySalary" value={formData.monthlySalary} onChange={handleInputChange} />
          </div>
          <div style={{ width: '385px', height: '48px', marginRight: '10px' }} className="f4">
            <span>Date de recrutement</span>
            <input type="date" style={{ width: '240px' }} name="dateStartJob" value={formData.dateStartJob} onChange={handleInputChange} />
          </div>
        </div>
        <div className="f3">
          <div style={{ width: '595px', height: '48px', marginRight: '18px', marginLeft: '20px' }} className="f4">
            <span>Address Email</span>
            <input type="text" placeholder="address email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div style={{ width: '584px', height: '48px', marginRight: '10px' }} className="f4">
            <span>Numéro de téléphone</span>
            <input type="text" placeholder="numéro de téléphone" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
          </div>
        </div>
        <div className="f3">
          <div style={{ width: '1200px', height: '48px', marginRight: '10px', marginLeft: '20px' }} className="f4">
            <span>Compte bancaire</span>
            <input type="text" placeholder="compte bancaire" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} />
          </div>
        </div>
        <div className="f3">
          <div style={{ width: '390px', height: '48px', marginRight: '10px', marginLeft: '20px' }} className="f4">
            <span>Sexe</span>
            <div className="select-container">
              <select id="gender" name="sexe" value={selectedGender} onChange={handleGenderChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div style={{ width: '390px', height: '48px', marginRight: '10px' }} className="f4">
            <span>Situation familliale</span>
            <div className="select-container">
              <select id="sitfam" name="familysitution" value={selectedSitFam} onChange={handleSitFamChange}>
                <option value="Marie">Marié</option>
                <option value="celibataire">célibataire</option>
              </select>
            </div>
          </div>
          <div style={{ width: '390px', height: '48px', marginRight: '10px' }} className="f4">
            <span>Role</span>
            <div className="select-container">
              <select id="role" name="role" value={selectedRole} onChange={handleRoleChange}>
                <option value="president">président</option>
                <option value="tresorerie">trésorerie</option>
                <option value="membre">membre</option>
                <option value="employe">employé</option>
              </select>
            </div>
          </div>
        </div>
        <div className="f3">
          {selectedSitFam === 'Marie' && (
            <div style={{ width: '185px', height: '48px', marginLeft: '377px' }} className="f4">
              <span>Nombre d'enfants</span>
              <input type="text" placeholder="nombre d'enfants" name="numberOfChildren" value={formData.numberOfChildren} onChange={handleInputChange} />
            </div>
          )}
          <div>
            <p>{errorMessage}</p>
          </div>
          <div className="btnsm">
            <button className="cancelm" onClick={() => closeModefy(false)}>Annuler</button>
            <button className="addm" onClick={handleFormSubmit}>Modifier</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modefyuser;