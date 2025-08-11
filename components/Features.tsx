import { FEATURES } from "@/constants/pages";
import Image from "next/image"
export default function Features() {
  return (
    <div>
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-900">
          What Sets FitFlow Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-md space-y-4 text-center">

              <div className="flex justify-center"><Image src ={feature.src} width={75} height={75} alt={feature.alt}/></div>
              <h3 className="text-2xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section  className="relative flex flex-col md:flex-row items-center p-2 overflow-hidden" >
      <img
        src="/feature.jpg"
        alt="A motivating image of a person working out"
        height={75}
       className="w-full"
       
      />
    </section>



    </div>
    

    
  
  );
}