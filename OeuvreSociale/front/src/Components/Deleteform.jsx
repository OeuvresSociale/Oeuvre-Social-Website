import React, { useState } from "react";
import axios from 'axios';
import '../Styles/Deleteuser.css';

const Deleteform = ({ closeDeleteform, selectedform }) => {
    if (!selectedform) {
        // If selectedform is not defined, return null or render an appropriate message
        return null; // or return <div>No form selected</div>;
    }
    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/typesRequest/${selectedform._id}`)
            .then(response => {
                // If deletion is successful, call closeDeleteform to close the delete form
                closeDeleteform(false);
                // You might also want to trigger some kind of UI update to reflect the deletion
            })
            .catch(error => {
                // Handle error
                console.error('Error deleting form:', error);
            });
    };

    return (
        <div className="del">
            <div className="btnsd">
                <div className="vv">Voulez-vous vraiment supprimer {selectedform.title} ?</div>
                <div className="bi">
                    <button className="b1" onClick={() => closeDeleteform(false)}>Annuler</button>
                    <button className="b2" onClick={handleDelete}>Supprimer</button>
                </div>
            </div>
        </div>
    );
}

export default Deleteform;
