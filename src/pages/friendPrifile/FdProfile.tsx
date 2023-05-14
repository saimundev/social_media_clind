
import FdLeft from "./FdLeft";
import FdCenter from "./FdCenter";
import FdRight from "./FdRight";
import Container from "../../components/Container";
import Header from "../../components/Header";

const FdProfile = () => {
  return (
    <div className="">
      <Header />

      <Container>
        <div className="grid grid-cols-[350px_1fr_300px] gap-6 mt-6">
          <FdLeft />
          <FdCenter />
          <FdRight />
        </div>
      </Container>
    </div>
  );
};

export default FdProfile;
