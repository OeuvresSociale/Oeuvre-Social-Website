import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box, Typography} from "@mui/material";
import axios from "axios";

const transactions_Table = () => {
  {
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
    //test in console
    console.log(data);

    const columns = [
        { field: "concerné", headerName: "Concerné", width: 90 },
        { field: "type", headerName: "type", width: 150 },
        { field: "Date", headerName: "Date d'envoi", width: 150 },
        { field: "Somme", headerName: "Somme", width: 150 },
        { field: "pdf", headerName: "pdf", width: 150 },
    ];

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
  }
  const rows = [
    {
      id: 1,
      conerné: "mohammed",
      type: "Mariage",
      Date: "2024-02-20",
      Somme: 1000,
      pdf: "pdf",
    },
    {
      id: 2,
      conerné: "mohammed",
      type: "Mariage",
      Date: "2024-02-20",
      Somme: 1000,
      pdf: "pdf",
    },
    {
      id: 3,
      conerné: "mohammed",
      type: "Mariage",
      Date: "2024-02-20",
      Somme: 3000,
      pdf: "pdf",
    },
    { id: 4 , conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 5, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 6, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 7, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 8, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 9, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 10, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 11, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 12, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 13, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 14, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 15, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 16, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 17, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 18, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 19, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 20, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf" },
    { id: 21, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 22, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 23, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 24, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 25, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 26, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 27, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    { id: 28, conerné: "mohammed", type: "Mariage", Date: "2024-02-20", Somme: 1000, pdf: "pdf"},
    
  ];

  const columns = [
    { field: "conerné", headerName: "Concerné", width: 90 },
    { field: "type", headerName: "type", width: 150 },
    { field: "Date", headerName: "Date d'envoi", width: 150 },
    { field: "Somme", headerName: "Somme", width: 150 },
    { field: "pdf", headerName: "pdf", width: 150 },
  ];

  return (
  <Box sx={{
    height: 400,
    width: '100%',
  }}>
      
      <DataGrid rows={rows} columns={columns} pageSize={10}   />
  </Box>
  );
};

export default transactions_Table;
