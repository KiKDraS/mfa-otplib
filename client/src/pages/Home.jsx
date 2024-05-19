import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Home = () => {
  const { userEmail } = useContext(AuthContext);
  return (
    <section className="container-fluid">
      <h1>Bienvenid@: {userEmail}</h1>
    </section>
  );
};
export default Home;
