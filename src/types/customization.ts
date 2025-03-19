export type CardBackStyle = 
  | 'classic-red'
  | 'classic-emerald'
  | 'royal-blue'
  | 'sunset-orange'
  | 'deep-purple'
  | 'midnight-blue'
  | 'forest-green'
  | 'ruby-red';

export type TableStyle = 'emerald-felt' | 'navy-cloth' | 'burgundy-velvet' | 'forest-green' | 'royal-purple' | 'crimson-velvet';
export type CardStyle = 'classic' | 'colorful';

export interface GameCustomization {
  cardBack: CardBackStyle;
  table: TableStyle;
  cardStyle: CardStyle;
}

export const cardBackStyles: Record<CardBackStyle, {
  name: string;
  pattern: 'grid-diamond';
  colors: [string, string];
  description: string;
}> = {
  'classic-red': {
    name: 'Classic Red',
    pattern: 'grid-diamond',
    colors: ['from-red-700 to-red-900', 'from-red-600/50 to-red-800/50'],
    description: 'Traditional diamond pattern in rich red tones'
  },
  'classic-emerald': {
    name: 'Classic Emerald',
    pattern: 'grid-diamond',
    colors: ['from-emerald-700 to-emerald-900', 'from-emerald-600/50 to-emerald-800/50'],
    description: 'Traditional diamond pattern in rich emerald tones'
  },
  'royal-blue': {
    name: 'Royal Blue',
    pattern: 'grid-diamond',
    colors: ['from-blue-700 to-blue-900', 'from-blue-600/50 to-blue-800/50'],
    description: 'Classic pattern in royal blue shades'
  },
  'sunset-orange': {
    name: 'Sunset Orange',
    pattern: 'grid-diamond',
    colors: ['from-orange-700 to-orange-900', 'from-orange-600/50 to-orange-800/50'],
    description: 'Warm orange tones with classic pattern'
  },
  'deep-purple': {
    name: 'Deep Purple',
    pattern: 'grid-diamond',
    colors: ['from-purple-700 to-purple-900', 'from-purple-600/50 to-purple-800/50'],
    description: 'Rich purple hues with classic pattern'
  },
  'midnight-blue': {
    name: 'Midnight Blue',
    pattern: 'grid-diamond',
    colors: ['from-indigo-700 to-indigo-900', 'from-indigo-600/50 to-indigo-800/50'],
    description: 'Deep midnight blue with elegant pattern'
  },
  'forest-green': {
    name: 'Forest Green',
    pattern: 'grid-diamond',
    colors: ['from-green-700 to-green-900', 'from-green-600/50 to-green-800/50'],
    description: 'Rich forest green with classic pattern'
  },
  'ruby-red': {
    name: 'Ruby Red',
    pattern: 'grid-diamond',
    colors: ['from-rose-700 to-rose-900', 'from-rose-600/50 to-rose-800/50'],
    description: 'Deep ruby red with elegant pattern'
  }
};

export const tableStyles: Record<TableStyle, {
  name: string;
  gradient: string;
  pattern: string;
  description: string;
}> = {
  'emerald-felt': {
    name: 'Emerald Felt',
    gradient: 'from-emerald-800 to-emerald-950',
    pattern: 'bg-felt',
    description: 'Classic casino-style green felt texture'
  },
  'navy-cloth': {
    name: 'Navy Cloth',
    gradient: 'from-blue-800 to-blue-950',
    pattern: 'bg-cloth',
    description: 'Sophisticated navy blue cloth texture'
  },
  'burgundy-velvet': {
    name: 'Burgundy Velvet',
    gradient: 'from-red-800 to-red-950',
    pattern: 'bg-velvet',
    description: 'Rich burgundy velvet with subtle sheen'
  },
  'forest-green': {
    name: 'Forest Green',
    gradient: 'from-green-800 to-green-950',
    pattern: 'bg-linen',
    description: 'Natural forest green with linen texture'
  },
  'royal-purple': {
    name: 'Royal Purple',
    gradient: 'from-purple-800 to-purple-950',
    pattern: 'bg-silk',
    description: 'Luxurious purple with silk-like finish'
  },
  'crimson-velvet': {
    name: 'Crimson Velvet',
    gradient: 'from-rose-800 to-rose-950',
    pattern: 'bg-velvet',
    description: 'Deep crimson with rich velvet texture'
  }
};

export const cardStyles: Record<CardStyle, {
  name: string;
  suits: Record<'♠' | '♥' | '♦' | '♣', string>;
  colors: Record<'♠' | '♥' | '♦' | '♣', string>;
  font: string;
  corners: string;
  description: string;
  layout: 'centered' | 'scattered' | 'geometric';
}> = {
  'classic': {
    name: 'Classic',
    suits: {
      '♠': '♠',
      '♥': '♥',
      '♦': '♦',
      '♣': '♣'
    },
    colors: {
      '♠': 'text-gray-900',
      '♥': 'text-red-600',
      '♦': 'text-red-600',
      '♣': 'text-gray-900'
    },
    font: 'font-serif',
    corners: 'rounded-lg',
    description: 'Traditional playing card design with classic symbols',
    layout: 'centered'
  },
  'colorful': {
    name: 'Colorful',
    suits: {
      '♠': '♠',
      '♥': '♥',
      '♦': '♦',
      '♣': '♣'
    },
    colors: {
      '♠': 'text-gray-900',
      '♥': 'text-red-600',
      '♦': 'text-orange-500',
      '♣': 'text-emerald-600'
    },
    font: 'font-serif',
    corners: 'rounded-lg',
    description: 'Classic symbols with vibrant color scheme',
    layout: 'centered'
  }
};