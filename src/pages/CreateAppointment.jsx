import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import "../css/CreateAppointment.css"; // CSS file we will create

function CreateAppointment() {
    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        patientNom: "",
        patientEmail: "",
        dateRdv: "",
        description: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const rdv = {
            docteurId: Number(doctorId),
            patientNom: form.patientNom,
            patientEmail: form.patientEmail,
            dateRdv: form.dateRdv,
            description: form.description
        };

        api.post("/rdv-service/rdvs", rdv)
            .then(() => {
                alert("Appointment created successfully");
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                alert("Error creating appointment");
            });
    };

    return (
        <div className="appointment-container">
            <div className="appointment-card">
                <h2>Create Appointment</h2>
                <form onSubmit={handleSubmit} className="appointment-form">
                    <input
                        name="patientNom"
                        placeholder="Patient Name"
                        value={form.patientNom}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="patientEmail"
                        type="email"
                        placeholder="Patient Email"
                        value={form.patientEmail}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="dateRdv"
                        type="datetime-local"
                        value={form.dateRdv}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <button type="submit">Confirm Appointment</button>
                </form>
            </div>
        </div>
    );
}

export default CreateAppointment;
