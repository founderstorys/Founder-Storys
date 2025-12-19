import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, User } from 'lucide-react';

const Articles: React.FC = () => {
  const { interviews } = useData();
  const articles = interviews.filter(i => i.category === 'article' || i.category === 'news');

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Articles</h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl">Expert insights, success stories, and deep dives into the founder ecosystem.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map(article => (
              <Link key={article.id} to={`/articles/${article.id}`} className="group space-y-4">
                 <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-100 shadow-sm relative">
                    <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-black uppercase border border-slate-200">{article.companyName}</span>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                       <span className="flex items-center gap-1.5"><User size={12} /> {article.author || article.founderName}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-red-600 transition-colors">
                       {article.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                       {article.description}
                    </p>
                    <div className="pt-2">
                       <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          Read Story <ChevronRight size={14} />
                       </span>
                    </div>
                 </div>
              </Link>
            ))}
         </div>
      </main>
    </div>
  );
};

export default Articles;