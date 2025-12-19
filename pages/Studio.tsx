
import React, { useEffect, useRef, useState } from 'react';
import { 
  Mic, MicOff, Video as VideoIcon, VideoOff, MonitorUp, Settings, 
  Layout, Share2, Users, Download, Zap, Palette, MessageSquare, 
  Image as ImageIcon, Type, MousePointer2, X, CircleCheck, GripVertical,
  Sidebar, Maximize, Grid3x3, RectangleHorizontal, Play, Plus, Trash2,
  MoreVertical, ChevronDown, Copy, Link as LinkIcon, Facebook, Youtube, Twitch, Linkedin,
  FileAudio, FileVideo, Check, Globe, Radio, Lock, CreditCard, TriangleAlert, Clock,
  FileText, Headphones, ArrowDownToLine, Loader2, Minimize, Wand2, Sparkles, HelpCircle, 
  ChevronUp
} from 'lucide-react';
import { SOUND_EFFECTS } from '../constants';
import { useData } from '../context/DataContext';

// --- Types ---

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  avatarColor: string;
}

type LayoutType = 'grid' | 'sidebar' | 'spotlight' | 'solo';

interface Participant {
  id: string;
  name: string;
  type: 'camera' | 'screen';
  isLocal: boolean;
  isOnStage: boolean;
  stream: MediaStream | null;
  avatarUrl?: string; 
  muted: boolean;
  videoOff: boolean;
}

interface Banner {
  id: string;
  text: string;
  type: 'static' | 'ticker';
  isActive: boolean;
}

interface Destination {
  id: string;
  platform: 'youtube' | 'facebook' | 'linkedin' | 'twitch' | 'custom';
  name: string;
  connected: boolean;
  enabled: boolean;
  streamKey?: string;
  url?: string;
}

interface StudioSettings {
  resolution: '720p' | '1080p' | '4k';
  frameRate: '30fps' | '60fps';
  audioEchoCancel: boolean;
  showNames: boolean;
  mirrorVideo: boolean;
  destinations: Destination[];
}

// --- Helpers ---

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getGridClass = (count: number) => {
  if (count <= 1) return 'grid-cols-1';
  if (count <= 2) return 'grid-cols-2';
  if (count <= 4) return 'grid-cols-2';
  return 'grid-cols-3';
};

// --- Helper Components ---

const VideoComponent: React.FC<{ stream: MediaStream | null; isMuted?: boolean; className?: string; poster?: string; videoOff?: boolean; mirror?: boolean }> = ({ stream, isMuted, className, poster, videoOff, mirror }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (videoOff || (!stream && poster)) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 ${className}`}>
        <img src={poster || 'https://via.placeholder.com/150'} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-2xl" />
      </div>
    );
  }

  return (
    <video 
      ref={videoRef}
      autoPlay 
      playsInline 
      muted={isMuted} 
      className={`object-cover bg-black ${className}`} 
      style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}
    />
  );
};

// --- Modals ---

const AIBackgroundModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors z-10"><X size={24}/></button>
        
        <div className="p-10 text-center space-y-6">
           <div className="inline-flex items-center gap-2 bg-[#FFD700]/20 border border-[#FFD700] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#B8860B]">
             🥳 Welcome Offer
           </div>
           <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Turn ideas into stunning AI backgrounds</h2>
           <p className="text-slate-500 font-medium text-lg">Write a few words, and watch AI generate a unique background that perfectly fits your style.</p>
           
           <div className="bg-[#f8fafc] rounded-[32px] p-8 text-left border border-slate-100">
              <div className="mb-6">
                 <h3 className="text-3xl font-black text-slate-900">Core</h3>
                 <p className="text-slate-500 font-medium mt-1">Dive deeper into streaming, expand your reach and brand.</p>
              </div>
              <ul className="space-y-4">
                 {[
                   { text: 'AI Backgrounds', badge: 'NEW' },
                   { text: 'Full HD (1080p)' },
                   { text: 'No StreamYard logo on your streams' },
                   { text: 'Logos, Overlays, Video clips, Backgrounds' },
                   { text: 'Reusable studios' },
                   { text: 'Multistream - 3 destinations' },
                   { text: 'Unlimited streaming and recording' },
                   { text: 'and much more', info: true },
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                      <Check size={18} className="text-blue-600 shrink-0" />
                      {item.text}
                      {item.badge && <span className="bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded ml-1 uppercase">{item.badge}</span>}
                      {item.info && <HelpCircle size={14} className="text-blue-600" />}
                   </li>
                 ))}
              </ul>
           </div>

           <div className="grid grid-cols-2 gap-4 pt-4">
              <button onClick={onClose} className="py-4 rounded-xl border-2 border-blue-600 text-blue-600 font-black text-sm hover:bg-blue-50 transition-all">Continue with Free Trial</button>
              <button className="py-4 rounded-xl bg-blue-600 text-white font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">Try for just ₹100</button>
           </div>
           
           <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline pt-2">Show other plans</button>
           
           <div className="flex justify-center items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest pt-4">
              <Check size={14} /> Easy to cancel. No commitments.
           </div>
        </div>
      </div>
    </div>
  );
};

const InviteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const link = window.location.href;
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-900 uppercase italic">Invite Guest</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
        </div>
        <p className="text-slate-500 text-sm mb-6 font-medium">Share this private studio link with your guests to begin the session.</p>
        <div className="flex gap-2 mb-8">
          <input readOnly value={link} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono overflow-hidden text-ellipsis whitespace-nowrap" />
          <button onClick={handleCopy} className={`px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2 ${copied ? 'bg-green-600 text-white' : 'bg-slate-900 hover:bg-black text-white'}`}>
             {copied ? <Check size={18}/> : <Copy size={18}/>}
             {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="text-[10px] text-slate-400 text-center font-black uppercase tracking-widest">No additional software required.</div>
      </div>
    </div>
  );
};

const ShareBroadcastModal: React.FC<{ isOpen: boolean; onClose: () => void; activeDestinations: Destination[] }> = ({ isOpen, onClose, activeDestinations }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-slate-900 uppercase italic flex items-center gap-2"><Share2 size={24}/> Public Links</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900"><X size={24}/></button>
        </div>
        <p className="text-slate-500 text-sm mb-8 font-medium">Copy links for your audience to watch live on your enabled channels.</p>
        <div className="space-y-6">
           {activeDestinations.length === 0 && (
              <p className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-bold">No active destinations. Add a channel in Settings to stream.</p>
           )}
           {activeDestinations.map(dest => (
             <div key={dest.id} className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   {dest.platform === 'youtube' && <Youtube size={12} className="text-red-600"/>}
                   {dest.platform === 'facebook' && <Facebook size={12} className="text-blue-600"/>}
                   {dest.platform === 'linkedin' && <Linkedin size={12} className="text-blue-500"/>}
                   {dest.platform === 'twitch' && <Twitch size={12} className="text-purple-600"/>}
                   {dest.name}
                </div>
                <div className="flex gap-2">
                   <input readOnly value={`https://${dest.platform}.com/live/founder-storys`} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-600 font-mono text-ellipsis" />
                   <button 
                     onClick={() => handleCopy(dest.id, `https://${dest.platform}.com/live/founder-storys`)}
                     className={`px-4 py-3 rounded-xl text-xs font-black transition flex items-center gap-1 ${copiedId === dest.id ? 'bg-green-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                   >
                     {copiedId === dest.id ? <Check size={16}/> : <Copy size={16}/>}
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const DownloadModal: React.FC<{ isOpen: boolean; onClose: () => void; settings: StudioSettings; reason?: string }> = ({ isOpen, onClose, settings, reason }) => {
  const [downloadingMaster, setDownloadingMaster] = useState(false);
  const handleDownload = (filename: string, ext: string = 'mp4') => {
     setDownloadingMaster(true);
     setTimeout(() => {
        const blob = new Blob(["This is a simulated broadcast file."], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `${filename}.${ext}`;
        document.body.appendChild(a); a.click();
        window.URL.revokeObjectURL(url); document.body.removeChild(a);
        setDownloadingMaster(false);
     }, 2000);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-xl animate-in fade-in duration-300 p-4">
       <div className="bg-white w-full max-w-[800px] rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-slate-100 p-12 md:p-16 flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-8 mb-16 animate-in slide-in-from-top-4 duration-500">
             <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-[0_10px_30px_rgba(34,197,94,0.1)] border border-green-100">
                <CircleCheck size={44} strokeWidth={2.5} />
             </div>
             <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-3">Session Wrapped</h2>
                <p className="text-slate-400 text-lg font-bold">The broadcast tracks have been finalized.</p>
             </div>
          </div>
          <div className="bg-white border-2 border-slate-50 rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.03)] mb-8 transition-all hover:shadow-2xl hover:shadow-slate-100">
             <div className="flex items-center gap-8 mb-8 md:mb-0">
                <div className="w-24 h-24 bg-[#2563eb] rounded-[32px] flex items-center justify-center text-white font-black text-xl shadow-[0_15px_30px_rgba(37,99,235,0.3)]">MP4</div>
                <div className="text-center md:text-left">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1">Master Composed File</h3>
                   <p className="text-sm font-black text-slate-300 uppercase tracking-[0.2em]">{settings.resolution} • Variable Frame Rate</p>
                </div>
             </div>
             <button onClick={() => handleDownload('Master_Broadcast')} disabled={downloadingMaster} className="bg-white border-2 border-slate-100 hover:border-slate-900 px-10 py-5 rounded-[24px] flex items-center gap-4 transition-all group active:scale-95 disabled:opacity-50">
                {downloadingMaster ? <Loader2 className="animate-spin text-slate-900" size={24}/> : <Download className="text-slate-900 group-hover:translate-y-0.5 transition-transform" size={24} />}
                <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">{downloadingMaster ? 'Finalizing...' : 'Download'}</span>
             </button>
          </div>
          <div className="bg-[#f8fafc] rounded-[48px] p-10 md:p-12 mb-12">
             <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center md:text-left">High Fidelity Multi-Tracks</h4>
             <div className="space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-[32px] flex items-center justify-between shadow-sm border border-slate-50 transition-all hover:shadow-md hover:scale-[1.01]">
                   <div className="flex items-center gap-6"><div className="text-[#8b5cf6]"><FileVideo size={32} /></div><span className="text-xl font-black text-slate-900 tracking-tight">Host Primary Video</span></div>
                   <button onClick={() => handleDownload('Host_Video')} className="text-slate-200 hover:text-slate-900 transition-colors"><ArrowDownToLine size={28} /></button>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-[32px] flex items-center justify-between shadow-sm border border-slate-50 transition-all hover:shadow-md hover:scale-[1.01]">
                   <div className="flex items-center gap-6"><div className="text-[#f97316]"><Headphones size={32} /></div><span className="text-xl font-black text-slate-900 tracking-tight">Lossless Master Audio (WAV)</span></div>
                   <button onClick={() => handleDownload('Master_Audio', 'wav')} className="text-slate-200 hover:text-slate-900 transition-colors"><ArrowDownToLine size={28} /></button>
                </div>
             </div>
          </div>
          <div className="flex justify-center md:justify-end">
             <button onClick={onClose} className="bg-[#0f172a] text-white px-16 py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:bg-black hover:-translate-y-1 transition-all active:translate-y-0">Exit Session</button>
          </div>
       </div>
    </div>
  );
};

const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void; settings: StudioSettings; updateSettings: (k: keyof StudioSettings, v: any) => void }> = ({ isOpen, onClose, settings, updateSettings }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'recording' | 'destinations'>('general');
  const [newDestOpen, setNewDestOpen] = useState(false);
  const [rtmpForm, setRtmpForm] = useState({ url: '', key: '' });
  const toggleDestination = (id: string) => {
    const updated = settings.destinations.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d);
    updateSettings('destinations', updated);
  };
  const removeDestination = (id: string) => {
    const updated = settings.destinations.filter(d => d.id !== id);
    updateSettings('destinations', updated);
  };
  const addDestination = (platform: Destination['platform']) => {
    const newDest: Destination = {
       id: Date.now().toString(), platform, name: platform === 'custom' ? 'Custom RTMP' : `${platform.charAt(0).toUpperCase() + platform.slice(1)} Channel`, connected: true, enabled: true,
       url: platform === 'custom' ? rtmpForm.url : undefined, streamKey: platform === 'custom' ? rtmpForm.key : undefined
    };
    updateSettings('destinations', [...settings.destinations, newDest]);
    setNewDestOpen(false); setRtmpForm({ url: '', key: '' });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Studio Config</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
        </div>
        <div className="flex flex-1 overflow-hidden">
           <div className="w-56 bg-white border-r border-slate-100 p-6 space-y-2">
              <button onClick={() => setActiveTab('general')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'general' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>General</button>
              <button onClick={() => setActiveTab('recording')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'recording' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Recording</button>
              <button onClick={() => setActiveTab('destinations')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'destinations' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Multistream</button>
           </div>
           <div className="flex-1 p-10 overflow-y-auto bg-slate-50/30">
              {activeTab === 'general' && (
                  <div className="space-y-8">
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                         <div><h4 className="text-slate-900 font-bold">Display Tags</h4><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Show name tags on stage</p></div>
                         <button onClick={() => updateSettings('showNames', !settings.showNames)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings.showNames ? 'bg-blue-600 shadow-inner' : 'bg-slate-200'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.showNames ? 'left-7 shadow-md' : 'left-1'}`}></div></button>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                         <div><h4 className="text-slate-900 font-bold">Mirror Preview</h4><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Flip local camera feed</p></div>
                         <button onClick={() => updateSettings('mirrorVideo', !settings.mirrorVideo)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings.mirrorVideo ? 'bg-blue-600 shadow-inner' : 'bg-slate-200'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.mirrorVideo ? 'left-7 shadow-md' : 'left-1'}`}></div></button>
                      </div>
                  </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}

// --- Main Component ---

const Studio: React.FC = () => {
  const { appSettings, interviews } = useData();
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  
  const scheduledInterview = interviews.find(i => i.status === 'upcoming' && i.applicationType === 'live');
  const hostName = scheduledInterview ? scheduledInterview.founderName : 'You (Host)';
  
  const [settings, setSettings] = useState<StudioSettings>({
    resolution: '1080p', frameRate: '30fps', audioEchoCancel: true, showNames: true, mirrorVideo: true, destinations: []
  });

  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'local-1', name: hostName, type: 'camera', isLocal: true, isOnStage: true, stream: null, muted: false, videoOff: false },
  ]);
  
  const [banners, setBanners] = useState<Banner[]>([
    { id: 'b1', text: 'Welcome to Founder Storys Studio! 🚀', type: 'ticker', isActive: true },
    { id: 'b2', text: 'Live Episode: Market Disruption', type: 'static', isActive: false },
  ]);

  const [activeLayout, setActiveLayout] = useState<LayoutType>('grid');
  const [isLive, setIsLive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [downloadModalReason, setDownloadModalReason] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [showSettings, setShowSettings] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'chat' | 'brand' | 'banners' | 'media'>('brand');
  const [brandColor, setBrandColor] = useState('#ef4444');
  const [brandTheme, setBrandTheme] = useState<'minimal' | 'bold' | 'bubble' | 'classic'>('minimal');
  const [logo, setLogo] = useState<string | null>(null);
  const [studioBackground, setStudioBackground] = useState<string>('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop');

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
      { id: '1', sender: 'Producer', text: 'Ready for broadcast. Audio levels look great.', time: '10:00 AM', avatarColor: 'bg-slate-900' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [bannerInput, setBannerInput] = useState('');

  const BACKGROUNDS = [
    { id: 'blue-waves', name: 'Blue Waves', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop' },
    { id: 'black-mountains', name: 'Black Mountains', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=400&auto=format&fit=crop' },
    { id: 'purple-waves', name: 'Purple Waves', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop' },
    { id: 'cyan-sky', name: 'Cyan Sky', url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop' },
    { id: 'cyan-waves', name: 'Cyan Waves', url: 'https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=400&auto=format&fit=crop' },
    { id: 'blue-pink', name: 'Blue Pink Gradient', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&auto=format&fit=crop' },
    { id: 'purple-pink', name: 'Purple Pink Gradient', url: 'https://images.unsplash.com/photo-1560015534-cee980ba7e13?q=80&w=400&auto=format&fit=crop' },
    { id: 'cyan-gradient', name: 'Cyan Gradient', url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=400&auto=format&fit=crop' },
  ];

  const VIDEO_CLIPS = [
    { id: 't10', name: 'Timer 10s', duration: '0:10', url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-countdown-timer-1301-large.mp4' },
    { id: 't30', name: 'Timer 30s', duration: '0:30', url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-countdown-timer-1301-large.mp4' },
    { id: 'thanks', name: 'Thank you', duration: '0:15', url: '' },
    { id: 'starting', name: 'Stream starting...', duration: '0:15', url: '' },
    { id: 'brb', name: 'Be Right Back', duration: '0:15', url: '' },
  ];

  const toggleStage = (id: string) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, isOnStage: !p.isOnStage } : p));
  };

  const handleScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenParticipant: Participant = { id: 'screen-' + Date.now(), name: 'Presentation', type: 'screen', isLocal: true, isOnStage: true, stream: screenStream, muted: true, videoOff: false };
      setParticipants(prev => [...prev, screenParticipant]);
      setActiveLayout('sidebar'); 
      screenStream.getVideoTracks()[0].onended = () => { setParticipants(prev => prev.filter(p => p.id !== screenParticipant.id)); };
    } catch (err) { console.error("Screen share cancelled", err); }
  };

  const toggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) { stageRef.current.requestFullscreen().catch(err => { console.error(`Error enabling: ${err.message}`); }); setIsFullscreen(true); } 
    else { document.exitFullscreen(); setIsFullscreen(false); }
  };

  useEffect(() => {
    async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setParticipants(prev => prev.map(p => p.id === 'local-1' ? { ...p, stream } : p));
      } catch (err) { console.error("Error media devices.", err); }
    }
    initStream();
  }, []);

  const activeParticipants = participants.filter(p => p.isOnStage);
  const activeBanner = banners.find(b => b.isActive);
  const localParticipant = participants.find(p => p.isLocal);
  const activeDestinations = settings.destinations.filter(d => d.enabled);
  const sortedActiveParticipants = [...activeParticipants].sort((a, b) => a.type === 'screen' ? -1 : 1);

  return (
    <div className="h-[calc(100vh-64px)] bg-[#f1f5f9] text-slate-900 flex overflow-hidden font-sans">
      <AIBackgroundModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} settings={settings} updateSettings={(k, v) => setSettings(p => ({...p, [k]: v}))} />
      <InviteModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />
      <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} settings={settings} reason={downloadModalReason} />
      <ShareBroadcastModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} activeDestinations={activeDestinations} />

      {/* ================= LEFT SECTION: STAGE & CONTROLS ================= */}
      <div className="flex-grow flex flex-col relative min-w-0">
        <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 z-20 shadow-sm">
          <div className="flex items-center gap-6">
             {isLive && <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-xl border border-red-100"><div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div><span className="text-[10px] text-red-600 font-black uppercase tracking-[0.2em]">Live Stream Active</span></div>}
             {!isLive && <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center justify-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Studio Connection Optimized</span></div>}
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setShowShareModal(true)} className="px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2 transition-all border border-transparent hover:border-slate-200"><Share2 size={16} /> Public Links</button>
             <button onClick={() => setIsRecording(!isRecording)} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${isRecording ? 'border-red-600 text-red-600 bg-red-50' : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'}`}>{isRecording ? 'Halt Recording' : 'Start Recording'}</button>
             <button onClick={() => setIsLive(!isLive)} className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center gap-2 ${isLive ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'}`}>{isLive ? 'Stop Broadcast' : 'Go Live Now'}</button>
          </div>
        </div>

        <div className="flex-grow bg-slate-100 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div ref={stageRef} className="relative w-full h-full max-h-[80vh] aspect-video transition-all duration-300 group rounded-[48px] shadow-2xl p-4 border-[16px] border-white overflow-hidden">
                {/* Dynamic Studio Background */}
                <div className="absolute inset-0 z-0">
                  <img src={studioBackground} className="w-full h-full object-cover" alt="Stage Bg" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                
                {logo && <img src={logo} alt="Logo" className="absolute top-8 right-8 w-24 z-20 drop-shadow-2xl" />}
                
                <div className="relative z-10 w-full h-full">
                  {activeParticipants.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center rounded-[32px] bg-slate-900/20">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-2xl"><MonitorUp className="text-slate-400" size={40} /></div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">The Loft is Empty</h3>
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full h-full rounded-[32px] overflow-hidden ${activeLayout === 'sidebar' ? 'flex gap-4' : (activeLayout === 'spotlight' || activeLayout === 'solo') ? 'block' : `grid gap-4 ${getGridClass(activeParticipants.length)}`}`}>
                      {activeLayout === 'sidebar' ? (
                          <>
                            <div className="flex-[3] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"><ParticipantFrame participant={sortedActiveParticipants[0]} showName={settings.showNames} brandColor={brandColor} mirrorLocal={settings.mirrorVideo} /></div>
                            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
                                {sortedActiveParticipants.slice(1).map(p => (<div key={p.id} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 shadow-lg"><ParticipantFrame participant={p} showName={settings.showNames} brandColor={brandColor} mirrorLocal={settings.mirrorVideo} small /></div>))}
                            </div>
                          </>
                      ) : (activeLayout === 'spotlight' || activeLayout === 'solo') ? (
                        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"><ParticipantFrame participant={activeParticipants[0]} showName={settings.showNames} brandColor={brandColor} mirrorLocal={settings.mirrorVideo} /></div>
                      ) : (
                        activeParticipants.map(p => (<div key={p.id} className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl"><ParticipantFrame participant={p} showName={settings.showNames} brandColor={brandColor} mirrorLocal={settings.mirrorVideo} /></div>))
                      )}
                    </div>
                  )}
                </div>

                {activeBanner && (
                    <div className="absolute bottom-12 left-0 right-0 z-30 px-12 flex justify-center pointer-events-none">
                        {activeBanner.type === 'ticker' ? (
                            <div className="w-full bg-white/90 text-slate-900 py-4 border-y-4 border-red-600 overflow-hidden shadow-2xl backdrop-blur-xl"><div className="animate-ticker font-black text-2xl uppercase italic whitespace-nowrap pl-[100%] tracking-tighter">{activeBanner.text}</div></div>
                        ) : (
                            <div className="bg-slate-900 text-white px-12 py-6 rounded-3xl shadow-2xl font-black text-3xl animate-in slide-in-from-bottom-4 duration-300 max-w-4xl text-center border-b-8 border-red-600 uppercase tracking-tighter italic">{activeBanner.text}</div>
                        )}
                    </div>
                )}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl z-30">
               <LayoutBtn icon={<RectangleHorizontal size={18}/>} label="Solo" active={activeLayout === 'solo'} onClick={() => setActiveLayout('solo')} />
               <LayoutBtn icon={<Grid3x3 size={18}/>} label="Grid" active={activeLayout === 'grid'} onClick={() => setActiveLayout('grid')} />
               <LayoutBtn icon={<Sidebar size={18}/>} label="Side" active={activeLayout === 'sidebar'} onClick={() => setActiveLayout('sidebar')} />
               <LayoutBtn icon={isFullscreen ? <Minimize size={18}/> : <Maximize size={18}/>} label="Spotlight" active={activeLayout === 'spotlight'} onClick={() => { setActiveLayout('spotlight'); toggleFullscreen(); }} />
            </div>
        </div>

        <div className="h-40 bg-white border-t border-slate-200 flex items-center px-8 gap-6 overflow-x-auto relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <button onClick={() => setShowInviteModal(true)} className="flex-shrink-0 w-44 h-28 border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all group"><div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-blue-100 mb-2 transition-colors"><Plus size={24} /></div><p className="text-[10px] font-black uppercase tracking-widest">Add Guest</p></button>
            {participants.map(p => (
              <div key={p.id} className={`group relative flex-shrink-0 w-44 h-28 rounded-3xl overflow-hidden border-4 transition-all shadow-sm ${p.isOnStage ? 'border-blue-600 ring-8 ring-blue-50' : 'border-slate-50 opacity-60 hover:opacity-100 hover:border-slate-200'}`}>
                 <VideoComponent stream={p.stream} poster={p.avatarUrl} isMuted={true} videoOff={p.videoOff} className="w-full h-full" mirror={p.isLocal && settings.mirrorVideo} />
                 <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-tighter truncate max-w-[80%] border border-slate-100">{p.name}</div>
                 <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-white/90 rounded-lg shadow-sm border border-slate-100">{p.muted ? <MicOff size={12} className="text-red-600"/> : <Mic size={12} className="text-slate-400" />}</div>
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]"><button onClick={() => toggleStage(p.id)} className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl transform hover:scale-105 active:scale-95 transition-all ${p.isOnStage ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>{p.isOnStage ? 'Backstage' : 'Put On Air'}</button></div>
              </div>
            ))}
        </div>

        <div className="h-24 bg-white border-t border-slate-200 flex items-center justify-center gap-6 px-8 z-30">
             <ToolBtn icon={localParticipant?.muted ? <MicOff size={24}/> : <Mic size={24}/>} label={localParticipant?.muted ? "Unmute" : "Mute"} active={!localParticipant?.muted} onClick={() => setParticipants(prev => prev.map(p => p.isLocal && p.type === 'camera' ? {...p, muted: !p.muted} : p))} />
             <ToolBtn icon={localParticipant?.videoOff ? <VideoOff size={24}/> : <VideoIcon size={24}/>} label={localParticipant?.videoOff ? "Start Cam" : "Stop Cam"} active={!localParticipant?.videoOff} onClick={() => setParticipants(prev => prev.map(p => p.isLocal && p.type === 'camera' ? {...p, videoOff: !p.videoOff} : p))} />
             <div className="w-px h-12 bg-slate-200 mx-2"></div>
             <ToolBtn icon={<MonitorUp size={24}/>} label="Screen" onClick={handleScreenShare} active={!participants.some(p => p.type === 'screen' && p.isLocal)} />
             <ToolBtn icon={<Users size={24}/>} label="Guest" onClick={() => setShowInviteModal(true)} />
             <div className="w-px h-12 bg-slate-200 mx-2"></div>
             <ToolBtn icon={<Settings size={24}/>} label="Settings" onClick={() => setShowSettings(true)} />
        </div>
      </div>

      {/* RIGHT SECTION: PRODUCTION SIDEBAR */}
      <div className="w-96 bg-white border-l border-slate-200 flex flex-col z-20 shadow-2xl">
          <div className="flex border-b border-slate-200 bg-slate-50/50 p-2 gap-1">
             <TabBtn label="Brand" active={activeTab === 'brand'} onClick={() => setActiveTab('brand')} icon={<Palette size={16}/>} />
             <TabBtn label="Visuals" active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={<ImageIcon size={16}/>} />
             <TabBtn label="Grafx" active={activeTab === 'banners'} onClick={() => setActiveTab('banners')} icon={<Type size={16}/>} />
             <TabBtn label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageSquare size={16}/>} />
          </div>

          <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
              {activeTab === 'brand' && (
                <div className="space-y-10 animate-in slide-in-from-right-4">
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Master Highlight</h3>
                      <div className="flex gap-3 flex-wrap">{['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'].map(color => (<button key={color} onClick={() => setBrandColor(color)} className={`w-10 h-10 rounded-2xl border-4 transition-all hover:scale-110 ${brandColor === color ? 'border-white ring-4 ring-slate-100 shadow-lg' : 'border-white border-opacity-50'}`} style={{ backgroundColor: color }} />))}</div>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Graphics Theme</h3>
                      <div className="grid grid-cols-2 gap-4">{['minimal', 'bold', 'bubble', 'classic'].map(theme => (<button key={theme} onClick={() => setBrandTheme(theme as any)} className={`h-24 bg-slate-50 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${brandTheme === theme ? 'border-blue-600 bg-white shadow-xl' : 'border-slate-100 hover:border-slate-200'}`}><div className="w-12 h-2 bg-slate-200 rounded-full"></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{theme}</span></button>))}</div>
                    </div>
                </div>
              )}

              {activeTab === 'media' && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                    {/* BACKGROUND SECTION */}
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <h3 className="text-xl font-black text-slate-900">Background</h3>
                          <HelpCircle size={18} className="text-blue-600" />
                          <button className="text-slate-400"><ChevronUp size={20}/></button>
                       </div>
                       
                       {/* AI GENERATE BUTTON */}
                       <button 
                         onClick={() => setShowAIModal(true)}
                         className="w-full py-4 rounded-xl border-2 border-[#E0E7FF] bg-white flex items-center justify-center gap-3 text-slate-700 font-bold hover:bg-slate-50 transition-all relative overflow-hidden group shadow-sm"
                       >
                          <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-yellow-400 to-transparent flex items-center justify-center transform translate-x-3 -translate-y-3 rotate-45">
                             <Sparkles size={12} className="text-white -rotate-45" />
                          </div>
                          <Wand2 size={20} className="text-blue-600" />
                          AI Generate
                       </button>

                       {/* GRID OF PRESETS */}
                       <div className="grid grid-cols-3 gap-x-3 gap-y-6">
                          {BACKGROUNDS.map(bg => (
                             <button key={bg.id} onClick={() => setStudioBackground(bg.url)} className="group space-y-2 text-left">
                                <div className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${studioBackground === bg.url ? 'border-blue-600 ring-2 ring-blue-100 shadow-md' : 'border-transparent hover:border-slate-200'}`}>
                                   <img src={bg.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={bg.name} />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 leading-tight line-clamp-1">{bg.name}</p>
                             </button>
                          ))}
                          <button className="group space-y-2 text-left">
                             <div className="aspect-[4/3] rounded-lg border-2 border-slate-100 border-dashed flex flex-col items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-200 transition-all">
                                <Plus size={20} />
                                <span className="text-[8px] font-black uppercase mt-1">More</span>
                             </div>
                             <p className="text-[10px] font-bold text-slate-500">More</p>
                          </button>
                       </div>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    {/* VIDEO CLIPS SECTION */}
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <h3 className="text-xl font-black text-slate-900">Video clips</h3>
                          <HelpCircle size={18} className="text-blue-600" />
                          <button className="text-slate-400"><ChevronUp size={20}/></button>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-3">
                          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-100 border-dashed text-slate-400 font-bold text-xs hover:border-blue-200 hover:text-blue-600 transition-all relative overflow-hidden group">
                             <Plus size={16} /> Intro video
                             <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-yellow-400 to-transparent transform translate-x-2 -translate-y-2 rotate-45"><Sparkles size={10} className="text-white -rotate-45 ml-2 mt-2" /></div>
                          </button>
                          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-100 border-dashed text-slate-400 font-bold text-xs hover:border-blue-200 hover:text-blue-600 transition-all relative overflow-hidden group">
                             <Plus size={16} /> Outro video
                             <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-yellow-400 to-transparent transform translate-x-2 -translate-y-2 rotate-45"><Sparkles size={10} className="text-white -rotate-45 ml-2 mt-2" /></div>
                          </button>
                       </div>

                       <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-slate-200 rounded flex items-center justify-center"><Check size={12} className="text-transparent" /></div>
                          <span className="text-sm font-bold text-slate-700">Loop</span>
                          <HelpCircle size={14} className="text-blue-600" />
                       </div>

                       <div className="grid grid-cols-3 gap-x-3 gap-y-6">
                          {VIDEO_CLIPS.map(clip => (
                             <button key={clip.id} className="group space-y-2 text-left">
                                <div className="aspect-[4/3] bg-slate-900 rounded-lg relative flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-blue-600 transition-all">
                                   <Play size={16} className="text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                                   <div className="absolute bottom-1 left-1.5 text-[8px] font-black text-white">{clip.duration}</div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 leading-tight line-clamp-1">{clip.name}</p>
                             </button>
                          ))}
                          <button className="group space-y-2 text-left">
                             <div className="aspect-[4/3] rounded-lg border-2 border-slate-100 border-dashed flex flex-col items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-200 transition-all relative overflow-hidden">
                                <Plus size={20} />
                                <span className="text-[8px] font-black uppercase mt-1">More</span>
                                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-yellow-400 to-transparent transform translate-x-2 -translate-y-2 rotate-45"><Sparkles size={10} className="text-white -rotate-45 ml-2 mt-2" /></div>
                             </div>
                             <p className="text-[10px] font-bold text-slate-500">More</p>
                          </button>
                       </div>
                    </div>
                 </div>
              )}

              {activeTab === 'banners' && (
                  <div className="flex flex-col h-full animate-in slide-in-from-right-4">
                     <form onSubmit={(e) => { e.preventDefault(); if (!bannerInput.trim()) return; setBanners(prev => prev.map(b => ({...b, isActive: false})).concat({ id: Date.now().toString(), text: bannerInput, type: 'static', isActive: true })); setBannerInput(''); }} className="mb-10"><textarea className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm font-bold focus:border-blue-600 transition-all resize-none text-slate-900 shadow-inner" placeholder="Headline text..." rows={3} value={bannerInput} onChange={(e) => setBannerInput(e.target.value)} /><button type="submit" className="mt-4 w-full py-4 bg-slate-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition shadow-xl">Apply Graphic</button></form>
                     <div className="space-y-4">{banners.map(banner => (<div key={banner.id} className={`group relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${banner.isActive ? 'bg-blue-50 border-blue-600 shadow-md' : 'bg-white border-slate-100 hover:border-slate-200'}`} onClick={() => setBanners(prev => prev.map(b => b.id === banner.id ? {...b, isActive: !b.isActive} : {...b, isActive: false}))}><p className={`text-sm font-black uppercase tracking-tight ${banner.isActive ? 'text-blue-900' : 'text-slate-600'}`}>{banner.text}</p><div className="mt-2 flex items-center justify-between"><span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{banner.type}</span>{banner.isActive && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>}</div></div>))}</div>
                  </div>
              )}

              {activeTab === 'chat' && (
                <div className="flex flex-col h-full animate-in slide-in-from-right-4">
                   <div className="flex-grow space-y-6 mb-6">{chatMessages.map(msg => (<div key={msg.id} className="flex gap-4 group"><div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white shadow-xl ${msg.avatarColor} transition-transform group-hover:scale-110`}>{msg.sender.charAt(0)}</div><div><div className="flex items-baseline gap-3"><span className="text-xs font-black uppercase text-slate-900 tracking-tight">{msg.sender}</span><span className="text-[9px] font-bold text-slate-400">{msg.time}</span></div><p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">{msg.text}</p></div></div>))}<div ref={chatBottomRef} /></div>
                   <form onSubmit={(e) => { e.preventDefault(); if (!chatInput.trim()) return; setChatMessages([...chatMessages, { id: Date.now().toString(), sender: 'You', text: chatInput, time: 'Live', avatarColor: 'bg-red-600' }]); setChatInput(''); }} className="relative"><input className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-6 pr-14 py-5 text-sm font-bold focus:border-blue-600 transition outline-none shadow-inner" placeholder="Host communication..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} /><button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition shadow-lg"><Zap size={18} fill="currentColor" /></button></form>
                </div>
              )}
          </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const ParticipantFrame: React.FC<{ participant: Participant, showName: boolean, brandColor: string, small?: boolean, mirrorLocal?: boolean }> = ({ participant, showName, brandColor, small, mirrorLocal }) => (
  <>
    <VideoComponent stream={participant.stream} poster={participant.avatarUrl} isMuted={participant.isLocal} videoOff={participant.videoOff} className="w-full h-full" mirror={participant.isLocal && mirrorLocal && participant.type === 'camera'} />
    {showName && (
      <div className={`absolute left-6 z-10 ${small ? 'bottom-3 left-3' : 'bottom-6 left-6'}`}>
        <div className="bg-white/90 backdrop-blur-xl text-slate-900 px-4 py-2 rounded-2xl border-l-8 shadow-2xl flex items-center gap-3 transition-all" style={{ borderLeftColor: brandColor }}>
           {participant.type === 'screen' && <MonitorUp size={14} className="text-blue-600"/>}
           <span className={`font-black uppercase tracking-tighter italic ${small ? 'text-[10px]' : 'text-sm'}`}>{participant.name}</span>
        </div>
      </div>
    )}
    <div className={`absolute top-4 right-4 flex gap-2 ${small ? 'scale-75 origin-top-right' : ''}`}>
      {participant.muted && <div className="bg-red-600 text-white p-2 rounded-xl shadow-xl border border-red-500"><MicOff size={16} /></div>}
    </div>
  </>
);

const ToolBtn: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void, active?: boolean }> = ({ icon, label, onClick, active = true }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group min-w-[70px]">
    <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center transition-all duration-300 ${active ? 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-900 hover:text-white shadow-sm' : 'bg-red-50 text-red-600 border border-red-100 shadow-inner'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">{label}</span>
  </button>
);

const LayoutBtn: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`p-3 rounded-2xl transition-all ${active ? 'bg-slate-900 text-white shadow-2xl scale-110' : 'text-slate-400 hover:bg-slate-100'}`} title={label}>{icon}</button>
);

const TabBtn: React.FC<{ label: string, active: boolean, onClick: () => void, icon: React.ReactNode }> = ({ label, active, onClick, icon }) => (
  <button onClick={onClick} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 rounded-2xl transition-all ${active ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}>
    {icon} {label}
  </button>
);

export default Studio;
