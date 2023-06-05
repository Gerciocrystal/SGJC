import Hero from "../componects/HomePage/Hero";
import { Container } from "@chakra-ui/react";
import Sobre from "../componects/HomePage/Sobre";
import Contact from "../componects/HomePage/Contact";
import Footer from "../componects/HomePage/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      if (user.type === "ADMIN") {
        navigate("/admin/home");
      } else navigate("/user/home");
    }
  }, [navigate]);
  return (
    <Container maxW="100%" p={0}>
      <Hero />
      <Sobre />
      <Contact />
      <Footer />
    </Container>
  );
};
export default Home;
