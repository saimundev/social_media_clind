
import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Container from "../components/Container";

const Setting = () => {
  return (
    <div className="">
      <Header />
      <Container>
        <div className="grid grid-cols-[250px_auto]">
          <div className="">
            <Link
              to="/setting/reset-password"
              className="block bg-green-500 dark:bg-gray-700 dark:text-gray-300 p-3 text-white rounded font-medium mt-4"
            >
              Reset Password
            </Link>
            <Link
              to="/setting/theme"
              className="block bg-green-500 dark:bg-gray-700 dark:text-gray-300 p-3 text-white rounded font-medium mt-4"
            >
              Dark Theme
            </Link>
            <Link
              to="/setting/delete-account"
              className="block bg-green-500 dark:bg-gray-700 dark:text-gray-300 p-3 text-white rounded font-medium mt-4"
            >
              Delete Account
            </Link>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Setting;
