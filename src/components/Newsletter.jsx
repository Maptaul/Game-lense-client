import React, { useState } from "react";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import newsletterAnimation from "../assets/Lottie/newsletter.json";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Simulate a subscription action
    toast.success("Successfully subscribed to the Chill Gamer newsletter!");
    setEmail("");
  };

  // Lottie configuration
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: newsletterAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="rounded-md bg-[#2b3a49] mx-auto md:flex items-center text-white py-6 px-6">
      <div className="text-center lg:text-left w-96 mx-auto">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to Chill Gamer
        </h2>
        <p className="text-gray-300 mb-6">
          Stay updated with the latest game reviews, tips, and community events.
          Join our chill newsletter!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 w-full md:w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
