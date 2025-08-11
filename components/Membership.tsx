import { plans } from "@/constants/pages";
import Image from "next/image"
export default function Membership() {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Find Your Perfect Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-100 p-8 rounded-lg shadow-md space-y-6 flex flex-col items-center
                ${plan.isPopular ? 'border-2 border-orange-400 bg-white' : ''}
              `}
            >
              <h3 className={`text-2xl font-bold ${plan.isPopular ? 'text-orange-400' : 'text-gray-800'}`}>
                {plan.name}
              </h3>
              <p className="text-5xl font-extrabold text-gray-900">
                {plan.price}
                <span className="text-xl font-medium text-gray-500">{plan.period}</span>
              </p>
              <ul className="text-gray-600 text-lg space-y-2 text-center">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center">
                    <svg className="h-5 w-5 text-orange-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}