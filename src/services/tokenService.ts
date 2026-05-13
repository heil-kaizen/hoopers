export interface TokenData {
  price?: number;
  marketCap?: number;
  liquidity?: number;
  volume?: number;
  priceChange24h?: number;
  image?: string;
}

export const fetchTokenData = async (tokenCA: string): Promise<TokenData | null> => {
  try {
    // We use DexScreener as it provides MC, Liquidity, and Volume for free
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenCA}`);
    
    if (!res.ok) throw new Error("Failed to fetch from DexScreener");

    const data = await res.json();
    const pair = data.pairs?.[0]; // Get the primary trading pair

    if (!pair) return null;

    // Mapping DexScreener's response to your interface
    return {
      price: parseFloat(pair.priceUsd),
      marketCap: pair.fdv, // Fully Diluted Valuation is the standard for MC here
      liquidity: pair.liquidity?.usd,
      volume: pair.volume?.h24, // 24h Volume
      priceChange24h: pair.priceChange?.h24,
      image: pair.info?.imageUrl
    };
  } catch (err) {
    console.error("Error fetching real token data:", err);
    return null;
  }
};

export const fetchPlayerInfo = async (playerName: string): Promise<any | null> => {
  try {
    // Note: This key ONLY works for NBA data, not for token metrics!
    const apiKey = import.meta.env.VITE_BALLDONTLIE_API_KEY;
    const headers: Record<string, string> = {};
    if (apiKey) {
      headers['Authorization'] = apiKey;
    }
    
    const searchParam = encodeURIComponent(playerName.split(' ')[0]);
    const res = await fetch(`https://api.balldontlie.io/v1/players?search=${searchParam}`, { headers });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
};