import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, SkipBack, SkipForward, Volume2, Maximize2, Share2, ArrowLeft, Facebook, Youtube, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useData } from '../context/DataContext';

const VideoPlayer: React.FC = () => {
  const { id } = useParams();
  const { interviews } = useData();
  const interview = interviews.find(i => i.id === id);

  // --- SEO Optimization Effect ---
  useEffect(() => {
    if (interview) {
      document.title = `${interview.title} | Founder Storys`;

      const updateMetaTag = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateMetaTag('description', interview.description || `Watch ${interview.founderName} from ${interview.companyName} tell their founder story.`);

      if (interview.metaKeywords && interview.metaKeywords.length > 0) {
        updateMetaTag('keywords', interview.metaKeywords.join(', '));
      } else {
        updateMetaTag('keywords', `founder story, ${interview.companyName}, startup, entrepreneurship, interview`);
      }
    }
    window.scrollTo(0, 0);
  }, [interview]);

  if (!interview) {
    return <div className="text-center py-20 text-slate-900">Video not found</div>;
  }

  // Use generic embedUrl if available, otherwise fallback to youtubeUrl
  const embedSrc = interview.embedUrl || interview.youtubeUrl;
  const isEmbeddable = !!embedSrc;
  const isVertical = interview.format === 'vertical';

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition font-bold text-sm">
            <ArrowLeft size={16} className="mr-2" /> Back to Browse
        </Link>
        
        {/* Container that handles vertical vs horizontal alignment - Player area stays dark for contrast */}
        <div className={`flex justify-center ${isVertical ? 'bg-slate-900 rounded-3xl p-8' : ''}`}>
           {/* Custom Video Player UI */}
           <div className={`relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group ${isVertical ? 'aspect-[9/16] w-full max-w-[400px]' : 'aspect-video w-full'}`}>
             
             {isEmbeddable ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={embedSrc}
                  title={interview.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
             ) : (
                <>
                  <video 
                    src={interview.videoUrl || "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}
                    className="w-full h-full object-cover"
                    controls={false} // Hiding native controls for custom feel
                    autoPlay
                    muted
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                     {/* Progress Bar */}
                     <div className="w-full h-1 bg-slate-700 rounded-full mb-4 cursor-pointer overflow-hidden">
                        <div className="w-1/3 h-full bg-red-600 relative"></div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <button className="text-white hover:text-red-500 transition"><Play fill="currentColor" size={24} /></button>
                           <button className="text-slate-300 hover:text-white transition"><SkipBack size={20} /></button>
                           <button className="text-slate-300 hover:text-white transition"><SkipForward size={20} /></button>
                           <div className="flex items-center gap-2 group/vol">
                              <Volume2 className="text-slate-300" size={20} />
                              <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                                 <div className="h-1 bg-white rounded-full w-20"></div>
                              </div>
                           </div>
                           <span className="text-sm font-mono text-slate-300">04:20 / 12:45</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <button className="text-slate-300 hover:text-white"><Share2 size={20} /></button>
                           <button className="text-slate-300 hover:text-white"><Maximize2 size={20} /></button>
                        </div>
                     </div>
                  </div>

                  {/* Watermark in Player */}
                  <div className="absolute top-6 right-6 opacity-50 pointer-events-none">
                     <span className="font-bold text-white tracking-tighter">FOUNDER<span className="text-red-500">STORYS</span></span>
                  </div>
                </>
             )}
           </div>
        </div>

        {/* Info Area - Light Mode */}
        <div className="mt-12 flex flex-col md:flex-row gap-12">
            <div className="flex-grow space-y-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                       <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest mb-3 inline-block">
                          {interview.companyName} Spotlight
                       </span>
                       <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{interview.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        {interview.socialLinks?.youtube && <a href={interview.socialLinks.youtube} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-600 bg-slate-50 border border-slate-200 p-3 rounded-xl transition-all shadow-sm"><Youtube size={20}/></a>}
                        {interview.socialLinks?.facebook && <a href={interview.socialLinks.facebook} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 bg-slate-50 border border-slate-200 p-3 rounded-xl transition-all shadow-sm"><Facebook size={20}/></a>}
                        {interview.socialLinks?.twitter && <a href={interview.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 bg-slate-50 border border-slate-200 p-3 rounded-xl transition-all shadow-sm"><Twitter size={20}/></a>}
                        {interview.socialLinks?.linkedin && <a href={interview.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 bg-slate-50 border border-slate-200 p-3 rounded-xl transition-all shadow-sm"><Linkedin size={20}/></a>}
                        {interview.socialLinks?.instagram && <a href={interview.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 bg-slate-50 border border-slate-200 p-3 rounded-xl transition-all shadow-sm"><Instagram size={20}/></a>}
                    </div>
                </div>
                
                <div className="flex items-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-widest pb-6 border-b border-slate-100">
                    <span className="bg-slate-100 text-slate-900 px-3 py-1 rounded-lg border border-slate-200">
                       {isVertical ? 'Vertical HD' : '4K Ultra HD'}
                    </span>
                    <span className="flex items-center gap-1.5"><Play size={14}/> {interview.views.toLocaleString()}</span>
                    <span>{interview.date}</span>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4 italic">Broadcast Summary</h3>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                        {interview.description || `In this exclusive interview, we sit down with ${interview.founderName} to discuss the origins of ${interview.companyName} and how they are changing the landscape of their industry.`}
                    </p>
                </div>
            </div>

            <div className="w-full md:w-80 flex-shrink-0 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
                    <div className="w-24 h-24 mx-auto bg-slate-100 rounded-[32px] mb-6 flex items-center justify-center text-3xl font-black text-slate-300 border border-slate-200 shadow-inner">
                        {interview.founderName.charAt(0)}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{interview.founderName}</h3>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1 mb-6">{interview.position} at {interview.companyName}</p>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl hover:bg-black transition text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-950/20">
                        Follow Founder
                    </button>
                </div>
                
                {/* AI Summary Light Mode */}
                <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-900/10 text-white">
                   <h3 className="font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     AI Intelligence Report
                   </h3>
                   <ul className="text-sm text-slate-300 space-y-4">
                      <li className="flex gap-3"><span className="text-blue-400 font-black">01</span> Market expansion and scaling strategies.</li>
                      <li className="flex gap-3"><span className="text-blue-400 font-black">02</span> Tactical advice on venture capital.</li>
                      <li className="flex gap-3"><span className="text-blue-400 font-black">03</span> Future vision for the next 5 years.</li>
                   </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;