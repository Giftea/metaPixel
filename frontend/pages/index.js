import Hero from "../components/HomePage/Hero";
import InfinitePhotos from "../components/HomePage/InfinitePhotos";
import Navbar from "../components/Layout/Navbar";

export default function Home() {
  return (
    <div className=" body">
      <Navbar/>
      <Hero />
      <InfinitePhotos />
    </div>
  );
}
