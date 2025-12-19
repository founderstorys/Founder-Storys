
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Video, ArrowRight, Loader2, CircleCheck, Mail, Lock, User, Info, ShieldCheck, CircleUser, Building2 } from 'lucide-react';

const Auth: React.FC = () => {
  const { login, register } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Network delay
    setTimeout(() => {
       if (mode === 'signup') {
          register(formData.name, formData.email, formData.company);
       } else {
          login(formData.email);
       }
       setIsLoading(false);
       navigate(redirectPath);
    }, 1500);
  };

  const fillDemoAdmin = () => {
    setFormData({
      ...formData,
      email: 'admin@founderstorys.com',
      password: 'admin123'
    });
    setMode('signin');
  };

  const fillDemoUser = () => {
    setFormData({
      ...formData,
      email: 'founder@nebula.ai',
      password: 'password123'
    });
    setMode('signin');
  };

  return (
    <div className="min-h-screen flex bg-white">
       
       {/* Left: Video / Brand Side - Light Overlay */}
       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-100 items-center justify-center">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop" 
               className="w-full h-full object-cover opacity-10"
               alt="Studio Background"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-100/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 px-12 max-w-lg">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-tr from-red-600 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                   <Video className="text-white" size={24} />
                </div>
                <h1 className="text-4xl font-black text-slate-900">FOUNDER<span className="text-red-600">STORYS</span></h1>
             </div>
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Story Deserves a Global Stage.</h2>
             <p className="text-slate-600 text-lg leading-relaxed">
                Join the exclusive platform for founders to go live, record studio-quality interviews, and reach millions.
             </p>
             <div className="mt-8 flex gap-4 text-sm text-slate-500 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><CircleCheck size={16} className="text-green-600"/> Multi-stream</div>
                <div className="flex items-center gap-2"><CircleCheck size={16} className="text-green-600"/> 4K Recording</div>
                <div className="flex items-center gap-2"><CircleCheck size={16} className="text-green-600"/> AI Clips</div>
             </div>
          </div>
       </div>

       {/* Right: Auth Form - Clean Light */}
       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto bg-white">
          <div className="w-full max-w-md space-y-8 py-10">
             <div className="text-center lg:text-left">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
                <p className="mt-2 text-slate-500 font-medium">
                   {mode === 'signin' ? 'Enter your details to access your studio.' : 'Get started with your free account today.'}
                </p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-5">
                
                {mode === 'signup' && (
                   <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                      <div className="relative">
                         <User className="absolute left-4 top-3.5 text-slate-400" size={20}/>
                         <input 
                           type="text" 
                           placeholder="Full Name" 
                           required
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:border-blue-500 transition"
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                         />
                      </div>
                      <div className="relative">
                         <Building2 className="absolute left-4 top-3.5 text-slate-400" size={20}/>
                         <input 
                           type="text" 
                           placeholder="Company Name" 
                           required
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:border-blue-500 transition"
                           value={formData.company}
                           onChange={e => setFormData({...formData, company: e.target.value})}
                         />
                      </div>
                   </div>
                )}

                <div className="relative">
                   <Mail className="absolute left-4 top-3.5 text-slate-400" size={20}/>
                   <input 
                     type="email" 
                     placeholder="Email address" 
                     required
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:border-blue-500 transition"
                     value={formData.email}
                     onChange={e => setFormData({...formData, email: e.target.value})}
                   />
                </div>

                <div className="relative">
                   <Lock className="absolute left-4 top-3.5 text-slate-400" size={20}/>
                   <input 
                     type="password" 
                     placeholder="Password" 
                     required
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:border-blue-500 transition"
                     value={formData.password}
                     onChange={e => setFormData({...formData, password: e.target.value})}
                   />
                </div>
                
                {mode === 'signin' && (
                   <div className="flex items-center justify-end">
                      <a href="#" className="text-sm text-blue-600 font-bold hover:text-blue-700">Forgot password?</a>
                   </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-xl shadow-red-600/20 transition flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                   {isLoading ? <Loader2 className="animate-spin" size={18}/> : <>{mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={18}/></>}
                </button>
             </form>
             
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                   <span className="px-4 bg-white text-slate-400">Or continue with</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-900 font-bold text-sm shadow-sm">
                   <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                   Google
                </button>
                 <button className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-900 font-bold text-sm shadow-sm">
                   <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                   Facebook
                </button>
             </div>

             <div className="text-center text-sm font-medium">
                {mode === 'signin' ? (
                   <p className="text-slate-500">Don't have an account? <button onClick={() => setMode('signup')} className="text-red-600 font-bold hover:underline">Sign up</button></p>
                ) : (
                   <p className="text-slate-500">Already have an account? <button onClick={() => setMode('signin')} className="text-red-600 font-bold hover:underline">Sign in</button></p>
                )}
             </div>

             {/* Demo Access Cards - Light Mode */}
             <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-black uppercase tracking-[0.1em] text-xs">
                   <ShieldCheck size={18} />
                   <span>Quick Demo Access</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-blue-100 space-y-2 shadow-sm">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase text-slate-900">Admin Console</span>
                        <span className="text-[10px] text-slate-400 font-bold">admin@founderstorys.com</span>
                     </div>
                     <button 
                        onClick={fillDemoAdmin}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition"
                     >
                        Autofill Admin
                     </button>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-blue-100 space-y-2 shadow-sm">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase text-slate-900">Founder Studio</span>
                        <span className="text-[10px] text-slate-400 font-bold">founder@nebula.ai</span>
                     </div>
                     <button 
                        onClick={fillDemoUser}
                        className="w-full py-2 bg-slate-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition"
                     >
                        Autofill Founder
                     </button>
                  </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Auth;
