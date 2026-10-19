import { PhotographyItem } from '../types/project';

export const PHOTOGRAPHY_ARCHIVE: PhotographyItem[] = [
  {
    id: 'attikus-official-portrait',
    title: 'ATTIKUS EBENHACK — NASHVILLE FILM FESTIVAL',
    series: 'Director Portraiture Series',
    year: 2024,
    imageUrl: '/attikus-portrait.jpg',
    aspectRatio: '4:5',
    specs: {
      camera: 'Sony A1',
      lens: 'FE 50mm f/1.2 GM',
      lighting: 'Tungsten Red Carpet Ambient + Fill'
    },
    featured: true
  },
  {
    id: 'fashion-editorial-noir',
    title: 'THE SERPENTINE COAT',
    series: 'High-Fashion Noir',
    year: 2024,
    imageUrl: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383518997-personal_1731383518522_1731383518522_attikus_ebenhack_img_7816-768x1024.jpg',
    aspectRatio: '2:3',
    specs: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 80mm f/1.9',
      lighting: 'BXR 500w Grid Spotlight'
    },
    featured: true
  },
  {
    id: 'character-monochrome-profile',
    title: 'SHADOW DIALECTIC',
    series: 'Character Noir Studies',
    year: 2024,
    imageUrl: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622918-1731383622673_attikus_ebenhack_dsc05324-enhanced-nr-2-768x1152.jpg',
    aspectRatio: '2:3',
    specs: {
      camera: 'Leica SL2-S',
      lens: 'Summilux-SL 50mm f/1.4',
      lighting: 'Natural North-Facing Window Key'
    },
    featured: true
  },
  {
    id: 'cast-ensemble-look',
    title: 'NASHVILLE RISING COLLECTIVE',
    series: 'Artist Editorial',
    year: 2024,
    imageUrl: 'https://cdn.canvasrebel.com/wp-content/uploads/2024/11/c-1731383622920-1731383622673_attikus_ebenhack_img_6753-768x1024.jpg',
    aspectRatio: '16:9',
    specs: {
      camera: 'Arri Alexa Mini LF',
      lens: 'Zeiss Supreme Prime 35mm',
      lighting: 'Aputure 600d Fresnel Rim'
    },
    featured: false
  }
];
