import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, TrendingUp, MapPin, Calendar, ChevronRight, Clock } from 'lucide-react';

const allEvents = [
  { id: 1, title: "Tech Lagos Summit 2026", organizer: "TechForge Africa", location: "Civic Center, VI", date: "Apr 12", price: "Free", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "UI/UX Masterclass: The Apple Aesthetic", organizer: "Design Studio", location: "Virtual", date: "Apr 15", price: "₦15,000", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Startup Pitch Night", organizer: "Enugu Tech Hub", location: "The Hub, Enugu", date: "Apr 18", price: "Free", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" },
  {
    id: 4,
    title: "Enugu Code & Coffee",
    organizer: "DevCircle Enugu",
    organizerImg: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100",
    location: "Genesis Center, Enugu",
    date: "Apr 20",
    attendees: "45",
    price: "Free",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "React Africa Conference",
    organizer: "Open Source Community",
    organizerImg: "https://images.unsplash.com/photo-1549813067-f4409b2aa959?w=100",
    location: "Landmark Centre, Lagos",
    date: "May 05",
    attendees: "2.5k",
    price: "₦25,000",
    image: "https://images.unsplash.com/photo-1591115765373-520b7c1f0b0c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "AI in Fintech Workshop",
    organizer: "Paystack Engineering",
    organizerImg: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=100",
    location: "Virtual",
    date: "May 10",
    attendees: "800",
    price: "Free",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "Abuja Creative Meetup",
    organizer: "Abuja Art Collective",
    organizerImg: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100",
    location: "Central Park, Abuja",
    date: "May 12",
    attendees: "120",
    price: "₦5,000",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "Product Management 101",
    organizer: "Utiva Learning",
    organizerImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100",
    location: "Virtual",
    date: "May 15",
    attendees: "300",
    price: "₦10,000",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    title: "Lagos Startup Week",
    organizer: "TechCabal",
    organizerImg: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100",
    location: "Oriental Hotel, Lagos",
    date: "Jun 01-07",
    attendees: "5k",
    price: "Free",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    title: "Python Enugu Hackathon",
    organizer: "Python Nigeria",
    organizerImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100",
    location: "Oaklands Park, Enugu",
    date: "Jun 10",
    attendees: "150",
    price: "Free",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    title: "CyberSecurity Expo",
    organizer: "National IT Board",
    organizerImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100",
    location: "ICC, Abuja",
    date: "Jun 14",
    attendees: "1.1k",
    price: "₦20,000",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    title: "The Frontend Brunch",
    organizer: "Frontend Masters NG",
    organizerImg: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100",
    location: "The Garden, Ikeja",
    date: "Jun 18",
    attendees: "60",
    price: "₦12,500",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 13,
    title: "AWS Community Day",
    organizer: "AWS User Group",
    organizerImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100",
    location: "Virtual",
    date: "Jun 22",
    attendees: "2k",
    price: "Free",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    title: "Mobile App Design Sprint",
    organizer: "Figma Africa",
    organizerImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100",
    location: "Zone Tech Park",
    date: "Jun 25",
    attendees: "100",
    price: "Free",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 15,
    title: "Data Science BootCamp",
    organizer: "Data Science Nigeria",
    organizerImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100",
    location: "Lekki, Lagos",
    date: "Jul 01",
    attendees: "400",
    price: "₦50,000",
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 16,
    title: "Blockchain for Devs",
    organizer: "Web3 Bridge",
    organizerImg: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100",
    location: "Virtual",
    date: "Jul 05",
    attendees: "1.5k",
    price: "Free",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 17,
    title: "Cloud Engineering Summit",
    organizer: "Google Cloud Group",
    organizerImg: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=100",
    location: "Eko Hotels, Lagos",
    date: "Jul 12",
    attendees: "900",
    price: "₦15,000",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 18,
    title: "DevOps Days Abuja",
    organizer: "Cloud Native NG",
    organizerImg: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100",
    location: "Abuja Tech Village",
    date: "Jul 20",
    attendees: "300",
    price: "₦10,000",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 19,
    title: "Founder's Dinner",
    organizer: "Endeavor Nigeria",
    organizerImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    location: "Maitama, Abuja",
    date: "Jul 25",
    attendees: "30",
    price: "Invite Only",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 20,
    title: "Game Dev Lagos",
    organizer: "Maliyo Games",
    organizerImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100",
    location: "Yaba, Lagos",
    date: "Aug 02",
    attendees: "200",
    price: "Free",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 21,
    title: "UX Research Deep Dive",
    organizer: "Design Systems NG",
    organizerImg: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100",
    location: "Virtual",
    date: "Aug 05",
    attendees: "500",
    price: "₦5,000",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 22,
    title: "No-Code Workshop",
    organizer: "Tunga",
    organizerImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100",
    location: "Co-creation Hub (CcHub)",
    date: "Aug 10",
    attendees: "80",
    price: "Free",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 23,
    title: "E-commerce Summit",
    organizer: "Jumia Partners",
    organizerImg: "https://images.unsplash.com/photo-1557821552-17105176677c?w=100",
    location: "Lekki Event Centre",
    date: "Aug 15",
    attendees: "1.2k",
    price: "₦15,000",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 24,
    title: "Angular Nigeria Meetup",
    organizer: "GDG Lagos",
    organizerImg: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=100",
    location: "Google Office, Lagos",
    date: "Aug 20",
    attendees: "120",
    price: "Free",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 25,
    title: "SaaS Founders Forum",
    organizer: "Microtraction",
    organizerImg: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100",
    location: "Ikoyi, Lagos",
    date: "Aug 25",
    attendees: "50",
    price: "Invite Only",
    image: "https://images.unsplash.com/photo-1515162305114-8d9708363322?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 26,
    title: "Digital Marketing Masterclass",
    organizer: "Orange Academy",
    organizerImg: "https://images.unsplash.com/photo-1432888497205-40fd748e370d?w=100",
    location: "Maryland, Lagos",
    date: "Sep 02",
    attendees: "200",
    price: "₦35,000",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 27,
    title: "Hardware Hack Enugu",
    organizer: "GEN Enugu",
    organizerImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100",
    location: "University of Nigeria",
    date: "Sep 08",
    attendees: "100",
    price: "Free",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 28,
    title: "Future of Work Expo",
    organizer: "Microsoft Africa",
    organizerImg: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100",
    location: "Virtual",
    date: "Sep 15",
    attendees: "3k",
    price: "Free",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 29,
    title: "Startup Legal Clinic",
    organizer: "LegalTech NG",
    organizerImg: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=100",
    location: "Victoria Island, Lagos",
    date: "Sep 20",
    attendees: "70",
    price: "₦5,000",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 30,
    title: "AgroTech Conference",
    organizer: "FarmCrowdy",
    organizerImg: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100",
    location: "ICC, Ibadan",
    date: "Oct 01",
    attendees: "600",
    price: "Free",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 31,
    title: "Cyber Resilience Summit",
    organizer: "First Bank Security",
    organizerImg: "https://images.unsplash.com/photo-1510511459019-5dee997dd1db?w=100",
    location: "Landmark, Lagos",
    date: "Oct 05",
    attendees: "1k",
    price: "Invite Only",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 32,
    title: "Creative Writing Workshop",
    organizer: "Lagos Books",
    organizerImg: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=100",
    location: "Freedom Park, Lagos",
    date: "Oct 10",
    attendees: "50",
    price: "₦3,000",
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c03?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 33,
    title: "Fintech Pitch Slam",
    organizer: "Flutterwave",
    organizerImg: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100",
    location: "Eko Atlantic City",
    date: "Oct 15",
    attendees: "400",
    price: "Free",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e41?auto=format&fit=crop&q=80&w=800"
  }
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // 1. Load recents from LocalStorage on mount
  useEffect(() => {
    inputRef.current?.focus();
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // 2. Function to save a new search
  const addToRecent = (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    setRecentSearches(prev => {
      // Remove duplicates and keep it to the last 5 searches
      const filtered = prev.filter(item => item !== searchTerm);
      const updated = [searchTerm, ...filtered].slice(0, 5);
      localStorage.setItem('recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecents = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  // 3. Handle 'Enter' key to save search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query) {
      addToRecent(query);
      // Optional: navigate to a results page or just blur
      inputRef.current.blur();
    }
  };

  const filteredEvents = allEvents.filter(event => 
    event.title.toLowerCase().includes(query.toLowerCase()) ||
    event.organizer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] text-[#0F1419]">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <div className="relative flex-1 group">
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${isFocused ? 'text-amber-500' : 'text-gray-400'}`}>
            <SearchIcon size={20} strokeWidth={2.5} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search events, hubs, or cities"
            className="w-full bg-gray-100 border-transparent border focus:border-amber-400 focus:bg-white rounded-full py-2.5 pl-12 pr-10 text-[15px] outline-none transition-all duration-200"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 p-1 rounded-full hover:bg-gray-300">
              <X size={14} strokeWidth={3} />
            </button>
          )}
        </div>
        <button onClick={() => navigate(-1)} className="text-[15px] font-bold px-2 text-gray-900 hover:text-amber-500 transition-colors">Cancel</button>
      </div>

      <div className="max-w-2xl mx-auto">
        {!query ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {recentSearches.length > 0 && (
              <section className="mt-4">
                <div className="flex items-center justify-between px-4 py-3">
                  <h2 className="text-xl font-black tracking-tight text-gray-900">Recent</h2>
                  <button onClick={clearRecents} className="text-amber-500 text-sm font-bold hover:bg-amber-50 px-3 py-1 rounded-full transition-colors">Clear all</button>
                </div>
                <div className="flex flex-col">
                  {recentSearches.map((item) => (
                    <div 
                      key={item} 
                      onClick={() => setQuery(item)}
                      className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-gray-400" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Trending Section remains the same */}
            <section className="mt-6">
               <h2 className="text-xl font-black px-4 py-3 tracking-tight">Trends for you</h2>
               {/* ... (keep your existing trending items here) */}
            </section>
          </div>
        ) : (
          /* Search Results State */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                onClick={() => addToRecent(event.title)} // Save to recent when a result is clicked
                className="flex gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-all"
              >
                {/* Result Card UI remains the same */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={event.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                   <h3 className="font-bold text-[16px] text-gray-900">{event.title}</h3>
                   <p className="text-[13px] text-gray-500 mt-1">by {event.organizer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;