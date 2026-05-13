import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const COIN_ADDRESS = "coming";

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full h-[70px] flex items-center justify-between border-b border-white/5 bg-[#0a0e1a]/60 backdrop-blur-xl px-4 md:px-10">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="font-bold text-2xl tracking-tighter uppercase italic">NBA<span className="text-[#ef4444]">MARKET</span></span>
          </Link>
          
          {/* Navigation Bar - REMOVED LINKS HERE */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Nav links removed as requested */}
          </nav>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://x.com/HOOPERSMARKET1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-white/[0.03] border border-white/10 backdrop-blur-xl w-10 h-10 rounded-full transition-all hover:bg-white/[0.08] hover:border-white/20 active:scale-95 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
              title="Follow on X"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
              </svg>
            </a>

            <button 
              onClick={() => navigator.clipboard.writeText(COIN_ADDRESS)}
              className="group flex items-center gap-3 bg-white/[0.03] border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-xs transition-all hover:bg-white/[0.08] hover:border-white/20 active:scale-95 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] cursor-pointer"
              title="Copy Contract Address"
            >
              <span className="font-bold text-white/30 select-none tracking-wider">CA:</span>
              <span className="font-mono tracking-tight text-white/90 select-all">
                {COIN_ADDRESS.substring(0, 6)}...{COIN_ADDRESS.slice(-4)}
              </span>
            </button>

            <Button variant="ghost" size="icon" className="md:hidden text-white/50 hover:text-white bg-white/5 backdrop-blur-md">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-[#020617] py-12 mt-auto">
        <div className="container mx-auto px-4 justify-center text-center">
          <p className="text-white/30 font-bold uppercase tracking-[0.3em] text-[9px] mb-4">NBA MARKET</p>
          <p className="text-[10px] text-white/10 max-w-xs mx-auto leading-relaxed">
            NOT AFFILIATED WITH THE NBA. FOR DEMONSTRATION PURPOSES ONLY. THIS IS NOT A REAL TRADING PLATFORM.
          </p>
        </div>
      </footer>
    </div>
  );
}