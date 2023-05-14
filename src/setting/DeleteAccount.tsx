import { useEffect } from "react";
import { useDeleteAccountMutation } from "../store/services/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { logOUt } from "../store/features/AuthSlice";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const DeleteAccount = () => {
  const [removeAccount, { isSuccess, isLoading, error }] =
    useDeleteAccountMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error("Somethinge went weong");
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOUt());
      toast.success("Account Delete Successfull");
      navigate("/reguster");
    }
  }, [isSuccess]);

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.user?._id;
  const hanldeDelete = async () => {
   const result =  await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
  
    if(result.isConfirmed){
      await removeAccount({userId:userId})
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  };
  return (
    <div className="text-center mt-10">
      <h1 className="text-red-500 text-3xl font-bold mt-2">
        Delete Your Account
      </h1>
      <p className="text-red-500 mt-2 text-sm font-medium">
        If delete this account. you naver can back your account. And Remove all
        your data forever
      </p>
      <button
        onClick={hanldeDelete}
        className="bg-red-500 text-white rounded font-semibold  px-8 py-2 mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Pending..." : "Delete Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;
