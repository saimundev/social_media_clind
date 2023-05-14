import React from "react";
import { useAppSelector } from "../../store/hooks";
import {
  useGetPostQuery,
} from "../../store/services/postApi";
import { useGetUserQuery } from "../../store/services/authApi";
import CartLoding from "../../components/CartLoding";
import ProfileCart from "../../components/ProfileCart";

const ShowPost = ({
  setShow,
  feachId,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  feachId: (postId: number) => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const id = user?.user?._id;
  const { data, isLoading, error } = useGetPostQuery(id);
  const { data: userData } = useGetUserQuery(id);
  console.log("profile", data);



  if (isLoading) return <CartLoding />;
  return (
    <div className="mb-10">
      {error
        ? "error"
        : data?.length
        ? data?.map((post: any) => (
          <ProfileCart post={post} userData={userData} setShow={setShow} feachId={feachId}/>
          ))
        : <div className="text-center font-semibold text-lg">No Post Yet</div>}
    </div>
  );
};

export default ShowPost;
