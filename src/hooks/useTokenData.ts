import { useEffect, useState } from 'react'; // This was likely missing!
import { fetchTokenData } from '../services/tokenService';

export interface NormalizedTokenData {
  price?: number;
  marketCap?: number;
  liquidity?: number;
  volume?: number;
  priceChange24h?: number;
  image?: string;
}

export function useTokenData(tokenCA: string, pollIntervalMs = 20000) {
  const [data, setData] = useState<NormalizedTokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await fetchTokenData(tokenCA);
        if (isMounted && result) {
          setData({
            price: result.price,
            marketCap: result.marketCap,
            liquidity: result.liquidity,
            volume: result.volume,
            priceChange24h: result.priceChange24h,
            image: result.image
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    const interval = setInterval(loadData, pollIntervalMs);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [tokenCA, pollIntervalMs]);

  return { data, loading, error };
}