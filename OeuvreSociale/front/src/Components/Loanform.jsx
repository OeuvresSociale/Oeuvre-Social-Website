import React, { useState, useEffect } from "react";
import '../Styles/Loanform.css';
import { BsArrowLeftCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from 'axios';

const Loanform = () => {
  const [loan, setLoan] = useState({
    _id: "",

    maxAmount: "",
    maxMonth: "",
    maxPourcentage: "",
    desc: "",
  });

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/typeLaon');
        if (response.data && response.data.length > 0) {
          setLoan(response.data[0]); // Assuming you take the first loan data
        }
      } catch (error) {
        console.error('Error fetching the loan data', error);
      }
    };

    fetchLoanData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault(); // not refreshing the page
    // Your logic here
  };

  return (
    <div className="loanformwrapp">
      <Link to='/formulaire/formulairepret/modifierpret'>
        <div>
          <div className="modefypret">
            <button onClick={handleClick}>Modifier</button>
          </div>
        </div>
      </Link>
      <Link to='/formulaire'>
        <div className="arrow"><BsArrowLeftCircle /></div>
      </Link>
      <div className="empinf">
        <div className="loaninfs">
          <div className="colloaninf">
            <div className="loaninf">
              <div className="loan1">Prix maximal du pret :</div>
              <div className="loan2">{loan.maxAmount}</div>
            </div>
            <div className="loaninf">
              <div className="loan1">Mois maximal du remboursement :</div>
              <div className="loan2">{loan.maxMonth}</div>
            </div>
            <div className="loaninf">
              <div className="loan1">Pourcentage maximal à rembourser chaque mois :</div>
              <div className="loan2">{loan.maxPourcentage}%</div>
            </div>
          </div>
          <div className="colloaninf2">
            <div className="loaninf">
              <div className="loan1">Description :</div>
              <div className="loandes">{loan.desc}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loanform;
