import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/DoctorsList.css";

function DoctorsList() {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/docteur-service/docteurs")
            .then(res => setDoctors(res.data._embedded.docteurs))
            .catch(err => console.error("Error loading doctors", err));
    }, []);

    const getIdFromLink = (doc) => doc._links.self.href.split("/").pop();

    return (
        <div className="doctors-container">
            <h2>Doctors List</h2>
            <table className="doctors-table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Speciality</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {doctors.map(doc => {
                    const id = getIdFromLink(doc);
                    return (
                        <tr key={id}>
                            <td>{doc.prenom}</td>
                            <td>{doc.nom}</td>
                            <td>{doc.specialite}</td>
                            <td>{doc.telephone}</td>
                            <td>{doc.email}</td>
                            <td>
                                <button
                                    className="btn-appointment"
                                    onClick={() => navigate(`/appointment/${id}`)}
                                >
                                    Make Appointment
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorsList;
