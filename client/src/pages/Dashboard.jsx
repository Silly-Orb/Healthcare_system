import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Dashboard() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const res = await API.get("/profile/doctors");
            setDoctors(res.data);
        } catch (err) {
            console.error("Error fetching doctors:", err);
        } finally {
            setLoading(false);
        }
    };

    const book = async (doctorId) => {
        try {
            await API.post("/appointments/book", {
                doctorId: doctorId,
                date: new Date().toISOString().split("T")[0],
                time: "10:00 AM"
            });

            alert("Booked!");
        } catch (err) {
            console.log(err.response?.data); // 🔥 THIS IS KEY
            alert("Error booking appointment");
        }
    };

    return (
        <Layout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="card">
                    <h2 className="text-4xl font-bold mb-2">Welcome back, <span className="text-gradient">{user.name}</span></h2>
                    <p className="text-gray-400">Find and book appointments with healthcare professionals</p>
                </div>

                {user.role === "patient" && (
                    <>
                        {/* 📊 STATS SECTION (ADD THIS HERE) */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="card text-center">
                                <p className="text-gray-400">Total Doctors</p>
                                <h3 className="text-3xl font-bold">{doctors.length}</h3>
                            </div>

                            <div className="card text-center">
                                <p className="text-gray-400">Appointments</p>
                                <h3 className="text-3xl font-bold">--</h3>
                            </div>

                            <div className="card text-center">
                                <p className="text-gray-400">Health Status</p>
                                <h3 className="text-3xl font-bold text-green-400">Good</h3>
                            </div>
                        </div>

                        {/* 👨‍⚕️ DOCTORS SECTION */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                👨‍⚕️ Available Doctors
                            </h3>

                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                            ) : doctors.length === 0 ? (
                                <div className="card text-center py-12">
                                    <p className="text-gray-400 text-lg">No doctors available at the moment</p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {doctors.map((doc) => (
                                        <div key={doc._id} className="card group hover:scale-[1.02] transition-transform">
                                            <div className="flex items-center gap-4 mb-4">

                                                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-xl">
                                                    👨‍⚕️
                                                </div>

                                                <div>
                                                    <p className="text-lg font-bold">{doc.userId.name}</p>
                                                    <p className="text-blue-400 text-sm">{doc.specialization}</p>
                                                </div>

                                            </div>

                                            <button
                                                className="btn-primary w-full"
                                                onClick={() => book(doc.userId)}
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {user.role === "doctor" && (
                    <div className="card text-center py-12">
                        <h3 className="text-2xl font-bold mb-2">Doctor Dashboard</h3>
                        <p className="text-gray-400">View your appointments in the Appointments section</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}