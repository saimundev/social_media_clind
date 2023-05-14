import { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const hanldeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold capitalize dark:text-gray-300">
        do you want to use dark theme
      </h1>
      <label
        
        className="relative inline-flex items-center cursor-pointer mt-6"
      >
        <input onClick={hanldeTheme} type="checkbox" value="" className="sr-only peer" />
        <div className="w-14 h-7 bg-green-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-green-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

export default Theme;
