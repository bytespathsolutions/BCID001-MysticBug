import Banner from "../components/Banner";
import { images, icons } from "../assets/assets";

const ContactUs = () => {
  return (
    <div>
      {/* Banner */}
      <Banner
        src={images.calling_1}
        text={"Contact Us"}
        para={
          "Have a question or need help? Reach out — we're here 24/7 to support your healthcare journey."
        }
      />
      {/* Email Section */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-center  md:px-20 px-4 py-6 gap-6">
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 w-full rounded-lg max-w-lg p-4 shadow-sm z-10 relative">
          <icons.MdOutlineMail className="size-10 font-medium mb-3" />
          <h1 className="font-semibold text-lg mb-2">Email</h1>
          <p className="mb-2 text-sm md:text-base">
            Need help or have a question? Email us anytime:
          </p>
          <p className="underline cursor-pointer text-sm md:text-base">
            medih1811@gmail.com
          </p>
        </div>

        <div className="relative w-full max-w-[350px] mx-auto md:mx-0">
          <div className="hidden absolute inset-0 md:flex items-center justify-center -z-10">
            <div className="h-72 w-72 rounded-full bg-[#005B5F] blur-[120px] opacity-70"></div>
          </div>

          <img
            src={images.mail}
            alt="mail"
            className="relative z-10 h-auto w-full"
          />
        </div>
      </div>
      {/* Office Section */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-center md:px-20 px-4 py-6 gap-6">
        <div className="relative w-full max-w-[470px] mx-auto md:mx-0">
          <div className="hidden absolute inset-0 md:flex items-center justify-center -z-10">
            <div className="h-72 w-72 rounded-full bg-[#005B5F] blur-[120px] opacity-70"></div>
          </div>

          <img
            src={images.office}
            alt="office"
            className="relative z-10 h-auto w-full"
          />
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-purple-50 w-full rounded-lg max-w-xl p-4 shadow-sm z-10 relative">
          <icons.CiLocationOn className="size-10 font-medium mb-3" />
          <h1 className="font-semibold text-lg mb-2">Office</h1>
          <p className="mb-2 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in ero.
          </p>
          <p className="underline cursor-pointer text-sm md:text-base">
            123 Sample St, Sydney NSW 2000 AU
          </p>
        </div>
      </div>


      {/* Phone Section */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-center md:px-20 px-4 py-6 gap-6">
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 w-full rounded-lg max-w-xl p-4 shadow-sm z-10 relative">
          <icons.IoCallOutline className="size-10 font-medium mb-3" />
          <h1 className="font-semibold text-lg mb-2">Phone</h1>
          <p className="mb-2 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in ero.
          </p>
          <p className="underline cursor-pointer text-sm md:text-base">
            +91 1234567890
          </p>
        </div>

        <div className="relative w-full max-w-[470px] mx-auto md:mx-0">
          <div className="hidden absolute inset-0 md:flex items-center justify-center -z-10">
            <div className="h-72 w-72 rounded-full bg-[#005B5F] blur-[120px] opacity-70"></div>
          </div>
          <img
            src={images.mobile}
            alt="mobile"
            className="relative z-10 h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;