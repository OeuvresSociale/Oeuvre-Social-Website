
import '../Styles/Addloandemande.css';
import axios from "axios";
import React, { useState, useEffect } from "react";


const Addloandemande = () => {
    const [formData, setFormData] = useState({
        amount: '',
        duration: '',
        purpose: ''
    }); 

    const [loanType, setLoanType] = useState({});
    const [message, setMessage] = useState('');
    const [maxAllowedRepayment, setMaxAllowedRepayment] = useState('');
    const [repaymentPerMonth, setRepaymentPerMonth] = useState('');

    useEffect(() => {
        const fetchLoanType = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/typeLaon");
                setLoanType(response.data[0]);
            } catch (error) {
                console.error("Error fetching loan types:", error);
            }
        };

        fetchLoanType();
    }, []);
    const requestTypeId =loanType._id;
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (loanType) => {
        try {
            const response = await axios.post("http://localhost:8000/api/LaonRequest", {
                employeeId: "660308d740d035a7b7ec4d37" , // Replace with actual employee ID
                amount: formData.amount,
                duration: formData.duration,
                purpose: formData.purpose,
                requestTypeId:loanType._id// to get loan id 
            });


            const data = response.data;
            setMessage(data.message);
            setMaxAllowedRepayment(data.maxAllowedRepaymentPerMonth);
            setRepaymentPerMonth(data.repaymentPerMonth);
        } catch (error) {
            console.error("Error submitting loan request:", error);
        }
    };

    return (
        <div className="addloandemande">
            <div className="addloandemwrapp">
                <div className="firstbleu">
                    <div className="firstbleu1">Formulaire de prêt</div>
                    <div className="firstbleu2">{loanType.desc}</div>
                </div>
                <div className="firstwhite">
                    <div className="loaninf">
                        <div className="loan1">Prix maximal du prêt :</div>
                        <div className="loan4">
                            <input
                                type="text"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Valeur"
                            />DA
                        </div>
                    </div>
                    <div className="loaninf">
                        <div className="loan1">Mois maximal du remboursement :</div>
                        <div className="loan4">
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="Valeur"
                            />
                        </div>
                    </div>
                    <div className="loaninf">
                        <div className="loan1">Justifier la besion du prêt :</div>
                        <div className="loan3">
                            <textarea
                                className="restextarea"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleInputChange}
                                placeholder="Motif"
                            ></textarea>
                        </div>
                    </div>
                    <div className="aldb">
                        <button className="b1">Annuler</button>
                        <button className="b2" onClick={handleSubmit}>Valider</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addloandemande;

