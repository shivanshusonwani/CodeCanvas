import { createContext, useContext, useEffect, useState } from "react";
import API from "../api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const checkLoggedIn = async () => {
			try {
				const res = await API.get("/auth/me");
				setUser(res.data.user);
			} catch (error) {
				setUser(null);
			}
		};

		checkLoggedIn();
	}, []);

	const signup = async (name, email, password) => {
		await API.post("/auth/signup", { name, email, password });

		return {
			success: true,
		};
	};

	const login = async (email, password) => {
		await API.post("/auth/login", { email, password });

		const res = await API.get("/auth/me");
		setUser(res.data.user);
		return {
			success: true,
		};
	};

	const logout = async () => {
		await API.post("/auth/logout");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, signup, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
