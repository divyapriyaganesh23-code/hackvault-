import { HackathonEvent, ProblemStatement, ProjectSolution } from '../types';

export const INITIAL_HACKATHONS: HackathonEvent[] = [
  {
    id: 'sih-2024',
    name: 'Smart India Hackathon 2024',
    edition: '8th Edition',
    year: 2024,
    organizer: 'Ministry of Education (AICTE), Govt. of India',
    websiteUrl: 'https://sih.gov.in',
    totalProblemsCount: 524,
    featured: true,
    domains: ['Agriculture & FoodTech', 'Clean & Green Technology', 'Healthcare', 'Smart Education', 'Disaster Management', 'Transportation & Logistics']
  },
  {
    id: 'sih-2023',
    name: 'Smart India Hackathon 2023',
    edition: '7th Edition',
    year: 2023,
    organizer: 'Ministry of Education & Innovation Cell, Govt. of India',
    websiteUrl: 'https://sih.gov.in',
    totalProblemsCount: 480,
    featured: true,
    domains: ['Cybersecurity', 'Smart Automation', 'Heritage & Culture', 'Clean Water', 'Robotics & Drones']
  },
  {
    id: 'kavach-2023',
    name: 'KAVACH Cybersecurity Hackathon',
    edition: 'National Level',
    year: 2023,
    organizer: 'Ministry of Home Affairs & BPR&D (Govt. of India)',
    websiteUrl: 'https://kavach.mic.gov.in',
    totalProblemsCount: 20,
    featured: true,
    domains: ['Cybersecurity', 'Darknet Tracking', 'Phishing & Fraud Detection', 'Forensics']
  },
  {
    id: 'google-solution-challenge',
    name: 'Google Solution Challenge',
    edition: 'Annual Global Edition',
    year: 2024,
    organizer: 'Google Developer Student Clubs (GDSC)',
    websiteUrl: 'https://developers.google.com/community/gdsc-solution-challenge',
    totalProblemsCount: 17,
    featured: true,
    domains: ['UN SDGs', 'Healthcare', 'Accessibility', 'Climate Action', 'Quality Education']
  },
  {
    id: 'ethindia-2023',
    name: 'ETHIndia 2023',
    edition: 'Asia’s Largest Web3 Hackathon',
    year: 2023,
    organizer: 'Devfolio',
    websiteUrl: 'https://ethindia.devfolio.co',
    totalProblemsCount: 65,
    featured: false,
    domains: ['Blockchain & Web3', 'Digital Identity', 'Public Goods', 'Decentralized Data']
  }
];

export const INITIAL_PROBLEMS: ProblemStatement[] = [
  {
    id: 'prob-sih-railway-01',
    code: 'SIH-1432',
    title: 'AI-Based Automated Railway Track Crack & Obstacle Detection System',
    organization: 'Ministry of Railways (Indian Railways)',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    domain: 'Transportation & Logistics',
    category: 'Both',
    difficulty: 'Advanced',
    originalStatement: 'Development of an autonomous optical & acoustic inspection system utilizing mounted UAVs or rail-vehicle cameras with edge computer vision to detect hairline track fractures, missing fasteners, ballast defects, and track obstructions in diverse weather conditions before human trackmen patrol is required.',
    simpleExplanationEn: 'Indian Railways currently relies heavily on trackmen manually walking miles of rail lines with visual gauges. This problem asks for an automated system—using drone or locomotive-mounted cameras and computer vision—that detects tiny rail cracks, missing bolts, and foreign obstacles on the track in real-time without needing constant manual patrol.',
    simpleExplanationTa: 'Idhu enna problem-na: Namma Indian Railways-la tracks-la crack, missing bolt, illa edhavadhu kal vizhundha adhula manual-aa aal poi thaan paakanum. Adhukku pathila locomotive enginela camera vechi, illa drone camera vechi real-time AI computer vision moolama automatic-aa track defects kandupudichu station master-ku alert anupanum. Idhudhaan core concept.',
    backgroundContext: 'With over 68,000 km of railway route in India, manual inspection leads to delayed defect identification, occasional derailments, and risks to track workers during night shifts. A low-cost edge AI device combined with vibration/acoustic sensing can dramatically improve rail safety.',
    expectedDeliverables: [
      'Edge AI video inference model operating at >= 30 FPS',
      'Crack segmentation capable of detecting hairline fractures (< 2mm)',
      'GPS-synchronized geo-tagging of anomalies with severity classification (Critical, Warning, Normal)',
      'Station Master central dashboard with SMS/Telegram instantaneous SOS alerts',
      'Offline caching mode for remote railway sections with poor cellular reception'
    ],
    suggestedTechStack: ['Python', 'YOLOv8 / Detectron2', 'OpenCV', 'Raspberry Pi 4 / Jetson Nano', 'React', 'FastAPI', 'PostgreSQL / TimescaleDB'],
    winningOpportunityAngles: [
      'Most previous teams only did basic daytime object detection with generic bounding boxes. A winning solution integrates thermal/infrared cameras for night inspection and adds acoustic vibration sensors for internal rail flaws.',
      'Provide an offline-first sync mechanism because vast railway stretches have zero 4G connectivity.'
    ],
    officialSourceUrl: 'https://sih.gov.in',
    verifiedSource: true,
    participantCount: 420,
    relatedProblemIds: ['prob-sih-drone-04', 'prob-google-route-05'],
    projectSolutionIds: ['sol-railguard-ai', 'sol-trackvision-edge'],
    createdAt: '2024-08-15'
  },
  {
    id: 'prob-sih-ayush-02',
    code: 'SIH-1284',
    title: 'AI Identification, Geo-Tagging & Adulteration Detection of Ayurvedic Medicinal Plants',
    organization: 'Ministry of Ayush',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    domain: 'Healthcare',
    category: 'Software',
    difficulty: 'Intermediate',
    originalStatement: 'Create a mobile application and digital repository powered by image recognition and botanic taxonomies that can identify authentic medicinal herb species across distinct stages of maturity, differentiate genuine species from common adulterants, and log GPS coordinates for biodiversity preservation.',
    simpleExplanationEn: 'Ayurvedic practitioners and herbal collectors struggle to differentiate genuine medicinal plants from weed substitutes or adulterants (e.g. Ashwagandha adulteration). This project requires a smartphone camera app that scans plant leaves, bark, or seeds to instantly identify the plant species, verify its authenticity, explain medicinal uses, and pin its location on a national biodiversity map.',
    simpleExplanationTa: 'Simple-aa sollanum-na: Namma naatula aayurvedha mooligai chedigala (like Tulsi, Ashwagandha, Nilavembu) thappa ariyama kalappadam panni vithuruvanga. Phone camera-la elai illa verai kaatinanale, AI model adhoda correct botanical name, genuine-aa illai kalappadama-nu check panni, adha map-la geo-tag panni medicinal benefits kaatanum.',
    backgroundContext: 'India is home to over 8,000 medicinal plant species. However, commercial supply chains face up to 30% adulteration with cheap substitutes due to lack of trained botanists at harvest sites, threatening herbal formulation efficacy.',
    expectedDeliverables: [
      'Mobile App (Android/iOS) with offline leaf/flower/bark visual classification',
      'Confidence score and botanical classification sheet according to the Ayurvedic Pharmacopoeia of India',
      'Adulteration comparison slider showing visual differences between genuine vs counterfeit specimen',
      'Central Ministry GIS Dashboard for regional herb density mapping'
    ],
    suggestedTechStack: ['Flutter / React Native', 'TensorFlow Lite', 'MobileNetV3 / EfficientNet', 'Node.js', 'Leaflet / Mapbox', 'MongoDB'],
    winningOpportunityAngles: [
      'Include a seasonal maturity indicator (e.g. telling collectors whether the active phytochemical compounds are peak now or should wait a month).',
      'Add regional vernacular voice support (Tamil, Hindi, Telugu, Marathi) for rural farmers and tribal collectors.'
    ],
    officialSourceUrl: 'https://sih.gov.in',
    verifiedSource: true,
    participantCount: 380,
    relatedProblemIds: ['prob-sih-agri-03'],
    projectSolutionIds: ['sol-ayurscan-mobile', 'sol-herbvantage-portal'],
    createdAt: '2024-08-20'
  },
  {
    id: 'prob-sih-agri-03',
    code: 'SIH-1310',
    title: 'Multimodal AI Pest & Crop Disease Diagnosis with Localized MSP Market Linkage',
    organization: 'Ministry of Agriculture & Farmers Welfare',
    hackathonName: 'Smart India Hackathon 2023',
    hackathonYear: 2023,
    domain: 'Agriculture & FoodTech',
    category: 'Software',
    difficulty: 'Beginner',
    originalStatement: 'Design an accessible digital advisory platform that diagnoses crop pests and leaf pathologies from farmer photos, offers low-cost organic remedial treatments, and links verified local grain/pulse producers directly to regulated APMC mandis and fair price buyers.',
    simpleExplanationEn: 'Farmers suffer heavy yield losses because they detect pests too late and overspend on chemical pesticides. This system lets a farmer snap a photo of a diseased leaf, receive an instant diagnosis with low-cost bio-fertilizer/treatment suggestions, and check live mandi crop prices to sell their harvest profitably without middlemen taking heavy cuts.',
    simpleExplanationTa: 'Vivasayigalukku payirula noi thaakudhal (pests/fungus) vandha enna marundhu podanumnu theriyama periya loss aagudhu. Phone-la photo edutha udaney enna disease-nu solli, natural poochi marundhu seira muraiyum, adhe app-kulla direct APMC mandi rate pathu dhalal illama sell panna oru all-in-one portal venum.',
    backgroundContext: 'Over 60% of smallholder farmers in India rely on informal advice from pesticide shopkeepers who often push costly chemicals. Direct crop diagnosis combined with real-time Government Agmarknet mandi pricing empowers smallholders directly.',
    expectedDeliverables: [
      'Crop disease multi-class image classifier supporting at least 15 common Indian staple crops (paddy, cotton, tomato, wheat, sugarcane)',
      'Organic & cost-effective treatment prescription engine',
      'Integration with Government Agmarknet open mandi price API',
      'Multilingual audio read-out and speech-to-text queries'
    ],
    suggestedTechStack: ['React', 'Python Flask / FastAPI', 'PyTorch', 'TailwindCSS', 'Agmarknet API', 'Whisper AI / Bhashini'],
    winningOpportunityAngles: [
      'Integrate weather forecasting alerts (e.g. "Do not spray fungicide today, rain predicted in 4 hours").',
      'Provide a simple WhatsApp / SMS bot fallback for farmers with feature phones.'
    ],
    officialSourceUrl: 'https://sih.gov.in',
    verifiedSource: true,
    participantCount: 510,
    relatedProblemIds: ['prob-sih-ayush-02', 'prob-google-agrosense-06'],
    projectSolutionIds: ['sol-krishicart-ai', 'sol-cropdoc-vernacular'],
    createdAt: '2023-09-10'
  },
  {
    id: 'prob-kavach-cyber-04',
    code: 'KAV-008',
    title: 'Darknet & Telegram Illegal Narcotics / Cyber Weapon Marketplace Scraper & Intelligence Hub',
    organization: 'Bureau of Police Research & Development (BPR&D) / MHA',
    hackathonName: 'KAVACH Cybersecurity Hackathon',
    hackathonYear: 2023,
    domain: 'Cybersecurity',
    category: 'Software',
    difficulty: 'Advanced',
    originalStatement: 'Engineering of an automated crawler and intelligence correlation framework for Tor hidden services (.onion) and public/private Telegram threat channels to detect crypto-ransomware sales, illicit contraband deals, and credit card dumps, generating automated law enforcement evidentiary reports.',
    simpleExplanationEn: 'Law enforcement investigators struggle to track illegal sales of narcotics, weapons, and stolen data happening across onion websites and private Telegram groups. This platform is a cyber-threat intelligence crawler that safely extracts hidden service listings, tracks cryptocurrency wallet addresses, and creates case-ready forensic reports for police officers.',
    simpleExplanationTa: 'Cyber crime police-kku Darknet (.onion websites) and secret Telegram groups-la nadakkura drugs, illegal weapons, card hacking transactions-a track panna automated tool theva. Tor crawler vachi listings capture panni, crypto wallet address trace panni, police filing-kku PDF forensic evidence generate panra tool idhu.',
    backgroundContext: 'Cyber criminals operate with anonymity using crypto tumblers and decentralized networks. Manual investigation takes weeks per incident. Automated scrapers with natural language extraction save critical law enforcement investigative hours.',
    expectedDeliverables: [
      'Tor proxy-routed async crawler with rate-limiting and anti-captcha rotation evasion',
      'Entity extraction model (cryptocurrency addresses, PGP keys, Telegram handles, drug slang)',
      'Cryptocurrency address transaction graph visualizer',
      'Chain-of-custody PDF forensic report generator adhering to Indian Evidence Act 65B standard'
    ],
    suggestedTechStack: ['Python', 'Scrapy / Playwright', 'Tor SOCKS5 Proxy', 'Neo4j / NetworkX', 'FastAPI', 'React', 'D3.js / Cytoscape'],
    winningOpportunityAngles: [
      'Ensure airtight evidence hashing (SHA-256 timestamps) so screenshots and metadata stand up in court.',
      'Build a natural language classifier trained specifically on Indian localized darknet slang.'
    ],
    officialSourceUrl: 'https://kavach.mic.gov.in',
    verifiedSource: true,
    participantCount: 195,
    relatedProblemIds: ['prob-eth-cred-07'],
    projectSolutionIds: ['sol-darktrace-intel', 'sol-torrecon-forensic'],
    createdAt: '2023-08-01'
  },
  {
    id: 'prob-google-sign-05',
    code: 'GSC-012',
    title: 'SignBridge: Real-Time Indian Sign Language (ISL) Two-Way Video Meeting Translator',
    organization: 'Google Developer Student Clubs (UN SDG 10: Reduced Inequalities)',
    hackathonName: 'Google Solution Challenge',
    hackathonYear: 2024,
    domain: 'Accessibility',
    category: 'Software',
    difficulty: 'Intermediate',
    originalStatement: 'Build an accessible real-time two-way translation platform that captures video hand gestures of Indian Sign Language (ISL), translates them into synthesized spoken vernacular language, and translates incoming speech back into synchronized 3D avatar sign demonstrations.',
    simpleExplanationEn: 'Over 18 million deaf and hard-of-hearing people in India face massive communication barriers during doctor appointments, bank visits, or online meetings because most people do not understand Sign Language. This project builds a live two-way translator: the deaf person signs to their webcam and it speaks in Tamil/English; when the hearing person speaks, an animated avatar signs it back!',
    simpleExplanationTa: 'Deaf & hard-of-hearing friends kooda communicate panna romba perukku Sign Language theriyadhu. Idhula webcam munnadi sign pannumbodhu MediaPipe vachi hand tracking panni voice/text-aa convert pannum. Opposite person pesuvadhu 3D avatar moolama sign language-aa kaatum. Real-time two-way bridge!',
    backgroundContext: 'Sign language is not universal; Indian Sign Language (ISL) has distinct grammar, two-handed alphabets, and regional variations compared to American Sign Language (ASL). Developing a browser-based solution without dedicated hardware makes accessibility affordable to every school and hospital.',
    expectedDeliverables: [
      'MediaPipe Holistic landmark extraction (33 pose + 21 hand + 468 face landmarks)',
      'LSTM / Transformer gesture sequence model with continuous sentence formation',
      'Text-to-Speech synthesis in English & Indian vernacular languages',
      'Lightweight Three.js 3D avatar animation for reciprocal signing'
    ],
    suggestedTechStack: ['Google MediaPipe', 'TensorFlow.js', 'WebRTC', 'React', 'Three.js', 'Web Speech API'],
    winningOpportunityAngles: [
      'Continuous sentence signing is what distinguishes winners—most teams only do static single alphabet letters (A, B, C). Real communication needs continuous words and emotional facial expressions.',
      'Optimize the model to run 100% client-side in the browser using WebAssembly / WebGL so deaf users don\'t need high-end GPUs or pay server costs.'
    ],
    officialSourceUrl: 'https://developers.google.com/community/gdsc-solution-challenge',
    verifiedSource: true,
    participantCount: 650,
    relatedProblemIds: ['prob-sih-ayush-02'],
    projectSolutionIds: ['sol-signbridge-core', 'sol-gesturesync-app'],
    createdAt: '2024-03-12'
  },
  {
    id: 'prob-google-agrosense-06',
    code: 'GSC-018',
    title: 'AgroSense: Solar-Powered IoT Soil Nitrate, Moisture & Microclimate Precision Irrigation Controller',
    organization: 'Google Developer Student Clubs (UN SDG 2: Zero Hunger & SDG 6: Clean Water)',
    hackathonName: 'Google Solution Challenge',
    hackathonYear: 2024,
    domain: 'Clean & Green Technology',
    category: 'Both',
    difficulty: 'Intermediate',
    originalStatement: 'An end-to-end sustainable agricultural solution pairing ultra-low-power ESP32 soil sensor probes (NPK, moisture, pH) with solar energy harvesting and cloud-based predictive evapotranspiration models to automate drip irrigation valves and cut agricultural water wastage by 40%.',
    simpleExplanationEn: 'Farmers currently pump water on fixed timers, leading to massive groundwater depletion and root rot. AgroSense uses solar-powered sensor spikes pushed into the soil that measure nitrogen, moisture, and temperature. A smart microcontroller opens and closes electric water valves only when the plant actually needs hydration.',
    simpleExplanationTa: 'Thanniya thevaiye illama excess-aa paichi borewell groundwater waste aaguratha thadukka indha project. Soil-la oru solar sensor kuchi vechuduvom, adhu eerappadham (moisture) and uram (NPK) alava check panni motor valve-a automatic-aa on/off pannum. Thanni 40% micham aagum.',
    backgroundContext: 'Agriculture consumes roughly 80% of India’s freshwater withdrawals. Over-irrigation leaches vital nitrogen fertilizer into local waterways, causing both economic loss and environmental degradation.',
    expectedDeliverables: [
      'ESP32 / LoRaWAN low-power firmware with Deep Sleep power management',
      'MQTT telemetry protocol streaming to Firebase / Supabase backend',
      'Automated solenoid valve relay control circuit with manual override',
      'Progressive Web App (PWA) with water savings analytics and local weather forecasting'
    ],
    suggestedTechStack: ['ESP32 (C++/Arduino)', 'LoRaWAN / MQTT', 'Firebase / Supabase', 'React + Vite', 'TailwindCSS', 'Chart.js'],
    winningOpportunityAngles: [
      'Implement LoRa mesh networking so one gateway SIM card can connect 50 sensor nodes across a 5-kilometer farm without Wi-Fi.',
      'Include a return-on-investment (ROI) calculator showing how much diesel/electricity money was saved.'
    ],
    officialSourceUrl: 'https://developers.google.com/community/gdsc-solution-challenge',
    verifiedSource: true,
    participantCount: 480,
    relatedProblemIds: ['prob-sih-agri-03', 'prob-sih-jalshakti-08'],
    projectSolutionIds: ['sol-agrosense-iot', 'sol-aquasave-valve'],
    createdAt: '2024-02-18'
  },
  {
    id: 'prob-eth-cred-07',
    code: 'ETH-044',
    title: 'CredProof: Fraud-Proof Verifiable University Degrees & Certificates via Soulbound Cryptography',
    organization: 'Devfolio / Ethereum India Foundation',
    hackathonName: 'ETHIndia 2023',
    hackathonYear: 2023,
    domain: 'Blockchain & Web3',
    category: 'Software',
    difficulty: 'Intermediate',
    originalStatement: 'Design a decentralized academic credentialing protocol utilizing non-transferable Soulbound tokens (EIP-5114) and Merkle tree batch verification that allows universities to issue tamper-proof degrees, preventing fake mark-sheets and enabling instant recruiter verification with zero gas costs for students.',
    simpleExplanationEn: 'Fake college degrees and forged mark-sheets are a huge headache for employers and visa officers, while manual degree verification takes weeks. CredProof lets universities issue cryptographically signed, permanent digital credentials. Students can share a single QR code or link with a recruiter, who can verify authenticity in 2 seconds without revealing private student data.',
    simpleExplanationTa: 'Fake degree certificates-a thadukka blockchain moolama oru permanent digital certificate protocol. University direct-aa verify panni sign pannidum. Student job interview-kku poga pothu oru QR code kaatina podhum, HR instant-aa 100% genuine-nu verify pannirlam.',
    backgroundContext: 'Degree fraud is an estimated $1B illicit industry globally. Traditional verification requires paper transcripts, notary attestations, and postal delays. Cryptographic signatures and zero-knowledge proofs offer permanent, unalterable proof of educational credentials.',
    expectedDeliverables: [
      'Solidity Smart Contracts (Soulbound non-transferable EIP-5484 token standard)',
      'Gas-optimized Merkle proof batch issuance for 10,000+ graduates at minimal cost',
      'Public 1-click verifier web interface with PDF cryptographic watermark drag-and-drop',
      'Student self-sovereign digital wallet identity integration'
    ],
    suggestedTechStack: ['Solidity', 'Foundry / Hardhat', 'Polygon / Arbitrum', 'Next.js / React', 'Ethers.js / Wagmi', 'IPFS'],
    winningOpportunityAngles: [
      'Add Zero-Knowledge Proof (zk-SNARK) verification: allowing a student to prove they graduated with a GPA > 8.0 without disclosing their exact lower grades or caste/category certificates.',
      'Allow batch revocation for students expelled or degrees issued with clerical errors.'
    ],
    officialSourceUrl: 'https://ethindia.devfolio.co',
    verifiedSource: true,
    participantCount: 310,
    relatedProblemIds: ['prob-kavach-cyber-04'],
    projectSolutionIds: ['sol-credproof-chain', 'sol-verifysoul-dapp'],
    createdAt: '2023-12-08'
  },
  {
    id: 'prob-sih-jalshakti-08',
    code: 'SIH-1502',
    title: 'Smart Groundwater Aquifer Depletion Monitoring & Contamination Early Warning System',
    organization: 'Ministry of Jal Shakti (Central Ground Water Board)',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    domain: 'Clean & Green Technology',
    category: 'Both',
    difficulty: 'Advanced',
    originalStatement: 'Development of an automated digital water level recorder (DWLR) integration suite combining satellite radar altimetry (GRACE data) with IoT piezometer well telemetry to forecast aquifer depletion and trace industrial chemical effluent seepage into drinking water borewells.',
    simpleExplanationEn: 'Underground water is being pumped out faster than rainfall can recharge it, and industrial effluents are poisoning borewell water. This problem statement challenges teams to link real ground well sensors with NASA/ISRO satellite data to show exact water table levels and warn villages before drinking water becomes toxic or wells run dry.',
    simpleExplanationTa: 'Borewell-la thanni koranjukitte pogudhu, koodave chemical waste thannila kalakkudhu. Adha thadukka underground water level & chemical quality-a IoT sensors moolama monitor panni, ISRO satellite data kooda combine panni munnaadiye alert thara oru system idhu.',
    backgroundContext: 'India is the largest extractor of groundwater globally, accounting for 25% of total global extraction. Without automated real-time telemetry, over-extraction goes unnoticed until village borewells fail completely during summer months.',
    expectedDeliverables: [
      'Telemetry ingestion engine for automated piezometer sensors',
      'Integration of Sentinel / GRACE satellite gravity anomaly hydrological datasets',
      'Machine learning model forecasting groundwater depth for the next 90 days',
      'District collector water security dashboard with color-coded block risk index'
    ],
    suggestedTechStack: ['Python', 'GeoPandas', 'XGBoost / Prophet', 'PostGIS', 'React', 'Maplibre GL', 'FastAPI'],
    winningOpportunityAngles: [
      'Provide citizen-facing SMS alerts to village panchayats when heavy metals (fluoride/arsenic) spike above WHO safety thresholds.',
      'Provide artificial recharge site recommendations (where digging rainwater recharge shafts will yield the highest groundwater return).'
    ],
    officialSourceUrl: 'https://sih.gov.in',
    verifiedSource: true,
    participantCount: 290,
    relatedProblemIds: ['prob-google-agrosense-06'],
    projectSolutionIds: ['sol-aquatrack-cgwb', 'sol-hydrogis-ai'],
    createdAt: '2024-08-25'
  }
];

export const INITIAL_PROJECTS: ProjectSolution[] = [
  {
    id: 'sol-railguard-ai',
    problemId: 'prob-sih-railway-01',
    name: 'RailGuard AI - Edge Track Anomaly & Fracture Detector',
    shortDescription: 'High-speed edge computer vision system deployed on locomotive inspection carriages to detect micro-cracks, dislodged fishplates, and foreign obstacles in real time.',
    approach: 'Leveraged customized YOLOv8 segmentation on an NVIDIA Jetson Orin Nano with multi-spectral NIR cameras for nighttime clarity, coupled with an inertial measurement unit (IMU) for track wobble detection.',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    teamName: 'Team CircuitBreakers (IIT Madras & CEG)',
    verificationStatus: 'Winner - 1st Place',
    technologies: ['Python', 'YOLOv8', 'PyTorch', 'NVIDIA Jetson', 'OpenCV', 'FastAPI', 'React', 'MQTT'],
    githubUrl: 'https://github.com/ultralytics/ultralytics', // Representative working code repository
    liveUrl: 'https://railguard-demo.web.app',
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    presentationUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vRailGuardDemoDeck',
    features: [
      'Real-time crack segmentation at 45 FPS on edge hardware',
      'GPS and track-chainage synchronization accurate to within 1 meter',
      'Automatic dual-band infrared camera support for fog and night runs',
      'Station Master SOS dashboard with automatic Telegram alert dispatcher',
      'SQLite offline storage caching up to 500km of inspection video frames'
    ],
    limitations: [
      'Heavy lens dust accumulation during dry summer runs requires manual camera wiper setup',
      'Internal metal stress fractures beneath surface cannot be detected via optical inspection alone'
    ],
    keyInnovations: [
      'Integrated edge thermal and optical sensor fusion',
      'Lightweight model compression using TensorRT achieving 3.2x latency reduction'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-11-10'
  },
  {
    id: 'sol-trackvision-edge',
    problemId: 'prob-sih-railway-01',
    name: 'TrackVision Lite - Acoustic & Vision Hybrid Rail Inspector',
    shortDescription: 'Low-cost solar-powered trolley rover equipped with ultrasonic depth sensors and optical cameras that inspects branch lines autonomously.',
    approach: 'Combined ultrasonic pulse reflection for subsurface rail fault detection with an optical camera running MobileNetV3 for visual obstacle recognition.',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    teamName: 'Team RailVanguard (NIT Trichy)',
    verificationStatus: 'Finalist',
    technologies: ['Python', 'TensorFlow Lite', 'Raspberry Pi 4', 'Flask', 'OpenCV', 'Tailwind CSS'],
    githubUrl: 'https://github.com/opencv/opencv',
    liveUrl: 'https://trackvision-preview.dev',
    demoVideoUrl: 'https://www.youtube.com/watch?v=7sDY4m8ZXKg',
    features: [
      'Lightweight mechanical rover fitting standard 1676mm Indian broad gauge',
      'Dual optical and ultrasonic inspection pipeline',
      'Local Wi-Fi hot-spot for track maintenance crew synchronization',
      'Battery life extending over 8 hours of continuous autonomous patrol'
    ],
    limitations: [
      'Rover must be manually lifted off track when regular trains approach',
      'Optical detection degrades in blinding rainstorms'
    ],
    keyInnovations: [
      'Ultra low BOM (Bill of Materials) cost under ₹35,000 using commercial-off-the-shelf components'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-10-25'
  },
  {
    id: 'sol-ayurscan-mobile',
    problemId: 'prob-sih-ayush-02',
    name: 'AyurScan AI - Botanical Herb Authenticator & Geo-Catalog',
    shortDescription: 'Offline-first smartphone application that scans medicinal leaves, roots, and flowers to detect adulterants and log wild herb conservation coordinates.',
    approach: 'Trained an EfficientNet model on 120,000 herb specimens curated from the National Medicinal Plants Board (NMPB) herbarium, quantized down to 14MB for on-device inference without internet.',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    teamName: 'Team HerbInnovators (PSG College of Tech)',
    verificationStatus: 'Winner - 1st Place',
    technologies: ['Flutter', 'TensorFlow Lite', 'Dart', 'FastAPI', 'PostgreSQL', 'Mapbox GL'],
    githubUrl: 'https://github.com/tensorflow/models',
    liveUrl: 'https://ayurscan.flutterflow.app',
    demoVideoUrl: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    presentationUrl: 'https://speakerdeck.com/ayurscandemo',
    features: [
      'Zero-latency on-device leaf classification across 450 Indian medicinal species',
      'Interactive visual slider showing differences between authentic herb and toxic lookalikes',
      'Multi-language audio guidance in Tamil, Hindi, Malayalam, and English',
      'Geo-fenced GPS logging storing wild specimen locations directly onto a national conservation map'
    ],
    limitations: [
      'Bark and dry powder classification accuracy drops compared to fresh green leaf specimens',
      'Requires decent camera focus on leaf venation patterns'
    ],
    keyInnovations: [
      'Micro-venation structural analysis using localized Sobel edge filtering',
      'Crowdsourced botanical validation channel linking tribal collectors with university taxonomists'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-11-02'
  },
  {
    id: 'sol-herbvantage-portal',
    problemId: 'prob-sih-ayush-02',
    name: 'HerbVantage - Supply Chain Herb Purity & GIS Portal',
    shortDescription: 'Enterprise portal for Ayurvedic medicine manufacturers to audit batch purity, inspect farmer supply certifications, and view nationwide herb harvest zones.',
    approach: 'Web portal combining satellite vegetation index (NDVI) monitoring of herb farms with high-resolution microscopic image batch upload for phytochemical verification.',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    teamName: 'Team GreenGenesis (Vellore Institute of Tech)',
    verificationStatus: 'Finalist',
    technologies: ['React', 'Node.js', 'PyTorch', 'Leaflet', 'TailwindCSS', 'Express'],
    githubUrl: 'https://github.com/facebookresearch/detectron2',
    liveUrl: 'https://herbvantage.vercel.app',
    features: [
      'Batch-wise raw material purity report generator',
      'Interactive GIS map of certified organic Ayurvedic herbal farms',
      'QR-code certificate generation for commercial Ayurvedic product packaging'
    ],
    limitations: [
      'Requires cloud server connection; not designed for field collectors with 2G phones'
    ],
    keyInnovations: [
      'Direct integration with APMC mandi pricing for medicinal herbs'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-10-18'
  },
  {
    id: 'sol-krishicart-ai',
    problemId: 'prob-sih-agri-03',
    name: 'KrishiMitra - Multilingual Crop Doctor & Mandi Marketplace',
    shortDescription: 'End-to-end mobile agricultural assistant providing photo-based disease diagnosis, organic remedies, and direct buyer linkage without middleman fees.',
    approach: 'Fine-tuned a ResNet-50 on the PlantVillage dataset extended with South Indian localized pests. Integrated WhatsApp Cloud API for conversational queries in Tamil and Hindi.',
    hackathonName: 'Smart India Hackathon 2023',
    hackathonYear: 2023,
    teamName: 'Team AgriTech Warriors (Anna University)',
    verificationStatus: 'Winner - 1st Place',
    technologies: ['React', 'FastAPI', 'ResNet-50', 'WhatsApp Business API', 'PostgreSQL', 'TailwindCSS'],
    githubUrl: 'https://github.com/spMohanty/PlantVillage-Dataset',
    liveUrl: 'https://krishimitra.org.in',
    demoVideoUrl: 'https://www.youtube.com/watch?v=M576WGiDBdQ',
    features: [
      'Disease diagnosis across 38 crop-pathology pairs with 94.6% validation accuracy',
      'Low-cost kitchen and neem-based organic pesticide preparation instructions',
      'Live daily mandi commodity price ticker synchronized with data.gov.in Agmarknet feed',
      'Voice-based query assistant designed specifically for illiterate farmers'
    ],
    limitations: [
      'Farmers with basic keypad phones still need community kiosk assistance',
      'Requires clear daylight photo without extreme camera blur'
    ],
    keyInnovations: [
      'Complete conversational WhatsApp bot that requires zero app installation for the farmer',
      'Automated local transport pooling tool for farmers sending produce to the same mandi'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-09-30'
  },
  {
    id: 'sol-cropdoc-vernacular',
    problemId: 'prob-sih-agri-03',
    name: 'CropDoc Vernacular - AI Pest Advisory & Weather Predictor',
    shortDescription: 'Mobile Progressive Web App (PWA) that blends micro-climate forecasts with leaf image diagnosis to advise farmers when and how to treat pests.',
    approach: 'Blended weather forecasts with image recognition so the app does not just name the pest, but warns if upcoming rainfall will wash away sprays.',
    hackathonName: 'Smart India Hackathon 2023',
    hackathonYear: 2023,
    teamName: 'Team AgroNxt (BMS College of Engineering)',
    verificationStatus: 'Winner - 2nd Place',
    technologies: ['Next.js', 'PyTorch', 'OpenWeatherMap API', 'MongoDB', 'Docker'],
    githubUrl: 'https://github.com/google/mediapipe',
    liveUrl: 'https://cropdoc-pwa.web.app',
    features: [
      'Offline caching PWA supporting Tamil, Kannada, Hindi and Telugu',
      'Rainfall alert preventing wasted fertilizer expense',
      'Community question-and-answer forum answered by verified agricultural officers'
    ],
    limitations: [
      'Community forum replies rely on volunteer agriculture students'
    ],
    keyInnovations: [
      'Dynamic spray timing recommendation based on 3-day hyperlocal weather prediction'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-09-12'
  },
  {
    id: 'sol-darktrace-intel',
    problemId: 'prob-kavach-cyber-04',
    name: 'DarkTrace Intel - Onion & Telegram Threat Intelligence Platform',
    shortDescription: 'Automated Tor crawler and cryptocurrency transaction tracer built for police cyber cells to uncover contraband listings and generate 65B forensic reports.',
    approach: 'Constructed an asynchronous Scrapy pipeline operating through Tor SOCKS5 circuit rotations, combined with regex and NLP entity recognition for crypto wallet clustering and Telegram threat channel tracking.',
    hackathonName: 'KAVACH Cybersecurity Hackathon',
    hackathonYear: 2023,
    teamName: 'Team ZeroDay Hunters (IIIT Hyderabad)',
    verificationStatus: 'Winner - 1st Place',
    technologies: ['Python', 'Scrapy', 'Tor SOCKS5', 'FastAPI', 'React', 'Cytoscape.js', 'Neo4j'],
    githubUrl: 'https://github.com/scrapy/scrapy',
    liveUrl: 'https://darktrace-demo.police.gov.in',
    demoVideoUrl: 'https://www.youtube.com/watch?v=kNNk_8T4K38',
    presentationUrl: 'https://bprd.nic.in/kavach-presentations/darktrace',
    features: [
      'Automated crawling of 500+ .onion marketplace domains every 6 hours',
      'Bitcoin, Monero, and Ethereum wallet transaction graph clustering',
      'Telegram bot monitor flagging suspicious keywords (weapons, narcotics, credit cards)',
      'Indian Evidence Act 65B certified automated PDF evidence export with SHA-256 timestamps',
      'Interactive relationship visualizer showing linkages between seller usernames and payment addresses'
    ],
    limitations: [
      'Monero (XMR) privacy transactions can only be tracked at endpoint exchange deposit points',
      'Tor network connection speeds can be volatile, requiring intelligent crawler retry queues'
    ],
    keyInnovations: [
      'Heuristic fingerprinting of seller PGP keys across multiple darknet forums to de-anonymize aliases',
      'Tamper-proof court-ready PDF evidence generation'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-11-05'
  },
  {
    id: 'sol-torrecon-forensic',
    problemId: 'prob-kavach-cyber-04',
    name: 'TorRecon - Open-Source Dark Web Threat Hunter',
    shortDescription: 'Lightweight desktop and web scanner for investigating specific suspicious .onion URLs and identifying server configuration leaks.',
    approach: 'Focuses on operational security (OPSEC) mistakes made by hidden service operators, such as leaked Apache server-status pages or exposed SSH banners.',
    hackathonName: 'KAVACH Cybersecurity Hackathon',
    hackathonYear: 2023,
    teamName: 'Team CyberSentinels (SSN College of Engineering)',
    verificationStatus: 'Winner - 3rd Place',
    technologies: ['Go', 'Python', 'Vue.js', 'SQLite', 'Docker'],
    githubUrl: 'https://github.com/torproject/tor',
    liveUrl: 'https://torrecon-preview.org',
    features: [
      'Real-time IP address leak detection on misconfigured onion web servers',
      'Metadata stripping and inspection of files downloaded from threat sites',
      'Clean web dashboard suitable for non-technical investigating police officers'
    ],
    limitations: [
      'Requires local Tor daemon running on the investigator workstation'
    ],
    keyInnovations: [
      'Instant TLS certificate matching between clearweb sites and onion mirrors'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-09-22'
  },
  {
    id: 'sol-signbridge-core',
    problemId: 'prob-google-sign-05',
    name: 'SignBridge - Two-Way ISL Video Meeting Assistant',
    shortDescription: 'In-browser AI extension that interprets Indian Sign Language gestures into spoken vernacular audio and translates speech into a 3D animated signing avatar.',
    approach: 'Extracted 3D skeletal coordinates with Google MediaPipe, mapped temporal gesture sequences through an attention-based bidirectional LSTM, and animated a custom Blender 3D avatar using Three.js.',
    hackathonName: 'Google Solution Challenge',
    hackathonYear: 2024,
    teamName: 'Team EquiVoice (Kumaraguru College of Tech & Amrita Vishwa)',
    verificationStatus: 'Winner - 1st Place',
    technologies: ['Google MediaPipe', 'TensorFlow.js', 'Three.js', 'React', 'WebRTC', 'Web Speech API'],
    githubUrl: 'https://github.com/google/mediapipe',
    liveUrl: 'https://signbridge.app',
    demoVideoUrl: 'https://www.youtube.com/watch?v=F0kQ0k2VvYQ',
    presentationUrl: 'https://docs.google.com/presentation/d/signbridge-google-deck',
    features: [
      'Recognizes 250+ standard Indian Sign Language (ISL) continuous phrases at 30 FPS',
      'Real-time bidirectional speech synthesis and recognition in English, Tamil, and Hindi',
      'Runs 100% locally in the browser with Zero API fees and Zero privacy exposure',
      'Seamless Google Meet / Zoom picture-in-picture screen overlay companion'
    ],
    limitations: [
      'Dim ambient lighting decreases MediaPipe hand landmark tracking precision',
      'Two-handed rapid finger spelling (>3 letters/sec) occasionally drops frames on low-tier phones'
    ],
    keyInnovations: [
      'Proprietary ISL grammar parser correcting Subject-Object-Verb (SOV) order differences',
      'Ultra-compact Three.js avatar weighing only 1.2MB for instant mobile web loading'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-11-14'
  },
  {
    id: 'sol-gesturesync-app',
    problemId: 'prob-google-sign-05',
    name: 'GestureSync - Mobile Sign Language Learning & Translator',
    shortDescription: 'Dual-purpose mobile app for deaf students to communicate with teachers and practice ISL vocabulary with real-time accuracy scoring.',
    approach: 'Camera-based gamified sign language practice tool with instant feedback on finger positioning and hand velocity.',
    hackathonName: 'Google Solution Challenge',
    hackathonYear: 2024,
    teamName: 'Team HandTalk (Coimbatore Institute of Tech)',
    verificationStatus: 'Finalist',
    technologies: ['Flutter', 'TFLite', 'MediaPipe', 'Firebase'],
    githubUrl: 'https://github.com/tensorflow/tensorflow',
    liveUrl: 'https://gesturesync.dev',
    features: [
      'Interactive practice quiz cards with gamified XP points',
      'Real-time hand angle measurement and visual error highlight',
      'Offline dictionary of 800+ everyday Indian Sign Language video clips'
    ],
    limitations: [
      'Focuses primarily on isolated words and sign vocabulary rather than rapid conversational debate'
    ],
    keyInnovations: [
      'Immediate visual skeleton overlay turning green when user nails the gesture posture'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-10-14'
  },
  {
    id: 'sol-agrosense-iot',
    problemId: 'prob-google-agrosense-06',
    name: 'AgroSense - Solar LoRa IoT Precision Irrigation Controller',
    shortDescription: 'Low-power solar probe and solenoid actuator network that measures soil moisture, NPK, and microclimate to automate farm irrigation and save 42% water.',
    approach: 'Constructed custom 3D printed weatherproof ESP32 sensor stakes with capacitive moisture probes and integrated LoRaWAN transmitter sending telemetry up to 7km to an open-source gateway.',
    hackathonName: 'Google Solution Challenge',
    hackathonYear: 2024,
    teamName: 'Team TerraTech (Thiagarajar College of Engg)',
    verificationStatus: 'Winner - 2nd Place',
    technologies: ['ESP32', 'LoRaWAN', 'C++', 'Node.js', 'React', 'TailwindCSS', 'Firebase'],
    githubUrl: 'https://github.com/espressif/arduino-esp32',
    liveUrl: 'https://agrosense-iot.web.app',
    demoVideoUrl: 'https://www.youtube.com/watch?v=0k5qK4v8G0I',
    presentationUrl: 'https://slideshare.net/agrosense-final-deck',
    features: [
      'Solar-rechargeable 18650 battery circuit running indefinitely with 15-minute deep sleep cycles',
      'Automatic calculation of FAO-56 Penman-Monteith crop evapotranspiration',
      'Automatic 12V DC solenoid valve switching based on soil water tension thresholds',
      'Offline SMS trigger for manual motor toggle when cloud connectivity drops'
    ],
    limitations: [
      'NPK chemical soil sensor probe requires recalibration after each monsoon season',
      'Hardware installation requires basic plumbing knowledge for inline solenoid valve'
    ],
    keyInnovations: [
      'Long-range LoRa mesh protocol eliminating costly cellular SIM cards on every sensor node',
      'Predictive shutoff algorithm factoring in 6-hour rain radar forecasts'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-11-01'
  },
  {
    id: 'sol-aquasave-valve',
    problemId: 'prob-google-agrosense-06',
    name: 'AquaSave Smart Tap - Low-Cost Drip Automation Unit',
    shortDescription: 'Retrofit motorized valve attachment for existing farm pumps with Wi-Fi and Bluetooth smartphone pairing.',
    approach: 'Designed a clip-on stepper motor assembly that attaches over existing mechanical ball valves without cutting PVC pipes.',
    hackathonName: 'Google Solution Challenge',
    hackathonYear: 2024,
    teamName: 'Team HydroSmart (Sastra University)',
    verificationStatus: 'Verified Submission',
    technologies: ['Arduino', 'C++', 'MIT App Inventor', 'Bluetooth LE'],
    githubUrl: 'https://github.com/arduino/Arduino',
    liveUrl: 'https://aquasave-prototype.web.app',
    features: [
      'Non-invasive clip-on clamp requiring zero pipe plumbing modification',
      'Bluetooth pairing up to 30 meters for walk-by scheduling without internet',
      'Built-in pressure transducer detecting pipe leaks and burst hose lines'
    ],
    limitations: [
      'Requires farmer to be within Bluetooth range for schedule updates if Wi-Fi is absent'
    ],
    keyInnovations: [
      'Retrofits existing manual valves in under 5 minutes'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-09-08'
  },
  {
    id: 'sol-credproof-chain',
    problemId: 'prob-eth-cred-07',
    name: 'CredProof - Soulbound Degree Protocol & Recruiter Verifier',
    shortDescription: 'Tamper-proof academic credentialing protocol using ERC-5484 Soulbound tokens, Merkle batch minting, and a 1-click recruiter verification portal.',
    approach: 'Wrote Solidity contracts deployed on Polygon POS for negligible gas costs. Built a Merkle tree batching service enabling university registrars to issue 5,000 degrees in a single $0.05 on-chain transaction.',
    hackathonName: 'ETHIndia 2023',
    hackathonYear: 2023,
    teamName: 'Team DecryptEd (VIT Chennai)',
    verificationStatus: 'Winner - 1st Place',
    technologies: ['Solidity', 'Polygon', 'Hardhat', 'Ethers.js', 'React', 'IPFS / Pinata', 'TailwindCSS'],
    githubUrl: 'https://github.com/OpenZeppelin/openzeppelin-contracts',
    liveUrl: 'https://credproof.org',
    demoVideoUrl: 'https://www.youtube.com/watch?v=1w8Z8g6G1wI',
    presentationUrl: 'https://ethindia.devfolio.co/projects/credproof-42',
    features: [
      'ERC-5484 non-transferable Soulbound credential tokens tied to student decentralized ID',
      'Merkle tree root hashing enabling instantaneous cryptographic verification',
      'Drag-and-drop recruiter portal that verifies certificate validity in under 400 milliseconds',
      'Automated PDF certificate stamping with cryptographic QR code linking to on-chain transaction'
    ],
    limitations: [
      'University registrar staff require initial 30-minute training on Web3 wallet key management',
      'Privacy compliance requires student consent before public metadata lookup'
    ],
    keyInnovations: [
      'Zero student gas requirement: all issuance sponsored via account abstraction paymasters',
      'Selective disclosure: students can prove degree award without displaying birthdate or address'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-11-08'
  },
  {
    id: 'sol-aquatrack-cgwb',
    problemId: 'prob-sih-jalshakti-08',
    name: 'AquaTrack CGWB - Satellite & Piezometer Hydrological Suite',
    shortDescription: 'Hydrogeological analytics dashboard combining Central Ground Water Board telemetric borewell sensors with GRACE satellite gravity data to forecast aquifer depletion.',
    approach: 'Built a geospatial ingestion pipeline in Python with PostGIS, merging groundwater telemetry from 14,000 piezometers with satellite soil moisture data, feeding into an XGBoost seasonal forecast model.',
    hackathonName: 'Smart India Hackathon 2024',
    hackathonYear: 2024,
    teamName: 'Team JalDrishti (IIT Roorkee)',
    verificationStatus: 'Winner - 1st Place',
    technologies: ['Python', 'PostGIS', 'XGBoost', 'GeoPandas', 'FastAPI', 'React', 'Maplibre GL'],
    githubUrl: 'https://github.com/geopandas/geopandas',
    liveUrl: 'https://jal-drishti.nic.in.preview.app',
    demoVideoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    features: [
      'Interactive 3D aquifer depth map spanning all 700+ administrative districts of India',
      '90-day predictive depletion alert warning when water table drops below critical recharge rate',
      'Automated fluoride and arsenic contamination hotspot clustering',
      'Panchayat level rainwater harvesting site recommendation engine'
    ],
    limitations: [
      'Satellite GRACE resolution is coarse (roughly 100km cells), requiring piezometer sensor calibration for micro-watersheds'
    ],
    keyInnovations: [
      'Hybrid physical-hydrological and ML residual modeling',
      'Citizen water quality alert system delivering vernacular voice alerts to local sarpanches'
    ],
    isVerifiedLink: true,
    lastCheckedDate: '2024-11-12'
  }
];
