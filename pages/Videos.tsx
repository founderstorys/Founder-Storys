import React from 'react';
import { useData } from '../context/DataContext';
import VideoCard from '../components/VideoCard';
import { Play, Filter, Search } from 'lucide-react';

const Videos: React.FC = () => {
  const { interviews } = useData();
  const videoEpisodes = interviews.filter(i => i.category !== 'article');

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Banner - Light Version */}
      <header className="bg-slate-50 border-b border-slate-200 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-red-600/30">
                 <Play fill="white" size={32} className="ml-1"/>
              </div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Network Episodes</h1>
           </div>
           <p className="text-slate-600 text-xl font-medium max-w-2xl leading-relaxed">Watch the latest founder pitches, deep-dive interviews, and exclusive success stories from the tech ecosystem.</p>
        </div>
      </header>

      {/* Toolbar - Light Mode */}
      <div className="sticky top-[80px] z-30 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
           <div className="flex items-center gap-8">
              {['All Streams', 'Pitches', 'Interviews', 'Live'].map((tab, idx) => (
                <button key={tab} className={`text-xs font-black uppercase tracking-[0.2em] transition-all pb-1 ${idx === 0 ? 'text-red-600 border-b-4 border-red-600' : 'text-slate-400 hover:text-slate-900'}`}>
                   {tab}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Search size={18} className="absolute left-4 top-3 text-slate-400" />
                 <input placeholder="Search library..." className="bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-red-600 transition-all w-80 font-medium" />
              </div>
              <button className="flex items-center gap-2 bg-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:bg-black transition shadow-lg shadow-slate-950/20">
                 <Filter size={16}/> Filter
              </button>
           </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
         {videoEpisodes.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 rounded-[48px] border-4 border-dashed border-slate-200">
               <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <Play size={40} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 uppercase italic">Archive Empty</h3>
               <p className="text-slate-400 font-bold uppercase tracking-widest mt-2">New broadcasts arriving soon.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
               {videoEpisodes.map(interview => (
                 <VideoCard key={interview.id} interview={interview} />
               ))}
            </div>
         )}
      </main>

      {/* Pagination - Light Theme */}
      {videoEpisodes.length > 0 && (
         <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-center mt-12 pb-20">
            <div className="flex gap-3">
               <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black flex items-center justify-center shadow-xl shadow-slate-900/20">1</button>
               <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black flex items-center justify-center hover:bg-slate-50 transition shadow-sm">2</button>
               <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black flex items-center justify-center hover:bg-slate-50 transition shadow-sm">3</button>
               <div className="w-12 h-12 flex items-center justify-center text-slate-400 font-black">...</div>
               <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black flex items-center justify-center hover:bg-slate-50 transition shadow-sm">12</button>
            </div>
         </div>
      )}
    </div>
  );
};

export default Videos;