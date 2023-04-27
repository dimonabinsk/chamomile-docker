import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RegisterForm, LoginForm } from "../../../components/form";

const Login = () => {
  const { type } = useParams();
  const history = useHistory();
  const [typeForm, setTypeForm] = useState(
    type === "register" ? type : "login"
  );

  useEffect(() => {
    history.push(`/login/${typeForm}`);
  }, [history, typeForm]);

  const toggleFormType = () => {
    setTypeForm((prev) => (prev === "register" ? "login" : "register"));
  };
  return (
    <>
      <div className="relative top-[63px] mx-4 flex flex-col items-center lg:top-[100px] lg:mx-8">
        {typeForm === "register" ? (
          <>
            <RegisterForm onToggleForm={toggleFormType} />
          </>
        ) : (
          <>
            <LoginForm onToggleForm={toggleFormType} />
          </>
        )}
      </div>
    </>
  );
};

export default Login;
