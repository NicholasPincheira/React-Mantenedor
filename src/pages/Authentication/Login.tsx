import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="block w-full mb-4 p-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full mb-4 p-2 rounded bg-gray-700 text-white"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                >
                    Login
                </button>
                <div className="mt-4 text-center">
                    <p>
                        No tiene cuenta?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Registrate
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};


export default Login;
