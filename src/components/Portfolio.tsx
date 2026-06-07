import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import appStoreIcon from '../assets/icons/app-store.png';
import googlePlayIcon from '../assets/icons/google-play.png';

const configModules = import.meta.glob('../assets/apps/*/production_url/*.json', { eager: true });
const logoModules = import.meta.glob('../assets/apps/*/logo/*.{png,jpg,jpeg,svg}', { eager: true });
const screenshotModules = import.meta.glob('../assets/apps/*/screenshots/*.{png,jpg,jpeg}', { eager: true });

const appsData: Record<string, any> = {};

// Parse Configs
for (const path in configModules) {
  const appName = path.split('/')[3];
  const config = (configModules[path] as any).default || configModules[path];
  appsData[appName] = { ...appsData[appName], config };
}

// Parse Logos
for (const path in logoModules) {
  const appName = path.split('/')[3];
  appsData[appName] = { ...appsData[appName], logo: (logoModules[path] as any).default };
}

// Parse Screenshots
for (const path in screenshotModules) {
  const appName = path.split('/')[3];
  if (!appsData[appName]) appsData[appName] = {};
  if (!appsData[appName].screenshots) appsData[appName].screenshots = [];
  appsData[appName].screenshots.push((screenshotModules[path] as any).default);
}

const apps = Object.entries(appsData).map(([id, data]) => ({ id, ...data }));

export default function Portfolio() {
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * 0.8;
      galleryRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedApp]);

  return (
    <section id="portfolio" className="bg-[#141414] py-20 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">My <span className="text-primary">Applications</span></h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            A showcase of my recent cross-platform mobile applications. Highlighting user-centric design, performance optimization, and robust architecture.
          </p>
        </div>

        {apps.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Loading applications...</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {apps.map((app) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="relative rounded-[2.5rem] overflow-hidden cursor-pointer group bg-gradient-to-b from-[#1c1c1c] to-[#121212] border border-white/5 shadow-2xl hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(253,111,0,0.15)] transition-all duration-500 flex flex-col items-center justify-between p-8 text-center min-h-[420px]"
                >
                  {/* Subtle ambient light behind the card on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[50px] opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700 pointer-events-none" />

                  {/* App Icon - No Square Container */}
                  <img
                    src={app.logo}
                    alt={app.config?.name || app.id}
                    className="w-32 h-32 md:w-36 md:h-36 rounded-[24%] object-contain filter group-hover:scale-110 transition-transform duration-500 z-10 drop-shadow-2xl"
                    loading="lazy"
                  />

                  {/* Content (Name & Description) */}
                  <div className="flex flex-col items-center flex-1 justify-center my-4 z-10">
                    <h3 className="text-white font-bold text-2xl tracking-wide group-hover:text-primary transition-colors text-center">
                      {app.config?.name || app.id}
                    </h3>
                    {app.config?.description && (
                      <p className="text-gray-400 text-sm leading-relaxed mt-2.5 line-clamp-2 max-w-[280px] group-hover:text-gray-300 transition-colors">
                        {app.config.description}
                      </p>
                    )}
                  </div>

                  {/* Badges & Button Footer */}
                  <div className="w-full flex flex-col items-center gap-4 z-10">
                    {/* Platform Badges */}
                    <div className="flex gap-3 items-center justify-center">
                      {app.config?.google_play_url && (
                        <img src={googlePlayIcon} alt="Google Play" className="h-8 w-auto object-contain drop-shadow-md" />
                      )}
                      {app.config?.app_store_url && (
                        <img src={appStoreIcon} alt="App Store" className="h-8 w-auto object-contain drop-shadow-md" />
                      )}
                      {!app.config?.google_play_url && !app.config?.app_store_url && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                          Mobile App
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <span className="px-6 py-2 rounded-full border border-white/10 text-gray-300 text-xs font-semibold tracking-wider uppercase bg-white/5 group-hover:border-primary group-hover:bg-primary group-hover:text-[#111111] group-hover:shadow-[0_0_20px_rgba(253,111,0,0.4)] transition-all duration-300">
                      View Details
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modern App Details Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="bg-[#111111] border border-white/10 rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 backdrop-blur-md bg-[#111111]/90 sticky top-0 z-20">
                <div className="flex items-center gap-5">
                  <img src={selectedApp.logo} alt={selectedApp.id} className="w-16 h-16 rounded-2xl object-contain filter drop-shadow-md" />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">{selectedApp.config?.name || selectedApp.id}</h3>
                    <p className="text-primary text-sm font-medium tracking-wide mt-1">Mobile Application</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
                
                {/* Store Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  {selectedApp.config?.google_play_url && (
                    <a
                      href={selectedApp.config.google_play_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-105 inline-block"
                    >
                      <img src={googlePlayIcon} alt="Get it on Google Play" className="h-12 md:h-14 w-auto drop-shadow-lg" />
                    </a>
                  )}
                  {selectedApp.config?.app_store_url && (
                    <a
                      href={selectedApp.config.app_store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-105 inline-block"
                    >
                      <img src={appStoreIcon} alt="Download on the App Store" className="h-12 md:h-14 w-auto drop-shadow-lg" />
                    </a>
                  )}
                  {!selectedApp.config?.google_play_url && !selectedApp.config?.app_store_url && (
                     <p className="text-gray-500 text-sm">Store URLs are not available at the moment.</p>
                  )}
                </div>

                {/* Tech Stack */}
                {selectedApp.config?.tech_stack && selectedApp.config.tech_stack.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-4 bg-primary rounded-full"></span>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.config.tech_stack.map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 hover:border-primary/50 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedApp.config?.description && (
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-4 bg-primary rounded-full"></span>
                      About this App
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {selectedApp.config.description}
                    </p>
                  </div>
                )}

                {/* Key Features */}
                {selectedApp.config?.features && selectedApp.config.features.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-4 bg-primary rounded-full"></span>
                      Key Features
                    </h4>
                    <ul className="list-disc pl-5 text-gray-400 space-y-2 text-sm md:text-base">
                      {selectedApp.config.features.map((feature: string, i: number) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Developer Role / Impact */}
                {selectedApp.config?.my_role && (
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-4 bg-primary rounded-full"></span>
                      My Contribution & Challenges Solved
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base bg-white/5 p-4 rounded-xl border border-white/5">
                      {selectedApp.config.my_role}
                    </p>
                  </div>
                )}

                {/* Screenshots Gallery */}
                <div className="relative">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-5 bg-primary rounded-full"></span>
                    App Screenshots
                  </h4>
                  
                  {selectedApp.screenshots && selectedApp.screenshots.length > 0 ? (
                    <div className="relative group">
                      {/* Left Arrow */}
                      <button 
                        onClick={() => scrollGallery('left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                      >
                        <ChevronLeft size={28} />
                      </button>

                      <div 
                        ref={galleryRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scroll-indicator scroll-smooth"
                      >
                        {selectedApp.screenshots.map((screenshot: string, i: number) => (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={i} 
                            onClick={() => setFullScreenImage(screenshot)}
                            className="h-[450px] md:h-[550px] w-auto flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-[#0a0a0a] cursor-zoom-in hover:border-primary/50 transition-colors"
                          >
                            <img
                              src={screenshot}
                              alt={`${selectedApp.id} screenshot ${i + 1}`}
                              className="h-full w-auto object-contain"
                              loading="lazy"
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Right Arrow */}
                      <button 
                        onClick={() => scrollGallery('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight size={28} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No screenshots available.</p>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setFullScreenImage(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all z-50"
              onClick={() => setFullScreenImage(null)}
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            {selectedApp?.screenshots && selectedApp.screenshots.indexOf(fullScreenImage) > 0 && (
              <button 
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all z-50 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = selectedApp.screenshots.indexOf(fullScreenImage);
                  setFullScreenImage(selectedApp.screenshots[currentIndex - 1]);
                }}
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <motion.img 
              key={fullScreenImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              src={fullScreenImage} 
              alt="Fullscreen screenshot" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg z-40"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Button */}
            {selectedApp?.screenshots && selectedApp.screenshots.indexOf(fullScreenImage) < selectedApp.screenshots.length - 1 && (
              <button 
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all z-50 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = selectedApp.screenshots.indexOf(fullScreenImage);
                  setFullScreenImage(selectedApp.screenshots[currentIndex + 1]);
                }}
              >
                <ChevronRight size={32} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scroll-indicator::-webkit-scrollbar {
          height: 8px;
        }
        .hide-scroll-indicator::-webkit-scrollbar-track {
          background: #111;
          border-radius: 10px;
        }
        .hide-scroll-indicator::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .hide-scroll-indicator::-webkit-scrollbar-thumb:hover {
          background: #FD6F00;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </section>
  );
}
