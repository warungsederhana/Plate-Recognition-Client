import CustomNavbar from "@/components/CustomNavbar";
import Welcome from "@/components/Welcome";
import Plate from "@/components/Plate";
import Tax from "@/components/Tax";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <Welcome />
      <Plate />
      <Tax />
      <Footer />
    </>
  );
}
