import { useEffect, useState } from 'react';

export function FloatingLogo() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Draait het logo op basis van de scrollpositie (0.5 graden per pixel)
      const scrollPosition = window.scrollY;
      setRotation(scrollPosition * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set correct position if page is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
      <div 
        className="w-20 h-20 bg-white rounded-2xl shadow-xl border border-slate-200 flex items-center justify-center overflow-hidden transition-transform duration-75 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <img 
          src="/viesa-logo.png" 
          alt="Equivest Logo" 
          className="w-full h-full object-contain p-2 drop-shadow-md"
        />
      </div>
    </div>
  );
}
