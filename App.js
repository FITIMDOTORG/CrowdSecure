import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [description, setDescription] = useState("");
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        const response = await axios.get("http://localhost:5000/reports");
        setReports(response.data);
    };

    const submitReport = async () => {
        const response = await axios.post("http://localhost:5000/report", { description });
        alert(`Report submitted! Threat Analysis: ${response.data.analysis}`);
        fetchReports();
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div>
            <h1>CrowdSecure</h1>
            <textarea
                placeholder="Describe the suspicious activity..."
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={submitReport}>Submit Report</button>
            <h2>Reported Threats</h2>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>
                        {report.description} - <strong>{report.analysis}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
