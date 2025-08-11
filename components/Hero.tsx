import Image from "next/image";
import Button from "@/components/Button";

export default function Hero() {
  return (
     <section className="relative text-white flex flex-col md:flex-row items-center p-6 overflow-hidden">
      {/* The new background gradient overlay with a blue-green combination */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-orange-500 opacity-80"></div>
      
      <div className="relative z-10 flex-1 max-w-4xl mx-auto md:mx-0 text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl space-x-0.5 font-bold">
          Your Journey to a Healthier You Starts Now
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-100">
          Personalized workouts, expert guidance, and a supportive community <br></br> - the all in one app.
        </p>
        <Button
        type= "button"
        title = "Start Your Free Trial"
          className="
            bg-white
            text-green-600
            ">
        </Button>
      </div>

      <div className="flex-1 flex justify-center">
          <video 
            src="/hero-video.mp4" 
            autoPlay 
            loop 
            muted 
            className="rounded-4xl w-full max-w-[1080px] h-auto filter contrast-110 saturate-110"

          />
        </div>
    </section>
  );
}