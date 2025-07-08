export const translations = {
  en: {
    home: 'Home',
    about: 'About',
    team: 'Team',
    launchApp: 'Launch App',
    backTo: 'Back to',
    teamLava: 'Team Name: LAVA',
    hackathonTitle: 'Bharatiya Antariksh Hackathon 2025',
    projectTitle: 'Chase the Cloud: Leveraging Diffusion Models for Cloud Motion Prediction using INSAT-3DR/3DS Imagery',
    projectDescription: 'This project focuses on predicting cloud motion using diffusion models, a class of deep generative networks, applied to satellite imagery from INSAT-3DR/3DS. Traditional optical flow or physics-based models often falter when confronted with volatile weather dynamics. In contrast, this approach uses spatio-temporal learning to simulate realistic cloud evolution from multi-spectral past frames, delivering enhanced forecasting for short-term (0–3 hours) applications including nowcasting and early warnings for severe weather events.',
    // AboutSection
    aboutSectionLabel: 'About Our Project',
    aboutSectionTitle: 'Advancing Weather Forecasting Technology',
    aboutSectionP1: "Welcome to Team LAVA's innovative solution for the Bharatiya Antariksh Hackathon 2025. Our project focuses on developing cutting-edge cloud motion prediction technology using INSAT-3DR/3DS satellite imagery, advancing India's capabilities in weather forecasting and atmospheric monitoring.",
    aboutSectionP2: 'Through the implementation of advanced machine learning algorithms and deep learning models, we process multi-spectral satellite data to predict cloud movements with unprecedented accuracy, contributing to better weather forecasting and natural disaster preparedness.',
    aboutFeatures: [
      { title: 'Cloud Motion Prediction', description: 'Advanced algorithms to predict cloud movement patterns using INSAT-3DR/3DS satellite imagery.', icon: '🛰️' },
      { title: 'Weather Forecasting', description: 'Enhancing weather forecasting accuracy through satellite data analysis and deep learning.', icon: '🌤️' },
      { title: 'Real-time Analysis', description: 'Processing satellite imagery in real-time to provide immediate cloud motion predictions.', icon: '⚡' },
      { title: 'Data Visualization', description: 'Interactive visualization tools to better understand cloud patterns and movements.', icon: '📊' }
    ],
    // TeamSection
    ourTeam: 'Our Team',
    meetTeam: 'Meet Team LAVA',
    teamDescription: 'A dedicated team of professionals working together to revolutionize weather forecasting through innovative cloud motion prediction technology.',
    teamMembers:  [
      {
        name: "Sarath P",
        role: "Team Lead & AI/ML Engineer",
        description: "Leads the team and specializes in deep learning and computer vision, with a strong focus on satellite imagery analysis and model deployment.",
        image: "/src/assets/team_leader.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "Vikass",
        role: "AI/ML Engineer",
        description: "Works on developing and training AI models, contributing to robust backend pipelines and scalable ML systems.",
        image: "/src/assets/vikass.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "Satheshwaran V",
        role: "Web & App Developer",
        description: "Designs and develops responsive and user-friendly web and mobile interfaces, ensuring smooth user experience and frontend performance.",
        image: "/src/assets/sathes.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "Mathivathani",
        role: "Research & Documentation",
        description: "Responsible for data validation, research writing, and comprehensive documentation, aiding scientific interpretation and project clarity.",
        image: "/src/assets/mathi.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      }
    ],
    // CloudMotionTool
    cloudMotionToolTitle: "Cloud Motion Tool",
    futureUpdatesRoadmap: "Future Updates Roadmap",
    inputFrames: "Input Frames",
    outputFrames: "Output Frames",
    bands: "Bands (Channels)",
    accuracy: "Accuracy (Will be updated)",
    downloadLabel: "Download",
    images: "Images",
    video: "Video (Will be updated)",
    gif: "GIF (Will be updated)",
    configuration: "Configuration",
    clickOrDrag: "Click or drag files here to upload",
    selectedFiles: "Selected Files",
    uploadPredict: "Upload & Predict",
    uploading: "Uploading...",
    inputImages: "Input Images",
    prediction: "Prediction",
    download: "Download Prediction",
    view: "View Image",
    // Roadmap text
    currentlyOnly: "Currently, only",
    framesSupported: "frames are supported. Support for",
    and: "and",
    framesWillBeAdded: "frames will be added soon.",
    atPresent: "At present, only",
    frameAvailable: "frame is available. An option for",
    framesWillBeIntroduced: "frames will be introduced in upcoming updates.",
    currentlyOnlyBand: "Currently, only",
    bandActive: "band is active. Additional bands like",
    arePlanned: "are planned.",
    metricsWillBeAdded: "Metrics such as",
    willBeAddedAlongside: "will be added alongside the existing",
    formatAvailable: "format is available for download. Support for",
    formatsComingSoon: "formats is coming soon.",
    // Footer
    footerAbout: 'Team LAVA',
    footerAboutDesc: 'Advancing weather forecasting technology through innovative cloud motion prediction using INSAT-3DR/3DS satellite imagery.',
    quickLinks: 'Quick Links',
    contact: 'Contact',
    email: 'contact@teamlava.com',
    address: 'Indian Institute of Technology',
    city: 'New Delhi, India',
    footerTitle: "Team LAVA",
    footerDesc: "Advancing weather forecasting technology through innovative cloud motion prediction using INSAT-3DR/3DS satellite imagery.",
    footerCopyright: year => `© ${year} Team LAVA. All rights reserved.`,
  },
  hi: {
    home: 'होम',
    about: 'परिचय',
    team: 'टीम',
    launchApp: 'ऐप लॉन्च करें',
    backTo: 'वापस',
    teamLava: 'टीम लावा',
    hackathonTitle: 'भारतीय अंतरिक्ष हैकाथॉन 2025',
    projectTitle: 'बादल की गति की भविष्यवाणी: INSAT-3DR/3DS इमेजरी का उपयोग करके डिफ्यूजन मॉडल का लाभ उठाना',
    projectDescription: 'यह प्रोजेक्ट INSAT-3DR/3DS से प्राप्त सैटेलाइट इमेजरी पर डिफ्यूजन मॉडल्स का उपयोग करके बादलों की गति की भविष्यवाणी पर केंद्रित है। पारंपरिक ऑप्टिकल फ्लो या भौतिकी-आधारित मॉडल अस्थिर मौसम की गतिशीलता का सामना करते समय अक्सर विफल हो जाते हैं। इसके विपरीत, यह दृष्टिकोण मल्टी-स्पेक्ट्रल पास्ट फ्रेम्स से वास्तविक बादल विकास को सिमुलेट करने के लिए स्पेशियो-टेम्पोरल लर्निंग का उपयोग करता है, जिससे नाउकास्टिंग और गंभीर मौसम की घटनाओं के लिए अर्ली वार्निंग सहित शॉर्ट-टर्म (0-3 घंटे) एप्लिकेशन के लिए बेहतर पूर्वानुमान प्राप्त होता है।',
    // AboutSection
    aboutSectionLabel: 'हमारे प्रोजेक्ट के बारे में',
    aboutSectionTitle: 'मौसम पूर्वानुमान तकनीक में प्रगति',
    aboutSectionP1: "टीम लावा के अभिनव समाधान में आपका स्वागत है, जो भारतीय अंतरिक्ष हैकाथॉन 2025 के लिए है। हमारा प्रोजेक्ट INSAT-3DR/3DS सैटेलाइट इमेजरी का उपयोग करके अत्याधुनिक बादल गति पूर्वानुमान तकनीक विकसित करने पर केंद्रित है, जिससे भारत की मौसम पूर्वानुमान और वायुमंडलीय निगरानी क्षमताओं में वृद्धि हो।",
    aboutSectionP2: 'एडवांस्ड मशीन लर्निंग एल्गोरिदम और डीप लर्निंग मॉडल्स के कार्यान्वयन के माध्यम से, हम मल्टी-स्पेक्ट्रल सैटेलाइट डेटा को प्रोसेस करते हैं ताकि अभूतपूर्व सटीकता के साथ बादलों की गति की भविष्यवाणी की जा सके, जिससे बेहतर मौसम पूर्वानुमान और प्राकृतिक आपदा तैयारी में योगदान मिलता है।',
    aboutFeatures: [
      { title: 'बादल गति पूर्वानुमान', description: 'INSAT-3DR/3DS सैटेलाइट इमेजरी का उपयोग करके बादल गति पैटर्न की भविष्यवाणी के लिए उन्नत एल्गोरिदम।', icon: '🛰️' },
      { title: 'मौसम पूर्वानुमान', description: 'सैटेलाइट डेटा विश्लेषण और डीप लर्निंग के माध्यम से मौसम पूर्वानुमान की सटीकता बढ़ाना।', icon: '🌤️' },
      { title: 'रीयल-टाइम विश्लेषण', description: 'रीयल-टाइम में सैटेलाइट इमेजरी प्रोसेसिंग द्वारा तुरंत बादल गति पूर्वानुमान प्रदान करना।', icon: '⚡' },
      { title: 'डेटा विज़ुअलाइज़ेशन', description: 'बादल पैटर्न और गतियों को बेहतर समझने के लिए इंटरैक्टिव विज़ुअलाइज़ेशन टूल्स।', icon: '📊' }
    ],
    // TeamSection
    ourTeam: 'हमारी टीम',
    meetTeam: 'टीम लावा से मिलें',
    teamDescription: 'एक समर्पित पेशेवरों की टीम जो अभिनव बादल गति पूर्वानुमान तकनीक के माध्यम से मौसम पूर्वानुमान में क्रांति लाने के लिए एक साथ काम कर रही है।',
    teamMembers: [
      {
        name: "सरथ पी",
        role: "टीम लीड और एआई/एमएल इंजीनियर",
        description: "टीम का नेतृत्व करते हैं और डीप लर्निंग व कंप्यूटर विज़न में विशेषज्ञता रखते हैं, विशेष रूप से सैटेलाइट इमेजरी विश्लेषण और मॉडल तैनाती पर ध्यान केंद्रित करते हैं।",
        image: "/src/assets/team_leader.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "विकास",
        role: "एआई/एमएल इंजीनियर",
        description: "एआई मॉडल विकसित करने और प्रशिक्षित करने का कार्य करते हैं, और मजबूत बैकएंड पाइपलाइनों तथा स्केलेबल एमएल सिस्टम में योगदान देते हैं।",
        image: "/src/assets/vikass.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "सतेश्वरन वी",
        role: "वेब और ऐप डेवलपर",
        description: "प्रतिक्रियाशील और उपयोगकर्ता-अनुकूल वेब और मोबाइल इंटरफेस डिज़ाइन व विकास करते हैं, जिससे यूज़र अनुभव सहज और तेज़ रहता है।",
        image: "/src/assets/sathes.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      },
      {
        name: "मथिवथानी",
        role: "शोध एवं प्रलेखन",
        description: "डेटा मान्यकरण, शोध लेखन और विस्तृत प्रलेखन की जिम्मेदारी निभाती हैं, जिससे वैज्ञानिक व्याख्या और प्रोजेक्ट की स्पष्टता सुनिश्चित होती है।",
        image: "/src/assets/mathi.jpg",
        links: {
          github: "https://github.com",
          linkedin: "https://linkedin.com"
        }
      }
    ],
    
    // CloudMotionTool
    cloudMotionToolTitle: "क्लाउड मोशन टूल",
    futureUpdatesRoadmap: "भविष्य के अपडेट रोडमैप",
    inputFrames: "इनपुट फ्रेम्स",
    outputFrames: "आउटपुट फ्रेम्स",
    bands: "बैंड्स (चैनल्स)",
    accuracy: "सटीकता (जल्द अपडेट होगा)",
    downloadLabel: "डाउनलोड",
    images: "Images",
    video: "Videos (जल्द अपडेट होगा)",
    gif: "GIF (जल्द अपडेट होगा)",
    configuration: "कॉन्फ़िगरेशन",
    clickOrDrag: "अपलोड करने के लिए यहां क्लिक करें या फाइलें ड्रैग करें",
    selectedFiles: "चयनित फाइलें",
    uploadPredict: "अपलोड करें और भविष्यवाणी करें",
    uploading: "अपलोड हो रहा है...",
    inputImages: "इनपुट इमेजेस",
    prediction: "भविष्यवाणी",
    download: "भविष्यवाणी डाउनलोड करें",
    view: "इमेज देखें",
    // Roadmap text
    currentlyOnly: "वर्तमान में, केवल",
    framesSupported: "फ्रेम्स समर्थित हैं। समर्थन के लिए",
    and: "और",
    framesWillBeAdded: "फ्रेम्स जल्द ही जोड़े जाएंगे।",
    atPresent: "वर्तमान में, केवल",
    frameAvailable: "फ्रेम उपलब्ध है। एक विकल्प के लिए",
    framesWillBeIntroduced: "फ्रेम्स को आगामी अपडेट में पेश किया जाएगा।",
    currentlyOnlyBand: "वर्तमान में, केवल",
    bandActive: "बैंड सक्रिय है। अतिरिक्त बैंड जैसे",
    arePlanned: "योजनाबद्ध हैं।",
    metricsWillBeAdded: "मेट्रिक्स जैसे",
    willBeAddedAlongside: "मौजूदा के साथ जोड़े जाएंगे",
    formatAvailable: "प्रारूप डाउनलोड के लिए उपलब्ध है। समर्थन के लिए",
    formatsComingSoon: "प्रारूप जल्द ही आ रहे हैं।",
    // Footer
    footerAbout: 'टीम लावा',
    footerAboutDesc: 'INSAT-3DR/3DS उपग्रह इमेजरी का उपयोग करके अभिनव क्लाउड मोशन प्रेडिक्शन के माध्यम से मौसम पूर्वानुमान तकनीक को आगे बढ़ाना।',
    quickLinks: 'त्वरित लिंक',
    contact: 'संपर्क करें',
    email: 'contact@teamlava.com',
    address: 'भारतीय प्रौद्योगिकी संस्थान',
    city: 'नई दिल्ली, भारत',
    footerTitle: "टीम लावा",
    footerDesc: "INSAT-3DR/3DS उपग्रह इमेजरी का उपयोग करके अभिनव क्लाउड मोशन प्रेडिक्शन के माध्यम से मौसम पूर्वानुमान तकनीक को आगे बढ़ाना।",
    footerCopyright: year => `© ${year} टीम लावा। सर्वाधिकार सुरक्षित।`,
  }
}; 