import '../Styles/Addloandemande.css';
import axios from "axios";
import React, { useState, useEffect } from "react";

const Addloandemande = ({ closeit }) => {
    const [formData, setFormData] = useState({
        amount: '',
        duration: '',
        purpose: ''
    });

    const [loanType, setLoanType] = useState({});
    const [message, setMessage] = useState('');

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
// 66376c27f785202cb7475cca
    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/LaonRequest", {
                employeeId: "66376c27f785202cb7475cca", // Replace with actual employee ID
                amount: formData.amount,
                duration: formData.duration,
                purpose: formData.purpose,
                requestTypeId: loanType._id // Use the fetched loan type ID
            });
 if (response.data.message) {
                alert(response.data.message); // Display success message in alert
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error); // Display error message in alert
            } else {
                console.error('Error submitting the form:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
        closeit(false);
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
                        <button className="b1" onClick={() => closeit(false)}>Annuler</button>
                        <button className="b2" onClick={handleSubmit}>Valider</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addloandemande;
