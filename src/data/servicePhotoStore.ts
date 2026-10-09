/**
 * Central Photo & Media Folder Store
 * Organizes photos into dedicated folders (Wall Painting, Mobile Van, Transit, Signage,
 * BTL, Events, and Custom Folders). Allows adding new photos, editing any existing photo,
 * creating folders, and linking photos across services with IndexedDB persistence.
 */

import { saveToIndexedDB, loadFromIndexedDB, COLLECTION_KEY, FOLDERS_KEY } from './indexedDbStorage';

export interface PhotoFolder {
  id: string;
  name: string;
  description?: string;
  color: string; // 'rose' | 'sky' | 'amber' | 'emerald' | 'purple' | 'indigo' | 'slate'
  serviceSlug?: string;
  createdAt: number;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  location: string;
  url: string;
  isMain?: boolean;
  folderId?: string;
  folderName?: string;
  addedAt?: number;
}

export interface ServicePhotoCollection {
  serviceSlug: string;
  serviceTitle: string;
  category: string;
  photos: GalleryPhoto[];
}

export const defaultPhotoFolders: PhotoFolder[] = [
  {
    id: 'folder-wall-painting',
    name: 'Wall Painting & Murals',
    description: 'Highway arterial super-murals, Dhara mustard & refined oil campaigns, rural haat walls',
    color: 'rose',
    serviceSlug: 'wall-painting-advertising',
    createdAt: 1700000000000
  },
  {
    id: 'folder-mobile-van',
    name: 'Mobile Van Roadshows',
    description: 'Tata fold-out hydraulic stage vans, 4K outdoor LED roadshows, live sampling counters',
    color: 'sky',
    serviceSlug: 'mobile-van-activity',
    createdAt: 1700000000001
  },
  {
    id: 'folder-bus-transit',
    name: 'Bus & Highway Transit',
    description: 'State transit passenger bus full wraps, intercity highway unipoles, mobility media',
    color: 'amber',
    serviceSlug: 'outdoor-advertising',
    createdAt: 1700000000002
  },
  {
    id: 'folder-train-metro',
    name: 'Train & Metro Media',
    description: 'Indian Railways 20+ express coach exterior wraps, Delhi Metro concourses and pillar wraps',
    color: 'emerald',
    serviceSlug: 'metro-transit-branding',
    createdAt: 1700000000003
  },
  {
    id: 'folder-signage',
    name: 'Signage & 3D Fabrication',
    description: '3D acrylic channel LED letters, ACP claddings, pan-India dealer fascias and glow signs',
    color: 'purple',
    serviceSlug: 'signage-fabrication',
    createdAt: 1700000000004
  },
  {
    id: 'folder-btl',
    name: 'BTL & Experiential Sampling',
    description: 'Mall atrium brand pavilions, sampling kiosks, residential society canopy activations',
    color: 'rose',
    serviceSlug: 'btl-activation',
    createdAt: 1700000000005
  },
  {
    id: 'folder-corporate',
    name: 'Corporate Events & Staging',
    description: 'Annual leadership summit arenas, curved 4K seamless LED backdrops, line-array audio',
    color: 'amber',
    serviceSlug: 'corporate-events',
    createdAt: 1700000000006
  },
  {
    id: 'folder-branding',
    name: 'Retail & Commercial Branding',
    description: 'Storefront commercial fascias, gateway cladding, dealer point-of-sale branding',
    color: 'indigo',
    serviceSlug: 'branding-services',
    createdAt: 1700000000007
  },
  {
    id: 'folder-client-uploads',
    name: 'General & Custom Uploads',
    description: 'Direct client campaign uploads, custom advertising photos, and media assets',
    color: 'slate',
    createdAt: 1700000000008
  }
];

export const defaultServicePhotoCollections: Record<string, ServicePhotoCollection> = {
  'wall-painting-advertising': {
    serviceSlug: 'wall-painting-advertising',
    serviceTitle: 'Wall Painting Advertising',
    category: 'Outdoor & Mural Media',
    photos: [
      {
        id: 'wp-1',
        title: 'Dhārā® Highway Mural Campaign',
        caption: 'Dhārā Kachi Ghani Mustard & Refined Oil Mural • Code SR 65 • Highway Arterial Wall with Street Pavers & Bench',
        location: 'NH-44 Bypass Corridor',
        url: '/images/wall-painting-dhara.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals',
        isMain: true
      },
      {
        id: 'wp-2',
        title: 'Dhara Oil Wall Painting',
        caption: 'Large-format roadside wall mural featuring Dhara edible oil branding with vibrant product visuals and high-visibility messaging',
        location: 'Urban Roadside Location',
        url: '/images/Normal Wall Painting2.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
      {
        id: 'wp-3',
        title: 'CK Birla Group – Charminar by BirlaNu Wall Painting Advertising',
        caption: 'Large-format roadside advertising campaign for Charminar by BirlaNu, featuring vibrant product visuals and clear brand messaging. The strategically positioned wall advertisement provides strong visibility to passing motorists, local residents and nearby communitiesr',
        location: 'Ashoknagar, Madhya Pradesh, India',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting3.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
       {
        id: 'wp-4',
        title: 'CK Birla Group – Charminar by BirlaNu Wall Painting Advertising',
        caption: 'Large-format roadside advertising campaign for Charminar by BirlaNu, featuring vibrant product visuals and clear brand messaging. The strategically positioned wall advertisement provides strong visibility to passing motorists, local residents and nearby communitiesr',
        location: 'Ashoknagar, Madhya Pradesh, India',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting6.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
    
       {
        id: 'wp-5',
        title: 'Mother Dairy Wall Painting Advertising',
        caption: 'High-visibility Mother Dairy wall painting campaign designed to create strong local brand awareness and promote product visibility among daily commuters, residents and nearby customers.',
        location: 'Gidderbaha, Punjab',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting7.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
      {
        id: 'wp-6',
        title: 'Mother Dairy Wall Painting Advertising',
        caption: 'High-visibility Mother Dairy wall painting campaign designed to create strong local brand awareness and promote product visibility among daily commuters, residents and nearby customers.',
        location: 'Ludhiana, Punjab, India',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting10.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
      {
        id: 'wp-7',
        title: 'Mother Dairy Shop Shutter Painting & Branding',
        caption: 'Complete Mother Dairy shop shutter branding executed with vibrant blue graphics across multiple retail shutters. The branded storefront creates a strong visual identity and high daily visibility for customers and pedestrians in the local market.',
        location: 'Akalgārh, Halwara, Punjab, India',
        url: '/images/Wall Painting/Shop Painting//Shop painting.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
       {
        id: 'wp-8',
        title: 'Nirula Fertility & IVF Wall Painting Advertising',
        caption: ' Professional outdoor wall branding campaign for Nirula Fertility & IVF, executed at a prominent roadside location in Meerut. The clean, high-visibility design communicates fertility care services and consultation information while creating strong local brand awareness.',
        location: 'Surya Palace Colony, Meerut, Uttar Pradesh',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting11.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
      {
        id: 'wp-9',
        title: 'Nirula Fertility & IVF Wall Painting Advertising',
        caption: ' Professional outdoor wall branding campaign for Nirula Fertility & IVF, executed at a prominent roadside location in Meerut. The clean, high-visibility design communicates fertility care services and consultation information while creating strong local brand awareness.',
        location: 'Surya Palace Colony, Meerut, Uttar Pradesh',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting12.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
       {
        id: 'wp-10',
        title: 'Ghadi Wall Painting Advertising',
        caption: 'High-impact Ghadi Detergent wall painting campaign executed on a large roadside wall in Phoop, Madhya Pradesh. The bright, large-format branding creates strong product visibility and brand recall among local residents, commuters and passing traffic.',
        location: 'Bhind Rd, Phoop, Phuphkalan, Madhya Pradesh',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting14.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
       {
        id: 'wp-11',
        title: 'Ghadi Wall Painting Advertising',
        caption: 'High-impact Ghadi Detergent wall painting campaign executed on a large roadside wall in Phoop, Madhya Pradesh. The bright, large-format branding creates strong product visibility and brand recall among local residents, commuters and passing traffic.',
        location: 'Bhind Rd, Phoop, Phuphkalan, Madhya Pradesh',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting17.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
    
      {
       id: 'wp-12',
       title: 'APOLLO Piping Systems Wall Painting',
       caption: 'Vibrant roadside wall painting for Apollo Piping Systems featuring product branding, water tanks and fittings for high local visibility and strong brand recall.',
       location: 'Pan-India Execution',
       url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting18.png',
       folderId: 'folder-wall-painting',
       folderName: 'Wall Painting & Murals'
},
{
       id: 'wp-13',
       title: 'APOLLO Piping Systems Wall Painting',
       caption: 'Vibrant roadside wall painting for Apollo Piping Systems featuring product branding, water tanks and fittings for high local visibility and strong brand recall.',
       location: 'Pan-India Execution',
       url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting19.png',
       folderId: 'folder-wall-painting',
       folderName: 'Wall Painting & Murals'
},
{
       id: 'wp-14',
       title: 'Apollo Piping Shop Branding',
       caption: 'Complete Apollo Piping Systems retail shop branding featuring a professionally designed storefront, shutter, side walls and entrance panels. The vibrant branded environment highlights Apollo piping products and creates strong visibility among retailers, contractors, plumbers and local customers.',
       location: 'Pan-India Execution',
       url: '/images/Wall Painting/Shop Painting//Shop painting11.png',
       folderId: 'folder-wall-painting',
       folderName: 'Wall Painting & Murals'
},
     
{
        id: 'wp-15',
        title: 'Bangur Power Cement Wall Painting Advertising',
        caption: 'High-impact Bangur Power Cement wall painting campaign executed at a prominent roadside location in Raimalā, Uttar Pradesh. The bold red-and-blue branding creates strong product visibility and reinforces brand recall among local residents, customers and passing traffic.',
        location: 'Raimalā, Uttar Pradesh',
        url: '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting16.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
      {
        id: 'wp-16',
        title: 'Bangur Power Cement Shop Shutter & Store Branding Advertising',
        caption: 'Complete Bangur Power Cement retail shop branding featuring vibrant shutter painting, storefront graphics and product branding. The bold red-and-blue design creates a strong visual identity and high visibility for customers, contractors and local building-material buyers.',
        location: 'Raimalā, Uttar Pradesh',
        url: '/images/Wall Painting/Shop Painting//Shop painting9.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
      {
        id: 'wp-17',
        title: 'Action TESA Shop Shutter Branding',
        caption: 'Professional Action TESA shop shutter branding designed with bold product visuals and clear brand messaging. The attractive storefront branding highlights panels, flooring and doors while creating strong visibility among local customers, contractors and building-material buyers.',
        location: '',
        url: '/images/Wall Painting/Shop Painting//Shop painting1.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
       {
        id: 'wp-18',
        title: 'ENEOS Shop Shutter Advertising',
        caption: 'Complete ENEOS automotive branding executed across a Bajaj Auto workshop, featuring professionally painted shop shutters, bold brand graphics and service messaging. The vibrant red-and-white branding creates strong visibility and reinforces ENEOS brand presence among vehicle owners and local customers.',
        location: 'pan-India Execution',
        url: '/images/Wall Painting/Shop Painting//Shop painting3.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },

      {
        id: 'wp-19',
        title: 'ENEOS Shop Shutter Advertising',
        caption: 'Complete ENEOS automotive branding executed across a Bajaj Auto workshop, featuring professionally painted shop shutters, bold brand graphics and service messaging. The vibrant red-and-white branding creates strong visibility and reinforces ENEOS brand presence among vehicle owners and local customers.',
        location: 'pan-India Execution',
        url: '/images/Wall Painting/Shop Painting//Shop painting7.png',
        folderId: 'folder-wall-painting',
        folderName: 'Wall Painting & Murals'
      },
      
       {
         id: 'wp-20',
          title: 'ACC Cement Dealer Shop Shutter Branding',
           caption: 'Professional ACC Cement retail shop branding executed across multiple shutters, featuring consistent ACC Cement graphics and premium dealer identification. The clean red-and-white branding creates strong storefront visibility and reinforces ACC Cement’s presence among local customers, contractors and construction professionals.',
           location: 'Pan-India Execution',
           url: '/images/Wall Painting/Shop Painting/Shop painting14.png',
           folderId: 'folder-wall-painting',
           folderName: 'Wall Painting & Murals'
       },
       {
         id: 'wp-21',
          title: 'JK Super Cement Shop Shutter Branding',
           caption: ' Bright and high-impact JK Super Cement shutter branding executed on a retail storefront. The bold yellow-orange branding and clear product messaging create strong visibility and brand recall among local customers, contractors and building-material buyers.',
           location: 'Pan-India Execution',
           url: '/images/Wall Painting/Shop Painting/Shop painting15.png',
           folderId: 'folder-wall-painting',
           folderName: 'Wall Painting & Murals'
       },


      

    ]
  },

  'mobile-van-activity': {
    serviceSlug: 'mobile-van-activity',
    serviceTitle: 'Mobile Van Activity & Roadshows',
    category: 'On-Ground Mobile Media',
    photos: [
      {
        id: 'mv-1',
        title: 'Tata Roadshow Display Van with 4K LED Screen',
        caption: 'Hydraulic fold-out stage with 10ft P4 outdoor LED wall, high-fidelity sound, and live sampling counter',
        location: 'Delhi NCR & Western UP',
        url: '/images/mobile-van.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows',
        isMain: true
      },
      {
        id: 'mv-2',
        title: 'Sony Mobile Van Advertising & Product Display Branding',
        caption: 'Premium Sony mobile van branding designed as a moving product showcase, featuring televisions, home theatre systems, wireless speakers and other consumer electronics. The branded vehicle creates high-impact visibility and enables direct product promotion across busy markets and customer locations.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image1.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-3',
        title: 'TV9 Bharatvarsh Mobile Van Branding & Activation Branding',
        caption: 'High-impact TV9 Bharatvarsh mobile van activation featuring a fully branded promotional vehicle and on-ground audience engagement. The campaign combines mobile outdoor branding with direct public interaction to maximize visibility, create awareness and strengthen audience engagement in high-footfall locations.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image2.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-4',
        title: 'Hero Xtreme 160R Mobile Van Branding',
        caption: 'Premium Hero Xtreme 160R mobile van activation featuring a fully branded promotional vehicle and dedicated motorcycle product display. The striking black-and-red setup showcases the motorcycle, key features and campaign messaging while creating high-impact visibility and direct customer engagement at a high-footfall location.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image4.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-5',
        title: 'Hero Splendor+ Mobile Van Branding & Product Promotion',
        caption: 'Eye-catching Hero Splendor+ mobile van activation featuring a fully branded promotional vehicle and dedicated motorcycle display. The campaign highlights the Splendor+ motorcycle, key features and promotional offers while creating strong roadside visibility and direct customer engagement.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image6.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-6',
        title: 'VR Movie Mobile Van Advertising',
        caption: 'Large-scale mobile van advertising campaign featuring multiple fully branded vehicles promoting the VR movie release. The striking vehicle graphics, celebrity-led creative and bold release messaging create high-impact visibility across roads, public areas and high-footfall locations.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image7.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-7',
        title: 'Acer Laptop Mobile Van Branding & Product Display Advertising',
        caption: 'Premium Acer mobile van activation featuring a fully branded experiential vehicle with an attractive product display of laptops, monitors, accessories and gaming devices. The mobile showroom creates an interactive brand experience while delivering strong product visibility and customer engagement across high-footfall locations.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image10.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-8',
        title: 'Acer Laptop Mobile Van Branding & Advertising',
        caption: 'Premium Acer mobile van activation featuring a fully branded experiential vehicle with an attractive product display of laptops, monitors, accessories and gaming devices. The mobile showroom creates an interactive brand experience while delivering strong product visibility and customer engagement across high-footfall locations.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image9.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-9',
        title: 'Parle Mobile Van Branding',
        caption: 'Vibrant Parle mobile van branding campaign featuring a fully branded promotional vehicle showcasing popular products including Parle-G, Monaco, Marie, KrackJack, Kismi and PopPins. The attractive product-focused design creates strong roadside visibility and helps engage customers across busy markets and public locations.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image12.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-10',
        title: 'Parle Mobile Van Branding & Promotion',
        caption: 'Vibrant Parle mobile van branding campaign featuring a fully branded promotional vehicle showcasing popular products including Parle-G, Monaco, Marie, KrackJack, Kismi and PopPins. The attractive product-focused design creates strong roadside visibility and helps engage customers across busy markets and public locations.',
        location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image13.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-11',
        title: 'Parle Mobile Van Branding & Product Promotion Advertising',
        caption: 'Vibrant Parle mobile van branding campaign featuring a fully branded promotional vehicle showcasing popular products including Parle-G, Monaco, Marie, KrackJack, Kismi and PopPins. The attractive product-focused design creates strong roadside visibility and helps engage customers across busy markets and public locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image11.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-12',
        title: 'Parle Mobile Van Branding & Product Promotion Advertising',
        caption: 'Vibrant Parle mobile van branding campaign featuring a fully branded promotional vehicle showcasing popular products including Parle-G, Monaco, Marie, KrackJack, Kismi and PopPins. The attractive product-focused design creates strong roadside visibility and helps engage customers across busy markets and public locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image14.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-13',
        title: 'Charminar Coloured Cement Roofing Sheets Mobile Promotion',
        caption: 'Eye-catching Charminar coloured cement roofing sheets mobile branding featuring a vibrant product display and lifestyle-focused visual. The branded mobile unit showcases colourful roofing sheets while creating strong roadside visibility and product awareness among rural and semi-urban customers.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image15.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-13',
        title: 'Charminar Coloured Cement Roofing Sheets Mobile Promotion',
        caption: 'Eye-catching Charminar coloured cement roofing sheets mobile branding featuring a vibrant product display and lifestyle-focused visual. The branded mobile unit showcases colourful roofing sheets while creating strong roadside visibility and product awareness among rural and semi-urban customers.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image16.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-13',
        title: 'Charminar Coloured Cement Roofing Sheets Mobile Promotion',
        caption: 'Eye-catching Charminar coloured cement roofing sheets mobile branding featuring a vibrant product display and lifestyle-focused visual. The branded mobile unit showcases colourful roofing sheets while creating strong roadside visibility and product awareness among rural and semi-urban customers.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image17.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-14',
        title: 'Volkswagen Ameo Mobile Van Activity & Product Promotion',
        caption: 'Premium Volkswagen Ameo mobile showroom designed as a moving product display, featuring the Ameo vehicle, product visuals and strong Volkswagen branding. The experiential vehicle creates an engaging brand presence while showcasing the car directly to potential customers at high-visibility locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image19.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-15',
        title: 'Volkswagen Ameo Mobile Van Activity & Product Promotion',
        caption: 'Premium Volkswagen Ameo mobile showroom designed as a moving product display, featuring the Ameo vehicle, product visuals and strong Volkswagen branding. The experiential vehicle creates an engaging brand presence while showcasing the car directly to potential customers at high-visibility locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image20.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-16',
        title: 'Volkswagen Ameo Mobile Van Activity & Product Promotion',
        caption: 'Premium Volkswagen Ameo mobile showroom designed as a moving product display, featuring the Ameo vehicle, product visuals and strong Volkswagen branding. The experiential vehicle creates an engaging brand presence while showcasing the car directly to potential customers at high-visibility locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image21.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
{
        id: 'mv-17',
        title: 'Toyota Glanza Mobile Van Activity & Product Promotion',
        caption: 'Premium Toyota Glanza mobile showroom featuring a fully branded display vehicle, product visuals and key feature communication. The experiential mobile setup brings the Glanza closer to potential customers and creates strong product visibility at high-footfall roadside locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image27.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-18',
        title: 'Toyota Glanza Mobile Van Activity & Product Promotion',
        caption: 'Premium Toyota Glanza mobile showroom featuring a fully branded display vehicle, product visuals and key feature communication. The experiential mobile setup brings the Glanza closer to potential customers and creates strong product visibility at high-footfall roadside locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image28.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-19',
        title: 'Toyota Glanza Mobile Van Activity & Product Promotion',
        caption: 'Premium Toyota Glanza mobile showroom featuring a fully branded display vehicle, product visuals and key feature communication. The experiential mobile setup brings the Glanza closer to potential customers and creates strong product visibility at high-footfall roadside locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image29.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-20',
        title: 'Parle Mobile Van Branding & Product Promotion Advertising',
        caption: '',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image14.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-21',
        title: 'Tanishq Jewellery Mobile Van Branding',
        caption: 'Premium Tanishq jewellery mobile showroom designed to bring an elegant retail experience directly to customers. The beautifully branded mobile unit showcases diamond and gold jewellery promotions with premium visual displays, creating strong brand visibility and customer engagement in high-footfall locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image24.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-22',
        title: 'Tanishq Jewellery Mobile Van Branding & Product Promotion',
        caption: 'Premium Tanishq jewellery mobile showroom designed to bring an elegant retail experience directly to customers. The beautifully branded mobile unit showcases diamond and gold jewellery promotions with premium visual displays, creating strong brand visibility and customer engagement in high-footfall locations.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image22.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-23',
        title: 'Lloyd Mobile Van Product Promotion',
        caption: 'Premium Lloyd mobile showroom designed to showcase a complete range of consumer electronics, including air conditioners, refrigerators, washing machines and LED TVs. The fully branded experiential vehicle creates a modern retail experience while delivering strong product visibility and direct customer engagement.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image23.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-24',
        title: 'Lloyd Mobile Van Product Promotion',
        caption: 'Premium Lloyd mobile showroom designed to showcase a complete range of consumer electronics, including air conditioners, refrigerators, washing machines and LED TVs. The fully branded experiential vehicle creates a modern retail experience while delivering strong product visibility and direct customer engagement.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image25.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-25',
        title: 'Lloyd Mobile Van Product Promotion',
        caption: 'Premium Lloyd mobile showroom designed to showcase a complete range of consumer electronics, including air conditioners, refrigerators, washing machines and LED TVs. The fully branded experiential vehicle creates a modern retail experience while delivering strong product visibility and direct customer engagement.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image26.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-26',
        title: 'W Beauty Mobile Van Branding',
        caption: 'Premium W Beauty mobile beauty experience featuring an attractive pink branded vehicle and an interactive product showcase. The campaign promotes refillable and long-wear lipsticks along with skincare and beauty products, creating an engaging on-ground experience for customers in a high-visibility lifestyle location.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image30.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-27',
        title: 'W Beauty Mobile Van Branding',
        caption: 'Premium W Beauty mobile beauty experience featuring an attractive pink branded vehicle and an interactive product showcase. The campaign promotes refillable and long-wear lipsticks along with skincare and beauty products, creating an engaging on-ground experience for customers in a high-visibility lifestyle location.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image31.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-28',
        title: 'Mahindra 415 DI Mobile Van Activity & Rural Brand Activation',
        caption: 'A high-impact mobile van branding campaign designed to promote the Mahindra 415 DI tractor across rural and semi-urban markets. The customized vehicle features prominent Mahindra branding, tractor visuals, product benefits and an interactive promotional display to attract farmers and generate strong on-ground visibility.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image32.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      {
        id: 'mv-29',
        title: 'Mahindra 415 DI Mobile Van Activity & Rural Brand Activation',
        caption: 'A high-impact mobile van branding campaign designed to promote the Mahindra 415 DI tractor across rural and semi-urban markets. The customized vehicle features prominent Mahindra branding, tractor visuals, product benefits and an interactive promotional display to attract farmers and generate strong on-ground visibility.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image33.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },

      {
        id: 'mv-30',
        title: 'Ultratech Cement Mobile Van Activity Branding',
        caption: 'A high-impact mobile van branding campaign designed to promote Ultratech Cement across rural and semi-urban markets. The customized vehicle features strong brand visibility, a realistic house construction display and engaging product communication to demonstrate the importance of a strong foundation and quality cement in building durable homes.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image34.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-31',
        title: 'Ultratech Cement Mobile Van Activity Branding',
        caption: 'A high-impact mobile van branding campaign designed to promote Ultratech Cement across rural and semi-urban markets. The customized vehicle features strong brand visibility, a realistic house construction display and engaging product communication to demonstrate the importance of a strong foundation and quality cement in building durable homes.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image35.jpeg',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-32',
        title: 'Smart Bazaar Mobile Van Branding',
        caption: 'A vibrant mobile van branding campaign designed to promote Smart Bazaar and its value-driven retail offers across urban and high-traffic locations. The customized vehicle uses bold red-and-blue branding, promotional offers, digital display content and family-oriented visuals to attract consumers and create strong on-ground brand visibility. Key Communication: “Smart Bazaar – Your One-Stop Destination for Quality & Savings.”',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image36.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-33',
        title: 'Hero Destini 125 Mobile Van Branding & Product Promotion',
        caption: 'A high-impact mobile van activation designed to promote the Hero Destini 125 scooter through an eye-catching, customized promotional vehicle. The activation combines bold Hero branding, large 3D product elements, digital display space and detailed product communication to attract attention across busy urban and local markets.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image37.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-34',
        title: 'Hero HF Deluxe Mobile Van Branding',
        caption: 'A unique experiential mobile van activation designed to promote the Hero HF Deluxe motorcycle through an attractive wedding-themed setup. The customized vehicle combines Hero branding with an elaborate decorative wedding environment, creating an eye-catching experience that connects the product with family, celebration and aspirational lifestyle messaging.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image38.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
       {
        id: 'mv-35',
        title: 'Hero HF Deluxe Mobile Van Activity Branding',
        caption: 'A unique experiential mobile van activation designed to promote the Hero HF Deluxe motorcycle through an attractive wedding-themed setup. The customized vehicle combines Hero branding with an elaborate decorative wedding environment, creating an eye-catching experience that connects the product with family, celebration and aspirational lifestyle messaging.',
       location: 'Pan-India Execution',
        url: '/images/Mobile Van Activity/Image39.png',
        folderId: 'folder-mobile-van',
        folderName: 'Mobile Van Roadshows'
      },
      
      
    ]
  },
  'outdoor-advertising': {
    serviceSlug: 'outdoor-advertising',
    serviceTitle: 'Outdoor & Transit Advertising',
    category: 'OOH & Large-Format Media',
    photos: [       

      {
        id: 'oa-1',
        title: 'POVA Curve E9 – Bus Branding & Transit Advertising',
        caption: 'A high-impact bus branding campaign transforming an electric city bus into a moving advertising platform. Full-body vehicle graphics deliver strong brand visibility across busy roads, residential areas, commercial zones, and high-traffic routes—helping brands reach thousands of commuters and pedestrians every day.',
        location: 'Pan-India Execution',
        url: '/images/bus-branding.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit',
        isMain: true
      },
      {
        id: 'oa-2',
        title: 'State Transit Bus Full Wrap',
        caption: 'A high-impact bus branding campaign transforming an electric city bus into a moving advertising platform. Full-body vehicle graphics deliver strong brand visibility across busy roads, residential areas, commercial zones, and high-traffic routes—helping brands reach thousands of commuters and pedestrians every day.',
        location: 'Pan-India Execution',
        url: '/images/Bus Branding/Bus Branding3.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit',
        isMain: true
      },
      {
        id: 'oa-3',
        title: 'Khel Khel Mein Movie– Bus Branding',
        caption: 'A high-impact movie promotion campaign for Khel Khel Mein, executed through full bus branding. The vibrant creative covers the side and rear panels of the bus, creating strong visibility and mobile brand exposure across high-traffic routes.',
        location: 'Pan-India Execution',
        url: '/images/Bus Branding/Bus Branding1.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
       
      {
        id: 'oa-4',
        title: 'Full Vehicle Wrap Branding Advertising',
        caption: 'A striking Cab Branding campaign featuring a full-side vehicle wrap with bold creative graphics and messaging. The branded cab transforms the vehicle into a moving advertising medium, delivering high visibility across busy roads, commercial areas, and urban locations while reaching pedestrians, commuters, and motorists throughout its journey.',
        location: 'Pan-India Execution',
        url: '/images/Cabs Branding/Cab Branding.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Full Vehicle Wrap Branding Advertising',
         caption: 'A striking Cab Branding campaign featuring a full-side vehicle wrap with bold creative graphics and messaging. The branded cab transforms the vehicle into a moving advertising medium, delivering high visibility across busy roads, commercial areas, and urban locations while reaching pedestrians, commuters, and motorists throughout its journey.',
        location: 'Pan-India Execution',
        url: '/images/Cabs Branding/Cab Branding3.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
       {
        id: 'oa-4',
        title: 'Cab Branding Advertising – Movie Promotion on Car',
        caption: 'A high-impact Cab Branding campaign featuring a professionally wrapped vehicle promoting a movie release. The branded car uses prominent visuals, promotional artwork, release information, and entertainment branding to capture attention on busy urban roads. This form of mobile outdoor advertising helps brands and entertainment companies achieve repeated visibility among commuters, pedestrians, and motorists.',
        location: 'Pan-India Execution',
        url: '/images/Cabs Branding/Cab Branding1.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Onsitego AC Service Cab Branding Advertising – AC Service',
        caption: 'A professionally branded cab featuring a vibrant Onsitego AC Service advertising campaign. The vehicle uses full-side branding with a prominent brand logo, promotional message, service information, and attractive visuals to create strong visibility on busy roads. Cab and car branding is an effective mobile outdoor advertising format for reaching commuters, pedestrians, and motorists across multiple locations.',
        location: 'Pan-India Execution',
        url: '/images/Cabs Branding/Cab Branding2.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      
      
      {
        id: 'oa-4',
        title: 'Auto-Rickshaw Branding Advertising – Ram Bandhu',
        caption: 'A vibrant auto-rickshaw branding campaign featuring Ram Bandhu spice products with full-body promotional graphics. The eye-catching green branding, product visuals, and engaging campaign message create strong visibility in local markets, streets, and high-traffic areas. Auto-rickshaw branding provides continuous mobile exposure and helps brands connect with a wide local audience.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood1.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Auto-Rickshaw Branding Advertising – KFC',
        caption: 'A high-impact KFC auto-rickshaw branding campaign featuring bold product visuals, prominent brand identity, and promotional messaging across the vehicle. The vibrant full-body advertising creates strong visibility in busy streets and high-traffic areas, helping the brand attract attention from commuters, pedestrians, and local audiences.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood2.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Auto-Rickshaw Branding Advertising – Sony',
        caption: 'A vibrant Sony auto-rickshaw branding campaign featuring prominent Sony branding, product visuals, promotional messaging, and a strong blue-and-yellow design. The full-body advertising creates high visibility on busy streets and helps promote Sony TVs, audio products, headphones, speakers, and accessories to commuters and local audiences.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood3.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Auto-Rickshaw Branding Advertising – Madhur Sugar',
        caption: 'A vibrant Madhur Pure & Hygienic Sugar auto-rickshaw branding campaign featuring product packaging, brand messaging, and promotional visuals across the vehicle. The bright blue, white, yellow, and green design creates strong visibility and helps the brand reach commuters, pedestrians, and local audiences through continuous mobile outdoor advertising.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood4.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Auto-Rickshaw Branding Advertising – Grab Guidance',
        caption: 'A professionally branded Grab Guidance auto-rickshaw advertising campaign featuring bold black-and-yellow branding, service information, and engaging promotional graphics. The full-body advertisement communicates the brand’s guidance and doubt-solving services while creating strong mobile visibility across busy roads and urban areas.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood5.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Auto-Rickshaw Branding Advertising – Rapido Auto',
        caption: 'A vibrant Rapido Auto full-body branding campaign featuring bold yellow and black visuals, prominent brand messaging, and a promotional offer. The eye-catching design transforms the auto-rickshaw into a moving advertising medium, delivering high visibility and strong brand recall across busy urban routes.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood6.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Prince Pipes Auto-Rickshaw Branding Advertising – Auto Hood',
        caption: 'A professionally branded auto-rickshaw featuring Prince Pipes & Fittings with a high-impact full-body advertising design. The vibrant yellow, white and green branding prominently showcases the product range, brand messaging and promotional visuals, creating strong visibility in busy urban areas..',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood7.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
       {
        id: 'oa-4',
        title: 'Prince Pipes Auto-Rickshaw Branding Advertising – Auto Hood',
        caption: 'A professionally branded auto-rickshaw featuring Prince Pipes & Fittings with a high-impact full-body advertising design. The vibrant yellow, white and green branding prominently showcases the product range, brand messaging and promotional visuals, creating strong visibility in busy urban areas..',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood8.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },

      
  
      {
        id: 'oa-4',
        title: 'E-Rickshaw Branding Advertising – GK TMT',
        caption: ' A branded E-Rickshaw advertising vehicle featuring a prominent GK TMT campaign. The vehicle uses high-visibility branding on its exterior to promote the brand while travelling through busy streets and local markets. E-Rickshaw branding is an effective mobile outdoor advertising format for achieving repeated local visibility and reaching pedestrians, commuters, and residential audiences.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood9.jpeg',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
       {
        id: 'oa-4',
        title: 'E-Rickshaw Branding Advertising – GK TMT',
        caption: ' A branded E-Rickshaw advertising vehicle featuring a prominent GK TMT campaign. The vehicle uses high-visibility branding on its exterior to promote the brand while travelling through busy streets and local markets. E-Rickshaw branding is an effective mobile outdoor advertising format for achieving repeated local visibility and reaching pedestrians, commuters, and residential audiences.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood10.jpeg',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
       {
        id: 'oa-4',
        title: 'E-Rickshaw Branding Advertising – GK TMT',
        caption: ' A branded E-Rickshaw advertising vehicle featuring a prominent GK TMT campaign. The vehicle uses high-visibility branding on its exterior to promote the brand while travelling through busy streets and local markets. E-Rickshaw branding is an effective mobile outdoor advertising format for achieving repeated local visibility and reaching pedestrians, commuters, and residential audiences.',
        location: 'Pan-India Execution',
        url: '/images/Auto Hood/Auto Hood11.jpeg',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      
      {
        id: 'oa-4',
        title: 'JioCinema – Bus Shelter Advertising',
        caption: ' A high-visibility bus shelter advertising campaign featuring branded display panels placed at a busy roadside transit location. The large-format JioCinema creatives capture the attention of commuters, pedestrians, and passing traffic, making bus shelters an effective outdoor advertising medium for strong local visibility.',
        location: 'Pan-India Execution',
        url: '/images/Bus Shelter/Bus Shelter1.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },

      {
  id: 'oa-4',
  title: 'Honda Activa 125 – Bus Shelter Advertising',
  caption: 'A prominent bus shelter advertising campaign featuring Honda Activa 125 branding across the shelter\'s main display panel and side advertising unit. Positioned in a high-traffic urban location, the campaign provides strong visibility among commuters, pedestrians, and passing vehicles.',
  location: 'Pan-India Execution',
  url: '/images/Bus Shelter/Bus Shelter2.png',
  folderId: 'folder-bus-transit',
  folderName: 'Bus & Highway Transit'
},

      {
        id: 'oa-4',
        title: 'Cremica Yippee! – Bus Shelter Advertising',
        caption: 'A vibrant bus shelter advertising campaign featuring Yippee! branding across the main shelter display and side panel. The colourful, high-impact creative is positioned at a busy urban transit point, providing excellent visibility to commuters, pedestrians, and passing traffic.',
        location: 'Pan-India Execution',
        url: '/images/Bus Shelter/Bus Shelter3.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Government Awareness Campaign – Bus Shelter Advertising',
        caption: 'A large-format bus shelter advertising campaign displayed across the main shelter panel and side advertising unit. The government awareness creative uses a high-visibility placement at a busy urban transit location to effectively reach commuters, pedestrians, and passing traffic.',
        location: 'Pan-India Execution',
        url: '/images/Bus Shelter/Bus Shelter4.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
  id: 'oa-4',
  title: 'Amazon Prime – Adhura Bus Shelter Advertising',
  caption: 'A premium bus shelter advertising campaign for Amazon Prime, featuring Adhura branding across the shelter\'s rooftop fascia, main display panel, and side panels. The full-wrap creative creates strong visual impact and delivers high visibility to commuters, pedestrians, and passing traffic.',
  location: 'Pan-India Execution',
  url: '/images/Bus Shelter/Bus Shelter5.png',
  folderId: 'folder-bus-transit',
  folderName: 'Bus & Highway Transit'
},

{
        id: 'oa-4',
        title: 'Britannia Breads – Bus Shelter Advertising',
        caption: 'A high-impact bus shelter advertising campaign for Britannia Breads, featuring branding across the shelter fascia, main back panel, and side display. The vibrant product-focused creative provides excellent visibility to commuters, pedestrians, and passing road traffic.',
        location: 'Pan-India Execution',
        url: '/images/Bus Shelter/Bus Shelter7.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      {
        id: 'oa-4',
        title: 'Rapido – Bus Shelter Advertising',
        caption: 'A vibrant bus shelter advertising campaign for Rapido, featuring the brand’s promotional creative across the main shelter panel and side display. The strategically placed advertising reaches commuters, pedestrians, and passing traffic in a busy urban commercial area.',
        location: 'Pan-India Execution',
        url: '/images/Bus Shelter/Bus Shelter8.png',
        folderId: 'folder-bus-transit',
        folderName: 'Bus & Highway Transit'
      },
      

    

    ]
  },
  'metro-transit-branding': {
    serviceSlug: 'metro-transit-branding',
    serviceTitle: 'Metro & Train Transit Branding',
    category: 'National Transit Media',
    photos: [
      {
        id: 'mt-1',
        title: 'Fortune Oil Metro Branding',
        caption: 'A high-visibility metro train branding campaign for Fortune, featuring a vibrant yellow-and-green complete exterior wrap. The campaign uses strong product visuals, brand messaging and bold colours to create high recall among daily metro commuters.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding2.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media',
        isMain: true
      },
      {
        id: 'mt-2',
        title: 'Fortune Besan 100% Chana dal Metro Interior Branding',
        caption: 'An impactful metro interior advertising campaign for Fortune Besan, featuring vibrant yellow branding across the overhead panels and interior walls. The creative highlights the message “100% Chana Dal, 100% Taste” with prominent product visuals, delivering strong brand visibility and repeated exposure to metro commuters.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding11.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media',
  
      },
      {
        id: 'mt-3',
        title: 'Amazon MX Player Metro Branding',
        caption: 'A high-impact metro advertising campaign featuring a complete train exterior wrap for Amazon MX Player. The campaign transforms the metro train into a moving entertainment billboard, using bold blue branding, character-led creative visuals and popular show promotions to capture passenger attention across stations and transit routes.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding1.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      }
      ,
      {
        id: 'mt-4',
        title: 'IKEA Metro Train Branding',
        caption: 'A A powerful metro branding campaign for IKEA, featuring a complete train wrap with IKEA’s iconic yellow-and-blue identity. The campaign delivers high-impact brand visibility and connects with thousands of daily commuters through bold messaging and attractive creative execution.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding3.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      },
      {
        id: 'mt-5',
        title: 'Tejoo Fashion Wedding Metro Interior Branding',
        caption: 'An eye-catching metro interior advertising campaign for Tejoo Fashion, promoting its wedding collection with premium visuals and festive red-gold creative. The in-train branding uses strategically placed panels to capture passengers’ attention and create strong brand recall throughout their journey.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding4.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      }
      ,
      {
        id: 'mt-6',
        title: 'Appy Fizz Metro Interior Branding',
        caption: 'A vibrant metro interior advertising campaign for Appy Fizz, featuring bold red creatives and repeated branding across the coach. Strategic placement of overhead panels and wall displays ensures high visibility and strong brand recall among metro passengers.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding12.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      }
      ,
      {
        id: 'mt-7',
        title: 'Crompton Metro Interior Branding – Kitchen Appliances',
        caption: 'A vibrant metro interior advertising campaign for Crompton, promoting its kitchen appliances through strategically placed wall posters and overhead panels. The colourful product-focused creatives deliver strong visibility and engage passengers throughout their metro journey.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding7.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      }
      ,
      {
        id: 'mt-8',
        title: 'Lahori Zeera Metro Interior Branding',
        caption: 'A vibrant metro interior advertising campaign for Lahori Zeera, featuring a bold green creative with engaging product visuals and a memorable brand message. The strategically positioned in-coach advertisement captures passengers’ attention and delivers strong brand visibility throughout the journey.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding8.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      }
      ,
      {
        id: 'mt-9',
        title: 'Konica Minolta Full Metro Branding',
        caption: 'A premium full-train branding campaign for Konica Minolta, featuring a striking blue-and-white visual theme with vibrant butterfly graphics, flowing colour elements, and strong brand visibility across the entire metro exterior. The large-format wrap creates high-impact visibility among commuters and delivers excellent brand recall.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding10.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      }
      ,
      {
        id: 'mt-10',
        title: 'Nescafé Metro Branding – Full Metro Wrap',
        caption: 'A bold and eye-catching metro train branding campaign for Nescafé, featuring a complete blue exterior wrap with prominent product visuals and the “NOW ONLY at ₹50/-” promotional message. The large-format creative delivers maximum visibility and strong brand recall among daily metro commuters.',
        location: 'Delhi Metro',
        url: '/images/Metro/Metro Branding13.png',
        folderId: 'folder-train-metro',
        folderName: 'Train & Metro Media'
      }
      ,
      
    ]
  },
  'signage-fabrication': {
    serviceSlug: 'signage-fabrication',
    serviceTitle: 'Signage & Fabrication Advertising',
    category: 'Signage & Structural Media',
    photos: [
      {
        id: 'sf-1',
        title: '3D Front-Lit LED Acrylic Channel Signboard',
        caption: 'Heavy-duty CNC routed brushed ACP facade cladding with Samsung IP67 waterproof LED modules',
        location: 'Corporate HQ, Aerocity, New Delhi',
        url: '/images/signage-fabrication.png',
        folderId: 'folder-signage',
        folderName: 'Signage & 3D Fabrication',
        isMain: true
      },

      {
        id: 'sf-2',
        title: 'Sony World – illuminated 3D Signage ',
        caption: 'IA premium Sony World illuminated signage installation featuring bold 3D lettering with bright LED illumination. The high-visibility sign creates a striking storefront presence, especially at night, and enhances brand recognition from a distance.',
        location: 'Pan-India Execution',
        url: '/images/Signage & Fabrication/Signage2.png',
        folderId: 'folder-signage',
        folderName: 'Signage & 3D Fabrication'
      },
      {
        id: 'sf-3',
        title: 'Hi-Fi Elleys Electrical – Shop Front Signage ',
        caption: 'A professionally executed shop front signage and fabrication project featuring prominent Hi-Fi Elleys branding, 3D lettering, premium fascia signage, and attractive storefront branding. The vibrant signage enhances brand visibility and creates a strong retail presence.',
        location: 'pan-India Execution',
        url: '/images/Signage & Fabrication/Signage3.png',
        folderId: 'folder-signage',
        folderName: 'Signage & 3D Fabrication'
      }
      
    ]
  },
  'btl-activation': {
    serviceSlug: 'btl-activation',
    serviceTitle: 'BTL & Experiential Marketing',
    category: 'Experiential & Consumer Activation',
    photos: [
      {
        id: 'btl-1',
        title: 'IFB DeepClean Product Showcase & BTL Activation',
        caption: 'An engaging BTL activation for IFB DeepClean, featuring a branded product display, promotional backdrop, live host engagement, product demonstration, and an interactive spin-the-wheel activity. The activation creates an attractive customer experience while highlighting IFB’s advanced washing and home appliance solutions.',
        location: '',
        url: '/images/btl-activation.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling',
        isMain: true
      },
      {
        id: 'btl-2',
        title: 'IFB DeepClean Product Showcase & BTL Activation',
        caption: 'An engaging BTL activation for IFB DeepClean, featuring a branded product display, promotional backdrop, live host engagement, product demonstration, and an interactive spin-the-wheel activity. The activation creates an attractive customer experience while highlighting IFB’s advanced washing and home appliance solutions.',
        location: '',
        url: '/images/btl-activation/Btl2.jpeg',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,
  
      {
        id: 'btl-3',
        title: 'Infra.Market Retail Branding & BTL Activation',
        caption: 'A focused retail BTL activation for Infra.Market, featuring a branded product display, promotional counter, marketing literature, product samples, and an on-ground brand representative. The activation is designed to increase visibility at the point of sale, engage retailers and customers, and showcase Infra.Market’s MDF, plywood and laminates with a strong professional brand presence.',
        location: '',
        url: '/images/btl-activation/Btl3.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
    ,
    {
        id: 'btl-4',
        title: 'Infra.Market Retail Branding & BTL Activation',
        caption: 'A focused retail BTL activation for Infra.Market, featuring a branded product display, promotional counter, marketing literature, product samples, and an on-ground brand representative. The activation is designed to increase visibility at the point of sale, engage retailers and customers, and showcase Infra.Market’s MDF, plywood and laminates with a strong professional brand presence.',
        location: '',
        url: '/images/btl-activation/Btl4.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,
    {
        id: 'btl-5',
        title: 'IFB Product Showcase & Outdoor BTL Activation',
        caption: 'An engaging outdoor BTL activation for IFB, featuring branded canopies, promotional displays, product demonstrations, standees, and an interactive customer engagement area. The activation creates a vibrant brand experience while showcasing IFB home appliances and connecting directly with potential customers.',
        location: '',
        url: '/images/btl-activation/Btl5.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,
      {
        id: 'btl-6',
        title: 'IFB Product Showcase & Outdoor BTL Activation',
        caption: 'An engaging outdoor BTL activation for IFB, featuring branded canopies, promotional displays, product demonstrations, standees, and an interactive customer engagement area. The activation creates a vibrant brand experience while showcasing IFB home appliances and connecting directly with potential customers.',
        location: '',
        url: '/images/btl-activation/Btl6.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,{
        id: 'btl-7',
        title: 'IFB Product Showcase & Outdoor BTL Activation',
        caption: 'An engaging outdoor BTL activation for IFB, featuring branded canopies, promotional displays, product demonstrations, standees, and an interactive customer engagement area. The activation creates a vibrant brand experience while showcasing IFB home appliances and connecting directly with potential customers.',
        location: '',
        url: '/images/btl-activation/Btl7.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,{
        id: 'btl-8',
        title: 'IFB Product Showcase & Outdoor BTL Activation',
        caption: 'An engaging outdoor BTL activation for IFB, featuring branded canopies, promotional displays, product demonstrations, standees, and an interactive customer engagement area. The activation creates a vibrant brand experience while showcasing IFB home appliances and connecting directly with potential customers.',
        location: '',
        url: '/images/btl-activation/Btl8.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,{
        id: 'btl-9',
        title: 'IFB Product Showcase & Outdoor BTL Activation',
        caption: 'An engaging outdoor BTL activation for IFB, featuring branded canopies, promotional displays, product demonstrations, standees, and an interactive customer engagement area. The activation creates a vibrant brand experience while showcasing IFB home appliances and connecting directly with potential customers.',
        location: '',
        url: '/images/btl-activation/Btl9.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,
    

    {
        id: 'btl-10',
        title: 'LG Premium Mall Activation & Product Showcase',
        caption: 'A premium LG mall activation and product showcase designed to engage customers through live product demonstrations and interactive brand experiences. The branded setup features LG televisions, a professional stage, host engagement, customer interaction, and a vibrant display environment that creates strong product visibility and brand recall.',
        location: '',
        url: '/images/btl-activation/Btl10.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,
    {
        id: 'btl-11',
        title: 'Vivo S1 Pro Grand Opening BTL Activation',
        caption: 'A high-impact BTL activation and product launch campaign for Vivo S1 Pro, featuring an attractive branded experience zone, product displays, promotional standees, balloons, stage setup, and customer engagement activities. The activation creates strong in-store visibility and gives customers a direct opportunity to experience and explore the product.',
        location: '',
        url: '/images/btl-activation/Btl11.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }
      ,
    {
        id: 'btl-2',
        title: 'Reliance Digital In-Store Mall Activation & Product Showcase',
        caption: 'An engaging Reliance Digital mall activation designed to attract shoppers and create direct customer interaction. The branded experience features a professionally designed product display, promotional offers, brand representatives, and live customer engagement to drive product awareness, enquiries, and conversions.',
        location: '',
        url: '/images/btl-activation/Btl12.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      },
      {
        id: 'btl-13',
        title: 'Honda Activa 125 Product Launch & BTL Activation',
        caption: 'A dynamic BTL activation campaign for Honda Activa 125, featuring a professionally branded product display, promotional backdrop, podium, standees, sound setup, and live customer engagement. The activation showcases the scooter’s power, mileage, smart features, stylish design, and trusted performance, creating strong product visibility and an engaging brand experience.',
        location: '',
        url: '/images/btl-activation/Btl13.png',
        folderId: 'folder-btl',
        folderName: 'BTL & Experiential Sampling'
      }

    ]
  },

  'corporate-events': {
    serviceSlug: 'corporate-events',
    serviceTitle: 'Corporate Event Production & Staging',
    category: 'Corporate Events & MICE',
    photos: [
      {
        id: 'ce-1',
        title: 'Corporate Awards & Recognition Event',
        caption: 'A professionally managed corporate awards and recognition event featuring a premium branded stage, LED projection screens, professional lighting, audio-visual production, and audience seating. The event creates an engaging platform for celebrating achievements, recognizing excellence, and strengthening brand communication.',
        location: '',
        url: '/images/corporate-events.png',
        folderId: 'folder-corporate',
        folderName: 'Corporate Events & Staging',
        isMain: true
      },
      {
        id: 'ce-1',
        title: 'POLYCAB Retailer Meet & Trade Partner Event',
        caption: 'A professionally executed POLYCAB Retailer Meet focused on strengthening relationships with trade partners and creating an engaging brand experience. The event featured a branded stage, LED display, promotional branding, professional lighting, and a premium corporate setup',
        location: '',
        url: '/images/Corporate/Corporate Event2.png',
        folderId: 'folder-corporate',
        folderName: 'Corporate Events & Staging',
        
      },
      {
        id: 'ce-1',
        title: 'POLYCAB Product Showcase & Retailer Meet',
        caption: 'A premium POLYCAB product showcase featuring a wide range of electrical products, including wires, switches, lighting solutions, fans, and electrical accessories. The professionally branded display created strong product visibility and an engaging experience for retailers and trade partners.',
        location: '',
        url: '/images/Corporate/Corporate Event3.png',
        folderId: 'folder-corporate',
        folderName: 'Corporate Events & Staging',
        
      },
      {
        id: 'ce-1',
        title: 'POLYCAB Retailer MeetUp & Product Launch Event',
        caption: 'A professionally executed POLYCAB Retailer Meet featuring a premium stage setup, LED screen, branded backdrop, podium, lighting, and complete event branding by Brand Solution. The setup was designed to create a strong corporate brand presence and an engaging environment for retailers and trade partners.',
        location: '',
        url: '/images/Corporate/Corporate Event4.png',
        folderId: 'folder-corporate',
        folderName: 'Corporate Events & Staging',
        
      },

    ]
  },
  // Train Branding
  'train-branding': {
  serviceSlug: 'train-branding',
  serviceTitle: 'Train Branding & Railway Advertising',
  category: 'Railway & Transit Advertising',
  photos: [
    {
      id: 'tb-1',
      title: 'Levista Full Coach Train Branding',
      caption: 'High-impact full-coach train branding featuring Levista coffee advertising across the exterior of an AC Chair Car. The large-format campaign combines bold product visuals, lifestyle imagery, and memorable messaging to create strong passenger engagement and high brand visibility at the railway station.',
      location: '',
      url: '/images/Train Branding//Train1.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      isMain: true
    }
    ,
    {
      id: 'tb-2',
      title: 'Full Train Exterior Branding',
      caption: 'A high-impact Levista Instant Coffee Premium train branding campaign featuring large-format exterior graphics across the coach body. The design combines prominent Levista branding, product visuals, lifestyle imagery, and engaging messaging to create strong visibility and repeated brand exposure among passengers and railway audiences.',
      location: '',
      url: '/images/Train Branding/Train2.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
    ,
    {
      id: 'tb-3',
      title: 'SBI Vistadome Train Exterior Branding',
      caption: 'A premium SBI Home Loan train branding campaign executed across a Vistadome coach, featuring bold SBI branding, home-loan messaging, lifestyle visuals, product benefits, and multiple creative panels. The large-format exterior branding transforms the coach into a highly visible moving advertisement, delivering strong brand recall and repeated exposure to passengers and railway audiences.',
      location: '',
      url: '/images/Train Branding/Train3.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
    ,
    {
      id: 'tb-4',
      title: 'FShree Sakthi Narayan Steel Train Branding',
      caption: 'A high-impact exterior train branding campaign for Shree Sakthi Narayan Steel Ltd., featuring a full-coach yellow wrap with prominent brand messaging, TMT bars, structural steel, MS pipes, and steel product visuals. The bold design creates strong visibility at the railway station while positioning the brand around strength, quality, and a stronger tomorrow.',
      location: '',
      url: '/images/Train Branding/Train4.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
    ,
    {
      id: 'tb-5',
      title: 'Punjab National Bank Full Train Branding',
      caption: 'A high-impact full-coach train branding campaign for Punjab National Bank (PNB), featuring a vibrant yellow-and-red exterior wrap with prominent PNB branding, PNB One app messaging, financial service icons, and engaging lifestyle imagery. The comprehensive coach branding creates strong visual impact at railway stations and delivers repeated brand exposure to passengers and commuters.',
      location: '',
      url: '/images/Train Branding/Train5.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
    ,
    {
      id: 'tb-6',
      title: 'Nippon Paint AC Chair Car Train Branding',
      caption: 'A vibrant exterior train branding campaign for Nippon Paint on an AC Chair Car, featuring full-coach blue branding, prominent Nippon Paint logos, the “Namma ooru Namma paint” message, and colorful city and cultural illustrations. The creative combines strong brand visibility with regional visual elements to create an attractive, memorable presence across the railway network.',
      location: '',
      url: '/images/Train Branding/Train6.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
    ,
    {
      id: 'tb-7',
      title: 'Niva Health Insurance Train Interior Branding',
      caption: 'A high-visibility interior train branding campaign for Niva Health Insurance, featuring branded seat-back covers across the coach along with strategically placed digital display advertisements. The consistent blue-and-white creative communicates health insurance benefits and key service messages, creating repeated passenger engagement throughout the journey.',
      location: '',
      url: '/images/Train Branding/Train7.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
    ,
    {
      id: 'tb-8',
      title: 'AGL Premium Pehchan Train Interior Branding & Sampling',
      caption: 'A high-impact train interior branding campaign for AGL Premium Pehchan, featuring branded seat-back displays throughout the coach along with an engaging onboard product sampling activity. The coordinated digital branding and direct passenger interaction create strong product visibility, trial, and brand recall during the journey.',
      location: '',
      url: '/images/Train Branding/Train8.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
    
    }
    ,
    {
      id: 'tb-9',
      title: 'Macho Sporto Thermals Train Interior Branding',
      caption: 'A high-visibility train interior branding campaign for Macho Sporto Thermals, featuring branded seat-back covers across the coach with bold red creatives, lifestyle imagery, promotional messaging, and a dedicated offer code. The consistent branding delivers repeated passenger exposure while creating strong product visibility, campaign recall, and direct purchase engagement throughout the journey.',
      location: '',
      url: '/images/Train Branding/Train9.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
    ,
    {
      id: 'tb-10',
      title: 'MP Birla Cement Train Interior Branding',
      caption: 'A premium interior train branding campaign for MP Birla Cement, featuring a large-format branded panel positioned prominently between passenger seating areas. The creative showcases MP Birla Cement Perfect Plus with strong product imagery, durability messaging, brand identity, and a clean blue-and-white visual design, delivering high-impact passenger visibility throughout the journey.',
      location: '',
      url: '/images/Train Branding/Train10.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
     
    }
    ,
    {
      id: 'tb-11',
      title: 'MP Birla Cement Samrat Advanced Train Interior Branding',
      caption: 'A high-impact interior train branding campaign for MP Birla Cement Samrat Advanced, featuring a full-height branded panel positioned prominently between passenger seating areas. The creative combines the MP Birla Group identity, product packshot, modern home imagery, strength and durability messaging, and a strong blue-and-yellow brand palette to create an engaging passenger-facing advertising display.',
      location: '',
      url: '/images/Train Branding/Train11.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
   
    }
    ,
    {
      id: 'tb-12',
      title: 'Suhana Spice Seat-Back Train Branding',
      caption: 'A creative interior train branding campaign for Suhana, featuring branded advertisements mounted on passenger seat-back trays. The bright yellow layouts prominently showcase Suhana spice products, product benefits, pack visuals, and Hindi messaging, creating strong visibility for passengers throughout their journey.',
      location: '',
      url: '/images/Train Branding/Train12.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
     
    }
    ,
    {
      id: 'tb-13',
      title: 'Suhana Seat-Back Panel Train Branding',
      caption: 'A high-visibility interior train branding campaign for Suhana, featuring branded seat-back panels across multiple passenger seats. The vibrant yellow creatives showcase Suhana spice products with multiple product packs and the message “Swad aisa, har recipe ho khaas!”, delivering repeated brand exposure and strong product visibility throughout the passenger journey.',
      location: '',
      url: '/images/Train Branding/Train13.png',
      folderId: 'folder-train-branding',
      folderName: 'Train Branding & Railway Advertising',
      
    }
  ]
},

  //
  'branding-services': {
    serviceSlug: 'branding-services',
    serviceTitle: 'Retail & Commercial Branding',
    category: 'Retail & Out-of-Home Media',
    photos: [
      {
        id: 'bs-1',
        title: 'Electrical Shop Counter Branding',
        caption: 'Vibrant electrical retail counter branding featuring multiple product brands, eye-catching graphics, and professionally finished promotional panels that enhance in-store visibility and customer engagement.',
        location: ' ',
        url: '/images/shopBranding/Shop1.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        isMain: true
      },
      {
        id: 'bs-2',
        title: 'Hi-Fi Luxe Electrical Shop Counter Branding',
        caption: 'Premium electrical retail counter branding featuring Hi-Fi Luxe product graphics, LED lighting, switches, wiring accessories, and safety-focused visuals. The bold red-and-black branded counter creates a professional retail presence while effectively showcasing electrical products and strengthening brand visibility.',
        location: ' ',
        url: '/images/shopBranding/Shop2.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
    {
        id: 'bs-3',
        title: 'Hi-Fi Electric Retail Store Front Branding',
        caption: 'Professional retail storefront branding featuring a prominent Hi-Fi Electric fascia, product display graphics, and a fully organized electrical and hardware showroom. The branded entrance creates strong roadside visibility while presenting a clean and professional dealer-store identity.',
        location: ' ',
        url: '/images/shopBranding/Shop3.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-4',
        title: 'Hi-Fi & Elley’s Electric Storefront Branding',
        caption: 'Premium electrical shop entrance branding featuring Hi-Fi Electric and Elley’s Electric product displays, glass-door graphics, and high-impact promotional visuals. The professionally branded storefront creates strong visibility while showcasing switches, switchgear, and modern electrical products.',
        location: ' ',
        url: '/images/shopBranding/Shop4.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-5',
        title: 'Hi-Fi & Elley’s Hardware Storefront Branding',
        caption: 'High-visibility retail storefront branding for Rinesh Hardware & Electrical, featuring a bold Hi-Fi and Elley’s electric fascia, branded glass-door graphics, and coordinated product displays that create a strong and professional roadside presence.',
        location: ' ',
        url: '/images/shopBranding/Shop5.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-6',
        title: 'GK TMT Building Material Storefront Branding',
        caption: 'High-impact building material shop branding featuring a bold GK TMT storefront fascia, branded rolling shutters, pillar graphics, and coordinated red-and-blue visual elements. The complete exterior branding creates strong roadside visibility and reinforces the dealer’s presence for TMT bars and building materials.',
        location: ' ',
        url: '/images/shopBranding/Shop6.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-7',
        title: 'GK TMT Building Material Shop Branding',
        caption: 'Complete building material storefront branding featuring a bold GK TMT fascia, branded rolling shutters, pillar graphics, and coordinated red-and-blue promotional elements. The extensive exterior branding creates strong roadside visibility and gives the dealer shop a distinctive, professional identity.',
        location: ' ',
        url: '/images/shopBranding/Shop7.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-8',
        title: 'Birla Nu Aerocon Building Material Storefront Branding',
        caption: 'Professional building material showroom branding featuring a prominent Birla Nu Aerocon fascia, coordinated yellow storefront graphics, branded entrance panels, and product-focused signage. The complete exterior branding creates a clean, highly visible identity for the building material and construction products outlet.',
        location: ' ',
        url: '/images/shopBranding/Shop8.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-9',
        title: 'Birla Nu Aerocon Construction Store Branding',
        caption: 'Professional construction material storefront branding featuring a bold Birla Nu Aerocon fascia, branded building facade, product signage, and coordinated blue-and-yellow visual elements. The complete exterior branding creates strong roadside visibility while giving the construction store a clean and professional identity.',
        location: ' ',
        url: '/images/shopBranding/Shop9.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-10',
        title: 'Everest Kirana Storefront Branding',
        caption: 'High-impact retail storefront branding for Ramnarayan Kirana Store featuring a prominent Everest promotional fascia, branded product graphics, colorful shop signage, and coordinated visual displays that create strong roadside visibility and an attractive customer-facing retail presence.',
        location: ' ',
        url: '/images/shopBranding/Shop10.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-11',
        title: 'Maa Bhawani Kirana Storefront Branding',
        caption: 'Vibrant neighborhood retail storefront branding featuring a prominent Maa Bhawani Store fascia, colorful FMCG product graphics, and coordinated shop signage. The branding creates strong roadside visibility and gives the local grocery store a bright, attractive, and customer-friendly appearance.',
        location: ' ',
        url: '/images/shopBranding/Shop11.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-12',
        title: 'Gupta Ji Confectionery Shop Branding',
        caption: 'Vibrant confectionery storefront branding featuring Cream Bell Maxim and Gupta Ji Ki Mojito promotional graphics, colorful product displays, and branded yellow shop panels. The eye-catching signage creates strong roadside visibility and an attractive, high-impact retail presence.',
        location: ' ',
        url: '/images/shopBranding/Shop12.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-13',
        title: 'Neevam Shiv Shankar Kirana Store Branding',
        caption: 'Eye-catching kirana store branding featuring prominent Neevam spice product graphics, a bold green-and-yellow fascia, and coordinated storefront colors. The branded shopfront enhances local visibility while creating a clean and recognizable retail identity.',
        location: ' ',
        url: '/images/shopBranding/Shop13.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-14',
        title: 'Everest Tikhalal Shiv Dhan Kirana Store Branding',
        caption: 'Vibrant kirana store branding featuring a prominent Everest Tikhalal and Hingwala promotional fascia, bold yellow-red graphics, and product-focused visuals. The branded storefront creates strong roadside visibility while enhancing the shop’s retail identity and point-of-sale presence.',
        location: ' ',
        url: '/images/shopBranding/Shop14.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-15',
        title: 'Tikhalal Radhe Mohani Kirana Store Branding',
        caption: 'Vibrant kirana store branding featuring a prominent Everest Tikhalal and Hingwala promotional fascia, bold yellow-red graphics, and product-focused visuals. The storefront branding creates strong roadside visibility while enhancing the shop’s retail identity and local customer appeal.',
        location: ' ',
        url: '/images/shopBranding/Shop15.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },{
        id: 'bs-16',
        title: 'Everest & Hi-Fi Ram Chnder Kirana Store Branding',
        caption: 'High-impact kirana store branding featuring a prominent Everest and Hi-Fi promotional fascia, colorful product graphics, celebrity-led advertising visuals, and coordinated yellow-and-blue signage. The large-format storefront branding creates strong roadside visibility and gives the retail outlet a professional, attractive identity.',
        location: ' ',
        url: '/images/shopBranding/Shop16.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },{
        id: 'bs-17',
        title: 'Hi-Fi & Elley’s Bansal Electricals Storefront Branding',
        caption: 'Professional electrical showroom branding featuring a prominent Hi-Fi and Elley’s Electric fascia, coordinated Mitsubishi Electric and Hitachi dealer signage, and a bright, modern retail entrance. The multi-brand storefront creates strong visibility and a professional identity for Bansal Electricals.',
        location: ' ',
        url: '/images/shopBranding/Shop17.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      {
        id: 'bs-18',
        title: 'Hi-Fi & Elley’s Riya Traders Electrical Store Branding',
        caption: 'Premium electrical showroom branding featuring a bold Hi-Fi and Elley’s Electric fascia, illuminated storefront signage, branded interior displays, and coordinated product graphics. The multi-brand retail frontage creates strong nighttime visibility and a professional, high-impact identity for Riya Traders.',
        location: ' ',
        url: '/images/shopBranding/Shop19.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
{
        id: 'bs-18',
        title: 'Hi-Fi & Elley’s Shri Jinwani Electricals Store Branding',
        caption: 'Premium electrical shop storefront branding featuring a bold Hi-Fi and Elley’s Electric fascia, modern blue-and-red exterior design, illuminated entrance, and organized electrical product displays. The branded facade creates strong visibility and gives Shri Jinwani Electricals a professional, contemporary retail identity.',
        location: ' ',
        url: '/images/shopBranding/Shop20.png',
        folderId: 'folder-branding',
        folderName: 'Retail & Commercial Facades',
        
      },
      
    ]
  }
};

const STORAGE_KEY = 'marcom_service_photo_collections_v3';
const FOLDERS_STORAGE_KEY = 'marcom_photo_folders_v3';
const DEFAULT_WALL_PAINTING_IMAGE_URL = '/images/Normal Wall Painting2.png';
const MISSING_WALL_PAINTING_IMAGE_URLS = new Set([
  '/imagesServices/Wall Painting/Normal Wall Painting3.png',
  '/images/Wall Painting/Normal Wall Painting/Normal Wall Painting3.png',
  'public/images/Normal Wall Painting2.png'
]);

function migrateMissingWallPaintingImage(
  collections: Record<string, ServicePhotoCollection>
): { collections: Record<string, ServicePhotoCollection>; migrated: boolean } {
  let migrated = false;
  const updatedCollections = Object.fromEntries(
    Object.entries(collections).map(([serviceSlug, collection]) => [
      serviceSlug,
      {
        ...collection,
        photos: collection.photos.map((photo) => {
          if (!MISSING_WALL_PAINTING_IMAGE_URLS.has(photo.url)) return photo;
          migrated = true;
          return { ...photo, url: DEFAULT_WALL_PAINTING_IMAGE_URL };
        })
      }
    ])
  );

  return { collections: updatedCollections, migrated };
}

// In-memory caches for fast, synchronous reads without flicker
let memoryCache: Record<string, ServicePhotoCollection> = { ...defaultServicePhotoCollections };
let foldersCache: PhotoFolder[] = [...defaultPhotoFolders];

// Initial hydration from localStorage (if non-oversized data exists)
try {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const migration = migrateMissingWallPaintingImage(parsed);
      memoryCache = { ...defaultServicePhotoCollections, ...migration.collections };
      if (migration.migrated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryCache));
      }
    }
    const rawFolders = localStorage.getItem(FOLDERS_STORAGE_KEY);
    if (rawFolders) {
      const parsedFolders = JSON.parse(rawFolders);
      foldersCache = parsedFolders;
    }
  }
} catch {
  // Use default presets
}

// Asynchronous hydration from IndexedDB (unlimited quota)
if (typeof window !== 'undefined') {
  Promise.all([
    loadFromIndexedDB<Record<string, ServicePhotoCollection>>(COLLECTION_KEY),
    loadFromIndexedDB<PhotoFolder[]>(FOLDERS_KEY)
  ])
    .then(([savedCollections, savedFolders]) => {
      let updated = false;
      if (savedCollections && Object.keys(savedCollections).length > 0) {
        const migration = migrateMissingWallPaintingImage(savedCollections);
        memoryCache = { ...defaultServicePhotoCollections, ...migration.collections };
        if (migration.migrated) {
          saveToIndexedDB(memoryCache, COLLECTION_KEY).catch((err) => {
            console.warn('IndexedDB photo migration failed:', err);
          });
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryCache));
          } catch {
            // IndexedDB remains the primary store for photo collections.
          }
        }
        updated = true;
      }
      if (savedFolders && savedFolders.length > 0) {
        foldersCache = savedFolders;
        updated = true;
      }
      if (updated) {
        window.dispatchEvent(new Event('marcom_photos_updated'));
      }
    })
    .catch(() => {
      // Ignore read errors
    });
}

/**
 * Get all photo folders.
 */
export function getPhotoFolders(): PhotoFolder[] {
  return foldersCache;
}

/**
 * Get a specific folder by ID.
 */
export function getFolderById(folderId: string): PhotoFolder | undefined {
  return foldersCache.find((f) => f.id === folderId);
}

/**
 * Save folders to cache, IndexedDB, and localStorage.
 */
function saveFolders(folders: PhotoFolder[]): void {
  foldersCache = folders;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('marcom_photos_updated'));
  }
  saveToIndexedDB(folders, FOLDERS_KEY).catch((err) => {
    console.warn('IndexedDB folders save failed:', err);
  });
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(folders));
    }
  } catch {
    // Suppress quota exceeded in localStorage
  }
}

/**
 * Create a new photo folder.
 */
export function createPhotoFolder(
  name: string,
  description?: string,
  color: string = 'rose',
  serviceSlug?: string
): PhotoFolder {
  const newFolder: PhotoFolder = {
    id: `folder-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    description: description?.trim(),
    color,
    serviceSlug,
    createdAt: Date.now()
  };

  const updatedFolders = [...foldersCache, newFolder];
  saveFolders(updatedFolders);
  return newFolder;
}

/**
 * Update an existing photo folder.
 */
export function updatePhotoFolder(folderId: string, updates: Partial<PhotoFolder>): void {
  const updatedFolders = foldersCache.map((f) => {
    if (f.id === folderId) {
      return { ...f, ...updates };
    }
    return f;
  });
  saveFolders(updatedFolders);
}

/**
 * Delete a photo folder.
 */
export function deletePhotoFolder(folderId: string): void {
  const updatedFolders = foldersCache.filter((f) => f.id !== folderId);
  saveFolders(updatedFolders);
}

/**
 * Get all photo collections.
 */
export function getServicePhotoCollections(): Record<string, ServicePhotoCollection> {
  return memoryCache;
}

/**
 * Get a specific service's photo collection.
 */
export function getServicePhotos(serviceSlug: string): ServicePhotoCollection {
  const all = getServicePhotoCollections();
  return (
    all[serviceSlug] || {
      serviceSlug,
      serviceTitle: serviceSlug.replace(/-/g, ' ').toUpperCase(),
      category: 'Outdoor Advertising',
      photos: [
        {
          id: 'default-1',
          title: 'Campaign Photo Execution',
          caption: 'Verified Pan-India advertising execution by Marcom Brand Solution',
          location: 'Pan-India',
          url: '/images/wall-painting-dhara.png',
          folderId: 'folder-client-uploads',
          folderName: 'General & Custom Uploads',
          isMain: true
        }
      ]
    }
  );
}

/**
 * Get the active main photo for a service.
 */
export function getMainPhotoForService(serviceSlug: string): string {
  const collection = getServicePhotos(serviceSlug);
  const main = collection.photos.find((p) => p.isMain) || collection.photos[0];
  return main?.url || '/images/wall-painting-dhara.png';
}

/**
 * Get all photos across all services (flattened list with source service info).
 */
export function getAllPhotos(): (GalleryPhoto & { serviceSlug: string; serviceTitle: string })[] {
  const all = getServicePhotoCollections();
  const list: (GalleryPhoto & { serviceSlug: string; serviceTitle: string })[] = [];
  const seenIds = new Set<string>();

  Object.values(all).forEach((collection) => {
    collection.photos.forEach((photo) => {
      if (!seenIds.has(photo.id)) {
        seenIds.add(photo.id);
        list.push({
          ...photo,
          serviceSlug: collection.serviceSlug,
          serviceTitle: collection.serviceTitle
        });
      }
    });
  });

  return list;
}

/**
 * Get all photos stored in a specific folder.
 */
export function getPhotosByFolder(
  folderId: string
): (GalleryPhoto & { serviceSlug: string; serviceTitle: string })[] {
  const all = getAllPhotos();
  return all.filter((p) => p.folderId === folderId);
}

/**
 * Save collections safely to Memory + IndexedDB (unlimited quota)
 * with a safe, non-throwing fallback to localStorage.
 */
function saveCollections(collections: Record<string, ServicePhotoCollection>): void {
  // 1. Immediately update in-memory cache
  memoryCache = collections;

  // 2. Dispatch event so UI updates immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('marcom_photos_updated'));
  }

  // 3. Persist to IndexedDB (virtually unlimited quota)
  saveToIndexedDB(collections, COLLECTION_KEY).catch((err) => {
    console.warn('IndexedDB collections save failed:', err);
  });

  // 4. Safe attempt to write to localStorage
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    }
  } catch (err: unknown) {
    const isQuotaError =
      err instanceof Error &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        err.message.includes('quota'));
    if (!isQuotaError) {
      console.warn('LocalStorage collections save failed:', err);
    }
  }
}

/**
 * Add a new photo to a service's gallery (and assign it to a folder).
 */
export function addPhotoToService(
  serviceSlug: string,
  newPhoto: Omit<GalleryPhoto, 'id' | 'addedAt'>
): GalleryPhoto {
  const all = { ...getServicePhotoCollections() };
  const collection = { ...getServicePhotos(serviceSlug) };
  collection.photos = [...collection.photos];

  // Resolve folder name if folderId provided
  let folderName = newPhoto.folderName;
  if (newPhoto.folderId && !folderName) {
    const folder = getFolderById(newPhoto.folderId);
    if (folder) folderName = folder.name;
  }

  const createdPhoto: GalleryPhoto = {
    ...newPhoto,
    id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    folderName: folderName || 'General & Custom Uploads',
    folderId: newPhoto.folderId || 'folder-client-uploads',
    addedAt: Date.now()
  };

  // If set to isMain, demote others
  if (createdPhoto.isMain) {
    collection.photos = collection.photos.map((p) => ({ ...p, isMain: false }));
  }

  // Add new photo at beginning
  collection.photos.unshift(createdPhoto);
  all[serviceSlug] = collection;

  saveCollections(all);
  return createdPhoto;
}

/**
 * Assign an existing photo from the folder library to a service.
 */
export function assignExistingPhotoToService(
  targetServiceSlug: string,
  photo: GalleryPhoto
): GalleryPhoto {
  const all = { ...getServicePhotoCollections() };
  const collection = { ...getServicePhotos(targetServiceSlug) };
  collection.photos = [...collection.photos];

  // Avoid exact duplicates
  const existing = collection.photos.find((p) => p.url === photo.url);
  if (existing) {
    return existing;
  }

  const newPhoto: GalleryPhoto = {
    ...photo,
    id: `linked-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    isMain: false,
    addedAt: Date.now()
  };

  collection.photos.push(newPhoto);
  all[targetServiceSlug] = collection;

  saveCollections(all);
  return newPhoto;
}

/**
 * Update an existing photo in a service's gallery (full edit option: title, caption, location, folder, url, isMain).
 */
export function updatePhotoInService(
  serviceSlug: string,
  photoId: string,
  updates: Partial<GalleryPhoto>
): void {
  const all = { ...getServicePhotoCollections() };
  const collection = { ...getServicePhotos(serviceSlug) };
  collection.photos = [...collection.photos];

  const photoIndex = collection.photos.findIndex((p) => p.id === photoId);
  if (photoIndex !== -1) {
    // If folderId changed, update folderName
    let resolvedFolderName = updates.folderName;
    if (updates.folderId && !resolvedFolderName) {
      const f = getFolderById(updates.folderId);
      if (f) resolvedFolderName = f.name;
    }

    if (updates.isMain) {
      collection.photos = collection.photos.map((p) => ({ ...p, isMain: false }));
    }

    collection.photos[photoIndex] = {
      ...collection.photos[photoIndex],
      ...updates,
      ...(resolvedFolderName ? { folderName: resolvedFolderName } : {})
    };

    all[serviceSlug] = collection;
    saveCollections(all);
  }
}

/**
 * Delete a photo from a service's gallery.
 */
export function deletePhotoFromService(serviceSlug: string, photoId: string): void {
  const all = { ...getServicePhotoCollections() };
  const collection = { ...getServicePhotos(serviceSlug) };

  const wasMain = collection.photos.find((p) => p.id === photoId)?.isMain;
  collection.photos = collection.photos.filter((p) => p.id !== photoId);

  if (wasMain && collection.photos.length > 0) {
    collection.photos[0] = { ...collection.photos[0], isMain: true };
  }

  all[serviceSlug] = collection;
  saveCollections(all);
}

/**
 * Set a photo as the main photo for a service.
 */
export function setAsMainPhoto(serviceSlug: string, photoId: string): void {
  const all = { ...getServicePhotoCollections() };
  const collection = { ...getServicePhotos(serviceSlug) };

  collection.photos = collection.photos.map((p) => ({
    ...p,
    isMain: p.id === photoId
  }));

  all[serviceSlug] = collection;
  saveCollections(all);
}

/**
 * Reset a service's gallery back to original presets.
 */
export function resetServicePhotosToDefault(serviceSlug: string): void {
  const all = { ...getServicePhotoCollections() };
  if (defaultServicePhotoCollections[serviceSlug]) {
    all[serviceSlug] = JSON.parse(JSON.stringify(defaultServicePhotoCollections[serviceSlug]));
  }
  saveCollections(all);
}

/**
 * Reset all photos and folders across the system to defaults.
 */
export function resetAllPhotosAndFoldersToDefault(): void {
  saveFolders([...defaultPhotoFolders]);
  saveCollections(JSON.parse(JSON.stringify(defaultServicePhotoCollections)));
}
