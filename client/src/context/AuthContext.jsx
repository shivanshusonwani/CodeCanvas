import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const checkLoggedIn = async () => {
			try {
				const res = await API.get("/auth/me");
				setUser(res.data.user);
			} catch (error) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		checkLoggedIn();
	}, []);

	const signup = async (name, email, password) => {
		try {
			await API.post("/auth/signup", { name, email, password });
			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || "Signup failed",
			};
		}
	};

	const login = async (email, password) => {
		try {
			await API.post("/auth/login", { email, password });

			const res = await API.get("/auth/me");
			setUser(res.data.user);

			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				message:
					error.response?.data?.message || "Invalid credentials from react",
			};
		}
	};

	const logout = async () => {
		try {
			await API.post("/auth/logout");
		} catch (error) {
			console.error("Logout error:", error.response?.data?.message);
		} finally {
			setUser(null);
			navigate("/");
		}
	};

	return (
		<AuthContext.Provider value={{ user, signup, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
