import { Project } from '../types/project';

export const FEATURED_SLATES: Project[] = [
  {
    id: 'the-mutiny',
    slug: 'the-mutiny',
    title: 'THE MUTINY',
    category: 'feature',
    year: 2025,
    role: 'Director & Cinematographer',
    logline: 'An 1800s maritime mutiny spirals into survival when an abandoned vessel awakens eldritch horrors deep in uncharted Caribbean waters.',
    synopsis: 'Set in 1814, a crew betrayed by their tyrannical captain seizes control of the HMS Vanguard, only to drift into an uncharted oceanic trench where ancient leviathans demand blood. Shot on location with practical marine stunts and anamorphic vintage glass.',
    technicalSpecs: {
      camera: 'Arri Alexa Mini LF',
      lenses: 'Atlas Orion Anamorphic 2x',
      aspectRatio: '2.39:1 CinemaScope',
      runtime: '118 Minutes',
      colorGrade: '35mm Film Print Emulation',
      locations: 'Outer Banks, NC & Stage 4 Water Tank'
    },
    laurels: [
      'Official Selection — Nashville Film Festival 2025',
      'Best Narrative Cinematography Nominee',
      'Cannes Marché du Film Slate Spotlight'
    ],
    media: {
      heroImage: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622919-1731383622673_attikus_ebenhack_dsc09329-2-1024x683.jpg',
      thumbnail: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622919-1731383622673_attikus_ebenhack_dsc09329-2-1024x683.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    featured: true,
    accentQuote: 'Discipline on set was forged in combat camera deployments. Every frame is fought for.'
  },
  {
    id: 'before-the-glow',
    slug: 'before-the-glow',
    title: 'BEFORE THE GLOW',
    category: 'feature',
    year: 2024,
    role: 'Director / Director of Photography',
    logline: 'In an Appalachian valley clouded by anomalous bioluminescence, two estranged radio astronomers race to decode a signal before cognitive decay sets in.',
    synopsis: 'A gripping sci-fi romantic mystery exploring intimacy under temporal dilation. Filmed in dense temperate rainforests using custom nocturnal ultraviolet lighting rigs designed specifically for camera sensors.',
    technicalSpecs: {
      camera: 'Red V-Raptor 8K VV',
      lenses: 'Kowa Prominar Anamorphic',
      aspectRatio: '2.39:1 CinemaScope',
      runtime: '32 Minutes (Festival Short / Feature Slate)',
      colorGrade: 'Spectral Cyan & Tungsten Split',
      locations: 'Great Smoky Mountains National Park'
    },
    laurels: [
      'Winner — Best Sci-Fi Short (Indie Cinema Awards)',
      'Official Selection — Austin Film Festival',
      'Festival Premiere Laurel — Atlanta Underground'
    ],
    media: {
      heroImage: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622919-1731383622673_attikus_ebenhack_img_0961-1024x683.jpg',
      thumbnail: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622919-1731383622673_attikus_ebenhack_img_0961-1024x683.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    featured: true,
    accentQuote: 'Natural darkness is a character. We do not blast light into shadows; we sculpt the darkness.'
  }
];

export const CURATED_WORKS: Project[] = [
  ...FEATURED_SLATES,
  {
    id: 'lumina-apparel',
    slug: 'lumina-apparel',
    title: 'VALOR & VELOCITY',
    category: 'commercial',
    client: 'Lumina Tactical Gear',
    year: 2024,
    role: 'Director',
    logline: 'High-intensity night ops commercial campaign shot with night-vision phosphorus optics and high-speed motion rigs.',
    technicalSpecs: {
      camera: 'Sony FX9 + Gen3 Phosphorus Rig',
      lenses: 'Cooke S4/i Primes',
      aspectRatio: '16:9 Broadcast & 9:16 Social'
    },
    media: {
      heroImage: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383518997-personal_1731383518522_1731383518522_attikus_ebenhack_img_7816-768x1024.jpg',
      thumbnail: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383518997-personal_1731383518522_1731383518522_attikus_ebenhack_img_7816-768x1024.jpg'
    },
    featured: false
  },
  {
    id: 'nashville-sound-sessions',
    slug: 'nashville-sound-sessions',
    title: 'MIDNIGHT IN MUSIC CITY',
    category: 'music_video',
    client: 'Universal Music Nashville',
    year: 2024,
    role: 'Director / DP',
    logline: 'An intimate 35mm acoustic session captured in an analog studio with tungsten lighting and vintage microphones.',
    technicalSpecs: {
      camera: 'Arri Amira',
      lenses: 'Zeiss Super Speed Mk III',
      aspectRatio: '1.85:1 Theatrical'
    },
    media: {
      heroImage: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622920-1731383622673_attikus_ebenhack_img_6753-768x1024.jpg',
      thumbnail: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622920-1731383622673_attikus_ebenhack_img_6753-768x1024.jpg'
    },
    featured: false
  },
  {
    id: 'noir-character-study',
    slug: 'noir-character-study',
    title: 'THE RECKONING',
    category: 'editorial',
    client: 'GQ / Canvas Rebel',
    year: 2024,
    role: 'Editorial Photographer',
    logline: 'High-contrast black and white character portraiture capturing the intensity of Southern indie storytellers.',
    technicalSpecs: {
      camera: 'Hasselblad H6D-100c',
      lenses: 'HC 100mm f/2.2',
      aspectRatio: '4:5 Editorial'
    },
    media: {
      heroImage: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622918-1731383622673_attikus_ebenhack_dsc05324-enhanced-nr-2-768x1152.jpg',
      thumbnail: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622918-1731383622673_attikus_ebenhack_dsc05324-enhanced-nr-2-768x1152.jpg'
    },
    featured: false
  }
];
