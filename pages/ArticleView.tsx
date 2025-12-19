import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, User, Clock, Share2, ArrowLeft, ChevronRight, TrendingUp } from 'lucide-react';

const ArticleView: React.FC = () => {
  const { id } = useParams();
  const { interviews } = useData();
  const article = interviews.find(i => i.id === id);
  const trending = interviews.filter(i => i.id !== id).slice(0, 5);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Founder Storys`;
      
      const updateMeta = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateMeta('description', article.description || '');
      updateMeta('keywords', article.tags?.join(', ') || '');
      
      // OG Tags for social sharing
      updateMeta('og:title', article.title);
      updateMeta('og:description', article.description || '');
      updateMeta('og:image', article.thumbnail);
    }
    window.scrollTo(0, 0);
  }, [article]);

  if (!article) return <div className="text-center py-20">Article not found</div>;

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Top Banner Ad */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 text-center mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
           <span>Advertise with us</span>
           <div className="h-px w-10 bg-slate-200"></div>
           <span className="text-slate-300">Global Summit 2026</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Column */}
        <div className="lg:col-span-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">வல்லுநர் டிப்ஸ்</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-slate-100 text-slate-500 text-sm">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase">
                     {article.author?.charAt(0) || article.founderName.charAt(0)}
                  </div>
                  <span className="font-bold text-slate-800">{article.author || article.founderName}</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <Calendar size={14} /> {article.date}
               </div>
               <div className="flex items-center gap-1.5">
                  <Clock size={14} /> {article.readTime || '5 min read'}
               </div>
               <div className="ml-auto flex items-center gap-2">
                  <Share2 size={16} className="text-slate-400 hover:text-red-600 cursor-pointer transition-colors" />
               </div>
            </div>
          </header>

          <figure className="mb-10 rounded-xl overflow-hidden shadow-sm">
             <img src={article.thumbnail} alt={article.title} className="w-full object-cover max-h-[500px]" />
          </figure>

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-normal article-body">
             {article.longContent ? (
               <div className="space-y-6">
                  {article.longContent.split('\n\n').map((para, i) => {
                    if (para.includes(':')) {
                      const [head, body] = para.split(':');
                      return (
                        <div key={i} className="space-y-2">
                           <h2 className="text-2xl font-black text-slate-900 mt-8 mb-4">{head}:</h2>
                           <p className="whitespace-pre-line">{body}</p>
                        </div>
                      );
                    }
                    return <p key={i} className="whitespace-pre-line">{para}</p>;
                  })}
               </div>
             ) : (
               <p>{article.description}</p>
             )}
          </div>

          {/* Tags Cloud */}
          <section className="mt-16 pt-8 border-t border-slate-100">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Related Topics</h3>
             <div className="flex flex-wrap gap-2">
                {article.tags?.map(tag => (
                   <button key={tag} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-900 text-slate-900 text-xs font-bold hover:bg-slate-50 transition group">
                      {tag} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                ))}
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Vertical Ad Banner */}
          <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-500" alt="Ad background" />
             <div className="relative z-10 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Advertise with us</span>
                <h3 className="text-2xl font-black text-slate-900 mb-2">10th GLOBAL SUMMIT</h3>
                <p className="text-red-600 font-bold text-sm mb-6">REGISTER NOW</p>
                <div className="w-full aspect-[2/3] bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border-2 border-white/10 shadow-xl mb-6">
                   <div className="text-center px-4">
                      <div className="w-12 h-12 bg-red-600 rounded mx-auto mb-4 animate-pulse"></div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Jan 04-05, 2026</p>
                      <p className="text-xs text-white font-bold">Tech Alliance Global Summit</p>
                   </div>
                </div>
                <button className="w-full bg-slate-950 text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:shadow-slate-900/40 transition">Learn More</button>
             </div>
          </div>

          {/* Most Viewed Stories */}
          <section>
             <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900 mb-6">
                <TrendingUp size={18} className="text-slate-900" />
                <h2 className="text-lg font-black uppercase tracking-tight">Most Viewed Stories</h2>
             </div>
             <div className="space-y-6">
                {trending.map((story, idx) => (
                  <Link key={story.id} to={`/articles/${story.id}`} className="flex gap-4 group">
                     <span className="text-3xl font-black text-slate-200 flex-shrink-0 pt-1">{idx + 1}</span>
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold text-red-600 uppercase">{story.companyName}</span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                          {story.title}
                        </h4>
                     </div>
                  </Link>
                ))}
             </div>
          </section>
        </aside>
      </div>

      {/* Bottom Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-20">
         <div className="w-full bg-slate-900 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-1">REGISTER NOW</h3>
                <p className="text-slate-400 text-sm font-bold uppercase">10th Global Summit Hosted by Tech Alliance</p>
             </div>
             <button className="relative z-10 bg-red-600 text-white px-8 py-3 rounded-lg font-black text-sm shadow-xl hover:bg-red-700 transition">GET TICKETS</button>
             <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
         </div>
      </div>
    </article>
  );
};

export default ArticleView;