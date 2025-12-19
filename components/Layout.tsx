import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Radio, Video, Menu, X, User, LogOut, LayoutDashboard, 
  Settings, Newspaper, SquarePlay, Youtube, Facebook, 
  Twitter, Linkedin, ArrowRight 
} from 'lucide-react';
import { useData } from '../context/DataContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, interviews } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path ? 'text-slate-900 font-bold border-b-2 border-red-600' : 'text-slate-500 hover:text-slate-900';

  const handleGoLiveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/auth?redirect=/admin'); 
    } else {
      const hasApproved = interviews.some(i => i.status === 'upcoming' && i.applicationType === 'live');
      if (hasApproved) {
        navigate('/studio');
      } else {
        navigate('/admin'); 
      }
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
     if (!currentUser) {
        e.preventDefault();
        navigate('/auth?redirect=/apply');
     }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-red-600 to-red-800 rounded-xl shadow-lg group-hover:shadow-red-600/30 transition-all duration-500">
                <Video size={22} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">
                Founder<span className="text-red-600">Storys</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              <Link to="/" className={`text-[11px] uppercase tracking-[0.2em] transition-all py-1 ${isActive('/')}`}>Home</Link>
              <Link to="/videos" className={`text-[11px] uppercase tracking-[0.2em] transition-all py-1 ${isActive('/videos')}`}>Videos</Link>
              <Link to="/articles" className={`text-[11px] uppercase tracking-[0.2em] transition-all py-1 ${isActive('/articles')}`}>Articles</Link>
              <Link to="/apply" onClick={handleApplyClick} className={`text-[11px] uppercase tracking-[0.2em] transition-all py-1 ${isActive('/apply')}`}>Apply</Link>
              
              {currentUser && (
                <Link to="/admin" className={`text-[11px] uppercase tracking-[0.2em] transition-all py-1 ${isActive('/admin')}`}>Console</Link>
              )}

              <div className="h-4 w-px bg-slate-200 mx-2"></div>

              {/* Go Live Button */}
              <button 
                onClick={handleGoLiveClick}
                className="flex items-center gap-2.5 bg-red-600 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                <Radio size={14} className="animate-pulse" />
                Live Studio
              </button>

              {/* User Menu / Sign In */}
              {currentUser ? (
                <div className="relative">
                   <button 
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-3 hover:bg-slate-50 p-1 pr-4 rounded-full transition-all border border-slate-200"
                   >
                      <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm" />
                      <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">{currentUser.name.split(' ')[0]}</span>
                   </button>

                   {userDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)}></div>
                        <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 py-3 animate-in fade-in slide-in-from-top-4">
                           <div className="px-5 py-3 border-b border-slate-100 mb-2">
                              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{currentUser.name}</p>
                              <p className="text-[10px] text-slate-500 font-bold truncate mt-0.5">{currentUser.email}</p>
                           </div>
                           <Link to="/admin" onClick={() => setUserDropdownOpen(false)} className="block px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">
                              <div className="flex items-center gap-3"><LayoutDashboard size={16}/> Dashboard</div>
                           </Link>
                           <Link to="/admin" onClick={() => setUserDropdownOpen(false)} className="block px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">
                              <div className="flex items-center gap-3"><Settings size={16}/> Console Config</div>
                           </Link>
                           <div className="border-t border-slate-100 mt-2 pt-2">
                              <button 
                                onClick={() => { logout(); setUserDropdownOpen(false); navigate('/'); }}
                                className="w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                              >
                                 <LogOut size={16}/> Sign Out
                              </button>
                           </div>
                        </div>
                      </>
                   )}
                </div>
              ) : (
                <Link to="/auth" className="text-xs font-black uppercase tracking-widest text-slate-700 hover:text-red-600 transition-colors">
                   Sign In
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-3 bg-slate-100 rounded-xl border border-slate-200 text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top-10 duration-300">
            <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50">Home</Link>
              <Link to="/videos" onClick={() => setMobileMenuOpen(false)} className="px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">Videos</Link>
              <Link to="/articles" onClick={() => setMobileMenuOpen(false)} className="px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">Articles</Link>
              <Link to="/apply" onClick={(e) => { handleApplyClick(e); setMobileMenuOpen(false); }} className="px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">Apply</Link>
              
              {currentUser ? (
                 <>
                   <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">Dashboard</Link>
                   <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-red-600 hover:bg-red-50 text-left">Sign Out</button>
                 </>
              ) : (
                 <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="px-4 py-5 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 text-center mt-6 shadow-xl shadow-red-600/20">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white text-slate-900">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5 space-y-8">
               <Link to="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                    <Video size={22} />
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">
                    Founder<span className="text-red-600">Storys</span>
                  </span>
               </Link>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                The premier digital network where global founders come to broadcast their journey, build authority, and reach millions through studio-grade content.
              </p>
              <div className="flex gap-4">
                 {[Youtube, Facebook, Twitter, Linkedin].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-600 transition-all shadow-sm">
                       <Icon size={20} />
                    </a>
                 ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h3 className="text-[10px] font-black text-slate-900 tracking-[0.3em] uppercase">Platform</h3>
              <ul className="space-y-4">
                <li><Link to="/apply" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Apply Studio</Link></li>
                <li><Link to="/articles" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Insights</Link></li>
                <li><Link to="/videos" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Episode Hub</Link></li>
                <li><Link to="/studio" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Live Console</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h3 className="text-[10px] font-black text-slate-900 tracking-[0.3em] uppercase">Network</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Partner Program</a></li>
                <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Advertising</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h3 className="text-[10px] font-black text-slate-900 tracking-[0.3em] uppercase">Newsletter</h3>
              <p className="text-sm text-slate-500 font-medium">Get the week's best stories delivered to your inbox.</p>
              <div className="flex gap-2">
                 <input placeholder="Email" className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600 transition-colors shadow-sm" />
                 <button className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"><ArrowRight size={20}/></button>
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-slate-200 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               &copy; 2024 Founder Storys Network. All Rights Reserved.
            </p>
            <div className="flex gap-8">
               <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Privacy</a>
               <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Terms</a>
               <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;