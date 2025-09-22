import { images } from '../assets/assets'

const Diseases = () => {
  const diseasesData = [
    {
      id: 1,
      banner: images.DiseaseBanner01,
      title: "SARS Emerges in China",
      year: "2002-2003",
      description:
        "The Severe Acute Respiratory Syndrome (SARS) coronavirus, part of a family of viruses that commonly cause respiratory symptoms such as coughing and shortness of breath, is first identified in late 2002 in southern China. SARS spreads to more than two dozen countries across four continents, infecting more than eight thousand people. Close to eight hundred, most within China and Hong Kong, by the time the outbreak is quelled in mid-2003. The virus is thought to have been transmitted to humans via contact with civet cats.",
    },
    {
      id: 2,
      banner: images.DiseaseBanner02,
      title: "First Cholera Pandemic",
      year: "1817-1947",
      description:
        "Seven cholera pandemics have occured since 1817, but there global death are unclear Between 1865 & 1947 at least 23 million people died from cholera in india alone",
    },
    {
      id: 3,
      banner: images.DiseaseBanner03,
      title: "Flu Pandemic",
      year: "1830-1833",
      description:
        "The first pandemic that can be confidently attributed to the flu occured in 1580 Between 10-26 flu, pandemic have occured since the",
    },
    {
      id: 4,
      banner: images.DiseaseBanner04,
      title: "Russian flu",
      year: "1889",
      description:
        "4 million estimated deaths",
    },
    {
      id: 5,
      banner: images.DiseaseBanner05,
      title: "Spanish flu Pandemic",
      year: "1918-1920",
      description:
        "50-100 million deaths",
    },
    {
      id: 6,
      banner: images.DiseaseBanner06,
      title: "penicillin ushers in Antibiotics era",
      year: "1928",
      description:
        "Scottish scientist Alexander Fleming discovers penicillin, the first antibiotic—a class of drugs used to treat bacterial infections—marking a major milestone for global health. Widespread use of antibiotics takes off in the early 1940s during World War II.",
    },
    {
      id: 7,
      banner: images.DiseaseBanner07,
      title: "Asian Flu Pandemic",
      year: "1957-1958",
      description:
        "A new strain of influenza virus, designated H2N2, is reported in Singapore in February 1957, and soon spreads to China, Hong Kong, the United Kingdom (UK), and the United States. Though less severe than the Spanish Flu, the Asian Flu kills more than one million people worldwide.",
    },
    {
      id: 8,
      banner: images.DiseaseBanner08,
      title: "Hong Kong Flu",
      year: "1968-1969",
      description:
        ": A decade after the Asian Flu, a new strain called H3N2 emerges. Commonly called the Hong Kong Flu, it emerges first in Hong Kong, then a British colony, in July 1968.",
    },
    {
      id: 9,
      banner: images.DiseaseBanner09,
      title: "Smallpox",
      year: "1977-1980",
      description:
        "The last known case of smallpox, a viral disease that plagued humans for millennia, is diagnosed in 1977 in Somalia, following a nearly two-decade-long global vaccination campaign. Three years later the WHO formally declares it eradicated around the globe.",
    },
    {
      id: 10,
      banner: images.DiseaseBanner01,
      title: "HIV/ AIDS pandemic",
      year: "1981-2025",
      description:
        "A 1981 report by what is now the U.S. Centers for Disease Control and Prevention (CDC) describes a rare form of pneumonia that is later identified as Acquired Immunodeficiency Syndrome, or AIDS. It is the most advanced stage of Human Immunodeficiency Virus (HIV).",
    }
  ]

  return (
    <div className="px-4 md:px-16 mt-22 md:mt-20">
      {diseasesData.map((disease) => (
        <div
          key={disease.id}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] mx-auto mt-6 rounded-lg overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={disease.banner}
            alt={disease.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 text-black">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-1">
              {disease.title}
            </h1>
            <p className="text-sm sm:text-base md:text-md mb-3 sm:mb-4 text-gray-800">
              {disease.year}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
              {disease.description}
            </p>

            {/* Button */}
            <button className="absolute bottom-3 sm:bottom-4 md:bottom-2 right-3 sm:right-4 md:right-6 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full text-sm sm:text-base w-fit cursor-pointer transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Diseases
