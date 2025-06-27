import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

type User = {
	id: string;
	username: string;
	email: string;
};

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const res = await fetch(
					"http://localhost:3000/users/current_user",
					{
						credentials: "include",
					}
				);
				if (!res.ok) throw new Error("Not authenticated");

				const data = await res.json();
				setUser(data);
            } catch (err) {
                console.error("Failed to fetch current user:", err);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchCurrentUser();
	}, []);

	const login = async (email: string, password: string) => {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:3000/users/login_user", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) throw new Error("Login failed");
			const data = await res.json();
			setUser(data);
			return true;
        } catch (err) {
            console.error("Login error:", err);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
