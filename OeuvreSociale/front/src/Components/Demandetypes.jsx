 import React, { useState, useEffect } from "react";
import "../Styles/Demandetypes.css";
import { Link, useParams } from "react-router-dom";
import Motif from "./Motif";
import { PiFilePdfLight } from "react-icons/pi";
import axios from "axios";

//info sur une demande cote admin ( traitement de demande)


 
const Demandetypes =()=>{ 
  const {id}=useParams();
  console.log(id); 
const [idRequest, setIdRequest] = useState(null);

  const [openMotif, setOpenMotif] = useState(false);
  const [bordercolor, setbordercolor] = useState("white");
  const [showbuttons, setshowbuttons] = useState(true);
  const [padding, setpadding] = useState("0");
  const [error, setError] = useState(null);

  const [request, setRequest] = useState({
    _id: "",
    requestTypeId: {
      _id: "",
      title: "",
    },
    employeeId: {
      _id: "",
      idEmployee: "",
      familyName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      dateStartJob: "",
      monthlySalary: "",
      familysitution: "",
    },
    files: [],
  });
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/Request/${id}`
        );

        setRequest(response.data);
        // Assuming data is an object containing details of the selected employee
      } catch (error) {
        alert(error.response.data);
        console.error("Error fetching request details:", error);
      }
    };
    fetchRequestDetails();
  }, []);
  console.log("data", request);

  const handleRedClick = () => {
    setbordercolor("red");
    setshowbuttons(false);
    setpadding(120);
  };
  const handleGreenClick =async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/Requests/${request._id}`, {
        state:"Approuvée", motif: ""
      });
      setbordercolor("green");
      setshowbuttons(false);
      setpadding(120);
    } catch (error) {
     
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div
      style={{
        borderColor: bordercolor,
        borderStyle: "solid",
        borderWidth: "1px",
        paddingBottom: padding,
      }}
      className="demandetype"
    >
      <div className="return">
        <Link to="/tables">
          <button>Return</button>
        </Link>
      </div>

      <div className="td">{request.requestTypeId.title}</div>

      <div className="empinf">


        <div className="infs">
          <div className="colinf">
            <div className="rowinf">
              {" "}
              <div className="gris">Nom :</div>{" "}
              <div className="noir">{request.employeeId.familyName}</div>{" "}
            </div>
            <div className="rowinf">
              {" "}
              <div className="gris">Prénom :</div>{" "}
              <div className="noir">{request.employeeId.firstName}</div>{" "}
            </div>
            <div className="rowinf">
              {" "}
              <div className="gris">ID :</div>{" "}
              <div className="noir">{request.employeeId.idEmployee}</div>
            </div>
            <div className="rowinf">
              {" "}
              <div className="gris">Situation famillialle :</div>{" "}
              <div className="noir">{request.employeeId.familysitution}</div>
            </div>

          </div>
          <div className="colinf">
            <div className="rowinf">
              {" "}
              <div className="gris">Numéro de téléphone :</div>{" "}
              <div className="noir">{request.employeeId.phoneNumber}</div>
            </div>
            <div className="rowinf">
              {" "}
              <div className="gris">Adressr email :</div>{" "}
              <div className="noir">{request.employeeId.email}</div>
            </div>
            <div className="rowinf">
              {" "}
              <div className="gris">Salaire :</div>{" "}
              <div className="noir">{request.employeeId.monthlySalary}</div>
            </div>

            <div className="rowinf">
              {" "}
              <div className="gris">Date d'envoi :</div>{" "}
             <div className="noir">
                {new Date(request.creationDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {console.log(request.files)}
      <div className="pdfs">
        {request.files.map((file, index) => (
          <div key={index} className="pdfdoc">
            <div className="doctitle">{file.fileOriginalName}</div>
            <div className="doclink">
              <a href={`http://localhost:8000/api/${request._id}/${file._id}`} target="_blank" rel="noopener noreferrer">
                <PiFilePdfLight />
              </a>
            </div>
          </div>
        ))}
      </div>
      {showbuttons && (
        <div className="dtbtns">
          <button className="refuse" onClick={() => {setOpenMotif(true);}}> Réfuser </button>
          <button className="accepte" onClick={handleGreenClick}> Accepter </button>
        </div>
      )}

      {openMotif && (
        <Motif closeMotif={setOpenMotif} handleRedClick={handleRedClick} Request={request} context="Demande"/>
      )}
    </div>
  );
};
export default Demandetypes;
