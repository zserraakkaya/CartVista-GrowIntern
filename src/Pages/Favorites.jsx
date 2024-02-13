import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Favorites = () => {
  // check if user signed in
  const { isAuthenticated } = useAuth();
  // navigate user to sign up page if user didnt sign in
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signinsignup");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <p>Your favorite items go here.</p>
    </div>
  );
};
