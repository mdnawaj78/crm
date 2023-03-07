import React, { useState, useEffect } from "react";
import styles from "./Crm.module.css";
import { Link } from "react-router-dom";
import axios from "axios";  


const Crm = () => {
  const [tableData, setTableData] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedDateOption, setSelectedDateOption] = useState("");
  const [selectedSourceOption, setSelectedSourceOption] = useState("");
  const [selectedStatusOption, setSelectedStatusOption] = useState("");   

  useEffect(() => {
    axios
      .get("http://localhost/crm/tabledata.php")
      .then((response) => {
        console.log(response.data.data);
        setTableData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredTableData = tableData.filter(
    (data) =>
      data.status.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.phone.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.country.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.interest.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.source.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.created_at.toLowerCase().includes(globalSearch.toLowerCase()) ||
      data.remarks.toLowerCase().includes(globalSearch.toLowerCase())
  ).filter(data => {
    if (selectedDateOption === "") {
      return true;
    } else if (selectedDateOption === "new") {
      // Filter data for new leads created in the last 7 days
      const today = new Date();
      const leadDate = new Date(data.created_at);
      const diffTime = Math.abs(today - leadDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    } else if (selectedDateOption === "seven") {
      // Filter data for leads in progress (created 7 to 30 days ago)
      const today = new Date();
      const leadDate = new Date(data.created_at);
      const diffTime = Math.abs(today - leadDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 7 && diffDays <= 30;
    } else if (selectedDateOption === "thirty") {
      // Filter data for closed leads (created more than 30 days ago)
      const today = new Date();
      const leadDate = new Date(data.created_at);
      const diffTime = Math.abs(today - leadDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 30;
    }
  }).filter(data => {
    if (selectedSourceOption === "") {
      return true;
    } else {
      return data.source.toLowerCase() === selectedSourceOption.toLowerCase();
    }
  }).filter(data => {
    if (selectedStatusOption === "") {
      return true;
    } else {
      return data.status.toLowerCase() === selectedStatusOption.toLowerCase();
    }
  });
  
    
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <input
            type="text"
            placeholder="Global Search"
            name="globlsearch"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>
        <div className={styles.right}>
          <select
            value={selectedDateOption}
            onChange={(e) => setSelectedDateOption(e.target.value)}
          >
            <option value="">Date</option>
            <option value="new">last 7 days</option>
            <option value="seven">7 to 30 days</option>
            <option value="thirty">30 days</option>
          </select>
          <select
             value={selectedSourceOption}
             onChange={(e) => setSelectedSourceOption(e.target.value)}
          >
            <option value="" >
              Source
            </option>
            <option value="tiktok">Tiktok</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
          </select>
          <select 
            value={selectedStatusOption}
            onChange={(e) => setSelectedStatusOption(e.target.value)}
          >
            <option value="" >
              Status
            </option>
            <option value="new">New</option>
            <option value="Connected">Contacted</option>
            <option value="Not_Interested">Not Contactedr</option>
          </select>
          <button className={styles.NewLead_button}>
            <Link to="/newlead" className={styles.linkb}>
              New Lead
            </Link>
          </button>
        </div>
      </div>
      {/* Table start from here */}
      <div className={styles.table_wrapper}>
        <table className={styles.responsive_table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Interest</th>
              <th>Source</th>
              <th>Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((data, index) => (
              <tr key={index}>
                <td style={{borderLeft: data.status.toLowerCase() === "connected" ? "8px solid pink" : data.status.toLowerCase() === "new" ? "8px solid lightgreen" : "8px solid #E75480"}}>
                  <span className={styles.color}></span> {data.status}
                </td>
                <td>{data.email}</td>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.country}</td>
                <td>{data.interest}</td>
                <td>{data.source}</td>
                <td>{data.created_at}</td>
                <td>{data.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card for Mobile friendly */}
      <div className={styles.cardsection}>
      {tableData.map((data, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.column}>
            <div className={styles.cardContent}>
              <p>
                <strong>Status:</strong>{" "}
              </p>
              <p>{data.status}</p>
            </div>
            <div className={styles.cardContent}>
              <p>
                <strong>Name:</strong>
              </p>
              

              <p>{data.name}</p>
            </div>
            <div className={styles.cardContent}>
              <p>
                <strong>Email:</strong>
              </p>
              <p>{data.email}</p>
            </div>
            <div className={styles.cardContent}>
              <p>
                <strong>Phone:</strong>
              </p>
              <p>{data.phone}</p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.cardContent}>
              <p>
                <strong>Country:</strong>
              </p>
              <p>{data.country}</p>
            </div>
            <div className={styles.cardContent}>
              <p>
                <strong>Interest:</strong>{" "}
              </p>
              <p>{data.interest}</p>
            </div>
            <div className={styles.cardContent}>
              <p>
                <strong>Source:</strong>
              </p>
              <p>{data.source}</p>
            </div>

            <div className={styles.cardContent}>
              <p>
                <strong>Date:</strong>{" "}
              </p>
              <p>{data.created_at}</p>
            </div>
          </div>
          <div className={styles.cardContent}>
            <p>
              <strong>Remarks:</strong>  
            </p>
            <p>{data.remarks}</p>
          </div>
        </div>
          ))}
      </div>
    </>
  );
};

export default Crm;
