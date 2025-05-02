import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Afficher le contenu protégé si l'utilisateur est authentifié
  return <>{children}</>;
}
