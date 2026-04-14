import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await API.get("/appointments/my");
            setAppointments(res.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "booked":
                return "bg-blue-900 text-blue-200";
            case "completed":
                return "bg-green-900 text-green-200";
            case "cancelled":
                return "bg-red-900 text-red-200";
            default:
                return "bg-gray-700 text-gray-200";
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="card">
                    <h2 className="text-4xl font-bold">📅 My Appointments</h2>
                    <p className="text-gray-400 mt-2">Track and manage your scheduled appointments</p>
                </div>

                {/* Appointments List */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-400 text-lg">No appointments scheduled yet</p>
                        <p className="text-gray-500 text-sm mt-2">Book an appointment with a doctor from the Dashboard</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((a) => (
                            <div key={a._id} className="card group hover:shadow-xl">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-lg">
                                                👨‍⚕️
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">
                                                    Dr. {a.doctorId?.name || "Doctor"}
                                                </p>
                                                <p className="text-blue-400 text-sm">{a.doctorId?.specialization || "Healthcare Provider"}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                            <div>
                                                <p className="text-gray-400">📅 Date</p>
                                                <p className="text-white font-medium">{new Date(a.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">🕐 Time</p>
                                                <p className="text-white font-medium">{a.time}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(a.status)}`}>
                                            {a.status || "Pending"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}