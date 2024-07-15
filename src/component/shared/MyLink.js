import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyLink({ to, children }) {
  const navigate = useNavigate();
  return (
    <div
      className="my-1"
      onClick={() => {
        navigate(to);
      }}
    >
      {children}
    </div>
  );
}
