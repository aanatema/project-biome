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
				await authApi.post("/refresh");
				const response = await userApi("/current_user");

				setUser(response.data);
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

			setUser(response.data.user);
			console.log(response.data.user);
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
			// send a disconnect request
			await userApi.post("/logout_user");
			// delete the user from the context
			setUser(null);
			toast.info("You have been disconnected", { duration: 4000 });
		} catch (error) {
			console.error("Error during logout", error);
			toast.error("Disconnection failed", { duration: 4000 });
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
