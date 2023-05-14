import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto lg:px-10 md:px-6 px-4 ">{children}</div>;
};

export default Container;
