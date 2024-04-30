import React, { useState, useEffect } from "react";
import '../Styles/listForms.css';
import { Link } from 'react-router-dom';

function Forms () {
  const links = [
    { url: "/formulaire/formulairedemande", label: "type de demande 1" },
    { url: "/formulaire/ajouteroffre", label: "type de demande 2" },
    { url: "/formulaire/ajouteroffre", label: "type de demande 3" }
  ];
  const [showTypeModal, setShowTypeModal] = useState(false);

return(
    <div className="formsrapper">
      <h2 className="title">Types des demandes</h2>
            {links.map((link, index) => (
                <Link key={index} to={link.url} className="linkrapper">
                    <div className="linktdem">{link.label}</div>
                </Link>
            ))}
        </div>
    );
};
export default Forms;
