import React from "react";
import useUser from "../features/authentication/useUser";
import { styled } from "styled-components";
import Spinner from "./../ui/Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (!isAuthenticated) navigate("/login");

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
