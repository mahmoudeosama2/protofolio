import { useState, useEffect } from 'react';
import { X, Play, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const configModules = import.meta.glob('../assets/apps/*/production_url/*.json', { eager: true });
const logoModules = import.meta.glob('../assets/apps/*/logo/*.{png,jpg,jpeg,svg}', { eager: true });
const screenshotModules = import.meta.glob('../assets/apps/*/screenshots/*.{png,jpg,jpeg}', { eager: true });

const appsData: Record<string, any> = {};

// Parse Configs
for (const path in configModules) {
  const appName = path.split('/')[3];
  appsData[appName] = { ...appsData[appName], config: (configModules[path] as any).default || configModules[path] };
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4 }}
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="relative rounded-[2rem] overflow-hidden cursor-pointer group bg-dark-100 border border-white/5 shadow-lg hover:border-primary/30 hover:shadow-[0_0_30px_rgba(253,111,0,0.15)] transition-all duration-300 flex flex-col items-center justify-center p-8 aspect-square"
                >
                  <div className="w-32 h-32 rounded-3xl overflow-hidden mb-6 shadow-2xl relative bg-[#111]">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
                    <img
                      src={app.logo}
                      alt={app.id}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-white font-bold text-2xl tracking-wide group-hover:text-primary transition-colors">{app.id}</h3>
                  <p className="text-gray-500 text-sm mt-3 font-medium uppercase tracking-widest text-[#111111] bg-primary/10 group-hover:bg-primary group-hover:text-[#111] px-4 py-1.5 rounded-full transition-colors">
                    View Details
                  </p>
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
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-[#161616]">
                    <img src={selectedApp.logo} alt={selectedApp.id} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">{selectedApp.id}</h3>
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
                      className="flex items-center gap-3 bg-gradient-to-r from-[#1a1a1a] to-[#252525] hover:to-[#333] text-white px-6 py-3.5 rounded-2xl transition-all duration-300 border border-white/5 hover:border-primary/50 group shadow-lg"
                    >
                      <Play className="text-primary group-hover:scale-110 transition-transform fill-current" size={24} />
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-gray-400 leading-none uppercase font-semibold">GET IT ON</span>
                        <span className="text-sm font-bold leading-tight">Google Play</span>
                      </div>
                    </a>
                  )}
                  {selectedApp.config?.app_store_url && (
                    <a
                      href={selectedApp.config.app_store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gradient-to-r from-[#1a1a1a] to-[#252525] hover:to-[#333] text-white px-6 py-3.5 rounded-2xl transition-all duration-300 border border-white/5 hover:border-white/30 group shadow-lg"
                    >
                      <Apple className="text-white group-hover:scale-110 transition-transform fill-current" size={24} />
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-gray-400 leading-none uppercase font-semibold">Download on the</span>
                        <span className="text-sm font-bold leading-tight">App Store</span>
                      </div>
                    </a>
                  )}
                  {!selectedApp.config?.google_play_url && !selectedApp.config?.app_store_url && (
                     <p className="text-gray-500 text-sm">Store URLs are not available at the moment.</p>
                  )}
                </div>

                {/* Screenshots Gallery */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-5 bg-primary rounded-full"></span>
                    App Screenshots
                  </h4>
                  <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory custom-scrollbar-horizontal hide-scroll-indicator">
                    {selectedApp.screenshots && selectedApp.screenshots.length > 0 ? (
                      selectedApp.screenshots.map((screenshot: string, i: number) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={i} 
                          className="h-[450px] md:h-[550px] w-auto flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black"
                        >
                          <img
                            src={screenshot}
                            alt={`${selectedApp.id} screenshot ${i + 1}`}
                            className="h-full w-auto object-contain"
                            loading="lazy"
                          />
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No screenshots available.</p>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
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
