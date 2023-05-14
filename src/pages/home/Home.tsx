
import Left from "./Left";
import Container from "../../components/Container";
import Right from "./Right";
import Center from "./Center";
import Header from "../../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="grid grid-cols-[350px_3fr_250px] gap-6 mt-4">
          <div className=""><Left /></div>
          <Center />
          <Right />
        </div>
      </Container>
    </>
  );
};

export default Home;
