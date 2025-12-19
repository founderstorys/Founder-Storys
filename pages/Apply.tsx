import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, CircleCheck, Loader2, FileVideo, FileImage, Radio, 
  Video, Calendar, Clock, MapPin, Phone, Check, Star, 
  ShoppingBag, Zap, Globe, Sparkles, Building2, CloudUpload
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApplicationStatus, Interview, SubscriptionPlan } from '../types';
import { useData } from '../context/DataContext';

const Apply: React.FC = () => {
  const { addInterview, currentUser, appSettings } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ApplicationStatus>(ApplicationStatus.IDLE);
  
  // Selection State
  const [appType, setAppType] = useState<'upload' | 'live'>('upload');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(appSettings.subscriptionPlans[0]?.id || '');

  // Protect Route & Handle Query Params
  useEffect(() => {
    if (!currentUser) {
      navigate('/auth?redirect=/apply');
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('type') === 'live') {
      setAppType('live');
      window.scrollTo(0, 0); 
    }
  }, [location.search, currentUser, navigate]);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    company: currentUser?.company || '',
    role: '',
    email: currentUser?.email || '',
    phone: '',
    city: '',
    description: '',
    // Live Schedule Fields
    scheduleDate: '',
    scheduleTime: '',
  });

  // Update form if currentUser loads late
  useEffect(() => {
     if(currentUser) {
        setFormData(prev => ({
           ...prev,
           name: prev.name || currentUser.name,
           email: prev.email || currentUser.email,
           company: prev.company || currentUser.company || ''
        }));
     }
  }, [currentUser]);

  const [logoName, setLogoName] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const selectedPlan = appSettings.subscriptionPlans.find(p => p.id === selectedPlanId);
  const planPrice = selectedPlan ? Math.floor(selectedPlan.basePrice * (1 - selectedPlan.discountPercentage / 100)) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(ApplicationStatus.SUBMITTING);
    
    const newInterview: Interview = {
      id: Date.now().toString(),
      founderName: formData.name,
      companyName: formData.company,
      position: formData.role,
      email: formData.email,
      phoneNumber: formData.phone,
      city: formData.city,
      title: formData.description.length > 50 ? formData.description.substring(0, 50) + '...' : formData.description,
      description: formData.description,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', 
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      status: 'pending',
      category: 'latest',
      views: 0,
      format: 'horizontal',
      date: appType === 'live' 
        ? new Date(`${formData.scheduleDate}T${formData.scheduleTime}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) 
        : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      displayOnHome: false,
      applicationType: appType,
      scheduledDate: appType === 'live' ? `${formData.scheduleDate}T${formData.scheduleTime}` : undefined
    };

    setTimeout(() => {
      addInterview(newInterview);
      setStatus(ApplicationStatus.SUCCESS);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoName(e.target.files[0].name);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoName(e.target.files[0].name);
    }
  };

  if (!currentUser) return null;

  if (status === ApplicationStatus.SUCCESS) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-200 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CircleCheck className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
          <p className="text-slate-500 mb-8">
            Thank you, {formData.name}. 
            {appType === 'live' 
              ? ' Your live session request has been booked. You can check the status in your Dashboard.' 
              : ' Your pitch video has been sent to our administration team for review.'}
          </p>
          <button 
            onClick={() => navigate('/admin')} 
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition shadow-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Broadcasting Application</h1>
          <p className="text-slate-500 text-lg font-medium">Broadcast your visionary story to the global network.</p>
        </div>

        {/* Option Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           <button 
             onClick={() => setAppType('upload')}
             className={`p-8 rounded-[40px] border-2 text-left transition-all relative overflow-hidden group ${appType === 'upload' ? 'bg-white border-blue-600 shadow-2xl scale-[1.02]' : 'bg-white border-slate-200 hover:border-slate-300'}`}
           >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${appType === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                 <Video size={28} />
              </div>
              <h3 className={`text-2xl font-black mb-2 uppercase tracking-tight ${appType === 'upload' ? 'text-slate-900' : 'text-slate-500'}`}>Pre-Recorded Pitch</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Upload your 4K professionally recorded pitch for editorial review and multi-channel publication.</p>
              {appType === 'upload' && <div className="absolute top-6 right-6 text-blue-600"><CircleCheck size={28} fill="currentColor" className="text-white bg-blue-600 rounded-full p-1"/></div>}
           </button>

           <button 
             onClick={() => setAppType('live')}
             className={`p-8 rounded-[40px] border-2 text-left transition-all relative overflow-hidden group ${appType === 'live' ? 'bg-white border-red-600 shadow-2xl scale-[1.02]' : 'bg-white border-slate-200 hover:border-slate-300'}`}
           >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${appType === 'live' ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                 <Radio size={28} className={appType === 'live' ? 'animate-pulse' : ''} />
              </div>
              <h3 className={`text-2xl font-black mb-2 uppercase tracking-tight ${appType === 'live' ? 'text-slate-900' : 'text-slate-500'}`}>Go Live Studio</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Schedule a live stream from our virtual studio. Invite guests, interact with live chat, and multistream instantly.</p>
              {appType === 'live' && <div className="absolute top-6 right-6 text-red-600"><CircleCheck size={28} fill="currentColor" className="text-white bg-red-600 rounded-full p-1"/></div>}
           </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in duration-700">
          
          {/* PERSONAL INFO SECTION */}
          <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[48px] shadow-sm">
            <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                   <Building2 size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Identity & Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 transition outline-none" placeholder="Elena Rostova" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Official Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 transition outline-none" placeholder="elena@nebula.ai" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Company Entity</label>
                  <input required name="company" value={formData.company} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 transition outline-none" placeholder="Nebula AI" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Designation</label>
                  <input required name="role" value={formData.role} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 transition outline-none" placeholder="CEO & Founder" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Contact Phone</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 transition outline-none" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Operational City</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 transition outline-none" placeholder="San Francisco, CA" />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">The Story Pitch</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 text-slate-900 focus:border-blue-500 transition resize-none outline-none" placeholder="Summarize your journey and what the audience will learn from your interview..." />
            </div>
          </div>

          {/* SCHEDULING (FOR LIVE ONLY) */}
          {appType === 'live' && (
             <div className="bg-red-50 border border-red-100 p-8 md:p-12 rounded-[48px] animate-in slide-in-from-top-4">
                <div className="flex items-center gap-3 mb-8">
                    <Calendar size={24} className="text-red-600"/>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Studio Booking</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Launch Date</label>
                      <input required type="date" name="scheduleDate" value={formData.scheduleDate} onChange={handleChange} className="w-full bg-white border border-red-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-red-500 outline-none" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Session Start (EST)</label>
                      <input required type="time" name="scheduleTime" value={formData.scheduleTime} onChange={handleChange} className="w-full bg-white border border-red-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-red-500 outline-none" />
                   </div>
                </div>
                <div className="flex items-center gap-2 mt-6 text-slate-400 text-xs italic">
                   <Clock size={14} /> Studio access is granted 30 minutes prior to broadcast for soundchecks.
                </div>
             </div>
          )}

          {/* ASSETS SECTION */}
          <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[48px]">
            <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                   <CloudUpload size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Brand Assets</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LOGO UPLOAD */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Company Identity Logo</label>
                     {logoName && <span className="text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Uploaded</span>}
                  </div>
                  <div 
                    onClick={handleLogoClick}
                    className={`group relative h-56 border-4 border-dashed rounded-[40px] flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden ${logoName ? 'border-green-500 bg-green-50/30 shadow-inner' : 'border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-white'}`}
                  >
                    {logoName ? (
                        <div className="flex flex-col items-center gap-3 animate-in zoom-in-75">
                           <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"><Check size={28}/></div>
                           <span className="text-sm font-black text-green-600 uppercase tracking-tight line-clamp-1 px-4">{logoName}</span>
                           <button onClick={(e) => {e.stopPropagation(); setLogoName(null);}} className="text-[10px] text-slate-400 uppercase font-black hover:text-red-500 underline transition">Change Logo</button>
                        </div>
                    ) : (
                        <>
                          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition-all duration-500 mb-6 group-hover:scale-110 shadow-sm border border-slate-100">
                             <FileImage size={40} />
                          </div>
                          <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Select Company Logo</span>
                          <span className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">PNG / SVG • Transparent Preferred</span>
                        </>
                    )}
                    <input ref={logoInputRef} type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                  </div>
                </div>
                
                {/* VIDEO UPLOAD */}
                <div className={`space-y-4 transition-opacity duration-500 ${appType === 'live' ? 'opacity-30 pointer-events-none' : ''}`}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Pre-Recorded 4K Pitch</label>
                  <div 
                    onClick={handleVideoClick}
                    className={`group relative h-56 border-4 border-dashed rounded-[40px] flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden ${videoName ? 'border-green-500 bg-green-50/30 shadow-inner' : 'border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-white'}`}
                  >
                    {videoName ? (
                        <div className="flex flex-col items-center gap-3 animate-in zoom-in-75">
                           <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"><Check size={28}/></div>
                           <span className="text-sm font-black text-green-600 uppercase tracking-tight line-clamp-1 px-4">{videoName}</span>
                           <button onClick={(e) => {e.stopPropagation(); setVideoName(null);}} className="text-[10px] text-slate-400 uppercase font-black hover:text-red-500 underline transition">Change Video</button>
                        </div>
                    ) : (
                        <>
                          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition-all duration-500 mb-6 group-hover:scale-110 shadow-sm border border-slate-100">
                             <FileVideo size={40} />
                          </div>
                          <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Select Video File</span>
                          <span className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">Max 3:59 • 4K Quality • MP4 / MOV</span>
                        </>
                    )}
                    <input ref={videoInputRef} type="file" className="hidden" accept="video/*" onChange={handleVideoChange} />
                  </div>
                </div>
            </div>
          </div>

          {/* SUBSCRIPTION PLAN SELECTION SECTION */}
          <div className="space-y-12">
             <div className="flex flex-col items-center text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-200 px-4 py-2 rounded-full">
                   <Star size={16} className="text-yellow-600 fill-yellow-500" />
                   <span className="text-[10px] font-black text-yellow-700 uppercase tracking-[0.4em]">Founder Exposure Tiers</span>
                </div>
                <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Choose Your Network Plan</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">Select the exposure model for your brand. All prices are discounted by 50% for a limited review window.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {appSettings.subscriptionPlans.map((plan) => {
                   const isActive = selectedPlanId === plan.id;
                   const discountPrice = Math.floor(plan.basePrice * (1 - plan.discountPercentage / 100));
                   return (
                      <div 
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`relative p-10 rounded-[48px] border-4 transition-all duration-500 cursor-pointer flex flex-col group ${isActive ? 'bg-white border-blue-600 shadow-2xl scale-[1.03] z-10' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                      >
                         {plan.name.includes('Authority') && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">Founder's Choice</div>
                         )}

                         <div className="flex items-center justify-between mb-10">
                            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-md transition-all duration-500 ${isActive ? 'bg-blue-600 text-white shadow-blue-600/30' : 'bg-slate-50 text-slate-400 group-hover:text-blue-600'}`}>
                               {plan.id === 'plan-micro' ? <Globe size={32}/> : plan.id === 'plan-creator' ? <Zap size={32}/> : <Sparkles size={32}/>}
                            </div>
                            {isActive && <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"><Check size={20}/></div>}
                         </div>

                         <h4 className={`text-2xl font-black mb-6 uppercase tracking-tight leading-none text-slate-900`}>{plan.name}</h4>
                         
                         <div className="mb-10">
                            <div className="flex items-baseline gap-3">
                               <span className={`text-5xl font-black italic tracking-tighter text-slate-900`}>₹{discountPrice}</span>
                               <span className={`text-lg line-through font-black text-slate-300`}>₹{plan.basePrice}</span>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">
                               {plan.discountPercentage}% LIMITED OFFER
                            </div>
                         </div>

                         <ul className="space-y-5 mb-12 flex-grow">
                            {plan.features.map((feature, i) => (
                               <li key={i} className={`flex items-start gap-3 text-[13px] font-bold leading-tight ${isActive ? 'text-slate-700' : 'text-slate-400'}`}>
                                  <Check size={18} className={isActive ? 'text-blue-600' : 'text-slate-200'} />
                                  {feature}
                               </li>
                            ))}
                         </ul>

                         <div className={`mt-auto py-5 rounded-[24px] text-center text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100'}`}>
                            {isActive ? 'Current Selection' : 'Choose Plan'}
                         </div>
                      </div>
                   )
                })}
             </div>
          </div>

          {/* CHECKOUT SUMMARY */}
          <div className="bg-slate-900 border border-slate-800 p-10 md:p-16 rounded-[60px] shadow-2xl overflow-hidden relative group text-white">
             <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-colors"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 text-center md:text-left">
                   <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Checkout Summary</h3>
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                      <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl text-sm font-black text-white uppercase tracking-widest shadow-sm border border-white/10 backdrop-blur">
                         <ShoppingBag size={18} className="text-blue-400"/> {selectedPlan?.name.split(' (')[0]}
                      </div>
                      <div className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-green-600/20">
                         Priority Review Enabled
                      </div>
                   </div>
                   <p className="text-xs text-slate-400 font-bold max-w-md">Your application will be reviewed by our editorial team within 24 hours of successful payment.</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-8 w-full md:w-auto">
                   <div className="text-right">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2 text-slate-400">Total Verified Due</span>
                      <span className="text-7xl font-black text-white tracking-tighter italic">₹{planPrice}</span>
                   </div>
                   
                   <button 
                     type="submit" 
                     disabled={status === ApplicationStatus.SUBMITTING}
                     className={`w-full md:w-[400px] py-8 font-black rounded-[28px] text-lg uppercase tracking-[0.2em] transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4 hover:-translate-y-2 active:translate-y-0 ${appType === 'live' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
                   >
                     {status === ApplicationStatus.SUBMITTING ? (
                       <><Loader2 className="animate-spin" size={28} /> Finalizing...</>
                     ) : (
                       <><Sparkles size={28}/> Submit & Pay Now</>
                     )}
                   </button>
                   
                   <div className="flex items-center gap-4 opacity-50 transition-all">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secured by Razorpay</div>
                      <div className="h-4 w-px bg-slate-700"></div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">256-bit Encrypted</div>
                   </div>
                </div>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;