
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartLoding = () => {
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <Skeleton
          height="40px"
          width="40px"
          highlightColor="#C0C0C0"
          className="rounded-full"
        />
        <div className="">
          <Skeleton
            height="15px"
            width="250px"
            highlightColor="#C0C0C0"
            className="mt-4"
          />
          <Skeleton
            height="10px"
            width="150px"
            highlightColor="#C0C0C0"
            className="mt-2"
          />
        </div>
      </div>
      <Skeleton
        height="15px"
        width="350px"
        highlightColor="#C0C0C0"
        className="mt-4"
      />
      <Skeleton height="300px" highlightColor="#C0C0C0" className="mt-4" />




      <div className="flex items-center gap-4 mt-10">
        <Skeleton
          height="40px"
          width="40px"
          highlightColor="#C0C0C0"
          className="rounded-full"
        />
        <div className="">
          <Skeleton
            height="15px"
            width="250px"
            highlightColor="#C0C0C0"
            className="mt-4"
          />
          <Skeleton
            height="10px"
            width="150px"
            highlightColor="#C0C0C0"
            className="mt-2"
          />
        </div>
      </div>
      <Skeleton
        height="15px"
        width="350px"
        highlightColor="#C0C0C0"
        className="mt-4"
      />
      <Skeleton height="300px" highlightColor="#C0C0C0" className="mt-4" />
    </div>
  );
};

export default CartLoding;
