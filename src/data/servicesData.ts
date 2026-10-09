import { ServiceDetail } from '../types';

export const servicesData: ServiceDetail[] = [
  {
    id: 'wall-painting',
    slug: 'wall-painting-advertising',
    title: 'Wall Painting Advertising',
    shortDescription: 'High-impact wall branding that transforms large public spaces into powerful and eye-catching brand displays across high-density urban & rural corridors.',
    fullDescription: 'Create powerful and long-lasting brand visibility through wall painting campaigns on high-rise buildings, highways, shelters and other high-traffic locations. Our dedicated master painters and site acquisition network secure prime real estate with unmatched line-of-sight across India.',
    heroTagline: 'Unmatched 24/7 Regional Line-of-Sight & Uncluttered Reach',
    category: 'Outdoor & Mural Media',
    featuredImage: '/images/wall-painting-dhara.png',
    accentColor: '#c81e2b',
    subServices: [
      {
        name: 'High-Rise Wall Painting Advertising',
        description: 'Multi-story vertical canvas installations on residential towers and commercial facades that dominate city skylines and arterial roads.'
      },
      {
        name: 'Highway Wall Painting Advertising',
        description: 'Strategic highway stretches, toll plaza vicinities, and bypass routes commanding undivided attention from inter-city vehicular traffic.'
      },
      {
        name: 'Shelter Wall Painting Advertising',
        description: 'Passenger transit shelters, community hubs, and roadside rest areas delivering extended dwell time and high frequency.'
      },
      {
        name: 'Hand-Painted Wall Advertising',
        description: 'Traditional artisanal hand-painted murals executed with weather-resistant distemper and emulsion for durable rural and semi-urban recall.'
      }
    ],
    benefits: [
      'Maximum visibility with zero competing digital noise',
      'Ultra-cost-effective cost-per-thousand (CPM) impressions',
      'Weather-shield weather-resistant pigments with 6-12+ months life',
      'Extensive rural, semi-urban, and national highway footprint',
      'Complete site selection, municipal clearance, and photographic audit'
    ],
    suitableCampaigns: [
      'Rural & Tier-2/Tier-3 Market Penetration',
      'FMCG, Cement, Fertilizer & Agricultural Brand Awareness',
      'Regional Dealer & Distributor Network Expansion',
      'Long-Term Brand Presence & Top-of-Mind Dominance'
    ],
    specs: [
      { label: 'Typical Surface Area', value: '200 to 5,000+ sq. ft.' },
      { label: 'Lifespan', value: '6 Months to 2 Years' },
      { label: 'Execution Speed', value: '50-100 Sites / Week' },
      { label: 'Geo-Verification', value: 'GPS Photo Auditing Included' }
    ],
    galleryItems: [
      {
        title: 'Highway Wall Painting Execution',
        location: 'NH-44 Bypass Corridor',
        caption: 'High-impact Dhārā oil dual-faced brand installation with clear visibility from 500 meters.',
        tag: 'Highway Wall',
        imageUrl: '/images/wall-painting-dhara.png',
        bgGradient: 'from-slate-900 via-rose-950 to-slate-900',
        patternType: 'mural'
      },
      {
        title: 'Multi-Story High-Rise Façade',
        location: 'Tier-1 Metro Outer Ring Road',
        caption: 'Vertical multi-story building branding dominating the central interchange junction.',
        tag: 'High-Rise',
        imageUrl: '/images/wall-painting-dhara.png',
        bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
        patternType: 'mural'
      },
      {
        title: 'Agricultural Market Yard Branding',
        location: 'Karnal & Rohtak Hubs',
        caption: 'Hand-painted brand wall execution directly adjacent to major farmer mandi trade areas.',
        tag: 'Market Wall',
        imageUrl: '/images/wall-painting-dhara.png',
        bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
        patternType: 'mural'
      }
    ]
  },
  {
    id: 'mobile-van',
    slug: 'mobile-van-activity',
    title: 'Mobile Van Activity',
    shortDescription: 'Take your brand directly to the audience with engaging mobile van promotions, audio-visual roadshows, and live demonstrations across key locations.',
    fullDescription: 'Take your brand directly to the target audience with professionally branded mobile vans and promotional vehicles. Fully engineered with high-power audio systems, LED video panels, product display counters, and seasoned promotional teams.',
    heroTagline: 'Dynamic Experiential Reach Directly to Your Customers Doorstep',
    category: 'On-Ground Mobile Media',
    featuredImage: '/images/mobile-van.png',
    accentColor: '#0b1a30',
    subServices: [
      {
        name: 'Product Promotion Roadshows',
        description: 'Fully custom fabricated display vans equipped to showcase product demos, interactive experiences, and live trials.'
      },
      {
        name: 'Awareness & Consumer Engagement Vans',
        description: 'Public engagement vehicles with high-fidelity PA systems, LED video displays, and bilingual emcees for interactive quizzes.'
      },
      {
        name: 'Location-Based Haat & Market Tours',
        description: 'Scheduled multi-district marketing routes targeting rural weekly haats, local mandis, housing societies, and college campuses.'
      },
      {
        name: 'Sample Distribution & Test Drive Units',
        description: 'Equipped with cold storage, sampling counters, and trained promoter crews for high-conversion sampling drives.'
      }
    ],
    benefits: [
      'Pinpoint geographic targeting down to specific colonies, mandis, and towns',
      'Live two-way engagement with prospective consumers',
      'Real-time GPS route tracking and daily attendee logging',
      'Turnkey operations including vehicle licensing, fuel, sound, and crew',
      'Instant lead collection via digital tablets and on-spot registration'
    ],
    suitableCampaigns: [
      'New FMCG or Automobile Product Launches',
      'Rural Market Infiltration & Dealer Activation',
      'E-Commerce & App Download Drives',
      'Government Awareness & Public Health Initiatives'
    ],
    specs: [
      { label: 'Vehicle Types', value: 'Tata Ace, 407, Canter, Customized Wing Vans' },
      { label: 'Tech Capabilities', value: 'LED Wall, DG Genset, Sound System, GPS' },
      { label: 'Daily Touchpoints', value: '8-15 Strategic Stops / Day' },
      { label: 'Reporting', value: 'Daily GPS Logs + Geo-tagged Video Feeds' }
    ],
    galleryItems: [
      {
        title: 'LED Display Experience Van',
        location: 'Delhi NCR & Western UP',
        caption: 'Customized hydraulic fold-out stage with 10ft P4 LED screen and wireless audio system.',
        tag: 'Custom Van',
        imageUrl: '/images/mobile-van.png',
        bgGradient: 'from-slate-900 via-sky-950 to-slate-900',
        patternType: 'vehicle'
      },
      {
        title: 'Rural Haat & Mandi Campaign',
        location: 'Madhya Pradesh & Rajasthan',
        caption: 'High-visibility branded canter executing product demonstrations in rural trade centers.',
        tag: 'Roadshow',
        imageUrl: '/images/mobile-van.png',
        bgGradient: 'from-amber-950 via-slate-900 to-red-950',
        patternType: 'vehicle'
      }
    ]
  },
  {
    id: 'branding-services',
    slug: 'branding-services',
    title: 'Shop Branding & Retail Branding',
    shortDescription: 'Build a strong and consistent brand presence with professional Shop & Retail Branding solutions for shops, outlets, dealers, counters, and retail spaces.',
    fullDescription: 'Transform your shops, retail outlets, dealer networks, and counters into powerful brand touchpoints with our Shop Branding & Retail Branding solutions. From storefront and fascia branding to ACP, acrylic, premium vinyl, signage, counter branding, and complete retail makeovers, we create visually impactful spaces that improve brand visibility, attract customers, strengthen brand recognition, and deliver a consistent brand experience across every location.',
    heroTagline: 'Turn Every Retail Space into a Powerful Brand Experience',
    category: 'Retail & Commercial Branding',
    featuredImage: '/images/wall-painting-dhara.png',
    accentColor: '#c81e2b',
    subServices: [
      {
        name: 'Retail Branding',
        description: 'End-to-end retail store exterior and interior visual makeovers ensuring absolute brand uniformity across hundreds of franchise stores.'
      },
      {
        name: 'Shop Branding',
        description: 'High-impact dealer fascia boards, entrance arch gateways, and exterior shutter graphics that catch street commuters.'
      },
      {
        name: 'Outlet Branding',
        description: 'Dedicated branded dealer zones, product podiums, branded pillar wraps, and illuminated point-of-sale display fixtures.'
      },
      {
        name: 'Counter Branding',
        description: 'High-visibility checkout point branding, counter-top display units (CDUs), and shelf-talkers ensuring last-mile consumer conversion.'
      }
    ],
    benefits: [
      'Captures the customer at the crucial moment of purchase decision',
      'Solidifies dealer and trade partner alignment with your brand',
      'Superior materials designed to withstand weather, moisture, and dust',
      'Standardized color matching conforming to corporate brand guidelines',
      'End-to-end measurement, fabrication, installation, and auditing'
    ],
    suitableCampaigns: [
      'Paints, Hardware & Building Material Dealer Networks',
      'Consumer Electronics & Mobile Retail Stores',
      'Pharmaceutical & Health Care Chemist Chains',
      'FMCG Retail Outlets & Kirana Store Takeovers'
    ],
    specs: [
      { label: 'Materials', value: 'Cast Vinyl, ACP, High-Density Acrylic, Forex' },
      { label: 'Installation Capacity', value: 'Over 250 Shops / Month' },
      { label: 'Warranty Support', value: '1 to 3 Year UV & Peel Protection' },
      { label: 'Audit System', value: 'Store-by-Store Dimension & Recce Reports' }
    ],
    galleryItems: [
      {
        title: 'Pan-India Dealer Fascia Network',
        location: '500+ Dealer Outlets Across North India',
        caption: 'Illuminated 3mm ACP fascia boards with precision routed acrylic lettering and uniform color reproduction.',
        tag: 'Dealer Fascia',
        imageUrl: '/images/wall-painting-dhara.png',
        bgGradient: 'from-slate-900 via-rose-950 to-slate-900',
        patternType: 'retail'
      }
    ]
  },
  {
    id: 'outdoor-advertising',
    slug: 'outdoor-advertising',
    title: 'Outdoor Advertising',
    shortDescription: 'Reach massive audiences through high-visibility outdoor advertising solutions including premium hoardings, unipoles, billboards, and transit fleets.',
    fullDescription: 'Reach a wider audience through high-visibility outdoor advertising solutions. We control and manage prime out-of-home (OOH) media inventory situated along high-traffic expressways, arterial city crossings, toll points, and commercial districts.',
    heroTagline: 'Unmissable Formats Dominating High-Density Commercial Corridors',
    category: 'OOH & Large-Format Media',
    featuredImage: '/images/outdoor-advertising.png',
    accentColor: '#0b1a30',
    subServices: [
      {
        name: 'Hoarding Advertising',
        description: 'Prominent large-format skyline structures in central business hubs delivering massive organic daily impressions.'
      },
      {
        name: 'Unipole Advertising',
        description: 'Sleek single-pole elevated billboards engineered for unobstructed viewability along major national expressways.'
      },
      {
        name: 'Billboard Advertising',
        description: 'Front-lit and back-lit heavy-duty billboards located at strategic traffic bottlenecks and intersection wait points.'
      },
      {
        name: 'Bus Branding',
        description: 'Complete full-wrap and side-panel branding across state transport (UPSRTC, DTC, PRTC) and private transit fleets.'
      }
    ],
    benefits: [
      'High-impact physical presence impossible to skip or block',
      'Continuous 24/7 exposure with high-power industrial LED illumination',
      'Full legal clearances from municipal corporations and NHAI',
      'Structural stability certificates vetted by certified civil engineers',
      'Regular maintenance, illumination audits, and vinyl tensioning checks'
    ],
    suitableCampaigns: [
      'High-Decibel Product & Brand Launches',
      'Brand Recall & Market Leadership Positioning',
      'Real Estate, BFSI, & Infrastructure Campaigns',
      'Consumer Electronics & Smartphone Launches'
    ],
    specs: [
      { label: 'Formats Available', value: 'Hoardings, Unipoles, Cantilevers, Gantries' },
      { label: 'Lighting Options', value: 'Energy-Efficient High-Lumen LED Floodlights' },
      { label: 'Contract Durations', value: 'Monthly, Quarterly, Semi-Annual, Annual' },
      { label: 'Compliance', value: '100% Empaneled with Local Civic Authorities' }
    ],
    galleryItems: [
      {
        title: 'Highway Express Corridor Unipole',
        location: 'Delhi-Jaipur Highway (NH-48)',
        caption: 'Massive 60x20 ft elevated unipole with 120-degree unobstructed sight line over expressway lanes.',
        tag: 'Unipole',
        imageUrl: '/images/outdoor-advertising.png',
        bgGradient: 'from-slate-900 via-amber-950 to-slate-900',
        patternType: 'hoarding'
      }
    ]
  },
  {
    id: 'signage-fabrication',
    slug: 'signage-fabrication',
    title: 'Signage & Fabrication Advertising',
    shortDescription: 'Custom signage and fabrication solutions that make your brand stand out in any location, built with industrial durability, CNC precision, and IP67 LED lighting.',
    fullDescription: 'Custom signage and fabrication solutions that make your brand stand out in any location. We operate our own in-house fabrication plant housing heavy-duty CNC routing machines, precision fiber laser cutters, channel letter benders, and electrostatic powder coating booths.',
    heroTagline: 'Architectural Durability & Precision Illuminated Craftsmanship',
    category: 'Signage & Structural Media',
    featuredImage: '/images/signage-fabrication.png',
    accentColor: '#c81e2b',
    subServices: [
      {
        name: 'Glow Signs & Backlit Boxes',
        description: 'Durable extruded aluminum boxes with translucent flex/acrylic faces illuminated by energy-saving IP67 LED modules.'
      },
      {
        name: 'Sign Board Fabrication',
        description: 'ACP modular panelling, directional pylon totems, and exterior wayfinding signage engineered for harsh weather.'
      },
      {
        name: '3D Letters & Channel Signage',
        description: 'Acrylic face, stainless steel trim, and halo-lit 3D channel letters giving flagship showrooms an executive finish.'
      },
      {
        name: 'Flex Board Printing & Framing',
        description: 'High-tensile MS pipe frames stretched with heavyweight solvent and UV-printed banner media for promotional launches.'
      }
    ],
    benefits: [
      'In-house fabrication plant eliminates middleman delays and markups',
      'Industrial-grade raw materials (Tata Steel frames, Aludecor ACP, Samsung LEDs)',
      'Waterproof, dustproof, and UV-resistant outdoor life exceeding 3-5 years',
      'Custom 3D prototyping and shop drawing approvals prior to manufacturing',
      'Pan-India installation teams equipped with cherry-pickers and safety gear'
    ],
    suitableCampaigns: [
      'Corporate Headquarters & Flagship Experience Centers',
      'Automobile Dealerships & 3S Service Facilities',
      'National Retail Chains & Hypermarkets',
      'Bank Branches, ATMs & Financial Service Kiosks'
    ],
    specs: [
      { label: 'Plant Machinery', value: 'CNC Routers, Fiber Laser, Channel Benders' },
      { label: 'LED Standards', value: 'Samsung/Osram IP67 Weatherproof Modules' },
      { label: 'Core Base Materials', value: 'Grade-A ACP, Virgin Acrylic, 304 Stainless Steel' },
      { label: 'Warranty', value: '2-Year Comprehensive Electrical & Surface Warranty' }
    ],
    galleryItems: [
      {
        title: '3D LED Halo-Lit Corporate Sign',
        location: 'Corporate HQ, Aerocity, New Delhi',
        caption: 'Dual-finish brushed gold stainless steel letters with warm white 3000K reverse halo illumination.',
        tag: '3D Letters',
        imageUrl: '/images/signage-fabrication.png',
        bgGradient: 'from-slate-900 via-purple-950 to-slate-900',
        patternType: 'signage'
      }
    ]
  },
  {
    id: 'btl-activation',
    slug: 'btl-activation',
    title: 'BTL Activation',
    shortDescription: 'Interactive on-ground campaigns that connect your brand directly with customers through mall activations, live product launches, sampling drives, and canopies.',
    fullDescription: 'Interactive on-ground campaigns that connect your brand directly with customers. We conceive, design, and execute high-engagement experiential activations inside premier shopping malls, corporate tech parks, residential societies, and university campuses.',
    heroTagline: 'Tactile Consumer Touchpoints That Drive Immediate Trial and Adoption',
    category: 'Experiential & On-Ground Activation',
    featuredImage: '/images/btl-activation.png',
    accentColor: '#0b1a30',
    subServices: [
      {
        name: 'Mall Activations & Pop-Up Arenas',
        description: 'Immersive atrium experiential setups with gamified tech, photobooths, and interactive demo zones in Grade-A malls.'
      },
      {
        name: 'Canopy Activities & Kiosk Setups',
        description: 'Rapid-deployment pop-up gazebos and promotional counters placed in high-footfall market streets and residential welfare associations (RWAs).'
      },
      {
        name: 'Product Sampling & Tasting Campaigns',
        description: 'Direct trial drives with uniformed brand promoters collecting structured customer feedback and taste ratings.'
      },
      {
        name: 'Live Demonstrations & Roadshows',
        description: 'Trained technical demonstrators presenting appliance, gadget, or automotive features to prospective buyers.'
      }
    ],
    benefits: [
      'Creates emotional brand resonance through firsthand physical interaction',
      'Drastically compresses the sales funnel from awareness to immediate purchase',
      'Delivers rich qualitative consumer insights and verified customer phone leads',
      'High social shareability with Instagrammable photo zones and selfie contests',
      'Comprehensive on-ground logistical control and trained bilingual promoters'
    ],
    suitableCampaigns: [
      'FMCG Food, Beverage & Personal Care Sampling',
      'Consumer Electronics & Home Appliance Live Demos',
      'Automobile Weekend Test Drive Drives in RWAs',
      'Fintech App Onboarding & Credit Card Acquisition'
    ],
    specs: [
      { label: 'Venues Empaneled', value: '150+ Top Tier Malls & 800+ RWA Societies' },
      { label: 'Promoter Network', value: 'Screened, Trained & Groomed Brand Ambassadors' },
      { label: 'Lead Capture', value: 'Custom Digital Web App with Real-Time OTP Verification' },
      { label: 'Footfall Impact', value: '2,500 to 15,000 Engaged Visitors / Setup / Weekend' }
    ],
    galleryItems: [
      {
        title: 'Atrium Experiential Gaming Arena',
        location: 'Ambience Mall, Gurugram',
        caption: 'High-tech 20x20 ft immersive installation featuring augmented reality photobooth and live trials.',
        tag: 'Mall Activation',
        imageUrl: '/images/btl-activation.png',
        bgGradient: 'from-slate-900 via-rose-950 to-slate-900',
        patternType: 'activation'
      }
    ]
  },

  {
    id: 'metro-transit-branding',
    slug: 'metro-transit-branding',
    title: 'Metro Branding',
    shortDescription: 'High-visibility branding across metro stations, pillar wraps, and transit spaces for maximum audience reach among daily urban commuters.',
    fullDescription: 'High-visibility branding across metro stations, pillar wraps and transit spaces for maximum audience reach. We offer comprehensive media rights and execution capabilities across major metropolitan rapid transit networks including Delhi Metro (DMRC), Mumbai Metro, and regional lines.',
    heroTagline: 'Captive Daily Exposure Across India’s Most Affluent Commuter Networks',
    category: 'Urban Mass Rapid Transit',
    featuredImage: '/images/metro-branding.png',
    accentColor: '#c81e2b',
    subServices: [
      {
        name: 'Station Concourse & Platform Domination',
        description: 'Exclusive station takeover campaigns covering backlit panels, entry turnstiles, platform screen doors, and floor decals.'
      },
      {
        name: 'Metro Pillar Wraps',
        description: 'Street-level street viaduct pillar branding creating an inescapable continuous line of brand sight for road motorists below.'
      },
      {
        name: 'Train Interior & Panel Branding',
        description: 'Captive passenger exposure via interior overhead panels, route map panels, grab-handle wraps, and window graphics.'
      },
      {
        name: 'Metro Exterior Coach Wrapping',
        description: 'Full exterior 4-coach and 6-coach vinyl wrap transforming trains into high-speed moving brand monuments.'
      }
    ],
    benefits: [
      'Reaches a predominantly young, upwardly mobile, digitally active commuter base',
      'Extended dwell times averaging 18-35 minutes per commuter trip',
      '100% clutter-free, lit environment unaffected by rain or harsh sunlight',
      'High emotional recall due to repetitive daily exposure 5-6 days a week',
      'Audited passenger ridership counts authenticated by metro rail corporations'
    ],
    suitableCampaigns: [
      'Banking, Financial Services & FinTech Brands',
      'Ed-Tech, Higher Education & Career Portals',
      'Smartphone, Gadget & Lifestyle Brands',
      'OTT Platforms, Entertainment Releases & Real Estate'
    ],
    specs: [
      { label: 'Networks Covered', value: 'Delhi Metro (DMRC), Rapid Metro, Mumbai Metro' },
      { label: 'Daily Commuters Reached', value: 'Over 6.5 Million Impressions / Day' },
      { label: 'Media Formats', value: 'Static Backlit, LED Video Walls, Pillar Wraps, Coach Wraps' },
      { label: 'Tenure Options', value: 'Campaign Tenures from 1 Month to 1 Year' }
    ],
    galleryItems: [
      {
        title: 'Metro Station Concourse Domination',
        location: 'Rajiv Chowk Metro Station, Delhi',
        caption: 'Multi-panel backlit network capturing 500,000+ interchange passengers daily with 100% brand share-of-voice.',
        tag: 'Station Takeover',
        imageUrl: '/images/metro-branding.png',
        bgGradient: 'from-slate-900 via-blue-950 to-slate-900',
        patternType: 'transit'
      }
    ]
  },
  // Train branding, 
  {
  id: 'train-branding',
  slug: 'train-branding',
  title: 'Train Branding',
  shortDescription: 'High-impact railway and train branding solutions that turn coaches, railway stations, platforms, and passenger touchpoints into powerful moving brand experiences.',
  fullDescription: 'Build massive brand visibility through strategically planned train and railway branding campaigns. We provide end-to-end execution for train exterior wraps, coach interiors, window graphics, route panels, railway station branding, platform displays, foot-over-bridge branding, and other high-visibility railway media formats. From creative adaptation and media planning to printing, installation, maintenance, and campaign removal, we deliver complete train branding solutions across major railway networks in India.',
  heroTagline: 'Turn Every Journey Into a Powerful Moving Brand Experience',
  category: 'Railway & Transit Advertising',
  featuredImage: '/images/train-branding.png',
  accentColor: '#c81e2b',

  subServices: [
    {
      name: 'Train Exterior Branding',
      description: 'Large-format vinyl and graphic branding across train coaches and exterior surfaces to create highly visible moving advertisements along busy railway routes.'
    },
    {
      name: 'Full Coach Wrap Branding',
      description: 'Complete or partial coach wrapping solutions that transform passenger trains into high-impact moving brand assets with strong visual recall.'
    },
    {
      name: 'Train Interior Branding',
      description: 'Passenger-facing advertising across interior panels, overhead spaces, route panels, doors, partitions, and other suitable coach surfaces.'
    },
    {
      name: 'Window & Door Branding',
      description: 'Strategically designed window and door graphics that deliver repeated brand exposure while maintaining passenger visibility and operational requirements.'
    },
    {
      name: 'Railway Station Branding',
      description: 'High-visibility branding across station entrances, concourses, platforms, pillars, foot-over bridges, ticketing areas, and passenger waiting zones.'
    },
    {
      name: 'Platform & Pillar Branding',
      description: 'Large-format platform panels and pillar wraps designed to capture passenger attention during waiting, boarding, and interchange periods.'
    },
    {
      name: 'Railway Hoarding & Billboard Branding',
      description: 'Strategically positioned hoardings and large-format displays around railway stations and high-footfall railway corridors.'
    },
    {
      name: 'Train Route Branding',
      description: 'Route-focused campaigns designed to maximize repeated exposure across selected railway corridors, cities, and passenger markets.'
    }
  ],

  benefits: [
    'Massive visibility across high-footfall railway corridors and passenger networks',
    'Repeated brand exposure as passengers encounter branded trains and railway touchpoints throughout their journey',
    'Moving advertisements extend brand visibility beyond a single fixed advertising location',
    'Large-format train exteriors provide strong visual impact and high brand recall',
    'Station and platform branding reaches passengers during waiting, boarding, and interchange moments',
    'Suitable for both regional campaigns and multi-city national advertising programs',
    'Complete campaign execution including creative adaptation, production, installation, maintenance, and removal'
  ],

  suitableCampaigns: [
    'FMCG, Food & Beverage Brands',
    'Banking, Insurance & Financial Services',
    'Telecom, Smartphone & Technology Brands',
    'Automobile & Mobility Brands',
    'Real Estate & Infrastructure Companies',
    'Education, Ed-Tech & Career Platforms',
    'Healthcare & Pharmaceutical Brands',
    'E-Commerce & Consumer Lifestyle Brands',
    'Entertainment, OTT & Movie Promotions',
    'Government & Public Awareness Campaigns'
  ],

  specs: [
    {
      label: 'Advertising Assets',
      value: 'Train Coaches, Coach Interiors, Windows, Doors, Platforms, Pillars & Stations'
    },
    {
      label: 'Media Formats',
      value: 'Full Coach Wraps, Partial Wraps, Vinyl Graphics, Panels, Posters & Station Displays'
    },
    {
      label: 'Campaign Coverage',
      value: 'Regional, Multi-City & Pan-India Railway Campaigns'
    },
    {
      label: 'Campaign Tenure',
      value: 'Short-Term, Seasonal & Long-Term Campaign Options'
    }
  ],

  galleryItems: [
    {
      title: 'Full Train Exterior Branding',
      location: 'Indian Railway Network',
      caption: 'High-impact full-coach exterior branding transforming a passenger train into a moving brand billboard with large-format graphics and strong visual recall.',
      tag: 'Train Exterior Branding',
      imageUrl: '/images/train-branding.png',
      bgGradient: 'from-red-950 via-slate-900 to-blue-950',
      patternType: 'transit'
    },
    {
      title: 'Train Interior Branding',
      location: 'Railway Coach Interior',
      caption: 'Passenger-focused interior branding across coach panels and high-visibility touchpoints designed for repeated brand exposure throughout the journey.',
      tag: 'Train Interior',
      imageUrl: '/images/train-branding-interior.png',
      bgGradient: 'from-slate-900 via-blue-950 to-slate-900',
      patternType: 'transit'
    },
    {
      title: 'Railway Station Branding',
      location: 'Major Railway Station',
      caption: 'Large-format railway station branding across passenger areas, platforms, pillars, and high-footfall circulation zones.',
      tag: 'Station Branding',
      imageUrl: '/images/railway-station-branding.png',
      bgGradient: 'from-slate-950 via-red-950 to-slate-900',
      patternType: 'transit'
    }
  ]
},

  //
  {
    id: 'corporate-events',
    slug: 'corporate-events',
    title: 'Corporate Event Services',
    shortDescription: 'End-to-end corporate event solutions that deliver memorable experiences and professional brand engagement, from 3D stage design to audio-visual execution.',
    fullDescription: 'End-to-end corporate event solutions that deliver memorable experiences and professional brand engagement. From high-profile product reveals, annual leadership summits, and national dealer meets to gala award ceremonies and investor conferences.',
    heroTagline: 'Flawless Technical Execution & High-Impact Staging for Corporate Milestones',
    category: 'Corporate Events & MICE',
    featuredImage: '/images/corporate-events.png',
    accentColor: '#0b1a30',
    subServices: [
      {
        name: 'Product Launches & Unveils',
        description: 'Theatrical product reveals with kinetic stage mechanics, laser light shows, synchronized countdowns, and media management.'
      },
      {
        name: 'National Dealer & Distributor Conferences',
        description: 'Multi-day residential conferences, motivational staging, recognition awards, and hospitality logistics.'
      },
      {
        name: 'Annual General Meetings & Summits',
        description: 'Boardroom audio-visuals, broadcast-grade multi-camera live streaming, and VIP stage setups with seamless acoustic engineering.'
      },
      {
        name: 'Exhibition Stall Design & Fabrication',
        description: 'Bespoke 3D custom pavilions and multi-level trade show booths built to international standards at Pragati Maidan and IEML.'
      }
    ],
    benefits: [
      'Complete end-to-end event production under a single dedicated project director',
      'In-house high-definition LED video walls, line-array audio, and intelligent lighting rigs',
      'Custom 3D CAD visualization and walk-throughs delivered before venue fabrication',
      'Flawless technical redundancy (backup audio consoles, UPS power, dual live streams)',
      'Experienced artist management, bilingual corporate emcees, and show directors'
    ],
    suitableCampaigns: [
      'New Car, Two-Wheeler & Consumer Electronics Launches',
      'Annual Employee Rewards & Recognition Gala Evenings',
      'B2B Industry Summits & International Trade Exhibitions',
      'Government Conferences & Diplomatic Summits'
    ],
    specs: [
      { label: 'Event Capacities', value: '50 to 5,000+ Delegates & Attendees' },
      { label: 'AV Technology', value: 'P2.6 LED Video Walls, Line-Array Acoustics, Robotic Lighting' },
      { label: 'Venue Capabilities', value: '5-Star Hotels, Convention Centers, Outdoor Stadiums' },
      { label: 'Turnaround Time', value: '3D Concept to Final On-Ground Delivery in 7-14 Days' }
    ],
    galleryItems: [
      {
        title: 'National Automobile Launch Summit',
        location: 'India Expo Centre & Mart (IEML)',
        caption: 'Massive 80ft curved seamless LED video backdrop with hydraulic reveal turntable and synchronized pyrotechnics.',
        tag: 'Product Launch',
        imageUrl: '/images/corporate-events.png',
        bgGradient: 'from-slate-900 via-amber-950 to-slate-900',
        patternType: 'event'
      }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((s) => s.slug === slug);
}
