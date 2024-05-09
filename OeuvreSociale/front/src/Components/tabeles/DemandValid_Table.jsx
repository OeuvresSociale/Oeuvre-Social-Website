import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import ValidateDemandePopup from "../popups/ValidateDemandePopup";
import "../../Styles/tables/DataGrid.css";

const DemandValid_Table = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Store the selected row

  // Handles functions

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleValidateRow = (row) => {
    // Store the selected row
    setSelectedRow(row);
    // Open the popup
    setOpenPopup(true);
  };

   /*const [data, setData] = useState([]);
  const getTrans_Data = async () => {
    await axios
      .get("http://localhost:8000/api/Transactions")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    useEffect(() => {
        getTrans_Data();
    }, []);
  
    const rows = data.map((transaction) => {
        return {
            id: transaction._id,
            conerné: transaction.conerné,
            type: transaction.type,
            Date: transaction.Date,
            Somme: transaction.Somme,
            pdf: transaction.pdf,
        };
    */

  //Declare columns content
  const columns = [
    { field: "concerned", headerName: "Concerné", width: 315 },
    { field: "type", headerName: "Type", width: 315 },
    { field: "date", headerName: "Date d'envoi", width: 315 },
    { field: "amount", headerName: "Somme", width: 315 },

    {
      field: "validation",
      headerName: "Validation",
      width: 250,
      renderCell: (params) => (
        <IconButton onClick={() => handleValidateRow(params.row)}>
          <CheckCircle color="#999999" />
        </IconButton>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      concerned: "Manel",
      type: "Mariage",
      date: "2024-02-20",
      amount: 1000,
      validated: true,
    },
    {
      id: 2,
      concerned: "Manl",
      type: "Mariage",
      date: "2024-02-20",
      amount: 1000,
      validated: false,
    },
    {
      id: 3,
      concerned: "Manel",
      type: "Marge",
      date: "2024-02-20",
      amount: 1000,
      validated: true,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          sx={{
            textAlign: "center",
            color: "#00194f",
            border: "none",
            padding: "30px",
            fontSize: "15px",
          }}
        />
      </div>
      <ValidateDemandePopup
        openPopup={openPopup}
        handleClosePopup={handleClosePopup}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default DemandValid_Table;
