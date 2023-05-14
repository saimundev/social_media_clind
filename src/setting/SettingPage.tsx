
import image from "../assets/setting.svg"

const SettingPage = () => {
  return (
    <div className="">
      <div className="mt-20 text-center text-3xl font-medium capitalize text-green-500">
        Welcome to Setting page
      </div>
      <p className="text-center text-gray-500 text-sm font-medium mt-4">This is a setting page. You can change and custome your profile.</p>
       <img src={image} alt="" className="h-[300px] mt-10 mx-auto" />
    </div>
  );
};

export default SettingPage;
