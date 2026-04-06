import React from 'react';

const Home = () => {
  // Mock data for featured events
  const featuredEvents = [
    { id: 1, title: "Tech Lagos Summit", date: "Apr 24", category: "Technology", price: "Free" },
    { id: 2, title: "Afro-Beats Night", date: "May 02", category: "Music", price: "₦5,000" },
    { id: 3, title: "Product Design Mixer", date: "May 15", category: "Design", price: "Free" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-['Satoshi'] antialiased">
      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 px-6 md:px-0">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              Discover Events <br /> 
              <span className="text-neutral-300">Right Here.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl mb-10 leading-relaxed">
              The premier platform for student creators and tech enthusiasts. 
              Find your next inspiration in one seamless hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-10 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-all duration-300">
                Explore Events
              </button>
              <button className="px-10 py-4 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all">
                Host an Event
              </button>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img 
              src="hero.jpeg" 
              alt="Vibrant event crowd" 
              className="w-full h-112.5 md:h-162.5 object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            
          </div>
        </div>
      </section>

      {/* 2. STATS / SOCIAL PROOF */}
      <section className="max-w-5xl mx-auto py-12 px-6 md:px-0 flex flex-wrap justify-between items-center gap-8 border-b border-neutral-100">
        <div>
          <p className="text-4xl font-bold italic">10k+</p>
          <p className="text-neutral-400 text-sm uppercase tracking-wider">Tickets Sold</p>
        </div>
        <div>
          <p className="text-4xl font-bold italic">500+</p>
          <p className="text-neutral-400 text-sm uppercase tracking-wider">Events Hosted</p>
        </div>
        <div>
          <p className="text-4xl font-bold italic">24/7</p>
          <p className="text-neutral-400 text-sm uppercase tracking-wider">Support</p>
        </div>
        <div className="hidden md:block h-12 w-px bg-neutral-200"></div>
        <p className="text-neutral-500 max-w-50 text-sm">
          Trusted by organizers across Nigeria's top universities.
        </p>
      </section>

      {/* 3. FEATURED EVENTS (LIVE PREVIEW) */}
      <section className="max-w-5xl mx-auto py-24 px-6 md:px-0">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Happening Soon</h2>
            <p className="text-neutral-500">Don't miss out on these trending experiences.</p>
          </div>
          <button className="text-black font-semibold border-b-2 border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
            View all events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-neutral-100 rounded-3xl mb-4 overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                   {event.price}
                </div>
                {/* Replace with real event images later */}
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-50 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{event.category} • {event.date}</p>
              <h3 className="text-xl font-bold group-hover:text-neutral-600 transition-colors">{event.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION (THE "STICKY" ELEMENT) */}
      <section className="max-w-5xl mx-auto mb-24 px-6">
        <div className="bg-[#1d1d1f] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">Build your community.</h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Are you an organizer? Start listing your events today and reach thousands of attendees instantly.
            </p>
            <button className="px-12 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
              Get Started for Free
            </button>
          </div>
          {/* Subtle decorative circles */}
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto py-12 px-6 md:px-0 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-neutral-400 font-medium">© 2026 EventHub. All rights reserved.</p>
        <div className="flex gap-8 text-sm font-semibold text-neutral-600">
          <a href="#" className="hover:text-black">Twitter</a>
          <a href="#" className="hover:text-black">Instagram</a>
          <a href="#" className="hover:text-black">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;