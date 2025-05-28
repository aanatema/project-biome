// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/current_user", {
          credentials: "include", // pour envoyer le cookie
        });
        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        console.log("Current user fetched:", data);
        setUser(data);
      } catch (err) {
        console.error("Error fetching current user:", err);
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
    const response = await fetch("http://localhost:3000/users/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // important pour les cookies
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const user = await response.json();
    console.log({user})
    setUser(user); // on stocke l'utilisateur dans le contexte
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    // Côté back : tu peux faire une route pour clear le cookie
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
