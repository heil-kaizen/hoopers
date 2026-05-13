import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PLAYERS } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useTokenData } from '../hooks/useTokenData';
import { formatCurrency, formatPercentage } from '../lib/formatters';
import { fetchPlayerInfo } from '../services/tokenService';

export function PlayerDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Find player ONLY if they are marked as visible
  const playerBase = MOCK_PLAYERS.find(p => p.id === id && p.isVisible === true);

  const { data: tokenData, loading } = useTokenData(playerBase?.marketConfig.tokenCA || '');
  const [realPlayerInfo, setRealPlayerInfo] = useState<any>(null);

  useEffect(() => {
    if (playerBase) {
      fetchPlayerInfo(playerBase.name).then((data) => {
        if (data && data.data && data.data.length > 0) {
          setRealPlayerInfo(data.data[0]);
        }
      });
    }
  }, [playerBase]);

  if (!playerBase) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold uppercase text-muted-foreground">Player Not Found</h2>
        <Link to="/">
          <Button className="mt-6 uppercase font-bold">Return Home</Button>
        </Link>
      </div>
    );
  }

  const player = {
    ...playerBase,
    team: realPlayerInfo?.team?.full_name || playerBase.team,
    jerseyNumber: realPlayerInfo?.jersey_number || playerBase.jerseyNumber,
    position: realPlayerInfo?.position || playerBase.position,
  };

  const price = tokenData?.price;
  const priceChange = tokenData?.priceChange24h;
  const isUp = priceChange && priceChange > 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative pt-8 pb-16 overflow-hidden border-b border-white/5 bg-[#0a0e1a]">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <Link to="/" className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-[#ef4444] hover:text-[#ef4444]/80 mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to Market
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
            >
              <div 
                className="absolute inset-0 blur-[40px] opacity-20 rounded-full"
                style={{ backgroundColor: player.teamColor || '#ef4444' }}
              />
              <img 
                src={player.imageUrl} 
                alt={player.name} 
                className="relative z-10 w-full h-full object-contain select-none"
                draggable="false"
              />
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <Badge className="bg-[#ef4444] text-white rounded-sm text-[10px] font-bold tracking-widest uppercase border-none px-2 py-0.5">
                  Rating: {player.popularityScore}
                </Badge>
                <div className="flex items-center text-white/50 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-white/5 border-none">
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: player.teamColor }}></span>
                  {player.team}
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-2 leading-none">
                {player.name}
              </h1>
              
              <p className="text-base text-white/50 font-bold uppercase tracking-widest mb-6">
                #{player.jerseyNumber} • {player.position}
              </p>

              <div className="inline-flex items-center gap-2 p-1.5 rounded-full border border-[#facc15]/50 bg-[#facc15]/5">
                <div className="pl-3 flex items-center gap-2">
                  <span className="text-[#facc15] font-bold text-sm select-none whitespace-nowrap">
                    ${player.marketConfig.coinName} CA
                  </span>
                  <span className="text-white/80 font-mono text-xs w-[120px] sm:w-auto truncate">
                    {player.marketConfig.tokenCA}
                  </span>
                </div>
                <Button 
                  onClick={() => navigator.clipboard.writeText(player.marketConfig.tokenCA)}
                  className="h-7 bg-[#facc15]/20 hover:bg-[#facc15]/30 text-[#facc15] font-bold text-xs rounded-full px-3 uppercase border-none"
                >
                  Copy
                </Button>
                <a href={player.marketConfig.tradeUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="h-7 bg-[#facc15] hover:bg-[#eab308] text-black font-bold text-xs rounded-full px-4 uppercase border-none">
                    Buy
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-auto p-6 rounded-2xl bg-gradient-to-br from-[#161b2a] to-[#0a0e1a] border border-white/5 shadow-xl self-stretch flex flex-col justify-between hidden md:flex min-w-[250px]">
              <span className="text-[11px] text-[#ef4444] font-bold uppercase tracking-widest mb-4 block">Season Stats</span>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50 text-[11px] font-bold uppercase">Points</span>
                  <span className="font-bold text-xl">{player.stats.ppg}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white/50 text-[11px] font-bold uppercase">Rebounds</span>
                  <span className="font-bold text-xl">{player.stats.rpg}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-[11px] font-bold uppercase">Assists</span>
                  <span className="font-bold text-xl">{player.stats.apg}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Section */}
      <div className="container mx-auto px-4 max-w-2xl pt-8 z-20">
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-gradient-to-br from-[#161b2a] to-[#0a0e1a] border border-white/5 shadow-2xl overflow-hidden rounded-2xl">
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {loading ? (
                  <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
                ) : tokenData?.image ? (
                  <img src={tokenData.image} alt="token logo" className="w-12 h-12 rounded-full object-cover border border-white/10" />
                ) : null}
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-wide">Market Overview</h3>
                  <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold">
                    {player.marketConfig.coinName} Token Performance
                  </p>
                </div>
              </div>
              
              <div className="text-left sm:text-right min-h-[48px]">
                {loading ? (
                  <div className="space-y-2">
                     <div className="h-8 w-32 bg-white/10 animate-pulse rounded" />
                     <div className="h-4 w-20 bg-white/10 animate-pulse rounded sm:ml-auto" />
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`price-detail-${price}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col"
                    >
                      <div className="font-mono text-3xl font-bold tracking-tight text-[#facc15]">
                        {formatCurrency(price)}
                      </div>
                      <div className={`text-[12px] font-bold flex items-center justify-start sm:justify-end ${
                        isUp ? 'text-[#22c55e]' : 'text-[#ef4444]'
                      }`}>
                        {formatPercentage(priceChange)} (24h)
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold uppercase tracking-wide text-sm mb-6 pb-2 border-b border-white/5">
                Token Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-white/50 font-bold uppercase tracking-wider text-[11px]">Market Cap</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {loading ? <span className="inline-block h-4 w-16 bg-white/10 animate-pulse" /> : formatCurrency(tokenData?.marketCap)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-white/50 font-bold uppercase tracking-wider text-[11px]">24h Volume</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {loading ? <span className="inline-block h-4 w-16 bg-white/10 animate-pulse" /> : formatCurrency(tokenData?.volume)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-white/50 font-bold uppercase tracking-wider text-[11px]">Liquidity</span>
                  <span className="font-mono font-bold text-white text-sm">
                     {loading ? <span className="inline-block h-4 w-16 bg-white/10 animate-pulse" /> : formatCurrency(tokenData?.liquidity)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 relative bg-gradient-to-t from-black/20 to-transparent">
              <div className="flex gap-4">
                <a href={player.marketConfig.tradeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-[#ef4444] text-white hover:bg-[#ef4444]/90 uppercase tracking-widest font-bold py-5 text-[11px] transition-none rounded border-none group flex items-center justify-center">
                    Trade on DEX <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}