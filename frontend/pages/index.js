import Hero from "../components/Hero";
import InfinitePhotos from "../components/InfinitePhotos";
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
