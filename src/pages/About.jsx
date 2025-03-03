import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="max-w-screen-xl mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="sm:flex items-center">
        {/* Left Section - Image */}
        <motion.div
          className="sm:w-1/2 p-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <motion.img
              className="rounded-md shadow-lg"
              src="/src/assets/images/aboutus.png"
              alt="About Us"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Right Section - Content */}
        <motion.div
          className="sm:w-1/2 p-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text">
            <span className="text-blue-500 border-b-2 border-blue-600 uppercase">
              About Us
            </span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              Transforming <span className="text-blue-600">Careers</span> with Innovation
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In today&apos;s competitive job market, graduates face immense challenges in transitioning 
              from education to employment. Many existing platforms lack comprehensive access to a 
              wide range of job opportunities, spanning private, government, and international sectors. 
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Our platform bridges this gap by providing complex job matchmaking,
              career resources, and dedicated support for internships and industrial training. We aim to 
              empower job seekers with the right tools, connections, and guidance to succeed.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h3 className="text-2xl font-semibold text-center text-blue-700">
          Key Features of Our Platform
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            "Job postings by employers",
            "Job applications by candidates",
            "Sharing interview experiences & company reviews",
            "Providing feedback",
            "Internship & industrial training opportunities",
            "Resume building & interview preparation tools",
            "Government, private, and overseas job listings",
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-white"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <p className="text-gray-700 font-medium">{feature}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
