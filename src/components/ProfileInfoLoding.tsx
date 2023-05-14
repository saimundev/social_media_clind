import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileInfoLoding = () => {
  return (
    <div className="">
        <div className="">
            <Skeleton height="200px" highlightColor="#C0C0C0"/>
        </div>
        <div className=" mt-6">
            <Skeleton height="25px" highlightColor="#C0C0C0" className="mt-2"/>
            <Skeleton height="15px" highlightColor="#C0C0C0" width="300px" className="mt-2"/>
            <Skeleton height="15px" highlightColor="#C0C0C0" width="200px" className="mt-2"/>
            <Skeleton height="15px" highlightColor="#C0C0C0" width="200px" className="mt-2"/>
        </div>
        <div className="mt-6">
            <Skeleton height="30px" highlightColor="#C0C0C0" className="mt-2"/>
            
        </div>
    </div>
  )
};

export default ProfileInfoLoding;
