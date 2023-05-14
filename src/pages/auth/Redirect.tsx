import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVarefiedEmailMutation } from "../../store/services/authApi";
import toast from "react-hot-toast";

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const [varefaiEmail, { isLoading, isSuccess, error }] =
    useVarefiedEmailMutation();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      varefaiEmail({ token });
    }
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      toast.success("Email varefacation successful");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      navigate("/reguster");
      toast.error("something went wrong");
    }
  }, [error]);

  if (isLoading)
    return <h1 className="text-center font-xl font-semibold">Loading...</h1>;

  return <div></div>;
};

export default Redirect;
