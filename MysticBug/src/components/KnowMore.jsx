import { FaLeaf } from "react-icons/fa";
import { images } from '../assets/assets';

const KnowMore = () => {
  return (
    <div className="px-4 md:px-12 lg:px-16 py-8 pb-20">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-serif font-normal text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-[120%] tracking-[-0.5px]">
          Know More, Worry Less.
        </h1>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
            Health <FaLeaf className="text-green-600" size={14} />
          </p>
          <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
            Care <FaLeaf className="text-green-600" size={14} />
          </p>
          <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
            Peace <FaLeaf className="text-green-600" size={14} />
          </p>
          <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
            Simplicity
          </p>
        </div>

        <p className="font-semibold text-sm md:text-base leading-[150%] max-w-5xl px-2 md:px-0">
          Learn about common conditions, their symptoms, and how to handle them —
          from heart attacks to fevers, all in one place.
        </p>
      </div>

      {/* Image */}
      <img
        src={images.banner}
        alt="Know More Banner"
        className="mx-auto mt-8 w-full max-w-7xl object-contain px-2 md:px-0"
      />
    </div>
  );
};

export default KnowMore;
