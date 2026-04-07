import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from "../api/event";

const Home = () => {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setFeaturedEvents(data.slice(0, 3)); // Only 3 for homepage
      } catch (err) {
        console.error("Failed to fetch featured events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-['Satoshi'] antialiased overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="pt-20 md:pt-32 pb-12 px-6 md:px-0">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 md:mb-16 text-center md:text-left">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 transition-all">
              Discover Events <br /> 
              <span className="text-neutral-300">Right Here.</span>
            </h1>
            <p className="text-lg md:text-2xl text-neutral-500 max-w-2xl mb-10 leading-relaxed px-2 md:px-0">
              The premier platform for creators and enthusiasts. 
              Find your next inspiration in one seamless hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate("/events")}
                className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all">
                Explore Events
              </button>
              <button 
                className="w-full sm:w-auto px-10 py-4 bg-white border border-neutral-200 rounded-full font-bold hover:bg-neutral-50 transition-all">
                Host an Event
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative group overflow-hidden rounded-4xl md:rounded-[3rem] shadow-2xl -mx-2 md:mx-0">
            <img 
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1600&auto=format&fit=crop" 
              alt="Vibrant event crowd" 
              className="w-full h-87.5 md:h-162.5 object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-80">Featured Experience</p>
              <h2 className="text-3xl md:text-5xl font-bold italic tracking-tighter">Summer Rave Lagos '26</h2>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}
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

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible px-6 md:px-0 no-scrollbar snap-x snap-mandatory">
          {loading ? (
            <p className="px-6 text-neutral-400">Loading events...</p>
          ) : (
            featuredEvents.map((event) => (
              <div 
                key={event.id} 
                className="min-w-70 md:min-w-0 group cursor-pointer snap-start"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="aspect-4/5 bg-neutral-100 rounded-4xl mb-4 overflow-hidden relative shadow-sm">
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black shadow-sm z-10">
                    {event.is_free || event.is_free === 1 || event.is_free === "1" ? "Free" : `₦${event.price || 0}`}
                  </div>
                  
                  {/* Event Image */}
                  <img 
                    src={event.banner || event.image || "https://via.placeholder.com/400"} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="px-1">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">
                    {event.tags?.[0] || "General"} • {event.event_date_human || event.event_date}
                  </p>
                  <h3 className="text-xl font-bold group-hover:text-neutral-600 transition-colors tracking-tight italic">
                    {event.title}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto mb-20 px-6 md:px-0">
        <div className="bg-[#1d1d1f] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 italic leading-tight tracking-tighter">
              Build your <br className="md:hidden" /> community.
            </h2>
            <p className="text-neutral-400 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10">
              Start listing your events today and reach thousands instantly.
            </p>
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-black active:scale-95 transition-all shadow-xl">
              Get Started for Free
            </button>
          </div>
          <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default Home;