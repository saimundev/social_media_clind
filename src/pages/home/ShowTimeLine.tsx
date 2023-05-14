
import { useAppSelector } from "../../store/hooks";
import {
  useGetTimelinePostQuery,
} from "../../store/services/postApi";
import Cart from "../../components/Cart";
import CartLoding from "../../components/CartLoding";
const ShowTimeLine = () => {
  const { user } = useAppSelector((state) => state.auth);
  const id = user?.user?._id;
  const { data, isLoading, error } = useGetTimelinePostQuery(id);

  if (isLoading) return <CartLoding/>
  return (
    <div className="mt-10">
      {error
        ? "error"
        : data?.length
        ? data.map((post: any) => <Cart post={post} key={post._id} />)
        : <div className="text-center font-semibold text-lg">No Post Yet</div> }
    </div>
  );
};

export default ShowTimeLine;
