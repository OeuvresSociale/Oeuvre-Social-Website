// import React, { useEffect, useState } from "react";
// import "../../Styles/tables/DataGrid.css";
// import { DataGrid } from "@mui/x-data-grid";
// import { Avatar, Container } from "@mui/material";


// const transactions_Table = () => {
//   {
//     /*const [data, setData] = useState([]);
//   const getTrans_Data = async () => {
//     await axios
//       .get("http://localhost:8000/api/Transactions")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//     useEffect(() => {
//         getTrans_Data();
//     }, []);
//     //test in console
//     console.log(data);

//     const columns = [
//         { field: "concerné", headerName: "Concerné", width: 90 },
//         { field: "type", headerName: "type", width: 150 },
//         { field: "Date", headerName: "Date d'envoi", width: 150 },
//         { field: "Somme", headerName: "Somme", width: 150 },
//         { field: "pdf", headerName: "pdf", width: 150 },
//     ];

//     const rows = data.map((transaction) => {
//         return {
//             id: transaction._id,
//             conerné: transaction.conerné,
//             type: transaction.type,
//             Date: transaction.Date,
//             Somme: transaction.Somme,
//             pdf: transaction.pdf,
//         };
//     */
//   }
//   const rows = [
//     {
//       id: 1,
//       conerné: "Manel",
//       type: "Mariage",
//       Date: "2024-02-20",
//       Somme: 1000,
//       pdf: "pdf",
//     },
  
//   ];

//   const columns = [
//     { field: "conerné", headerName: "Concerné", width: 280 },
//     { field: "type", headerName: "type", width: 280, type: "singleSelect" },
//     { field: "Date", headerName: "Date d'envoi", width: 280 },
//     { field: "Somme", headerName: "Somme", width: 280 },
//     {
//       field: "pdf",
//       headerName: "pdf",
//       width: 280,
//       renderCell: (params) => <Avatar src="params.row.data" />,
//       sortable: false,
//       filterable: false,
//     },
//   ];

//   return (
  
//       <DataGrid
//         autoHeight
//         rowsPerPageOptions={[5, 10, 20]}
//         pagination
//         rows={rows}
//         columns={columns}
//         sx={{
//           textAlign: "center",
//           color: "#00194f",
//           border: "none",
//           padding: "30px",
//           fontSize: "15px",
//         }}
       
//       />

//   );
// };

// export default transactions_Table;
// import React, { useState, useEffect } from "react";
// import { Grid, TextField, Button, Typography } from "@mui/material";
// import "./Transaction_form.css";
// import axios from "axios"; // Import Axios library
// import { InsertDriveFiles } from "@mui/icons-material";

// const Transaction_form = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     date: "",
//     Amount: "",
//     categorie: "",
//     files: null,
//   });
//         // id: transaction._id,
//         // name: transaction.name,
//         // type: transaction.type,
//         // date: transaction.date,
//         // Amount: transaction.Amount,
//         // categorie: transaction.categorie,
//         // filess: transaction.filess,

//   useEffect(() => {
//       const submitForm = async () => {
//         if (formData.name && formData.type && formData.date && formData.Amount && formData.categorie && formData.files) {
//           try {
//             const response = await axios.post("http://localhost:8000/api/RequestyAll", formData);
//             console.log("Form li submitinaha:", response.data);
//             // Supprimer form data after successful submission
//             setFormData({
//               name: "",
//               type: "",
//               date: "",
//               Amount: "",
//               categorie: "",
//               files: null,
//             });
//             alert("Transaction saved successfully");
//           } catch (error) {
//             console.error("Error submitting form:", error);
//             alert("Failed to save transaction. Please try again.");
//           }
//         }
//       };

//       submitForm();
//     }, [formData]);

//   const handleChange = (e) => {
//     const { name, value, filess } = e.target;
//     setFormData({
//       ...formData,
//       [name]: filess ? filess[0] : value,
//     });
  
//     if (name === 'files') {
//       const filesName = filess[0].name;
//       document.querySelector('.files-text').textContent = filesName;
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: "",
//       type: "",
//       date: "",
//       Amount: "",
//       categorie: "",
//       files: null,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // check if all fields are filled
//     const isFormValid = Object.values(formData).every((value) => !!value);

//     if (isFormValid) {
//       // Submit the form
//       console.log("info of the form submitted:", formData);
//     } else {
//       alert("Please fill in all fields.");
//     }
//   };

//   return (
//     <form className="transaction-form" onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid>
//           <Typography
//             variant="h4"
//             component="h4"
//             sx={{
//               textAlign: "left",
//               mt: 3,
//               mb: 3,
//               color: "#148582",
//               margin: "20px",
//             }}
//           >
//             Ajouter une transaction:
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Concerné"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Type"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Date"
//             name="date"
//             type="date"
//             value={formData.date}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Somme"
//             name="Amount"
//             value={formData.Amount}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             select
//             label="categorie"
//             name="categorie"
//             value={formData.categorie}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             SelectProps={{
//               native: true,
//             }}
//             required
//           >
//             <option value=""></option>
//             <option value="sortant">Sortant</option>
//             <option value="entrant">Entrant</option>
//           </TextField>
//         </Grid>
//         <Grid item xs={12}>
//           <div className="pdf-field">
//             <label className="files-label">
//               <input
//                 type="files"
//                 accept=".pdf"
//                 name="files"
//                 onChange={handleChange}
//                 required
//                 className="files-input"
//               />
//               <span className="files-icon">
//                 <InsertDriveFiles />
//               </span>
//               <span className="files-text">Importer Le récépissé de dépot</span>
//             </label>
//           </div>
//         </Grid>
//         <Grid item xs={12}>
//           <Grid container justifyContent="flex-end" spacing={2}>
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleCancel}
//               >
//                 Annuler
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="contained" color="primary" type="submit">
//                 Valider
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default Transaction_form;
