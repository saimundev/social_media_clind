import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FdListLoding = () => {
  return (
    <div className="">
        <div className="">
            <Skeleton height="40px" highlightColor="#C0C0C0" count={5} className="mt-4"/>
        </div>
    </div>
  )
};

export default FdListLoding;
