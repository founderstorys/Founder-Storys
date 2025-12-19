import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Eye, DollarSign, Video, CircleCheck, CircleX, FileText, Play, 
  Settings, User as UserIcon, LogOut, CreditCard, Users as UsersIcon, CircleHelp, 
  Plus, Youtube, Facebook, Linkedin, Twitch, Instagram, Globe, 
  Mic, MonitorPlay, ChevronRight, ChevronDown, X, Radio, Upload, Smartphone, Monitor, Search, Copy, Calendar, Clock, CircleAlert, ArrowLeft, Link as LinkIcon, Server, Key, Mail, Phone, MapPin, ExternalLink, ShieldCheck,
  Loader2, CirclePlay, Activity, Twitter, Laptop, Tag, Percent, Sparkles, MonitorUp, FileType, AlignLeft, Image as ImageIcon, Trash2, CloudUpload, ListTree, Layers, Wand2, Database, Code, Lock,
  Palette, Zap, TriangleAlert, ShoppingBag, BadgePercent, TrendingUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Interview, SubscriptionPlan } from '../types';

// --- Helpers ---

const mockUploadFile = (file: File, onProgress: (p: number) => void): Promise<string> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        resolve(URL.createObjectURL(file));
      }
    }, 150);
  });
};

// --- Modals ---

const AdminSettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { appSettings, updateAppSettings } = useData();
  const [activeTab, setActiveTab] = useState<'branding' | 'integrations' | 'security' | 'studio' | 'subscriptions'>('branding');
  
  // Platform Settings State
  const [siteName, setSiteName] = useState('Founder Storys');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [adSenseId, setAdSenseId] = useState('ca-pub-XXXXXXXXXXXXXXXX');
  const [razorpayKey, setRazorpayKey] = useState('rzp_live_XXXXXXXXXXXXXX');
  const [razorpaySecret, setRazorpaySecret] = useState('************************');
  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXX',
    authDomain: 'founder-storys.firebaseapp.com',
    projectId: 'founder-storys',
    storageBucket: 'founder-storys.appspot.com',
  });
  const [adminPassword, setAdminPassword] = useState('');
  const [duration, setDuration] = useState(appSettings.maxLiveDuration / 60);
  const [plans, setPlans] = useState<SubscriptionPlan[]>(appSettings.subscriptionPlans);

  const updatePlan = (id: string, updates: Partial<SubscriptionPlan>) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200 p-4">
      <div className="bg-white text-slate-900 w-full max-w-6xl rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Settings size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Configuration</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Monetization & Controls</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-full transition text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100">
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-8 bg-white overflow-x-auto whitespace-nowrap scrollbar-hide">
            {[
              { id: 'branding', label: 'Branding', icon: <Palette size={14}/> },
              { id: 'subscriptions', label: 'Subscription & Offers', icon: <ShoppingBag size={14}/> },
              { id: 'studio', label: 'Studio Rules', icon: <Radio size={14}/> },
              { id: 'integrations', label: 'Integrations', icon: <Zap size={14}/> },
              { id: 'security', label: 'Security', icon: <Lock size={14}/> },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`px-6 py-5 text-[11px] font-black uppercase tracking-[0.15em] relative transition flex items-center gap-2 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            ))}
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-grow p-10 overflow-y-auto bg-[#fafafa] custom-scrollbar">
           
           {activeTab === 'branding' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Site Title</label>
                    <input 
                      value={siteName}
                      onChange={e => setSiteName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 outline-none transition"
                      placeholder="Enter Site Name"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Google AdSense ID</label>
                    <input 
                      value={adSenseId}
                      onChange={e => setAdSenseId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-mono focus:ring-4 focus:ring-blue-500/5 outline-none transition"
                      placeholder="ca-pub-..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Platform Logo</label>
                  <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-24 h-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                       {logoPreview ? <img src={logoPreview} className="w-full h-full object-contain p-2" alt="Logo preview" /> : <ImageIcon size={32} className="text-slate-300" />}
                    </div>
                    <div className="flex-grow space-y-3">
                       <button 
                         onClick={() => document.getElementById('logo-upload')?.click()}
                         className="px-6 py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black transition"
                       >
                         Upload New Logo
                       </button>
                       <p className="text-[10px] text-slate-400 font-medium">Recommended: SVG or PNG with transparent background. Max 2MB.</p>
                       <input 
                         id="logo-upload" 
                         type="file" 
                         className="hidden" 
                         onChange={e => e.target.files?.[0] && setLogoPreview(URL.createObjectURL(e.target.files[0]))} 
                       />
                    </div>
                  </div>
                </div>
              </div>
           )}

           {activeTab === 'subscriptions' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between">
                   <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Monetization & Plans</h3>
                      <p className="text-xs text-slate-500 font-medium">Manage pricing tiers, original vs offer rates, and platform subscription models.</p>
                   </div>
                   <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20">
                      Currency: INR (₹)
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {plans.map((plan) => {
                      const offerPrice = Math.floor(plan.basePrice * (1 - plan.discountPercentage / 100));
                      return (
                        <div key={plan.id} className="bg-white p-8 rounded-[48px] border border-slate-200 shadow-sm flex flex-col relative group hover:border-blue-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
                           <div className="flex items-center justify-between mb-8">
                              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                 <ShoppingBag size={24} />
                              </div>
                              <div className="flex flex-col items-end">
                                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Tier Badge</span>
                                 <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 flex items-center gap-2">
                                    <BadgePercent size={14} />
                                    <span className="text-[11px] font-black uppercase">{plan.discountPercentage}% OFF</span>
                                 </div>
                              </div>
                           </div>

                           <div className="mb-8">
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-1">{plan.name}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Public Revenue Tier</p>
                           </div>

                           <div className="space-y-8 flex-grow">
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Market Price</label>
                                    <div className="relative">
                                       <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-300 text-xs">₹</span>
                                       <input 
                                          type="number"
                                          value={plan.basePrice}
                                          onChange={e => updatePlan(plan.id, { basePrice: Number(e.target.value) })}
                                          className="w-full bg-slate-50 border-none rounded-2xl pl-8 pr-4 py-4 text-sm font-black focus:ring-4 focus:ring-blue-600/5 outline-none transition"
                                       />
                                    </div>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Discount %</label>
                                    <input 
                                       type="number"
                                       value={plan.discountPercentage}
                                       max={100}
                                       min={0}
                                       onChange={e => updatePlan(plan.id, { discountPercentage: Number(e.target.value) })}
                                       className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-black focus:ring-4 focus:ring-blue-600/5 outline-none transition"
                                    />
                                 </div>
                              </div>

                              <div className="p-6 bg-slate-950 rounded-[32px] text-white space-y-4 relative overflow-hidden group/price">
                                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-[40px]"></div>
                                 <div className="relative z-10">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2">Live Offer Rate</span>
                                    <div className="flex items-baseline gap-3">
                                       <span className="text-4xl font-black italic text-white tracking-tighter">₹{offerPrice}</span>
                                       <span className="text-sm text-slate-500 line-through font-bold">₹{plan.basePrice}</span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest border-t border-white/5 pt-4">
                                       <TrendingUp size={12} />
                                       Savings: ₹{plan.basePrice - offerPrice} / session
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      );
                   })}
                </div>

                <div className="bg-blue-600 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
                   <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md">
                      <Percent size={40} className="text-white" />
                   </div>
                   <div className="space-y-4 relative z-10">
                      <h4 className="text-2xl font-black uppercase italic tracking-tighter">Bulk Pricing & Auto-Offers</h4>
                      <p className="text-blue-50 text-sm max-w-2xl leading-relaxed font-medium">
                         Your "Market Price" represents the original value shown to the user. The "Discount Percentage" generates the final "Offer Price" used at checkout. For standard 999, 1999, and 4999 tiers, set the original price to double and the discount to 50%.
                      </p>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'studio' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-1">Max Broadcast Duration</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Limit the time a founder can stay live per session to manage bandwidth and server costs.</p>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="flex-grow bg-slate-50 rounded-2xl p-4 flex items-center gap-4">
                        <Clock size={20} className="text-blue-600" />
                        <input 
                          type="number" 
                          className="flex-1 bg-transparent border-none text-2xl font-black focus:ring-0 outline-none" 
                          value={duration} 
                          onChange={e => setDuration(Number(e.target.value))} 
                        />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Minutes</span>
                     </div>
                     <div className="w-px h-12 bg-slate-100"></div>
                     <div className="text-right">
                        <span className="text-[10px] font-black text-slate-300 uppercase block">Total Seconds</span>
                        <span className="text-lg font-black text-slate-800">{duration * 60}s</span>
                     </div>
                  </div>
                </div>
              </div>
           )}

           {activeTab === 'integrations' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Razorpay Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 ml-1 mb-2">
                     <CreditCard size={18} className="text-blue-500" />
                     <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Razorpay API Gateway</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key ID</label>
                       <input 
                         value={razorpayKey}
                         onChange={e => setRazorpayKey(e.target.value)}
                         className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-mono"
                       />
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key Secret</label>
                       <input 
                         type="password"
                         value={razorpaySecret}
                         onChange={e => setRazorpaySecret(e.target.value)}
                         className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-mono"
                       />
                    </div>
                  </div>
                </div>

                {/* Firebase Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 ml-1 mb-2">
                     <Database size={18} className="text-orange-500" />
                     <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Firebase Infrastructure</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(firebaseConfig).map(([key, val]) => (
                       <div key={key} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</label>
                          <input 
                            value={val as string}
                            onChange={e => setFirebaseConfig({...firebaseConfig, [key]: e.target.value})}
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-mono"
                          />
                       </div>
                    ))}
                  </div>
                </div>
              </div>
           )}

           {activeTab === 'security' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10 space-y-8">
                    <div>
                      <h4 className="text-xl font-black tracking-tight mb-2">Administrative Security</h4>
                      <p className="text-slate-400 text-sm">Update your access credentials for the platform dashboard.</p>
                    </div>
                    
                    <div className="space-y-6 max-w-sm">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">New Admin Password</label>
                          <div className="relative">
                             <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                             <input 
                               type="password"
                               placeholder="Min 12 characters"
                               className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-blue-500 outline-none transition"
                               value={adminPassword}
                               onChange={e => setAdminPassword(e.target.value)}
                             />
                          </div>
                       </div>
                       <button className="w-full py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition shadow-xl">
                          Update Credentials
                       </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-red-50 rounded-3xl border border-red-100 border-dashed">
                   <TriangleAlert className="text-red-500 shrink-0" size={24} />
                   <p className="text-[11px] text-red-600 font-bold leading-relaxed uppercase tracking-tight">
                     Warning: Changing integration keys or security settings may cause temporary platform downtime. Always backup your configurations before modifying.
                   </p>
                </div>
              </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-slate-100 flex justify-end gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
           <button onClick={onClose} className="px-8 py-3 text-sm font-black text-slate-400 hover:text-slate-900 transition uppercase tracking-widest">Discard Changes</button>
           <button 
             onClick={() => { 
                updateAppSettings({ 
                  maxLiveDuration: duration * 60,
                  subscriptionPlans: plans 
                }); 
                onClose(); 
             }} 
             className="bg-slate-900 text-white font-black px-12 py-4 rounded-2xl hover:bg-black transition shadow-2xl shadow-slate-900/20 flex items-center gap-3 group"
           >
              <ShieldCheck size={18} className="group-hover:scale-110 transition" />
              <span>Deploy All Systems</span>
           </button>
        </div>
      </div>
    </div>
  );
};

const DestinationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'grid' | 'connect'>('grid');
  const [selectedPlatform, setSelectedPlatform] = useState<{ id: string; name: string; icon: React.ReactNode; color: string } | null>(null);
  const [method, setMethod] = useState<'account' | 'key'>('account');

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: <Youtube size={32} className="text-[#FF0000]" />, color: 'bg-[#FF0000]' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook size={32} className="text-[#1877F2]" />, color: 'bg-[#1877F2]' },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={32} className="text-[#0A66C2]" />, color: 'bg-[#0A66C2]' },
    { id: 'twitter', name: 'X (Twitter)', icon: <Twitter size={32} className="text-black" />, color: 'bg-black' },
    { id: 'twitch', name: 'Twitch', icon: <Twitch size={32} className="text-[#9146FF]" />, color: 'bg-[#9146FF]' },
    { id: 'instagram', name: 'Instagram Live', icon: <Instagram size={32} className="text-[#E4405F]" />, color: 'bg-[#E4405F]' },
    { id: 'kick', name: 'Kick', icon: <div className="bg-[#53FC18] text-black font-black px-1.5 rounded text-xs">K</div>, color: 'bg-[#53FC18]' },
    { id: 'brightcove', name: 'Brightcove', icon: <div className="font-black text-slate-900 text-2xl tracking-tighter">B</div>, color: 'bg-slate-900' },
    { id: 'hopin', name: 'Hopin', icon: <div className="w-8 h-8 rounded-full border-[6px] border-[#0095FF]"></div>, color: 'bg-[#0095FF]' },
    { id: 'custom', name: 'Custom RTMP', icon: <div className="bg-slate-700 text-white font-black px-1.5 rounded text-[10px]">RTMP</div>, color: 'bg-slate-700' },
  ] as const;

  const handleSelect = (p: typeof platforms[number]) => {
    setSelectedPlatform(p);
    setStep('connect');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            {step === 'connect' && (
              <button onClick={() => setStep('grid')} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
                <ArrowLeft size={22} />
              </button>
            )}
            <h2 className="text-2xl font-bold text-[#1e293b]">
              {step === 'grid' ? 'Add Destination' : `Connect ${selectedPlatform?.name}`}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto bg-white flex-grow">
          {step === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {platforms.map(p => (
                <button 
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className="bg-white border border-slate-200 rounded-lg p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-lg transition-all group"
                >
                  <div className="transform transition-transform group-hover:scale-110">
                    {p.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{p.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-10 max-w-lg mx-auto">
              <div className="flex justify-center">
                 <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-50 relative">
                    <div className="absolute inset-0 bg-slate-50 rounded-full animate-pulse opacity-20 scale-125"></div>
                    {selectedPlatform?.icon}
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest block mb-4">Connection Method</label>
                    <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                       <button 
                         onClick={() => setMethod('account')}
                         className={`flex-1 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition ${method === 'account' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500'}`}
                       >
                          <LinkIcon size={16}/> Connect Account
                       </button>
                       <button 
                         onClick={() => setMethod('key')}
                         className={`flex-1 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition ${method === 'key' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500'}`}
                       >
                          <Key size={16}/> Stream Key
                       </button>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-800">Destination Nickname</label>
                    <input 
                      placeholder={`${selectedPlatform?.name} Channel`}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                    />
                 </div>

                 <div className="pt-6 space-y-4 text-center">
                    <p className="text-sm text-slate-500">Connect your {selectedPlatform?.name} account to stream automatically.</p>
                    <button 
                      className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-xl hover:opacity-90 ${selectedPlatform?.color}`}
                    >
                      Log in with {selectedPlatform?.name}
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UploadEpisodeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addInterview } = useData();
  const [formData, setFormData] = useState({
    title: '',
    founderName: '',
    company: '',
    embedSource: 'youtube',
    format: '16:9',
    ytLink: '',
    fbLink: '',
    igLink: '',
    liLink: '',
    twLink: '',
    displayOnHome: true,
    metaDescription: '',
    metaKeywords: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEp: Interview = {
      id: `ep-${Date.now()}`,
      title: formData.title,
      founderName: formData.founderName,
      companyName: formData.company,
      position: 'Founder',
      email: '',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
      status: 'recorded',
      category: 'featured',
      views: 0,
      format: formData.format === '16:9' ? 'horizontal' : 'vertical',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      displayOnHome: formData.displayOnHome,
      metaKeywords: formData.metaKeywords.split(',').map(k => k.trim()),
      description: formData.metaDescription
    };
    addInterview(newEp);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-white">
          <div className="flex items-center gap-4">
             <div className="text-[#FF0000]"><Youtube size={32} fill="currentColor"/></div>
             <h2 className="text-2xl font-bold text-[#1e293b] tracking-tight">Upload Recent Episode</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
            <X size={26} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-10 space-y-12 custom-scrollbar bg-white">
           
           {/* EPISODE DETAILS */}
           <div className="space-y-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Episode Details</h3>
              <div className="space-y-2">
                 <label className="text-[15px] font-bold text-slate-700">Episode Title</label>
                 <input 
                   required
                   className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-base outline-none focus:border-blue-500 transition shadow-sm"
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                 />
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[15px] font-bold text-slate-700">Founder Name</label>
                    <input className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-base shadow-sm outline-none focus:border-blue-500" value={formData.founderName} onChange={e => setFormData({...formData, founderName: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[15px] font-bold text-slate-700">Company</label>
                    <input className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-base shadow-sm outline-none focus:border-blue-500" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                 </div>
              </div>
           </div>

           {/* VIDEO SOURCE */}
           <div className="space-y-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Video Source</h3>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[15px] font-bold text-slate-700">Primary Embed Source</label>
                    <div className="relative">
                      <select className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-base appearance-none shadow-sm outline-none focus:border-blue-500">
                         <option value="youtube">YouTube</option>
                         <option value="facebook">Facebook</option>
                         <option value="instagram">Instagram</option>
                         <option value="linkedin">LinkedIn</option>
                         <option value="twitter">Twitter</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none"/>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[15px] font-bold text-slate-700">Format</label>
                    <div className="flex bg-[#f1f5f9] p-1 rounded-lg shadow-inner">
                       <button type="button" onClick={() => setFormData({...formData, format: '16:9'})} className={`flex-1 py-2.5 rounded-md text-sm font-bold transition shadow-sm ${formData.format === '16:9' ? 'bg-white text-[#1e293b]' : 'text-slate-500'}`}>16:9</button>
                       <button type="button" onClick={() => setFormData({...formData, format: '9:16'})} className={`flex-1 py-2.5 rounded-md text-sm font-bold transition ${formData.format === '9:16' ? 'bg-white shadow-sm text-[#1e293b]' : 'text-slate-500'}`}>9:16</button>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="relative">
                    <Youtube size={18} className="absolute left-4 top-3.5 text-red-600" />
                    <input placeholder="YouTube Video Link" className="w-full bg-white border border-slate-200 rounded-lg pl-12 pr-4 py-3.5 text-base shadow-sm focus:border-blue-500 outline-none" value={formData.ytLink} onChange={e => setFormData({...formData, ytLink: e.target.value})} />
                 </div>
                 <div className="relative">
                    <Facebook size={18} className="absolute left-4 top-3.5 text-blue-600" />
                    <input placeholder="Facebook Video Link" className="w-full bg-white border border-slate-200 rounded-lg pl-12 pr-4 py-3.5 text-base shadow-sm focus:border-blue-500 outline-none" value={formData.fbLink} onChange={e => setFormData({...formData, fbLink: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="relative">
                       <Instagram size={16} className="absolute left-3 top-3.5 text-pink-500" />
                       <input placeholder="Instagram" className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-[11px] shadow-sm focus:border-blue-500 outline-none" value={formData.igLink} onChange={e => setFormData({...formData, igLink: e.target.value})} />
                    </div>
                    <div className="relative">
                       <Linkedin size={16} className="absolute left-3 top-3.5 text-blue-700" />
                       <input placeholder="LinkedIn" className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-[11px] shadow-sm focus:border-blue-500 outline-none" value={formData.liLink} onChange={e => setFormData({...formData, liLink: e.target.value})} />
                    </div>
                    <div className="relative">
                       <X size={16} className="absolute left-3 top-3.5 text-black" />
                       <input placeholder="Twitter/X" className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-[11px] shadow-sm focus:border-blue-500 outline-none" value={formData.twLink} onChange={e => setFormData({...formData, twLink: e.target.value})} />
                    </div>
                 </div>
              </div>
           </div>

           {/* VISIBILITY & SEO */}
           <div className="space-y-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Visibility & SEO</h3>
              <div className="bg-[#f8fafc] p-6 rounded-xl flex items-center justify-between border border-slate-200">
                 <div>
                    <h4 className="text-[15px] font-bold text-slate-800">Display on Home Screen</h4>
                    <p className="text-xs text-slate-500 mt-0.5">If No, video is only accessible via direct link.</p>
                 </div>
                 <button 
                   type="button"
                   onClick={() => setFormData({...formData, displayOnHome: !formData.displayOnHome})}
                   className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${formData.displayOnHome ? 'bg-[#22c55e]' : 'bg-slate-300'}`}
                 >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${formData.displayOnHome ? 'left-8 shadow-sm' : 'left-1'}`}></div>
                 </button>
              </div>

              <div className="space-y-2">
                 <label className="text-[15px] font-bold text-slate-700">Description (Meta)</label>
                 <textarea 
                   rows={3}
                   placeholder="SEO Description..."
                   className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-base outline-none focus:border-blue-500 transition resize-none shadow-sm"
                   value={formData.metaDescription}
                   onChange={e => setFormData({...formData, metaDescription: e.target.value})}
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[15px] font-bold text-slate-700 flex items-center gap-2"><Search size={16} className="text-slate-400"/> Meta Keywords</label>
                 <input 
                   placeholder="tech, startup, ai..."
                   className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-base outline-none focus:border-blue-500 transition shadow-sm"
                   value={formData.metaKeywords}
                   onChange={e => setFormData({...formData, metaKeywords: e.target.value})}
                 />
              </div>
           </div>

           <button 
             type="submit"
             className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-500/20 text-lg"
           >
              <Upload size={22} /> Publish Episode
           </button>
        </form>
      </div>
    </div>
  );
};

interface UploadingImage {
  id: string;
  file: File;
  progress: number;
  url: string | null;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

const UploadArticleModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addInterview } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<UploadingImage[]>([]);
  
  // Dynamic Categories and Tags State
  const [availableCategories, setAvailableCategories] = useState(['Article', 'News', 'Case Study', 'Water Innovation']);
  const [availableTags, setAvailableTags] = useState(['Sustainability', 'Environment', 'Clean Water', 'Future Tech']);
  const [newCatInput, setNewCatInput] = useState('');
  const [newTagInput, setNewTagInput] = useState('');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    company: '',
    readTime: '5 min read',
    para1and2: '', // Paragraphs 1 & 2
    para3: '',     // Paragraph 3
    displayOnHome: true,
    manualKeywords: '',
    generatedKeywords: [] as string[],
    linkedinUrl: '',
    twitterUrl: ''
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    const newUploads: UploadingImage[] = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      url: null,
      status: 'pending'
    }));

    setImages(prev => [...prev, ...newUploads]);

    for (const upload of newUploads) {
      setImages(prev => prev.map(u => u.id === upload.id ? { ...u, status: 'uploading' } : u));
      const url = await mockUploadFile(upload.file, (p) => {
        setImages(prev => prev.map(u => u.id === upload.id ? { ...u, progress: p } : u));
      });
      setImages(prev => prev.map(u => u.id === upload.id ? { ...u, url, status: 'completed' } : u));
    }
  };

  const autoGenerateKeywords = () => {
    const text = (formData.title + ' ' + formData.para1and2 + ' ' + formData.para3).toLowerCase();
    const words = text.match(/\b\w{5,}\b/g) || [];
    const uniqueKeywords = Array.from(new Set(words)).slice(0, 10);
    setFormData(prev => ({ ...prev, generatedKeywords: uniqueKeywords }));
  };

  const addCategory = () => {
    if (newCatInput.trim() && !availableCategories.includes(newCatInput)) {
      setAvailableCategories([...availableCategories, newCatInput.trim()]);
      setSelectedCategories([...selectedCategories, newCatInput.trim()]);
      setNewCatInput('');
    }
  };

  const addTag = () => {
    if (newTagInput.trim() && !availableTags.includes(newTagInput)) {
      setAvailableTags([...availableTags, newTagInput.trim()]);
      setSelectedTags([...selectedTags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length < 3) {
      alert("Please upload at least 3 images as required for the layout.");
      return;
    }
    setIsSubmitting(true);

    const fullContent = `${formData.para1and2}\n\n[IMAGE_MID]\n\n${formData.para3}`;
    const allKeywords = [...formData.generatedKeywords, ...formData.manualKeywords.split(',').map(k => k.trim())].filter(Boolean);

    const newArticle: Interview = {
      id: `art-${Date.now()}`,
      title: formData.title,
      founderName: formData.author,
      author: formData.author,
      companyName: formData.company,
      position: 'Expert Contributor',
      email: '',
      category: 'article',
      readTime: formData.readTime,
      longContent: fullContent,
      description: formData.para1and2.substring(0, 160),
      thumbnail: images[0]?.url || '',
      tags: [...selectedTags, ...selectedCategories],
      format: 'horizontal',
      status: 'recorded',
      views: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      displayOnHome: formData.displayOnHome,
      metaKeywords: allKeywords,
      socialLinks: { linkedin: formData.linkedinUrl, twitter: formData.twitterUrl }
    };

    setTimeout(() => {
      addInterview(newArticle);
      setIsSubmitting(false);
      onClose();
      setImages([]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-slate-800 border border-slate-200">
        
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <FileType size={28} />
             </div>
             <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Structured Article Publisher</h2>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">Storytelling Architecture Engine</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-slate-600">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-12 space-y-16 custom-scrollbar bg-white">
           
           {/* SECTION 1: IDENTITY */}
           <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                 <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-black">01</span>
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Identity & Identity</h3>
              </div>
              <input 
                required
                placeholder="Story Headline (Catchy & SEO Friendly)..."
                className="w-full bg-slate-50 border-none rounded-2xl px-8 py-8 text-4xl font-black text-slate-900 focus:ring-2 focus:ring-blue-500/10 outline-none transition placeholder:text-slate-300"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2">Primary Author</label>
                    <input required placeholder="Full Name" className="w-full bg-slate-50 border-none rounded-xl px-4 py-4 text-sm font-bold" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2">Representing Organization</label>
                    <input required placeholder="Company Name" className="w-full bg-slate-50 border-none rounded-xl px-4 py-4 text-sm font-bold" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2">Pace Estimate</label>
                    <input placeholder="e.g. 5 min read" className="w-full bg-slate-50 border-none rounded-xl px-4 py-4 text-sm font-bold" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} />
                 </div>
              </div>
           </div>

           {/* SECTION 2: LEAD VISUAL */}
           <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                 <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-black">02</span>
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Image 1: Lead Hero Cover</h3>
              </div>
              <div 
                onClick={() => document.getElementById('story-img-1')?.click()}
                className={`relative aspect-[21/9] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${images[0] ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
              >
                 {images[0]?.url ? <img src={images[0].url} className="w-full h-full object-cover" alt="Article visual 1" /> : <><CloudUpload size={48} className="text-slate-300 mb-3 group-hover:scale-110 transition"/><span className="text-sm font-black text-slate-400">Click to Upload Main Cover</span></>}
                 <input type="file" id="story-img-1" className="hidden" onChange={handleImageChange} accept="image/*" />
              </div>
           </div>

           {/* SECTION 3: CORE TEXT 1 */}
           <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                 <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-black">03</span>
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Narrative Start (2 Paragraphs)</h3>
              </div>
              <textarea 
                required
                rows={10}
                placeholder="The story begins here... (Minimum 2 substantial paragraphs recommended)"
                className="w-full bg-slate-50 border-none rounded-[32px] px-8 py-8 text-lg leading-relaxed focus:ring-2 focus:ring-blue-500/10 outline-none transition resize-none shadow-inner"
                value={formData.para1and2}
                onChange={e => setFormData({...formData, para1and2: e.target.value})}
              />
           </div>

           {/* SECTION 4: MID VISUAL */}
           <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                 <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-black">04</span>
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Image 2: Contextual Insight</h3>
              </div>
              <div 
                onClick={() => document.getElementById('story-img-2')?.click()}
                className={`relative h-80 rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${images[1] ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
              >
                 {images[1]?.url ? <img src={images[1].url} className="w-full h-full object-cover" alt="Article visual 2" /> : <><CloudUpload size={40} className="text-slate-300 mb-3 group-hover:scale-110 transition"/><span className="text-sm font-black text-slate-400">Click to Upload Mid-Story Context</span></>}
                 <input type="file" id="story-img-2" className="hidden" onChange={handleImageChange} accept="image/*" />
              </div>
           </div>

           {/* SECTION 5: CORE TEXT 2 */}
           <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                 <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-black">05</span>
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Deeper Insight (1 Paragraph)</h3>
              </div>
              <textarea 
                required
                rows={6}
                placeholder="The journey continues... (Add one strong analytical paragraph here)"
                className="w-full bg-slate-50 border-none rounded-[32px] px-8 py-8 text-lg leading-relaxed focus:ring-2 focus:ring-blue-500/10 outline-none transition resize-none shadow-inner"
                value={formData.para3}
                onChange={e => setFormData({...formData, para3: e.target.value})}
              />
           </div>

           {/* SECTION 6: CLOSING VISUAL */}
           <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                 <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-black">06</span>
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Image 3: Conclusion & Summary</h3>
              </div>
              <div 
                onClick={() => document.getElementById('story-img-3')?.click()}
                className={`relative h-80 rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${images[2] ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
              >
                 {images[2]?.url ? <img src={images[2].url} className="w-full h-full object-cover" alt="Article visual 3" /> : <><CloudUpload size={40} className="text-slate-300 mb-3 group-hover:scale-110 transition"/><span className="text-sm font-black text-slate-400">Click to Upload Concluding Summary</span></>}
                 <input type="file" id="story-img-3" className="hidden" onChange={handleImageChange} accept="image/*" />
              </div>
           </div>

           {/* SECTION 7: CATEGORIZATION & SEO */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-10">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">Categorization Architecture</h3>
                 
                 {/* Categories */}
                 <div className="space-y-4">
                    <label className="text-[13px] font-black text-slate-800 uppercase flex items-center gap-2"><ListTree size={16} className="text-blue-600"/> Story Category</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                       {availableCategories.map(cat => (
                         <button 
                           key={cat} type="button"
                           onClick={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                           className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition ${selectedCategories.includes(cat) ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                         >
                            {cat}
                         </button>
                       ))}
                    </div>
                    <div className="flex gap-2 group">
                       <input 
                         placeholder="Add custom category..." 
                         className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-xs border border-slate-100 focus:bg-white focus:border-blue-500 transition" 
                         value={newCatInput} 
                         onChange={e => setNewCatInput(e.target.value)} 
                         onKeyDown={e => e.key === 'Enter' && addCategory()}
                       />
                       <button type="button" onClick={addCategory} className="bg-slate-900 text-white w-12 h-11 rounded-xl flex items-center justify-center hover:bg-black transition shadow-lg"><Plus size={20}/></button>
                    </div>
                 </div>

                 {/* Tags */}
                 <div className="space-y-4">
                    <label className="text-[13px] font-black text-slate-800 uppercase flex items-center gap-2"><Layers size={16} className="text-green-600"/> Core Topics / Tags</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                       {availableTags.map(tag => (
                         <button 
                           key={tag} type="button"
                           onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                           className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition ${selectedTags.includes(tag) ? 'bg-green-600 text-white shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                         >
                            {tag}
                         </button>
                       ))}
                    </div>
                    <div className="flex gap-2 group">
                       <input 
                         placeholder="Add custom topic..." 
                         className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-xs border border-slate-100 focus:bg-white focus:border-blue-500 transition" 
                         value={newTagInput} 
                         onChange={e => setNewTagInput(e.target.value)} 
                         onKeyDown={e => e.key === 'Enter' && addTag()}
                       />
                       <button type="button" onClick={addTag} className="bg-green-600 text-white w-12 h-11 rounded-xl flex items-center justify-center hover:bg-green-700 transition shadow-lg"><Plus size={20}/></button>
                    </div>
                 </div>
              </div>

              <div className="space-y-10">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Semantic Optimization</h3>
                    <button type="button" onClick={autoGenerateKeywords} className="flex items-center gap-2 text-[10px] font-black text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all border border-blue-100 shadow-sm">
                       <Wand2 size={14}/> AI Keyphrase Extraction
                    </button>
                 </div>
                 
                 <div className="space-y-4">
                    <label className="text-[13px] font-black text-slate-800 uppercase flex items-center gap-2"><Tag size={16} className="text-pink-600"/> Auto-Generated Keywords</label>
                    <div className="flex flex-wrap gap-2 p-6 bg-slate-50 rounded-[28px] min-h-[100px] border border-slate-100/50">
                       {formData.generatedKeywords.map(kw => (
                         <span key={kw} className="bg-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-100 text-slate-600 flex items-center gap-1.5 shadow-sm group">
                            {kw} 
                            <X size={12} className="cursor-pointer text-slate-300 hover:text-red-500 transition" onClick={() => setFormData(p => ({...p, generatedKeywords: p.generatedKeywords.filter(k => k !== kw)}))}/>
                         </span>
                       ))}
                       {formData.generatedKeywords.length === 0 && <span className="text-[11px] text-slate-400 font-bold italic w-full text-center py-4">Trigger extraction to detect key story themes...</span>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-500 uppercase ml-2">Manual Addition (Comma Separated)</label>
                       <input 
                         placeholder="e.g. innovation, startup-growth, series-a" 
                         className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-xs font-bold focus:ring-2 focus:ring-blue-500/10 shadow-inner"
                         value={formData.manualKeywords}
                         onChange={e => setFormData({...formData, manualKeywords: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="p-8 bg-slate-950 rounded-[40px] text-white space-y-5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="flex items-center justify-between relative z-10">
                       <div>
                          <h4 className="text-sm font-black uppercase tracking-widest text-slate-200">Featured Placement</h4>
                          <p className="text-[10px] text-slate-500 mt-1">Pinned to homepage spotlight carousel.</p>
                       </div>
                       <button 
                         type="button"
                         onClick={() => setFormData({...formData, displayOnHome: !formData.displayOnHome})}
                         className={`w-14 h-7 rounded-full relative transition-all duration-500 shadow-inner ${formData.displayOnHome ? 'bg-blue-500' : 'bg-slate-800'}`}
                       >
                          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-lg ${formData.displayOnHome ? 'left-8' : 'left-1'}`}></div>
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </form>

        {/* Footer */}
        <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between backdrop-blur">
           <div className="flex items-center gap-8">
              <div className="space-y-1">
                 <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${images.length >= 3 ? 'text-green-600' : 'text-slate-400'}`}>
                    Multimedia Stack: {images.length}/3
                 </span>
                 <div className="flex -space-x-3">
                    {images.map(img => (
                      <div key={img.id} className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-200 overflow-hidden shadow-xl transform hover:scale-110 transition cursor-default">
                         {img.url && <img src={img.url} className="w-full h-full object-cover" alt="Uploaded track" />}
                      </div>
                    ))}
                    {images.length < 3 && Array.from({length: 3 - images.length}).map((_, i) => (
                      <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-100 border-dashed flex items-center justify-center text-slate-300">
                         <ImageIcon size={16}/>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           <div className="flex gap-6">
              <button onClick={onClose} className="px-10 py-5 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition">Abort Draft</button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || images.length < 3}
                className="bg-slate-900 text-white font-black px-16 py-5 rounded-[24px] flex items-center gap-4 hover:bg-black transition-all shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-30 disabled:hover:translate-y-0"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={24}/> : <><Sparkles size={24}/> Publish Global Entity</>}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { interviews, updateInterview, currentUser, logout } = useData();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminSettings, setShowAdminSettings] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  if (!currentUser) {
     navigate('/auth');
     return null;
  }

  const isAdmin = currentUser.role === 'admin';

  const handleApprove = (id: string, type?: string) => {
    const newStatus = type === 'live' ? 'upcoming' : 'recorded';
    updateInterview(id, { status: newStatus });
  };

  const handleReject = (id: string) => {
    updateInterview(id, { status: 'rejected' });
  };

  const displayInterviews = isAdmin 
    ? interviews 
    : interviews.filter(i => i.founderName === currentUser.name);

  const pendingCount = interviews.filter(i => i.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 pb-20">
      <AdminSettingsModal isOpen={showAdminSettings} onClose={() => setShowAdminSettings(false)} />
      <UploadArticleModal isOpen={showArticleModal} onClose={() => setShowArticleModal(false)} />
      <UploadEpisodeModal isOpen={showEpisodeModal} onClose={() => setShowEpisodeModal(false)} />
      <DestinationModal isOpen={showDestinations} onClose={() => setShowDestinations(false)} />

      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-100 px-8 py-3 flex items-center justify-between sticky top-0 z-30">
         <div className="flex items-center gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight">FOUNDER<span className="text-red-600">STORYS</span></span>
            <div className="h-4 w-px bg-slate-200 mx-2"></div>
            <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-[0.2em]">{isAdmin ? 'Admin Console' : 'Founder Hub'}</span>
         </div>
         
         <div className="flex items-center gap-4">
            <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 hover:bg-slate-50 px-3 py-2 rounded-2xl transition border border-transparent hover:border-slate-100"
                >
                  <img src={currentUser.avatar} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="avatar" />
                  <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{currentUser.name}</span>
                </button>

                {showUserMenu && (
                  <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-50 z-50 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-slate-50 mb-2">
                        <p className="text-xs font-black text-slate-900 truncate uppercase tracking-widest">{currentUser.email}</p>
                      </div>
                      {isAdmin && (
                        <button onClick={() => { setShowAdminSettings(true); setShowUserMenu(false); }} className="w-full text-left px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition flex items-center gap-3">
                            <Settings size={16} /> Admin Config
                        </button>
                      )}
                      <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-600 hover:bg-red-50 transition flex items-center gap-3">
                          <LogOut size={16} /> Sign Out
                      </button>
                  </div>
                  </>
                )}
            </div>
         </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 pt-10 space-y-12">
        
        {/* ACTION SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Control Center</h2>
             <div className="h-px flex-1 mx-8 bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
              
              <button onClick={() => navigate('/studio')} className="bg-red-600 p-6 rounded-3xl border-4 border-red-500 hover:bg-red-700 hover:shadow-2xl hover:shadow-red-900/30 transition group flex flex-col gap-4 text-left shadow-xl shadow-red-900/20">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Radio size={24} className="animate-pulse" />
                </div>
                <span className="font-black text-white text-lg uppercase tracking-tighter">Enter Studio</span>
              </button>

              {isAdmin && (
                <>
                  <button onClick={() => setShowEpisodeModal(true)} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition group flex flex-col gap-4 text-left shadow-xl shadow-slate-200/50">
                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                        <MonitorPlay size={24} />
                    </div>
                    <span className="font-black text-slate-800 text-lg uppercase tracking-tighter">Upload Episode</span>
                  </button>
                  <button onClick={() => setShowArticleModal(true)} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition group flex flex-col gap-4 text-left shadow-xl shadow-slate-200/50">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <span className="font-black text-slate-800 text-lg uppercase tracking-tighter">Publish Article</span>
                  </button>
                </>
              )}

              <button onClick={() => setShowDestinations(true)} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-slate-400 hover:shadow-2xl transition group flex flex-col gap-4 text-left shadow-xl shadow-slate-200/50">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                </div>
                <span className="font-black text-slate-800 text-lg uppercase tracking-tighter">Destinations</span>
              </button>

              <Link to="/apply?type=live" className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-slate-400 hover:shadow-2xl transition group flex flex-col gap-4 shadow-xl shadow-slate-200/50">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                    <Video size={24} />
                </div>
                <span className="font-black text-slate-800 text-lg uppercase tracking-tighter">Apply Live</span>
              </Link>
          </div>
        </section>

        {/* STATUS TABLE */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-slate-900 font-black text-xl uppercase tracking-tight">Recent Activity & Submissions</h3>
            {isAdmin && pendingCount > 0 && <span className="text-[10px] font-black bg-yellow-500 text-white px-3 py-1 rounded-full uppercase tracking-[0.2em] animate-pulse">{pendingCount} Action Required</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 min-w-[1000px]">
              <thead className="bg-slate-50/50 text-[10px] uppercase font-black tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-5">Source / Entity</th>
                  <th className="px-8 py-5">Type</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayInterviews.map((interview) => (
                  <React.Fragment key={interview.id}>
                    <tr 
                      className={`hover:bg-slate-50/50 transition cursor-pointer ${expandedRow === interview.id ? 'bg-slate-50 shadow-inner' : ''}`}
                      onClick={() => setExpandedRow(expandedRow === interview.id ? null : interview.id)}
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center font-black text-slate-900 text-sm">
                            {interview.founderName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-black text-slate-900 block uppercase tracking-tight">{interview.founderName}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{interview.companyName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex flex-col gap-1">
                          {interview.applicationType === 'live' ? (
                              <span className="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider border border-red-100">
                                <Radio size={12}/> LIVE
                              </span>
                          ) : interview.category === 'article' ? (
                              <span className="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider border border-blue-100">
                                <FileText size={12}/> STORY
                              </span>
                          ) : (
                              <span className="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-wider border border-slate-100">
                                <Video size={12}/> PITCH
                              </span>
                          )}
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         {interview.status === 'pending' && <span className="text-[10px] font-black text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100 uppercase tracking-widest">Pending</span>}
                         {interview.status === 'upcoming' && <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase tracking-widest">Active</span>}
                         {interview.status === 'recorded' && <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">Published</span>}
                         {interview.status === 'rejected' && <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest">Rejected</span>}
                      </td>
                      <td className="px-8 py-5 text-right">
                         <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                            {isAdmin && interview.status === 'pending' && (
                               <>
                                  <button onClick={() => handleApprove(interview.id, interview.applicationType)} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition"><CircleCheck size={18} /></button>
                                  <button onClick={() => handleReject(interview.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"><CircleX size={18} /></button>
                               </>
                            )}
                            <button className="p-2 text-slate-300 hover:text-slate-900 transition-all"><ChevronRight size={20} className={`transition-transform ${expandedRow === interview.id ? 'rotate-90 text-slate-900' : ''}`} /></button>
                         </div>
                      </td>
                    </tr>
                    
                    {expandedRow === interview.id && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={4} className="px-12 py-8 border-l-4 border-l-blue-600">
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                              <div className="space-y-4">
                                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contextual Keywords</h4>
                                 <div className="flex flex-wrap gap-2">
                                    {interview.metaKeywords?.map(kw => (
                                      <span key={kw} className="bg-white px-3 py-1 rounded-lg text-xs font-bold border border-slate-100 text-slate-600">#{kw}</span>
                                    ))}
                                 </div>
                                 <p className="text-sm text-slate-700 leading-relaxed italic border-l-2 border-slate-200 pl-4 py-1">
                                    "{interview.description || 'No pitch summary provided.'}"
                                 </p>
                              </div>
                              <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                 <div>
                                    <h5 className="text-[9px] font-black text-slate-400 uppercase mb-1">Date Logged</h5>
                                    <p className="text-sm font-black text-slate-900">{interview.date}</p>
                                 </div>
                                 <div>
                                    <h5 className="text-[9px] font-black text-slate-400 uppercase mb-1">Author</h5>
                                    <p className="text-sm font-black text-slate-900">{interview.author || interview.founderName}</p>
                                 </div>
                                 <div className="col-span-2">
                                    <h5 className="text-[9px] font-black text-slate-400 uppercase mb-1">Permanent Resource Link</h5>
                                    <Link to={interview.category === 'article' ? `/articles/${interview.id}` : `/watch/${interview.id}`} className="text-sm font-black text-blue-600 hover:text-blue-700 flex items-center gap-2">
                                      <LinkIcon size={16}/> View Published Entity
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminDashboard;
