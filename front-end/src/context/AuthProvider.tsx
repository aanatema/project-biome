import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import { authApi, userApi } from "@/libraries/axios";
import { toast } from "sonner";

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
		const fetchUserWithRefresh = async () => {
			try {
				const refreshResponse = await authApi.post("/refresh");
				const { token: accessToken } = refreshResponse.data;

				const response = await fetch(
					"http://localhost:3000/users/current_user",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				if (!response.ok) throw new Error("Not authenticated");

				const data = await response.json();
				console.log("Current user data:", data);
				setUser(data);
			} catch (err) {
				console.error("Failed to refresh token or fetch user:", err);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUserWithRefresh();
	}, []);

	const login = async (email: string, password: string) => {
		setLoading(true);
		try {
			const response = await userApi.post("/login_user", {
				email,
				password,
			});

			setUser(response.data);
			return true;
		} catch (err) {
			console.error("Login error:", err);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			await userApi.post("/logout_user"); // send a disconnect request
			setUser(null); // delete the user from the context
			toast.info("You have been disconnected", { duration: 3000 });
		} catch (error) {
			console.error("Error during logout", error);
			toast.error("Disconnection failed", { duration: 3000 });
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
