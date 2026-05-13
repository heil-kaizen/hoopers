export interface PlayerData {
  id: string;
  name: string;
  team: string;
  teamColor: string;
  jerseyNumber: string;
  position: string;
  nationality: string;
  age: number;
  height: string;
  stats: {
    ppg: number;
    apg: number;
    rpg: number;
  };
  marketConfig: {
    coinName: string;
    tokenCA: string;
    tradeUrl: string;
    twitterUrl: string;
    telegramUrl: string;
    websiteUrl: string;
  };
  popularityScore: number;
  imageUrl: string;
  isVisible: boolean; // Added for manual control
}

export const NBA_TEAMS = [
  { name: 'All Teams', value: 'all' },
  { name: 'Los Angeles Lakers', value: 'Lakers' },
  { name: 'Golden State Warriors', value: 'Warriors' },
  { name: 'Dallas Mavericks', value: 'Mavericks' },
  { name: 'Milwaukee Bucks', value: 'Bucks' },
  { name: 'Denver Nuggets', value: 'Nuggets' },
  { name: 'Minnesota Timberwolves', value: 'Timberwolves' },
  { name: 'Phoenix Suns', value: 'Suns' },
  { name: 'Boston Celtics', value: 'Celtics' },
  { name: 'New York Knicks', value: 'Knicks' },
  { name: 'Oklahoma City Thunder', value: 'Thunder' },
];

export const MOCK_PLAYERS: PlayerData[] = [
  // --- NEW YORK KNICKS ---
  {
    id: 'jalen-brunson',
    name: 'Jalen Brunson',
    team: 'Knicks',
    teamColor: '#F58426', 
    jerseyNumber: '11',
    position: 'PG',
    nationality: 'USA',
    age: 27,
    height: '6\'2"',
    stats: { ppg: 28.7, apg: 6.7, rpg: 3.6 },
    marketConfig: {
      coinName: '$JB11',
      tokenCA: 'coming',
      tradeUrl: 'https://pump.fun/coin/',
      twitterUrl: 'https://x.com/',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://jalenbrunson.com'
    },
    popularityScore: 96,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628973.png',
    isVisible: true,
  },
  {
    id: 'karl-anthony-towns',
    name: 'Karl-Anthony Towns',
    team: 'Knicks',
    teamColor: '#006BB6',
    jerseyNumber: '32',
    position: 'C',
    nationality: 'Dominican Republic',
    age: 28,
    height: '7\'0"',
    stats: { ppg: 21.8, apg: 3.0, rpg: 8.3 },
    marketConfig: {
      coinName: '$KAT',
      tokenCA: 'placeholder_ca',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/KarlTowns',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://karltowns.com'
    },
    popularityScore: 92,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1626157.png',
    isVisible: true,
  },
  // --- OKC THUNDER ---
  {
    id: 'shai-gilgeous-alexander',
    name: 'Shai Gilgeous-Alexander',
    team: 'Thunder',
    teamColor: '#007AC1',
    jerseyNumber: '2',
    position: 'PG',
    nationality: 'Canada',
    age: 25,
    height: '6\'6"',
    stats: { ppg: 30.1, apg: 6.2, rpg: 5.5 },
    marketConfig: {
      coinName: '$SGA',
      tokenCA: 'placeholder_ca',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/shaiglalex',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://shai.com'
    },
    popularityScore: 98,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png',
    isVisible: true,
  },
  {
    id: 'chet-holmgren',
    name: 'Chet Holmgren',
    team: 'Thunder',
    teamColor: '#EF3B24',
    jerseyNumber: '7',
    position: 'C',
    nationality: 'USA',
    age: 22,
    height: '7\'1"',
    stats: { ppg: 16.5, apg: 2.4, rpg: 7.9 },
    marketConfig: {
      coinName: '$CHET',
      tokenCA: 'placeholder_ca',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/ChetHolmgren',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://chetholmgren.com'
    },
    popularityScore: 94,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1631096.png',
    isVisible: true,
  },
  // --- PREVIOUS PLAYERS (HIDDEN) ---
  {
    id: 'lebron-james',
    name: 'LeBron James',
    team: 'Lakers',
    teamColor: '#FDB927',
    jerseyNumber: '23',
    position: 'SF',
    nationality: 'USA',
    age: 39,
    height: '6\'9"',
    stats: { ppg: 25.7, apg: 8.3, rpg: 7.3 },
    marketConfig: {
      coinName: '$KING',
      tokenCA: 'So11111111111111111111111111111111111111112',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/KingJames',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://lebronjames.com'
    },
    popularityScore: 99,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
    isVisible: false,
  },
  {
    id: 'stephen-curry',
    name: 'Stephen Curry',
    team: 'Warriors',
    teamColor: '#1D428A',
    jerseyNumber: '30',
    position: 'PG',
    nationality: 'USA',
    age: 36,
    height: '6\'2"',
    stats: { ppg: 26.4, apg: 5.1, rpg: 4.5 },
    marketConfig: {
      coinName: '$CHEF',
      tokenCA: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/StephenCurry30',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://stephencurry30.com'
    },
    popularityScore: 98,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
    isVisible: false,
  },
  {
    id: 'luka-doncic',
    name: 'Luka Dončić',
    team: 'Mavericks',
    teamColor: '#00538C',
    jerseyNumber: '77',
    position: 'PG',
    nationality: 'Slovenia',
    age: 25,
    height: '6\'7"',
    stats: { ppg: 33.9, apg: 9.8, rpg: 9.2 },
    marketConfig: {
      coinName: '$LUKA',
      tokenCA: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/luka7doncic',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://lukadoncic.com'
    },
    popularityScore: 97,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
    isVisible: false,
  },
  {
    id: 'giannis-antetokounmpo',
    name: 'Giannis Antetokounmpo',
    team: 'Bucks',
    teamColor: '#00471B',
    jerseyNumber: '34',
    position: 'PF',
    nationality: 'Greece',
    age: 29,
    height: '6\'11"',
    stats: { ppg: 30.4, apg: 6.5, rpg: 11.5 },
    marketConfig: {
      coinName: '$FREAK',
      tokenCA: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/Giannis_An34',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://giannis.com'
    },
    popularityScore: 96,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
    isVisible: false,
  },
  {
    id: 'nikola-jokic',
    name: 'Nikola Jokić',
    team: 'Nuggets',
    teamColor: '#0E2240',
    jerseyNumber: '15',
    position: 'C',
    nationality: 'Serbia',
    age: 29,
    height: '6\'11"',
    stats: { ppg: 26.4, apg: 9.0, rpg: 12.4 },
    marketConfig: {
      coinName: '$JOKER',
      tokenCA: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbAbdEj15peSC',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/NikolaJokic',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://jokic.com'
    },
    popularityScore: 97,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',
    isVisible: false,
  },
  {
    id: 'anthony-edwards',
    name: 'Anthony Edwards',
    team: 'Timberwolves',
    teamColor: '#0C2340',
    jerseyNumber: '5',
    position: 'SG',
    nationality: 'USA',
    age: 22,
    height: '6\'4"',
    stats: { ppg: 25.9, apg: 5.1, rpg: 5.4 },
    marketConfig: {
      coinName: '$ANT',
      tokenCA: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/theantedwards_',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://anthonyedwards.com'
    },
    popularityScore: 93,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630162.png',
    isVisible: false,
  },
  {
    id: 'kevin-durant',
    name: 'Kevin Durant',
    team: 'Suns',
    teamColor: '#1D1160',
    jerseyNumber: '35',
    position: 'PF',
    nationality: 'USA',
    age: 35,
    height: '6\'11"',
    stats: { ppg: 27.1, apg: 5.0, rpg: 6.6 },
    marketConfig: {
      coinName: '$KD',
      tokenCA: 'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/KDTrey5',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://kevindurant.com'
    },
    popularityScore: 94,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
    isVisible: false,
  },
  {
    id: 'jayson-tatum',
    name: 'Jayson Tatum',
    team: 'Celtics',
    teamColor: '#007A33',
    jerseyNumber: '0',
    position: 'SF',
    nationality: 'USA',
    age: 26,
    height: '6\'8"',
    stats: { ppg: 26.9, apg: 4.9, rpg: 8.1 },
    marketConfig: {
      coinName: '$JT',
      tokenCA: '7GCihgDB8fe6gnoM83Fk3yA7A8JqStA4X7q7B2kRQm1w',
      tradeUrl: 'https://dexscreener.com',
      twitterUrl: 'https://twitter.com/jaysontatum',
      telegramUrl: 'https://t.me/placeholder',
      websiteUrl: 'https://jaysontatum.com'
    },
    popularityScore: 95,
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png',
    isVisible: false,
  }
];
