  import React, { useState, useEffect } from "react";
  import { DataGrid } from "@mui/x-data-grid";
  import { IconButton } from "@mui/material";
  import { CheckCircle } from "@mui/icons-material";
  import ValidateDemandePopup from "../popups/ValidateDemandePopup";
  import "../../Styles/tables/DataGrid.css";
  import axios from "axios";

  const LoanValid_Table = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rows, setRows] = useState([]);

    const handleClosePopup = () => {
      setOpenPopup(false);
    };

    const handleValidateRow = (row) => {
      setSelectedRow(row);
      setOpenPopup(true);
    };

    useEffect(() => {
      getLoan_Data();
    }, []);

    const getLoan_Data = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/Laonapproved");
        const data = response.data;
        console.log("Laonapproved:",data)
        const rowData = data.map((loanValidInfo) => ({
          id: loanValidInfo._id,
          concerned: `${loanValidInfo.employeeId.familyName} ${loanValidInfo.employeeId.firstName}`,
          date: new Date(loanValidInfo.creationDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          amount: loanValidInfo.amount,
          categorie: loanValidInfo.categorie,
          files: loanValidInfo.files,
        }));
        setRows(rowData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const columns = [
      { field: "concerned", headerName: "Concerné", width: 315 },
      { field: "date", headerName: "Date d'envoi", width: 315 },
      { field: "amount", headerName: "Somme", width: 315 },
      {
        field: "validation",
        headerName: "Validation",
        width: 250,
        renderCell: (params) => (
          <IconButton onClick={() => handleValidateRow(params.row)}>
            <CheckCircle color="primary" />
          </IconButton>
        ),
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

  export default LoanValid_Table;
