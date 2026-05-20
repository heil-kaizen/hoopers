import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayerData } from '../data/mockData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useTokenData } from '../hooks/useTokenData';
import { formatCurrency, formatPercentage } from '../lib/formatters';

interface PlayerCardProps {
  player: PlayerData;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const { data: tokenData, loading } = useTokenData(player.marketConfig.tokenCA);

  const price = tokenData?.price;
  const priceChange = tokenData?.priceChange24h;
  const isUp = priceChange && priceChange > 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="relative group rounded-2xl overflow-hidden bg-black/50 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-white/30 flex flex-col"
    >
      {/* Glossy overlay effect */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.05)_50%,transparent_55%)] pointer-events-none" />
      
      {/* Top Banner / Team Color */}
      <div className="p-4 relative flex justify-between items-start z-10 w-full">
        <div className="flex gap-2 items-center">
           <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white" style={{ background: player.teamColor }}>
             {player.team.substring(0, 3).toUpperCase()}
           </div>
           <Badge className="bg-[#ef4444] text-white hover:bg-[#ef4444] rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase border-none">
             {player.marketConfig.coinName}
           </Badge>
        </div>
        
        <div className="text-xs opacity-50 font-bold">
          #{player.jerseyNumber}
        </div>
      </div>

      {/* Player Image - floats up into the banner */}
      <div className="relative h-[160px] bg-gradient-to-b from-transparent to-black/80 flex items-end justify-center z-10 px-4 mt-[-20px]">
        <img 
          src={player.imageUrl} 
          alt={player.name}
          className="w-40 h-32 object-contain select-none"
          draggable="false"
        />
      </div>

      <div className="p-4 pt-2 text-center relative z-10 flex-1 flex flex-col">
        <h3 className="text-[18px] font-bold tracking-tight text-foreground uppercase mb-4">
          {player.name}
        </h3>

        {/* Stats Grid */}
        <div className="flex justify-around border-b border-white/5 pb-4 mb-3">
          <div className="text-center">
            <span className="block text-base font-bold">{player.stats.ppg}</span>
            <span className="text-[9px] text-white/50 uppercase">PPG</span>
          </div>
          <div className="text-center">
            <span className="block text-base font-bold">{player.stats.rpg}</span>
            <span className="text-[9px] text-white/50 uppercase">REB</span>
          </div>
          <div className="text-center">
            <span className="block text-base font-bold">{player.stats.apg}</span>
            <span className="text-[9px] text-white/50 uppercase">AST</span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Market Info */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/20 -mx-4 -mb-4 mt-auto">
          <div className="font-mono text-[#facc15] text-[16px] flex items-center min-h-[24px]">
            {loading ? (
              <div className="h-4 w-24 bg-white/10 animate-pulse rounded" />
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`price-${price}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  {formatCurrency(price)}
                  <span className={`text-[12px] ml-2 ${isUp ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                    {formatPercentage(priceChange)}
                  </span>
                </motion.span>
              </AnimatePresence>
            )}
          </div>
          <Link to={`/player/${player.id}`}>
            <Button className="bg-white text-black hover:bg-white/90 rounded px-3 py-1.5 h-auto text-[11px] font-bold uppercase transition-none border-none">
              Inspect
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
