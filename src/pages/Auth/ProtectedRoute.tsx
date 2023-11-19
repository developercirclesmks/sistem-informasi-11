import { User, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { auth as firebaseAuth } from "../../config/firebase-config";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user: User | null) => {
      setAuthUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !authUser ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};