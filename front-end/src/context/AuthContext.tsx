import { createContext } from "react";

type User = {
	id: string;
	username: string;
	email: string;
};

export type AuthContextType = {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
