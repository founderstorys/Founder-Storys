
import React, { useEffect, useRef, useState } from 'react';
import { 
  Mic, MicOff, Video as VideoIcon, VideoOff, MonitorUp, Settings, 
  Layout, Share2, Users, Download, Zap, Palette, MessageSquare, 
  Image as ImageIcon, Type, MousePointer2, X, CircleCheck, GripVertical,
  Sidebar, Maximize, Grid3x3, RectangleHorizontal, Play, Plus, Trash2,
  MoreVertical, ChevronDown, Copy, Link as LinkIcon, Facebook, Youtube, Twitch, Linkedin,
  FileAudio, FileVideo, Check, Globe, Radio, Lock, CreditCard, TriangleAlert, Clock
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

// --- Constants ---

const MOCK_GUESTS: Participant[] = [
  { id: 'guest-1', name: 'Sarah (Design)', type: 'camera', isLocal: false, isOnStage: false, stream: null, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', muted: false, videoOff: false },
  { id: 'guest-2', name: 'David (Tech)', type: 'camera', isLocal: false, isOnStage: false, stream: null, avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop', muted: true, videoOff: false },
  { id: 'guest-3', name: 'Michael (Marketing)', type: 'camera', isLocal: false, isOnStage: false, stream: null, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', muted: false, videoOff: false },
  { id: 'guest-4', name: 'Elena (CEO)', type: 'camera', isLocal: false, isOnStage: false, stream: null, avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop', muted: false, videoOff: false },
  { id: 'guest-5', name: 'James (Product)', type: 'camera', isLocal: false, isOnStage: false, stream: null, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop', muted: true, videoOff: true },
];

// --- Helpers ---

// Fix for: Error in file pages/Studio.tsx on line 640: Cannot find name 'formatTime'.
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Fix for: Error in file pages/Studio.tsx on line 676: Cannot find name 'getGridClass'.
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

const InviteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const link = "https://founderstorys.com/invite/s8d-9d2-k2s";

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
          <input readOnly value={link} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono" />
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
  const [isPaying, setIsPaying] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  
  const is4K = settings.resolution === '4k';
  
  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setHasPaid(true);
    }, 2000);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md animate-in fade-in duration-200">
       <div className="bg-white w-full max-w-2xl rounded-[40px] border border-slate-200 shadow-2xl p-12">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-16 h-16 rounded-3xl bg-green-50 flex items-center justify-center text-green-600 border border-green-100 shadow-sm">
                <CircleCheck size={32} />
             </div>
             <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Session Wrapped</h2>
                <p className="text-slate-500 font-medium">{reason || "The broadcast tracks have been finalized."}</p>
             </div>
          </div>

          <div className="space-y-6 mb-12">
             {/* Main Composed Video */}
             <div className={`border rounded-3xl p-6 flex items-center justify-between group transition-all duration-300 ${is4K && !hasPaid ? 'border-yellow-200 bg-yellow-50/50' : 'border-slate-100 bg-slate-50/50 hover:border-blue-500 hover:bg-white hover:shadow-xl'}`}>
                 <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg ${is4K ? 'bg-gradient-to-tr from-yellow-500 to-orange-500' : 'bg-blue-600'}`}>MP4</div>
                    <div>
                       <h4 className="text-slate-900 font-black uppercase tracking-tight">Master Composed File</h4>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{settings.resolution} • Variable Frame Rate</p>
                    </div>
                 </div>
                 
                 {is4K && !hasPaid ? (
                    <button 
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition shadow-lg"
                    >
                       {isPaying ? 'Processing...' : <><CreditCard size={16} className="inline mr-2"/> Pay Upgrade ($29)</>}
                    </button>
                 ) : (
                    <button className="px-6 py-3 bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest transition shadow-sm">
                       <Download size={16} className="inline mr-2" /> Download
                    </button>
                 )}
              </div>
              
              {is4K && !hasPaid && (
                  <div className="text-[10px] text-yellow-600 text-center flex items-center justify-center gap-1 font-black uppercase tracking-widest bg-yellow-50 py-2 rounded-full">
                     <Lock size={12} /> 1080p and 720p versions are unlocked by default.
                  </div>
              )}

             {/* Separate Tracks */}
             <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">High Fidelity Multi-Tracks</h4>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition shadow-sm">
                        <div className="flex items-center gap-4">
                           <FileVideo size={20} className="text-purple-600"/>
                           <span className="text-sm font-bold text-slate-900">Host Primary Video</span>
                        </div>
                        <Download size={20} className="text-slate-300 hover:text-slate-900 cursor-pointer transition-colors"/>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition shadow-sm">
                        <div className="flex items-center gap-4">
                           <FileAudio size={20} className="text-orange-600"/>
                           <span className="text-sm font-bold text-slate-900">Lossless Master Audio (WAV)</span>
                        </div>
                        <Download size={20} className="text-slate-300 hover:text-slate-900 cursor-pointer transition-colors"/>
                    </div>
                 </div>
             </div>
          </div>

          <div className="flex justify-end gap-4">
             <button onClick={onClose} className="px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-black transition shadow-xl shadow-slate-900/20">Exit Session</button>
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
       id: Date.now().toString(),
       platform,
       name: platform === 'custom' ? 'Custom RTMP' : `${platform.charAt(0).toUpperCase() + platform.slice(1)} Channel`,
       connected: true,
       enabled: true,
       url: platform === 'custom' ? rtmpForm.url : undefined,
       streamKey: platform === 'custom' ? rtmpForm.key : undefined
    };
    updateSettings('destinations', [...settings.destinations, newDest]);
    setNewDestOpen(false);
    setRtmpForm({ url: '', key: '' });
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
           {/* Sidebar */}
           <div className="w-56 bg-white border-r border-slate-100 p-6 space-y-2">
              <button onClick={() => setActiveTab('general')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'general' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>General</button>
              <button onClick={() => setActiveTab('recording')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'recording' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Recording</button>
              <button onClick={() => setActiveTab('destinations')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'destinations' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Multistream</button>
           </div>
           
           {/* Content Area */}
           <div className="flex-1 p-10 overflow-y-auto bg-slate-50/30">
              
              {activeTab === 'general' && (
                  <div className="space-y-8">
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                         <div>
                            <h4 className="text-slate-900 font-bold">Display Tags</h4>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Show name tags on stage</p>
                         </div>
                         <button onClick={() => updateSettings('showNames', !settings.showNames)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings.showNames ? 'bg-blue-600 shadow-inner' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.showNames ? 'left-7 shadow-md' : 'left-1'}`}></div>
                         </button>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                         <div>
                            <h4 className="text-slate-900 font-bold">Mirror Preview</h4>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Flip local camera feed</p>
                         </div>
                         <button onClick={() => updateSettings('mirrorVideo', !settings.mirrorVideo)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings.mirrorVideo ? 'bg-blue-600 shadow-inner' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.mirrorVideo ? 'left-7 shadow-md' : 'left-1'}`}></div>
                         </button>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                         <div>
                            <h4 className="text-slate-900 font-bold">Echo Cancellation</h4>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Digital noise reduction</p>
                         </div>
                         <button onClick={() => updateSettings('audioEchoCancel', !settings.audioEchoCancel)} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings.audioEchoCancel ? 'bg-blue-600 shadow-inner' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.audioEchoCancel ? 'left-7 shadow-md' : 'left-1'}`}></div>
                         </button>
                      </div>
                  </div>
              )}

              {activeTab === 'recording' && (
                  <div className="space-y-10">
                      <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Video Precision</label>
                          <div className="grid grid-cols-3 gap-3">
                              {['720p', '1080p', '4k'].map((res) => (
                                  <button 
                                    key={res}
                                    onClick={() => updateSettings('resolution', res)}
                                    className={`py-4 px-6 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all flex flex-col items-center gap-2 ${settings.resolution === res ? 'bg-white border-blue-600 text-blue-600 shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                  >
                                    {res}
                                    {res === '4k' && <Lock size={12} className={settings.resolution === res ? 'text-blue-400' : 'text-slate-300'} />}
                                  </button>
                              ))}
                          </div>
                          {settings.resolution === '4k' ? (
                             <p className="text-[10px] text-yellow-600 mt-4 flex items-center gap-1 font-bold uppercase tracking-widest"><Zap size={12}/> Pro Tier: Professional ultra-HD recording enabled.</p>
                          ) : (
                             <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Base broadcast quality selected.</p>
                          )}
                      </div>

                       <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Fluidity (FPS)</label>
                          <div className="grid grid-cols-2 gap-4">
                              {['30fps', '60fps'].map((fps) => (
                                  <button 
                                    key={fps}
                                    onClick={() => updateSettings('frameRate', fps)}
                                    className={`py-4 px-6 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${settings.frameRate === fps ? 'bg-white border-blue-600 text-blue-600 shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                  >
                                    {fps}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'destinations' && (
                  <div className="space-y-8">
                      <div className="flex items-center justify-between">
                         <h3 className="text-slate-900 font-black uppercase italic">Broadcast Targets</h3>
                         <button 
                           onClick={() => setNewDestOpen(true)}
                           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
                         >
                            <Plus size={14}/> Add Target
                         </button>
                      </div>
                      
                      {newDestOpen && (
                         <div className="bg-white p-6 rounded-3xl border-2 border-blue-100 animate-in slide-in-from-top-2 shadow-xl">
                             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Select Global Platform</h4>
                             <div className="grid grid-cols-3 gap-3 mb-6">
                                {[
                                   {id: 'youtube', icon: <Youtube className="text-red-600"/>, label: 'YouTube'},
                                   {id: 'facebook', icon: <Facebook className="text-blue-600"/>, label: 'Facebook'},
                                   {id: 'linkedin', icon: <Linkedin className="text-blue-500"/>, label: 'LinkedIn'},
                                   {id: 'twitch', icon: <Twitch className="text-purple-600"/>, label: 'Twitch'},
                                   {id: 'custom', icon: <Globe className="text-slate-600"/>, label: 'RTMP'},
                                ].map(p => (
                                   <button 
                                     key={p.id}
                                     onClick={() => p.id !== 'custom' ? addDestination(p.id as any) : setRtmpForm({...rtmpForm, key: 'rtmp'})} 
                                     className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-600 hover:bg-white transition shadow-sm group"
                                   >
                                      <div className="transform group-hover:scale-110 transition-transform">{p.icon}</div>
                                      <span className="text-[10px] mt-2 text-slate-900 font-black uppercase tracking-widest">{p.label}</span>
                                   </button>
                                ))}
                             </div>
                             
                             {rtmpForm.key && (
                                <div className="space-y-4 mb-4">
                                   <input placeholder="RTMP Server URL" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-blue-600 outline-none" value={rtmpForm.url} onChange={e => setRtmpForm({...rtmpForm, url: e.target.value})} />
                                   <input placeholder="Secret Stream Key" type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-blue-600 outline-none" value={rtmpForm.key === 'rtmp' ? '' : rtmpForm.key} onChange={e => setRtmpForm({...rtmpForm, key: e.target.value})} />
                                   <button onClick={() => addDestination('custom')} className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition">Verify & Save Destination</button>
                                </div>
                             )}

                             <button onClick={() => setNewDestOpen(false)} className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-slate-900 underline w-full text-center">Abort Addition</button>
                         </div>
                      )}

                      <div className="space-y-4">
                         {settings.destinations.length === 0 && (
                            <div className="text-center py-12 text-slate-300 border-4 border-dashed border-slate-100 rounded-[32px] font-black uppercase tracking-widest text-xs">
                               No active stream routes.
                            </div>
                         )}
                         {settings.destinations.map(dest => (
                             <div key={dest.id} className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group transition-all hover:shadow-md">
                                <div className="flex items-center gap-4">
                                   {dest.platform === 'youtube' && <Youtube className="text-red-600"/>}
                                   {dest.platform === 'facebook' && <Facebook className="text-blue-600"/>}
                                   {dest.platform === 'linkedin' && <Linkedin className="text-blue-500"/>}
                                   {dest.platform === 'twitch' && <Twitch className="text-purple-600"/>}
                                   {dest.platform === 'custom' && <Globe className="text-slate-600"/>}
                                   <div>
                                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{dest.name}</h4>
                                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{dest.url ? 'Direct RTMP' : 'Social Auth'}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-4">
                                   <button 
                                     onClick={() => toggleDestination(dest.id)} 
                                     className={`w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner ${dest.enabled ? 'bg-green-500' : 'bg-slate-200'}`}
                                   >
                                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${dest.enabled ? 'left-7 shadow-md' : 'left-1'}`}></div>
                                   </button>
                                   <button onClick={() => removeDestination(dest.id)} className="text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                                </div>
                             </div>
                         ))}
                      </div>
                  </div>
              )}

           </div>
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
           <button onClick={onClose} className="px-10 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-black transition shadow-xl shadow-slate-900/10">Apply Config</button>
        </div>
      </div>
    </div>
  )
}

// --- Main Component ---

const Studio: React.FC = () => {
  const { appSettings, interviews } = useData();
  const chatBottomRef = useRef<HTMLDivElement>(null);
  
  const scheduledInterview = interviews.find(i => i.status === 'upcoming' && i.applicationType === 'live');
  const hostName = scheduledInterview ? scheduledInterview.founderName : 'You (Host)';
  
  const [settings, setSettings] = useState<StudioSettings>({
    resolution: '1080p',
    frameRate: '30fps',
    audioEchoCancel: true,
    showNames: true,
    mirrorVideo: true,
    destinations: []
  });

  const handleUpdateSettings = (key: keyof StudioSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'local-1', name: hostName, type: 'camera', isLocal: true, isOnStage: true, stream: null, muted: false, videoOff: false },
    ...MOCK_GUESTS
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
  
  const [showSettings, setShowSettings] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'chat' | 'brand' | 'banners' | 'media'>('chat');
  const [brandColor, setBrandColor] = useState('#ef4444');
  const [brandTheme, setBrandTheme] = useState<'minimal' | 'bold' | 'bubble' | 'classic'>('minimal');
  const [logo, setLogo] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
      { id: '1', sender: 'Producer', text: 'Ready for broadcast. Audio levels look great.', time: '10:00 AM', avatarColor: 'bg-slate-900' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [bannerInput, setBannerInput] = useState('');

  // Fix for: Error in file pages/Studio.tsx on line 745: Cannot find name 'toggleStage'.
  const toggleStage = (id: string) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, isOnStage: !p.isOnStage } : p));
  };

  useEffect(() => {
    async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setParticipants(prev => prev.map(p => 
          p.id === 'local-1' ? { ...p, stream } : p
        ));
      } catch (err) { console.error("Error accessing media devices.", err); }
    }
    initStream();
  }, []);

  useEffect(() => {
    let interval: number;
    if (isLive || isRecording) {
      interval = window.setInterval(() => {
         setTimer(t => {
            const nextTime = t + 1;
            if (nextTime >= appSettings.maxLiveDuration) {
               setIsLive(false); setIsRecording(false);
               setDownloadModalReason(`Broadcast Limit Reached (${Math.floor(appSettings.maxLiveDuration/60)} mins max).`);
               setShowDownloadModal(true); return 0; 
            }
            return nextTime;
         });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive, isRecording, appSettings.maxLiveDuration]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const toggleLive = () => {
    if (!isLive && settings.destinations.filter(d => d.enabled).length === 0) {
       alert("No destinations enabled! Please add a target in Settings.");
       setShowSettings(true); return;
    }
    if (isLive) {
       setDownloadModalReason("Broadcast Wrapped.");
       setShowDownloadModal(true);
    }
    setIsLive(!isLive); if (!isLive) setTimer(0);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault(); if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now().toString(), sender: 'You', text: chatInput, time: 'Live', avatarColor: 'bg-red-600' }]);
    setChatInput('');
  };

  const createBanner = (e: React.FormEvent) => {
    e.preventDefault(); if (!bannerInput.trim()) return;
    setBanners(prev => prev.map(b => ({...b, isActive: false})).concat({ id: Date.now().toString(), text: bannerInput, type: 'static', isActive: true }));
    setBannerInput('');
  };

  const activeParticipants = participants.filter(p => p.isOnStage);
  const activeBanner = banners.find(b => b.isActive);
  const localParticipant = participants.find(p => p.isLocal);
  const activeDestinations = settings.destinations.filter(d => d.enabled);
  const sortedActiveParticipants = [...activeParticipants].sort((a, b) => a.type === 'screen' ? -1 : 1);
  const timeProgress = Math.min((timer / appSettings.maxLiveDuration) * 100, 100);

  return (
    <div className="h-[calc(100vh-64px)] bg-[#f1f5f9] text-slate-900 flex overflow-hidden font-sans">
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} settings={settings} updateSettings={handleUpdateSettings} />
      <InviteModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />
      <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} settings={settings} reason={downloadModalReason} />
      <ShareBroadcastModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} activeDestinations={activeDestinations} />

      {/* ================= LEFT SECTION: STAGE & CONTROLS ================= */}
      <div className="flex-grow flex flex-col relative min-w-0">
        
        {/* Top Studio Header */}
        <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 z-20 shadow-sm">
          <div className="flex items-center gap-6">
             {isLive && (
               <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                  <span className="text-[10px] text-red-600 font-black uppercase tracking-[0.2em]">Live Stream Active</span>
               </div>
             )}
             
             {!isLive && (
               <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Studio Connection Optimized</span>
               </div>
             )}

             {(isRecording || isLive) && (
                <div className="flex items-center gap-3 text-[11px] font-black bg-slate-900 text-white px-5 py-2 rounded-xl shadow-lg">
                   <Clock size={14} className="text-red-500" />
                   {formatTime(timer)} / {formatTime(appSettings.maxLiveDuration)}
                </div>
             )}
          </div>

          <div className="flex items-center gap-4">
             <button onClick={() => setShowShareModal(true)} className="px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2 transition-all border border-transparent hover:border-slate-200">
                <Share2 size={16} /> Public Links
             </button>

             <button onClick={isRecording ? () => { setIsRecording(false); setShowDownloadModal(true); } : () => setIsRecording(true)} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${isRecording ? 'border-red-600 text-red-600 bg-red-50' : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'}`}>
               {isRecording ? 'Halt Recording' : 'Start Recording'}
             </button>

             <button onClick={toggleLive} className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center gap-2 ${isLive ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'}`}>
               {isLive ? 'Stop Broadcast' : 'Go Live Now'}
             </button>
          </div>
        </div>

        {/* Studio Stage Canvas - Main Area Stays Dark for Video Clarity */}
        <div className="flex-grow bg-slate-100 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className={`relative w-full h-full max-h-[80vh] aspect-video transition-all duration-300 group bg-slate-950 rounded-[48px] shadow-2xl p-4 border-[16px] border-white`}>
                {logo && <img src={logo} alt="Logo" className="absolute top-8 right-8 w-24 z-20 drop-shadow-2xl" />}
                
                {activeParticipants.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center rounded-[32px] bg-slate-900/20">
                     <div className="text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-2xl">
                          <MonitorUp className="text-slate-400" size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">The Loft is Empty</h3>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Add your feed to the stage below.</p>
                     </div>
                  </div>
                ) : (
                  <div className={`w-full h-full rounded-[32px] overflow-hidden ${activeLayout === 'sidebar' ? 'flex gap-4' : `grid gap-4 ${getGridClass(activeParticipants.length)}`}`}>
                    {activeLayout === 'sidebar' ? (
                        <>
                           <div className="flex-[3] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                              <ParticipantFrame participant={sortedActiveParticipants[0]} showName={settings.showNames} brandColor={brandColor} theme={brandTheme} mirrorLocal={settings.mirrorVideo} />
                           </div>
                           <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
                              {sortedActiveParticipants.slice(1).map(p => (
                                <div key={p.id} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 shadow-lg">
                                   <ParticipantFrame participant={p} showName={settings.showNames} brandColor={brandColor} theme={brandTheme} mirrorLocal={settings.mirrorVideo} small />
                                </div>
                              ))}
                           </div>
                        </>
                    ) : (
                      activeParticipants.map(p => (
                        <div key={p.id} className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                           <ParticipantFrame participant={p} showName={settings.showNames} brandColor={brandColor} theme={brandTheme} mirrorLocal={settings.mirrorVideo} />
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeBanner && (
                    <div className="absolute bottom-12 left-0 right-0 z-30 px-12 flex justify-center pointer-events-none">
                        {activeBanner.type === 'ticker' ? (
                            <div className="w-full bg-white/90 text-slate-900 py-4 border-y-4 border-red-600 overflow-hidden shadow-2xl backdrop-blur-xl">
                                <div className="animate-ticker font-black text-2xl uppercase italic whitespace-nowrap pl-[100%] tracking-tighter">
                                    {activeBanner.text}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900 text-white px-12 py-6 rounded-3xl shadow-2xl font-black text-3xl animate-in slide-in-from-bottom-4 duration-300 max-w-4xl text-center border-b-8 border-red-600 uppercase tracking-tighter italic">
                                {activeBanner.text}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Layout Controls (Floating) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl z-30">
               <LayoutBtn icon={<RectangleHorizontal size={18}/>} label="Solo" active={activeLayout === 'solo'} onClick={() => setActiveLayout('solo')} />
               <LayoutBtn icon={<Grid3x3 size={18}/>} label="Grid" active={activeLayout === 'grid'} onClick={() => setActiveLayout('grid')} />
               <LayoutBtn icon={<Sidebar size={18}/>} label="Side" active={activeLayout === 'sidebar'} onClick={() => setActiveLayout('sidebar')} />
               <LayoutBtn icon={<Maximize size={18}/>} label="Full" active={activeLayout === 'spotlight'} onClick={() => setActiveLayout('spotlight')} />
            </div>
        </div>

        {/* --- DOCK / GREEN ROOM --- */}
        <div className="h-40 bg-white border-t border-slate-200 flex items-center px-8 gap-6 overflow-x-auto relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <button onClick={() => setShowInviteModal(true)} className="flex-shrink-0 w-44 h-28 border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all group">
               <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-blue-100 mb-2 transition-colors">
                 <Plus size={24} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest">Add Guest</p>
            </button>

            {participants.map(p => (
              <div key={p.id} className={`group relative flex-shrink-0 w-44 h-28 rounded-3xl overflow-hidden border-4 transition-all shadow-sm ${p.isOnStage ? 'border-blue-600 ring-8 ring-blue-50' : 'border-slate-50 opacity-60 hover:opacity-100 hover:border-slate-200'}`}>
                 <VideoComponent stream={p.stream} poster={p.avatarUrl} isMuted={true} videoOff={p.videoOff} className="w-full h-full" mirror={p.isLocal && settings.mirrorVideo} />
                 <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-tighter truncate max-w-[80%] border border-slate-100">
                    {p.name}
                 </div>
                 <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-white/90 rounded-lg shadow-sm border border-slate-100">
                    {p.muted ? <MicOff size={12} className="text-red-600"/> : <Mic size={12} className="text-slate-400" />}
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
                    <button onClick={() => toggleStage(p.id)} className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl transform hover:scale-105 active:scale-95 transition-all ${p.isOnStage ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                      {p.isOnStage ? 'Backstage' : 'Put On Air'}
                    </button>
                 </div>
              </div>
            ))}
        </div>

        {/* --- MAIN TOOLBAR --- */}
        <div className="h-24 bg-white border-t border-slate-200 flex items-center justify-center gap-6 px-8 z-30">
             <ToolBtn icon={localParticipant?.muted ? <MicOff size={24}/> : <Mic size={24}/>} label={localParticipant?.muted ? "Unmute" : "Mute"} active={!localParticipant?.muted} onClick={() => setParticipants(prev => prev.map(p => p.isLocal ? {...p, muted: !p.muted} : p))} />
             <ToolBtn icon={localParticipant?.videoOff ? <VideoOff size={24}/> : <VideoIcon size={24}/>} label={localParticipant?.videoOff ? "Start Cam" : "Stop Cam"} active={!localParticipant?.videoOff} onClick={() => setParticipants(prev => prev.map(p => p.isLocal ? {...p, videoOff: !p.videoOff} : p))} />
             <div className="w-px h-12 bg-slate-200 mx-2"></div>
             <ToolBtn icon={<MonitorUp size={24}/>} label="Screen" onClick={() => {}} />
             <ToolBtn icon={<Users size={24}/>} label="Guest" onClick={() => setShowInviteModal(true)} />
             <div className="w-px h-12 bg-slate-200 mx-2"></div>
             <ToolBtn icon={<Settings size={24}/>} label="Settings" onClick={() => setShowSettings(true)} />
        </div>
      </div>

      {/* ================= RIGHT SECTION: PRODUCTION SIDEBAR ================= */}
      <div className="w-96 bg-white border-l border-slate-200 flex flex-col z-20 shadow-2xl">
          <div className="flex border-b border-slate-200 bg-slate-50/50 p-2 gap-1">
             <TabBtn label="Brand" active={activeTab === 'brand'} onClick={() => setActiveTab('brand')} icon={<Palette size={16}/>} />
             <TabBtn label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageSquare size={16}/>} />
             <TabBtn label="Grafx" active={activeTab === 'banners'} onClick={() => setActiveTab('banners')} icon={<Type size={16}/>} />
             <TabBtn label="Sound" active={activeTab === 'media'} onClick={() => setActiveTab('media')} icon={<ImageIcon size={16}/>} />
          </div>

          <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
              {activeTab === 'brand' && (
                <div className="space-y-10 animate-in slide-in-from-right-4">
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Master Highlight</h3>
                      <div className="flex gap-3 flex-wrap">
                         {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'].map(color => (
                           <button key={color} onClick={() => setBrandColor(color)} className={`w-10 h-10 rounded-2xl border-4 transition-all hover:scale-110 ${brandColor === color ? 'border-white ring-4 ring-slate-100 shadow-lg' : 'border-white border-opacity-50'}`} style={{ backgroundColor: color }} />
                         ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Graphics Theme</h3>
                      <div className="grid grid-cols-2 gap-4">
                         {['minimal', 'bold', 'bubble', 'classic'].map(theme => (
                           <button key={theme} onClick={() => setBrandTheme(theme as any)} className={`h-24 bg-slate-50 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${brandTheme === theme ? 'border-blue-600 bg-white shadow-xl' : 'border-slate-100 hover:border-slate-200'}`}>
                              <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{theme}</span>
                           </button>
                         ))}
                      </div>
                    </div>
                </div>
              )}

              {activeTab === 'banners' && (
                  <div className="flex flex-col h-full animate-in slide-in-from-right-4">
                     <form onSubmit={createBanner} className="mb-10">
                        <textarea className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm font-bold focus:border-blue-600 transition-all resize-none text-slate-900 placeholder:text-slate-300 shadow-inner" placeholder="Headline text..." rows={3} value={bannerInput} onChange={(e) => setBannerInput(e.target.value)} />
                        <button type="submit" className="mt-4 w-full py-4 bg-slate-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition shadow-xl">Apply Graphic</button>
                     </form>
                     <div className="space-y-4">
                        {banners.map(banner => (
                           <div key={banner.id} className={`group relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${banner.isActive ? 'bg-blue-50 border-blue-600 shadow-md' : 'bg-white border-slate-100 hover:border-slate-200'}`} onClick={() => setBanners(prev => prev.map(b => b.id === banner.id ? {...b, isActive: !b.isActive} : {...b, isActive: false}))}>
                              <p className={`text-sm font-black uppercase tracking-tight ${banner.isActive ? 'text-blue-900' : 'text-slate-600'}`}>{banner.text}</p>
                              <div className="mt-2 flex items-center justify-between">
                                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{banner.type}</span>
                                 {banner.isActive && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
              )}

              {activeTab === 'chat' && (
                <div className="flex flex-col h-full animate-in slide-in-from-right-4">
                   <div className="flex-grow space-y-6 mb-6">
                      {chatMessages.map(msg => (
                        <div key={msg.id} className="flex gap-4 group">
                           <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white shadow-xl ${msg.avatarColor} transition-transform group-hover:scale-110`}>
                              {msg.sender.charAt(0)}
                           </div>
                           <div>
                              <div className="flex items-baseline gap-3">
                                <span className="text-xs font-black uppercase text-slate-900 tracking-tight">{msg.sender}</span>
                                <span className="text-[9px] font-bold text-slate-400">{msg.time}</span>
                              </div>
                              <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">{msg.text}</p>
                           </div>
                        </div>
                      ))}
                      <div ref={chatBottomRef} />
                   </div>
                   <form onSubmit={sendMessage} className="relative">
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-6 pr-14 py-5 text-sm font-bold focus:border-blue-600 transition outline-none shadow-inner" placeholder="Host communication..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                      <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition shadow-lg">
                        <Zap size={18} fill="currentColor" />
                      </button>
                   </form>
                </div>
              )}
          </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const ParticipantFrame: React.FC<{ participant: Participant, showName: boolean, brandColor: string, theme: string, small?: boolean, mirrorLocal?: boolean }> = ({ participant, showName, brandColor, theme, small, mirrorLocal }) => (
  <>
    <VideoComponent stream={participant.stream} poster={participant.avatarUrl} isMuted={participant.isLocal} videoOff={participant.videoOff} className="w-full h-full" mirror={participant.isLocal && mirrorLocal} />
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
