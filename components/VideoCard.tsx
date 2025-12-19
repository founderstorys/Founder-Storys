import React from 'react';
import { Play, Users, Calendar, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Interview } from '../types';

interface VideoCardProps {
  interview: Interview;
}

const VideoCard: React.FC<VideoCardProps> = ({ interview }) => {
  const isVertical = interview.format === 'vertical';

  return (
    <Link 
      to={`/watch/${interview.id}`} 
      className={`group relative block bg-slate-900 rounded-xl overflow-hidden border border-white/5 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/10 flex flex-col ${isVertical ? 'row-span-2' : ''}`}
    >
      {/* Thumbnail Container - Dynamic Aspect Ratio */}
      <div className={`relative w-full overflow-hidden ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
        <img 
          src={interview.thumbnail} 
          alt={interview.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            {interview.youtubeUrl ? <Youtube fill="white" className="text-white" /> : <Play fill="white" className="ml-1 text-white" />}
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          {interview.status === 'live' && (
            <span className="flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              LIVE
            </span>
          )}
          {interview.youtubeUrl && (
             <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
               <Youtube size={12} className="text-red-500" />
               {isVertical ? 'Shorts' : 'YouTube'}
             </span>
          )}
        </div>
        
        {/* Duration / Views overlay */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-2">
            <Users size={12} /> {interview.views.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-2 text-red-500 text-xs font-semibold uppercase tracking-wider">
          {interview.companyName}
        </div>
        <h3 className="text-lg font-bold text-white leading-tight mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
          {interview.title}
        </h3>
        <div className="mt-auto flex items-center justify-between text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {interview.founderName.charAt(0)}
            </div>
            <span className="truncate max-w-[120px]">{interview.founderName}</span>
          </div>
          <div className="flex items-center gap-1 text-xs shrink-0">
            <Calendar size={12} />
            {interview.date}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;