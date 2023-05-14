
import coverImage from "../../assets/cover.png";
import profileImage from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../store/services/authApi";
import { useAppSelector } from "../../store/hooks";
import ProfileInfoLoding from "../../components/ProfileInfoLoding";

const Left = () => {
  const { user } = useAppSelector(state =>state.auth);
  const id = user?.user?._id;
  const { data,isLoading } = useGetUserQuery(id);

  if(isLoading) return <ProfileInfoLoding/>
  return (
    <div className="shadow-xl border border-gray-300  dark:border-gray-700 rounded">
      <div className="relative text-center">
        {data?.cover ? <img
          src={data?.cover}
          alt="cover-photo"
          className="w-full h-[200px] object-cover"
        />: <img
        src={coverImage}
        alt="cover-photo"
        className="w-full h-[200px] object-cover"
      />} 
       {data?.profile ? <img
          src={data?.profile}
          alt="proifle-photo"
          className="w-[200px] h-[200px] rounded-full border border-white object-cover absolute bottom-[-100px] left-[50%] translate-x-[-50%]"
        /> : <img
        src={profileImage}
        alt="proifle-photo"
        className="w-[200px] h-[200px] rounded-full border border-white object-cover absolute bottom-[-100px] left-[50%] translate-x-[-50%]"
      />} 
      </div>
      <div className="mt-[100px] py-5 px-4">
        <h1 className="text-3xl font-medium text-green-500 dark:text-gray-500 mb-2">{data?.name}</h1>
        <h1 className="text-md font-medium text-black mb-1 dark:text-gray-500">{data?.email}</h1>
        <h3 className="text-md font-medium text-black mb-1 dark:text-gray-500">{data?.address}</h3>
        <h5 className="text-md font-medium text-black dark:text-gray-500">{data?.city}</h5>
        <h5 className="text-md font-medium text-black dark:text-gray-500">{data?.status}</h5>
        <Link to="/profile">
        <button className="border border-green-500 dark:hover:bg-gray-700 dark:text-gray-500 dark:border-gray-700 w-full block p-2 rounded text-sm font-medium mt-4 hover:bg-green-500 hover:text-white duration-300">Go Profile </button>
        </Link>
      </div>
    </div>
  );
};

export default Left;
