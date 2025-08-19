import { FEATURES } from "@/constants/pages";
import Image from "next/image"
export default function Features() {
  return (
    <div>
      <section  className="relative flex flex-col md:flex-row items-center p-2 overflow-hidden" >
      <img
        src="/feature.jpg"
        alt="A motivating image of a person working out"
        height={75}
       className="w-full"
       
      />
    </section>
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-900">
          What Sets FitFlow Apart
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-md space-y-4 text-center flex-1">

              <div><Image src ={feature.src} width={50} height={50} alt={feature.alt}/></div>
              <h3 className="text-2xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
    

    
  
  );
}