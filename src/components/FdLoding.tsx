
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FdLoding = () => {
  return (
    <div className="">
        <div className="grid grid-cols-2 gap-4">
            <Skeleton height="100px" highlightColor="#C0C0C0" count={2} className="mt-4"/>
            <Skeleton height="100px" highlightColor="#C0C0C0" count={2} className="mt-4"/>
        </div>
    </div>
  )
};

export default FdLoding;
