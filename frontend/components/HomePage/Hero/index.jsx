import { heroText } from "../../../data";
import SearchForm from "../../InfinitePhotos/SearchForm";

const Hero = () => {
  return (
    <div className="hero-section px-20 py-8 text-[white] flex justify-center items-center">
      <div className="text-center py-20 my-14 w-4/5">
        <h1 className="text-6xl">{heroText.title}</h1>
        <p className="text-[#FFFFFF] my-8 font-thin mx-20 px-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          voluptatum explicabo libero obcaecati dolore quaerat molestiae
          debitis, quisquam cum corporis omnis, repudiandaequam porro! Quis
          eligendi officiis itaque assumenda accusantium?
        </p>
        <SearchForm />
      </div>
    </div>
  );
};

export default Hero;
