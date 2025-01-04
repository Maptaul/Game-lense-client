import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="carousel w-full h-[400px]">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full h-[400px]">
        <img
          src="https://i.ibb.co/VtNvYQB/top.jpg"
          className="w-full rounded-lg"
          alt="Top Rated Games"
        />
        <div className="absolute flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <h2 className="text-4xl text-white font-bold text-center">
            <Typewriter
              words={["Explore Top Rated Games", "Dive into the Best Reviews"]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
        </div>
        <a
          href="#slide3"
          className="btn btn-circle btn-sm absolute left-5 top-1/2 transform -translate-y-1/2"
        >
          ❮
        </a>
        <a
          href="#slide2"
          className="btn btn-circle btn-sm absolute right-5 top-1/2 transform -translate-y-1/2"
        >
          ❯
        </a>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full h-[400px]">
        <img
          src="https://i.ibb.co/KG7CPsb/people.jpg"
          className="w-full rounded-lg"
          alt="Share Your Reviews"
        />
        <div className="absolute flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <h2 className="text-4xl text-white font-bold text-center">
            <Typewriter
              words={["Share Your Reviews", "Help Others Choose Better Games"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
        </div>
        <a
          href="#slide1"
          className="btn btn-circle btn-sm absolute left-5 top-1/2 transform -translate-y-1/2"
        >
          ❮
        </a>
        <a
          href="#slide3"
          className="btn btn-circle btn-sm absolute right-5 top-1/2 transform -translate-y-1/2"
        >
          ❯
        </a>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/cCds7fw/ggt.png"
          className="w-full"
          alt="Discover Hidden Gems"
        />
        <div className="absolute flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <h2 className="text-4xl text-white font-bold text-center">
            <Typewriter
              words={[
                "Discover Hidden Gems",
                "Explore the Gaming World Like Never Before",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
        </div>
        <a
          href="#slide2"
          className="btn btn-circle btn-sm absolute left-5 top-1/2 transform -translate-y-1/2"
        >
          ❮
        </a>
        <a
          href="#slide1"
          className="btn btn-circle btn-sm absolute right-5 top-1/2 transform -translate-y-1/2"
        >
          ❯
        </a>
      </div>
    </div>
  );
};

export default Banner;
