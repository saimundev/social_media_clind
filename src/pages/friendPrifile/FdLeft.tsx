
import coverImage from "../../assets/cover.png";
import profileImage from "../../assets/profile.png";
import { useGetPostQuery } from "../../store/services/postApi";
import { useGetUserQuery } from "../../store/services/authApi";
import { useParams } from "react-router-dom";
import ProfileInfoLoding from "../../components/ProfileInfoLoding";

const FdLeft = () => {
    const { id } = useParams();
  const { data } = useGetPostQuery(id);
  const { data: userData, isLoading } = useGetUserQuery(id);

  if(isLoading) return <ProfileInfoLoding/>
  return (
    <div className="shadow-xl border border-gray-300 dark:border-gray-700 rounded">
      <div className="relative text-center">
        <div className="">
          <img
            src={userData?.cover ? userData?.cover : coverImage}
            alt="cover-photo"
            className="w-full h-[200px] object-cover"
          />
        </div>
        <img
          src={userData?.profile ? userData?.profile : profileImage}
          alt="proifle-photo"
          className="w-[200px] h-[200px] rounded-full object-cover absolute bottom-[-100px] left-[50%] translate-x-[-50%]"
        />
      </div>
      <div className="mt-[120px] flex justify-between text-center">
        <div className="border border-gray-300 dark:border-gray-700 flex-1 font-medium text-green-500 py-2">
          <h4 className="text-black/80 font-bold dark:text-gray-500">Flower</h4>
          {userData?.followers?.length}
        </div>
        <div className="border border-gray-300 dark:border-gray-700 flex-1 font-medium text-green-500 py-2">
          <h4 className="text-black/80 font-bold dark:text-gray-500">Flowering</h4>
         {userData?.followings?.length}
        </div>
        <div className="border border-gray-300 dark:border-gray-700 flex-1 font-medium text-green-500 py-2">
          <h4 className="text-black/80 font-bold dark:text-gray-500">Total Post</h4>
          {data?.length}
        </div>
      </div>
      <div className=" py-5 px-4">
        <h1 className="text-3xl font-medium text-green-500 mb-2 dark:text-gray-500">
          {userData?.name}
        </h1>
        <h1 className="text-md font-medium text-black mb-1 dark:text-gray-500">
          {userData?.email}
        </h1>
        <h3 className="text-md font-medium text-black mb-1 dark:text-gray-500">
         {userData?.address} 
        </h3>
        <h5 className="text-md font-medium text-black dark:text-gray-500"> {userData?.city}</h5>
        <h5 className="text-md font-medium text-black dark:text-gray-500"> {userData?.status}</h5>
        

        <button  className="bg-green-500 w-full block mt-4 dark:bg-gray-700 text-white py-2 rounded font-medium">
         Go Home Page
        </button>
      </div>
    </div>
  );
};

export default FdLeft;
