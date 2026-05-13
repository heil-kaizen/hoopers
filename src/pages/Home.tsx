import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayerCard } from '../components/PlayerCard';
import { MOCK_PLAYERS, NBA_TEAMS } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Flame, ShoppingCart } from 'lucide-react'; // Added ShoppingCart icon
import { useTokenData } from '../hooks/useTokenData';

function TickerItem({ player }: { player: any }) {
  const { data: tokenData, loading } = useTokenData(player.marketConfig.tokenCA);
  const pc = tokenData?.priceChange24h;
  
  return (
    <div className="flex gap-2 text-white/80 shrink-0 uppercase font-medium">
        <span>{player.marketConfig.coinName}</span>
        {loading ? (
          <span className="text-white/30 truncate">...</span>
        ) : pc !== undefined ? (
          <span className={pc >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
             {pc >= 0 ? '+' : ''}{pc.toFixed(2)}%
          </span>
        ) : (
          <span className="text-white/30 truncate">---</span>
        )}
    </div>
  );
}

export function Home() {
  const [filter, setFilter] = useState('all');
  const visiblePlayers = MOCK_PLAYERS.filter(p => p.isVisible);
  const filteredPlayers = filter === 'all' 
    ? visiblePlayers 
    : visiblePlayers.filter(p => p.team === filter);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 border-b border-white/5 bg-[#0a0e1a]">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)]" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-[11px] text-[#ef4444] font-bold uppercase tracking-[2px] mb-4 flex items-center gap-2">
              <Flame className="w-3.5 h-3.5" />
              Live Season Market
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
              The NBA <span className="text-[#ef4444]">Player</span> Market
            </h1>
            <p className="text-sm md:text-lg text-white/60 max-w-xl mb-10 font-medium leading-relaxed">
              Track trending stars, analyze real-time performance stats, and inspect their market movement.
            </p>
            
            {/* NEW BUY NOW BUTTON */}
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://pump.fun/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90 rounded-full text-[12px] font-black uppercase tracking-[0.2em] px-10 h-14 shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95 border-none flex items-center gap-3"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticker Section */}
      <div className="relative h-10 bg-[#0a0e1a] flex items-center text-[12px] border-b border-white/5 overflow-hidden whitespace-nowrap">
        <div className="relative z-10 bg-white text-black pl-4 pr-6 md:pl-10 md:pr-8 h-full flex items-center font-bold uppercase tracking-wider shrink-0 whitespace-nowrap">Market Alerts:</div>
        <div className="flex gap-8 animate-marquee pl-10">
           {visiblePlayers.map(p => (
             <TickerItem key={p.id} player={p} />
           ))}
        </div>
      </div>

      {/* Roster / Market Grid Section */}
      <section className="py-12 relative bg-[#05070a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wide">Featured Market</h2>
            <div className="mt-6 md:mt-0 overflow-x-auto w-full md:w-auto pb-2 flex gap-2 hide-scrollbar">
              {NBA_TEAMS.map((team) => (
                <Button
                  key={team.value}
                  variant={filter === team.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(team.value)}
                  className={`uppercase tracking-wider whitespace-nowrap text-[11px] rounded transition-none ${filter === team.value ? 'bg-[#ef4444] text-white hover:bg-[#ef4444]/90 border-none' : 'border-white/10 hover:bg-white/5 text-white/70'}`}
                >
                  {team.name}
                </Button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredPlayers.map((player) => (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <PlayerCard player={player} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}