import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css"; // Import styles
import "../utils/api";
import axios from "axios";

const API_URL = "https://reqres.in/api"

const LoginPage = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        console.log(response.status);
        const data = response.data
        console.log(data)
        if (response.status==200) {
            login(data.token); 
            console.log(localStorage.getItem("token"))
          } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input className="input_email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;