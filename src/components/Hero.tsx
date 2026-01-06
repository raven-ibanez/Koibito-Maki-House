import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        {/* Left Side - Light Gray */}
        <div className="flex-1 bg-koibito-gray flex flex-col justify-center px-6 md:px-16 py-16 md:py-0 relative">
          <div className="max-w-xl animate-fade-in text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start">
              <img
                src="/logo.jpg"
                alt="Koibito Logo"
                className="h-14 md:h-20 mb-8"
              />
            </div>

            <h1 className="font-display text-5xl md:text-8xl text-koibito-dark leading-tight mb-4 uppercase tracking-tight">
              GRAND<br className="hidden md:block" />
              <span className="md:hidden"> </span>RE-OPENING
            </h1>

            <p className="font-script text-3xl md:text-5xl text-koibito-red mb-8">
              Ready to Roll again
            </p>

            <div className="border border-koibito-red p-4 inline-block mb-10">
              <span className="font-display text-xl md:text-2xl tracking-[0.2em] text-koibito-red">
                05 . 27 . 2025
              </span>
            </div>

            <div className="text-koibito-dark mb-10 space-y-1">
              <p className="text-lg md:text-xl font-sans uppercase tracking-widest text-gray-500">For your order</p>
              <p className="text-3xl md:text-4xl font-display font-bold text-koibito-red">09763854614</p>
            </div>

            <div className="flex justify-center md:justify-start">
              <a
                href="#menu"
                className="bg-koibito-red text-white px-12 py-5 rounded-sm hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-display text-xl tracking-widest shadow-xl"
              >
                ORDER NOW
              </a>
            </div>
          </div>

          {/* Decorative Brush Stroke */}
          <div className="absolute bottom-0 left-0 w-32 md:w-48 opacity-20 pointer-events-none">
            {/* You could add a brush stroke image here if available */}
          </div>
        </div>

        {/* Right Side - Deep Red */}
        <div className="flex-1 bg-koibito-red relative min-h-[400px] md:min-h-0 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 p-4 transform md:scale-110 lg:scale-125 transition-transform duration-700 hover:rotate-3">
              <img
                src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800"
                alt="Sushi Roll"
                className="rounded-full shadow-2xl border-4 border-white/20"
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 opacity-20 transform rotate-45">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
              <path d="M10 10 Q 50 50 90 10" />
              <path d="M10 30 Q 50 70 90 30" />
              <path d="M10 50 Q 50 90 90 50" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;