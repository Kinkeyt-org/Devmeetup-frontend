import React from 'react';

const Home = () => {
  const featuredEvents = [
    { id: 1, title: "Tech Lagos Summit", date: "Apr 24", category: "Technology", price: "Free" },
    { id: 2, title: "Afro-Beats Night", date: "May 02", category: "Music", price: "₦5,000" },
    { id: 3, title: "Product Design Mixer", date: "May 15", category: "Design", price: "Free" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-['Satoshi'] antialiased overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="pt-20 md:pt-32 pb-12 px-6 md:px-0">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 md:mb-16 text-center md:text-left">
            {/* Mobile: text-5xl | Desktop: text-8xl */}
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 transition-all">
              Discover Events <br /> 
              <span className="text-neutral-300">Right Here.</span>
            </h1>
            <p className="text-lg md:text-2xl text-neutral-500 max-w-2xl mb-10 leading-relaxed px-2 md:px-0">
              The premier platform for creators and enthusiasts. 
              Find your next inspiration in one seamless hub.
            </p>
            {/* Mobile: Full-width buttons | Desktop: Auto-width */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all">
                Explore Events
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white border border-neutral-200 rounded-full font-bold hover:bg-neutral-50 transition-all">
                Host an Event
              </button>
            </div>
          </div>

          {/* Hero Image - Reduced radius on mobile for a tighter look */}
          <div className="relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl mx-[-8px] md:mx-0">
            <img 
              src="hero.jpeg" 
              alt="Vibrant event crowd" 
              className="w-full h-[350px] md:h-[650px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      

      {/* 3. FEATURED EVENTS - Horizontal Scroll on Mobile */}
      <section className="max-w-5xl mx-auto py-16 md:py-24">
        <div className="flex justify-between items-end mb-10 px-6 md:px-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Happening Soon</h2>
            <p className="text-sm md:text-base text-neutral-500">Trending experiences nearby.</p>
          </div>
          <button className="text-sm font-bold border-b-2 border-black pb-0.5">
            View all
          </button>
        </div>

        {/* Mobile: Scrollable container | Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible px-6 md:px-0 no-scrollbar snap-x snap-mandatory">
          {featuredEvents.map((event) => (
            <div key={event.id} className="min-w-[280px] md:min-w-0 group cursor-pointer snap-start">
              <div className="aspect-[4/5] bg-neutral-100 rounded-3xl mb-4 overflow-hidden relative shadow-sm">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold shadow-sm z-10">
                   {event.price}
                </div>
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-50 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{event.category} • {event.date}</p>
              <h3 className="text-lg md:text-xl font-bold group-hover:text-neutral-600 transition-colors">{event.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA SECTION - Tighter padding on mobile */}
      <section className="max-w-5xl mx-auto mb-20 px-6 md:px-0">
        <div className="bg-[#1d1d1f] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 italic leading-tight">Build your <br className="md:hidden" /> community.</h2>
            <p className="text-neutral-400 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10">
              Start listing your events today and reach thousands instantly.
            </p>
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold active:scale-95 transition-all">
              Get Started
            </button>
          </div>
          <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* FOOTER - Stacked on mobile */}
      <footer className="max-w-5xl mx-auto py-10 px-6 md:px-0 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-neutral-400 font-medium">© 2026 EventHub.</p>
        <div className="flex gap-6 text-xs font-bold text-neutral-600">
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;