import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logOUt } from "../store/features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../store/services/authApi";

const Header = () => {
  
  const [showDropDown, setShowDropDown] = useState(false);
  const { user } = useAppSelector(state =>state.auth);
  const id = user?.user?._id;
  const { data} = useGetUserQuery(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logOUt());
    navigate("/login");
  };
  return (
    <div className="bg-green-500 dark:bg-gray-800">
      <Container>
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">BEZZY</div>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="py-4 px-2 block text-white text-md">
                Home
              </Link>
            </li>

            <li className="relative">
              <span
                onClick={() => setShowDropDown((prev) => !prev)}
                className="w-[45px] h-[45px] rounded-full border border-white flex justify-center items-center cursor-pointer text-white font-semibold"
              >
              {data?.profile ?  <img src={data?.profile} alt="" className="w-[45px] h-[45px] rounded-full object-cover"/> : <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center text-xl">{data?.name?.slice(0,1)}</div> } 
              </span>

              {/* drow down */}
              {showDropDown && (
                <div className="bg-white dark:bg-gray-700  absolute top-[120%] border border-gray-300 shadow-xl left-[50%] translate-x-[-50%] w-[150px] text-center divide-y divide-gray-300 rounded">
                  <div className="">
                    <Link
                      to="/profile"
                      className="text-black dark:text-gray-300 p-2 block hover:bg-green-500 hover:text-white duration-300"
                    >
                      Profile
                    </Link>
                  </div>
                  <div className="">
                    <Link
                      to="/setting/setting-page"
                      className="text-black dark:text-gray-300 p-2 block hover:bg-green-500 hover:text-white duration-300"
                    >
                      setting
                    </Link>
                  </div>
                  <div className="" onClick={logOut}>
                    <Link
                      to="#"
                      className="text-black p-2 dark:text-gray-300 block hover:bg-green-500 hover:text-white duration-300"
                    >
                      LogOut
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
