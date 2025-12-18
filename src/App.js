import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorsList from "./pages/DoctorsList";
import CreateAppointment from "./pages/CreateAppointment";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DoctorsList />} />
                <Route path="/appointment/:doctorId" element={<CreateAppointment />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
