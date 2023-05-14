
import coverImage from "../../assets/cover.png";
import profileImage from "../../assets/profile.png";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetPostQuery } from "../../store/services/postApi";
import { coverModel, profileModel } from "../../store/features/AuthSlice";
import { useGetUserQuery } from "../../store/services/authApi";
import ProfileInfoLoding from "../../components/ProfileInfoLoding";

const ProfileInfo = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const id = user?.user?._id;
  const { data } = useGetPostQuery(id);
  const { data: userData, isLoading: loding } = useGetUserQuery(id);

  if(loding) return <ProfileInfoLoding/>
  return (
    <div className="shadow-xl border border-gray-300 rounded dark:border-gray-700">
      <div className="relative text-center">
        <div className="">
         {userData?.cover ? <img
            src={userData?.cover}
            alt="cover-photo"
            className="w-full h-[200px] object-cover"
          />: <img
          src={coverImage}
          alt="cover-photo"
          className="w-full h-[200px] object-cover"
        /> } 
          <div
            className="absolute top-2 right-2 text-white text-xl cursor-pointer"
            onClick={() => dispatch(coverModel(true))}
          >
            <FaEdit />
          </div>
        </div>
       {userData?.profile ? <img
          src={userData?.profile}
          alt="proifle-photo"
          className="w-[200px] h-[200px] rounded-full object-cover absolute bottom-[-100px] left-[50%] translate-x-[-50%]"
        />: <img
        src={profileImage}
        alt="proifle-photo"
        className="w-[200px] h-[200px] rounded-full object-cover absolute bottom-[-100px] left-[50%] translate-x-[-50%]"
      />} 
      </div>
      <div className="mt-[120px] flex justify-between text-center">
        <div className="border border-gray-300 dark:border-gray-600 flex-1 font-medium text-green-500 py-2">
          <h4 className="text-black/80 font-bold dark:text-gray-500 ">Flower</h4>
          {userData?.followers?.length}
        </div>
        <div className="border border-gray-300 dark:border-gray-600  flex-1 font-medium text-green-500 py-2">
          <h4 className="text-black/80 font-bold dark:text-gray-500 ">Flowering</h4>
          {userData?.followings?.length}
        </div>
        <div className="border border-gray-300 dark:border-gray-600  flex-1 font-medium text-green-500 py-2">
          <h4 className="text-black/80 font-bold dark:text-gray-500 ">Total Post</h4>
          {data?.length}
        </div>
      </div>
      <div className=" py-5 px-4">
        <h1 className="text-3xl font-medium text-green-500 mb-2 dark:text-gray-500 ">
          {userData?.name}
        </h1>
        <h1 className="text-md font-medium text-black mb-1 dark:text-gray-500 ">
          {userData?.email}
        </h1>
        <h3 className="text-md font-medium text-black mb-1 dark:text-gray-500 ">
         {userData?.address} 
        </h3>
        <h5 className="text-md font-medium text-black dark:text-gray-500 "> {userData?.city}</h5>
        <h5 className="text-md font-medium text-black dark:text-gray-500 "> {userData?.status}</h5>
        

        <button onClick={()=>dispatch(profileModel(true))} className="bg-green-500 dark:bg-gray-700 w-full block mt-4 text-white py-2 rounded font-medium">
         Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
