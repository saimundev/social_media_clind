import {
  useGetPostQuery,
} from "../../store/services/postApi";

import { useGetUserQuery } from "../../store/services/authApi";
import { useParams } from "react-router-dom";
import CartLoding from "../../components/CartLoding";
import FriendCart from "../../components/FriendCart";



const FdCenter = ()=> {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPostQuery(id);
  const {data:userData} = useGetUserQuery(id)


  if (isLoading) return <CartLoding/>
  return (
    <div className="mb-10">
      {error
        ? "error"
        : data?.length
        ? data?.map((post:any) => (
            <FriendCart post={post} userData={userData}/>
          ))
        : <div className="text-center text-lg font-medium">No Post Yet</div> }
    </div>
  );
};

export default FdCenter;
