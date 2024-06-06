import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "../../Styles/tables/DataGrid.css";
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import Deleteuser from "../Deleteuser";
import Modefyuser from "../Modefyuser";

function EmployeeListTable() {
  const [editableRowId, setEditableRowId] = useState(null);
  const [editableRowData, setEditableRowData] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModefy, setOpenModefy] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1584252256,
      name: "John Doe",
      email: "john@gmail.com",
      salaire: 1000,
      role: "Manager",
    },
    {
      id: 245555527,
      name: "Jane Doe",
      email: "",
      salaire: 2000,
      role: "Employee",
    },
  ]);

  useEffect(() => {
    getEmployeeData();
  }, [rows]);

  const getEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/employees');
      const data = response.data;
      console.log("The data passed are here:", data);

      const rowData = data.map((employeeInfo) => ({
        _id: employeeInfo._id,
        id: employeeInfo.idEmployee,
        name: `${employeeInfo.familyName} ${employeeInfo.firstName}`,
        email: employeeInfo.email,
        salaire: employeeInfo.monthlySalary,
        role: employeeInfo.role,
      }));

      setRows(rowData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 const fetchEmployeeDetails = async (employeeId) => {
try {
  const response = await axios.get(`http://localhost:8000/api/employees/${employeeId}`
 // , { responseType: 'json', responseEncoding: 'utf8' }
  );
  setSelectedEmployee(response.data); // Assuming data is an object containing details of the selected employee
} catch (error) {
  console.error('Error fetching employee details:', error);
}
}

  const handleDetails = (id) => {
    fetchEmployeeDetails(id);
  };

  const handleEdit = (rowId) => {
    setEditableRowId(rowId);
    const editableRow = rows.find((row) => row.id === rowId);
    if (editableRow) {
      setEditableRowData(editableRow);
      fetchEmployeeDetails(editableRow._id);
      setOpenModefy(true);
    }
  };

  const handleDelete = (rowId) => {
    setEditableRowId(rowId);
    const editableRow = rows.find((row) => row.id === rowId);
    if (editableRow) {
      setEditableRowData(editableRow);
      fetchEmployeeDetails(editableRow._id);
      setOpenDelete(true);
    };
  }

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Employee", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "salaire", headerName: "Salaire", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "Details",
      headerName: "Details",
      width: 140,
      renderCell: (params) => (
        <IconButton onClick={() => handleDetails(params.row.id)}>
          <InfoIcon />
        </IconButton>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 140,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row.id)}>
          <Edit />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 140,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
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
      {console.log(selectedEmployee)}
      {openModefy && <Modefyuser closeModefy={setOpenModefy} selectedEmployee={selectedEmployee} />}
      {openDelete && <Deleteuser closeDelete={setOpenDelete} selectedEmployee={selectedEmployee} />}
    </div>
  );
}

export default EmployeeListTable;
