import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { SpinnerLoader } from "../../../components/ui/spinnerLoader";
import { logout } from "../../../store/users";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return <SpinnerLoader />;
};

export default Logout;
