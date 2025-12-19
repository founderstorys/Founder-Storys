import React from 'react';
import { 
  ArrowRight, TrendingUp, Newspaper, Star, ChevronRight, 
  Globe, CirclePlay, Users, Activity, Play, Radio, 
  Monitor, Zap, ShieldCheck, Video, Layout as LayoutIcon,
  Search, ExternalLink, MonitorUp, SquarePlay, Facebook, 
  Linkedin, Twitch, Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import VideoCard from '../components/VideoCard';
import { Interview } from '../types';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group">
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors border border-slate-100 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight uppercase">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ArticleRowCard: React.FC<{ article: Interview }> = ({ article }) => (
  <Link to={`/articles/${article.id}`} className="group block bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500">
    <div className="relative aspect-video overflow-hidden">
      <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
      <div className="absolute top-4 left-4">
         <span className="bg-white/90 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest text-slate-900 shadow-sm">
            {article.readTime || 'Article'}
         </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
         <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">{article.companyName}</span>
      </div>
      <h3 className="text-lg font-black text-slate-900 leading-tight line-clamp-2 group-hover:text-red-600 transition-colors mb-4">
        {article.title}
      </h3>
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{article.date}</span>
        <div className="flex items-center gap-1 text-[10px] font-black text-slate-900 uppercase">
           Read <ArrowRight size={12}/>
        </div>
      </div>
    </div>
  </Link>
);

const Landing: React.FC = () => {
  const { interviews } = useData();

  // Content Filtering
  const videoEpisodes = interviews.filter(i => i.category !== 'article').slice(0, 4);
  const newsArticles = interviews.filter(i => i.category === 'article').slice(0, 3);
  
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. CINEMA HERO SECTION - LIGHT THEME */}
      <section className="relative bg-slate-50 min-h-[90vh] flex items-center overflow-hidden border-b border-slate-200">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-5" 
            alt="Studio Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.05),transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 bg-red-600/5 border border-red-500/20 px-4 py-2 rounded-full">
               <Radio size={16} className="text-red-500 animate-pulse" />
               <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Broadcast Your Success</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              TELL YOUR <span className="text-red-600 italic">STORY</span><br/>
              ON THE GLOBAL STAGE.
            </h1>
            
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
              Founder Storys is the digital TV studio where visionary entrepreneurs tell their stories and promote their brands with professional studio-grade quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/apply" className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 hover:-translate-y-1 flex items-center justify-center gap-3">
                 Start Your Interview <Zap size={18}/>
              </Link>
              <Link to="/videos" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-3">
                 Explore Episodes <Play size={18} fill="currentColor"/>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-white shadow-md" alt="Founder" />
                  ))}
               </div>
               <div className="text-sm font-bold">
                  <span className="text-slate-900 block">500+ Founders Interviewed</span>
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">Join the ecosystem</span>
               </div>
            </div>
          </div>
        </div>

        {/* Floating Side Text */}
        <div className="hidden xl:block absolute right-0 top-1/2 -rotate-90 translate-x-1/2 -translate-y-1/2">
           <span className="text-[140px] font-black text-slate-200 select-none tracking-tighter">STUDIO. LIVE. GROWTH.</span>
        </div>
      </section>

      {/* 2. THE STUDIO ADVANTAGE (FEATURES) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-4">The Advantage</h2>
             <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic mb-6">Built for founders, <br/>by storytellers.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MonitorUp size={32}/>} 
              title="4K Live Recording" 
              desc="Studio-quality recording directly from your browser. High bitrate video and lossless audio tracks for every guest."
            />
            <FeatureCard 
              icon={<Globe size={32}/>} 
              title="Global Multistream" 
              desc="Broadcast simultaneously to YouTube, Facebook, LinkedIn, and Twitter with a single click. Reach your audience anywhere."
            />
            <FeatureCard 
              icon={<Zap size={32}/>} 
              title="AI Content Clips" 
              desc="Our engine automatically extracts high-impact 60-second clips for TikTok, Shorts, and Reels to maximize your virality."
            />
          </div>
        </div>
      </section>

      {/* 3. RECENT BROADCASTS (VIDEOS) */}
      <section className="py-24 bg-slate-50 overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
           <div className="flex items-end justify-between mb-12">
              <div className="space-y-4">
                 <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Live from the desk</h2>
                 <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Recent Episodes</h3>
              </div>
              <Link to="/videos" className="text-xs font-black text-slate-400 hover:text-red-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-2 border-b-2 border-transparent hover:border-red-600 pb-1">
                 View Repository <ArrowRight size={14}/>
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {videoEpisodes.map(interview => (
                <VideoCard key={interview.id} interview={interview} />
              ))}
           </div>
        </div>
      </section>

      {/* 4. EDITORIAL INSIGHTS (ARTICLES) */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                 <h2 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-4">Deep Dives</h2>
                 <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">Founder Insights & <br/>Success Stories</h3>
              </div>
              <Link to="/articles" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-900/10">
                 Read All Stories
              </Link>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {newsArticles.map(article => (
                <ArticleRowCard key={article.id} article={article} />
              ))}
           </div>
        </div>
      </section>

      {/* 5. ECOSYSTEM STATS */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
             <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">500<span className="text-red-600">+</span></div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Founders</div>
             </div>
             <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">1M<span className="text-blue-600">+</span></div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Monthly Reach</div>
             </div>
             <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">150<span className="text-green-600">+</span></div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Cities</div>
             </div>
             <div className="space-y-2">
                <div className="text-6xl font-black text-slate-900 tracking-tighter">4K</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Broadcast Qual</div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION - LIGHT VERSION */}
      <section className="py-20 px-4 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="w-full bg-slate-100 rounded-[48px] p-12 md:p-24 relative overflow-hidden group border border-slate-200 shadow-xl">
               {/* Background Glow */}
               <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] group-hover:bg-red-600/10 transition-colors duration-700" />
               <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
               
               <div className="relative z-10 text-center max-w-3xl mx-auto space-y-10">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-slate-200 shadow-xl">
                       <Video className="text-slate-900" size={32} />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase italic">
                    Are you ready for your <br/>
                    <span className="text-red-600">Close up?</span>
                  </h2>
                  
                  <p className="text-xl text-slate-600 font-medium leading-relaxed">
                    Join the ranks of elite founders telling their stories on our network. From startup growth to legacy building, we give you the stage you deserve.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                     <Link to="/apply" className="bg-red-600 text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 group/btn">
                        Apply Now <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform"/>
                     </Link>
                     <Link to="/auth" className="bg-white text-slate-900 border border-slate-200 px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm">
                        Visit Dashboard
                     </Link>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] pt-4">
                     No Credit Card Required for Application Review
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. PARTNERS / DESTINATIONS TICKER */}
      <div className="py-12 border-t border-slate-200 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-10">Streamed to Millions via</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 text-slate-700">
               <div className="flex items-center gap-2"><SquarePlay size={32}/><span className="font-black text-2xl tracking-tighter">YouTube</span></div>
               <div className="flex items-center gap-2"><Facebook size={32}/><span className="font-black text-2xl tracking-tighter">Facebook</span></div>
               <div className="flex items-center gap-2"><Linkedin size={32}/><span className="font-black text-2xl tracking-tighter">LinkedIn</span></div>
               <div className="flex items-center gap-2"><Twitch size={32}/><span className="font-black text-2xl tracking-tighter">Twitch</span></div>
               <div className="flex items-center gap-2"><Twitter size={32}/><span className="font-black text-2xl tracking-tighter">Twitter</span></div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Landing;