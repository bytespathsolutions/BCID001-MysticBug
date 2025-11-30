import { images } from "../assets/assets";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <img
        src={images.page404}
        alt="Page not found"
        className="w-full h-[700px]"
      />
    </div>
  );
};

export default NotFound;
