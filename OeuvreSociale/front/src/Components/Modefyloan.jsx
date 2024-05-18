import React, { useState, useEffect } from "react";
import '../Styles/Modefyloan.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Modefyloan = () => {
  const { id } = useParams(); // Assuming you're passing the loan type ID as a URL parameter
  const [formData, setFormData] = useState({
      maxAmount: '',
      _id:'',
    maxMonth: '',
    maxPourcentage: '',
    desc: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/typeLaon');
        if (response.data && response.data.length > 0) {
          setFormData(response.data[0]); // Assuming you take the first loan data
        }
      } catch (error) {
        console.error('Error fetching the loan data', error);
      }
    };

    fetchLoanData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
console.log(formData); // Log the response data
    
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put('http://localhost:8000/api/typeLaon', formData);
    console.log(response.data); // Log the response data
    navigate('/formulaire/formulairepret'); // Redirect on success
  } catch (error) {
    console.error('There was a problem with your Axios request:', error);
  }
};

  return (
    <div className="loanformwrapp">
          <form >
        <div className="loaninfs2">
          <div className="colloaninf">
            <div className="loaninf">
              <div className="loan1">Prix maximal du pret :</div>
              <div className="loan2">
                <input type="text" placeholder="Valeur" name="maxAmount" value={formData.maxAmount} onChange={handleChange} /> DA
              </div>
            </div>
            <div className="loaninf">
              <div className="loan1">Mois maximal du remboursement :</div>
              <div className="loan2">
                <input type="text" placeholder="Valeur" name="maxMonth" value={formData.maxMonth} onChange={handleChange} />
              </div>
            </div>
            <div className="loaninf">
              <div className="loan1">Pourcentage maximal à rembourser chaque mois :</div>
              <div className="loan2">
                <input type="text" placeholder="Valeur" name="maxPourcentage" value={formData.maxPourcentage} onChange={handleChange} /> %
              </div>
            </div>
          </div>
          <div className="colloaninf2">
            <div className="loaninf">
              <div className="loan1">Description :</div>
              <div className="loandes2">
                <textarea className="resizable-textarea2" name="desc" value={formData.desc} onChange={handleChange} placeholder="Description"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="mlbtns">
          <Link to='/formulaire/formulairepret'>
            <button type="button" className="mlrefuse">Annuler</button>
          </Link>
          <button type="submit" className="mlaccepte" onClick={handleSubmit}>Modifier</button>
        </div>
      </form>
    </div>
  );
};

export default Modefyloan;
