import React, { useState } from "react";
import'../../Addemployee.css';

import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";

const Transaction = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: "John", surname: "Doe", type: 1, date: "2021-09-01", amount: 1000, pdf: "pdf" },
  ])
  const columns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Surname", field: "surname" },
    { title: "Type", field: "type", type: "numeric" },
    { title: "Date", field: "date", type: "date" },
    { title: "Amount", field: "amount", type: "numeric"},
    { title: "Pdf", field: "pdf"},  
  ];
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
          <div className="container">
                  {/* <MUIDataTable
                    columns={columns}
                    data={tableData}
                  /> */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
