/**
 * SLOWRIDE - DRIVEN BY PASSION
 * HONDA M Automotive Editorial Showcase Section
 * Built with React, CSS, and Tailwind CSS
 * Features:
 * - Left column (Red marked area): Heading "SLOWRIDE", subtitle "DRIVEN BY PASSION",
 *   editorial copy, performance metrics, and explore CTA.
 * - Right column (Green marked areas): 3 HONDA M imagery panels dynamically composed
 *   as an asymmetrical editorial collage matching user layout specifications:
 *   1. Upper-Center: Front Laserlight & M Kidney Grille
 *   2. Lower-Left: M Forged Light-Alloy Wheel & M Compound Brakes
 *   3. Right: Sculptural LED Taillight & M Sport Dual Exhaust
 * - 1920-width proportioned, charcoal ambient lighting, responsive.
 */

(function () {
  const e = React.createElement;
  const { useState } = React;

  const HONDA_ASSETS = {
    front: {
      id: 'front',
      label: 'HONDA LASERLIGHT',
      src: 'source/slowride_front_bmw.jpg',
      alt: 'Glossy black HONDA M front Laserlight headlight with illuminated DRL halo and double-slat kidney grille'
    },
    wheel: {
      id: 'wheel',
      label: 'M FORGED ALLOY',
      src: 'source/slowride_wheel_bmw.jpg',
      alt: 'HONDA M bronze-accent forged alloy wheel with HONDA Roundel center cap, ///M badge, and M performance caliper'
    },
    rear: {
      id: 'rear',
      label: 'M SPORT EXHAUST & LED',
      src: 'source/slowride_rear_bmw.jpg',
      alt: 'HONDA M Competition rear 3/4 with sculptural 3D LED taillight bar, ///M emblem, and sport dual exhausts'
    }
  };

  function SlowrideSection() {
    const [loaded, setLoaded] = useState({
      front: false,
      wheel: false,
      rear: false
    });

    const markLoaded = (key) => {
      setLoaded((prev) => Object.assign({}, prev, { [key]: true }));
    };

    return e(
      'div',
      {
        className:
          'slowride-inner relative w-full min-h-screen flex items-center justify-center py-10 lg:py-16 px-6 sm:px-10 lg:px-16 select-none overflow-hidden'
      },
      // Charcoal ambient background spotlight & subtle vignette
      e('div', {
        className:
          'absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_1600px_900px_at_50%_45%,rgba(255,255,255,0.025)_0%,transparent_75%)]'
      }),

      // Main 1920-width Container (Grid Split)
      e(
        'div',
        {
          className:
            'slowride-editorial-grid relative z-10 w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center'
        },

        // LEFT COLUMN: Editorial & Typography (Matches Red Marked Area)
        e(
          'div',
          {
            className:
              'slowride-text-col lg:col-span-5 flex flex-col items-start text-left z-20'
          },
          // Eyebrow with horizontal accent line
          e(
            'div',
            { className: 'flex items-center gap-3.5 mb-5 sm:mb-6' },
            e('span', {
              className:
                'w-8 h-[2px] bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.7)]'
            }),
            e(
              'span',
              {
                className:
                  'font-mono text-[11px] sm:text-xs font-medium tracking-[0.35em] text-white/75 uppercase'
              },
              'THE M POWER COLLECTION // 04'
            )
          ),

          // Main Title: SLOWRIDE
          e(
            'h2',
            {
              className:
                'slowride-heading text-white font-sans text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-semibold tracking-[0.38em] uppercase leading-none mb-3'
            },
            'SLOWRIDE'
          ),

          // Subtitle: DRIVEN BY PASSION
          e(
            'p',
            {
              className:
                'slowride-subtitle text-white/70 font-sans text-xs sm:text-sm lg:text-[15px] font-medium tracking-[0.55em] uppercase leading-tight mb-7 sm:mb-8'
            },
            'DRIVEN BY PASSION'
          ),

          // Editorial Paragraph
          e(
            'p',
            {
              className:
                'slowride-desc font-sans text-sm sm:text-[15px] text-white/75 font-normal leading-[1.85] tracking-[0.05em] max-w-[520px] mb-8 sm:mb-9'
            },
            'Sculpted with uncompromising German engineering, the HONDA M series fuses twin-turbocharged adrenaline with bespoke luxury. Every surface, curve, and aerodynamic element is forged to command the road with absolute authority.'
          ),

          // Specs Highlights Grid (3 Columns)
          e(
            'div',
            {
              className:
                'grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[500px] mb-9 sm:mb-10 pt-4 border-t border-white/10'
            },
            // Spec 1: Power
            e(
              'div',
              { className: 'flex flex-col' },
              e(
                'span',
                {
                  className:
                    'font-mono text-[11px] text-white/50 tracking-[0.2em] uppercase'
                },
                'POWER'
              ),
              e(
                'span',
                {
                  className:
                    'font-sans text-lg sm:text-xl font-bold text-white tracking-wide mt-1'
                },
                '617 HP'
              ),
              e(
                'span',
                {
                  className:
                    'text-[10px] text-white/40 font-mono tracking-wider'
                },
                'M TWIN-TURBO'
              )
            ),
            // Spec 2: Engine
            e(
              'div',
              { className: 'flex flex-col border-l border-white/10 pl-3 sm:pl-4' },
              e(
                'span',
                {
                  className:
                    'font-mono text-[11px] text-white/50 tracking-[0.2em] uppercase'
                },
                'ENGINE'
              ),
              e(
                'span',
                {
                  className:
                    'font-sans text-lg sm:text-xl font-bold text-white tracking-wide mt-1'
                },
                '4.4L V8'
              ),
              e(
                'span',
                {
                  className:
                    'text-[10px] text-white/40 font-mono tracking-wider'
                },
                'BI-TURBO S63'
              )
            ),
            // Spec 3: 0-100 KM/H
            e(
              'div',
              { className: 'flex flex-col border-l border-white/10 pl-3 sm:pl-4' },
              e(
                'span',
                {
                  className:
                    'font-mono text-[11px] text-white/50 tracking-[0.2em] uppercase'
                },
                '0–100 KM/H'
              ),
              e(
                'span',
                {
                  className:
                    'font-sans text-lg sm:text-xl font-bold text-white tracking-wide mt-1'
                },
                '3.7 SEC'
              ),
              e(
                'span',
                {
                  className:
                    'text-[10px] text-white/40 font-mono tracking-wider'
                },
                'xDRIVE AWD'
              )
            )
          ),

          // Action / Explore CTA
          e(
            'div',
            {
              className:
                'group inline-flex items-center gap-4 cursor-pointer pt-2'
            },
            e('div', {
              className:
                'w-9 h-[2.5px] bg-white rounded-sm shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 group-hover:w-12 group-hover:bg-[#4d94ff] group-hover:shadow-[0_0_15px_rgba(77,148,255,0.9)]'
            }),
            e(
              'span',
              {
                className:
                  'font-sans text-xs font-semibold tracking-[0.35em] text-white uppercase transition-colors duration-300 group-hover:text-white'
              },
              'EXPLORE M DYNAMICS'
            ),
            e(
              'span',
              {
                className:
                  'text-white/60 font-mono text-sm transition-transform duration-300 group-hover:translate-x-1.5'
              },
              '→'
            )
          )
        ),

        // RIGHT COLUMN: Asymmetrical 3-Image Collage (Matches Green Marked Boxes)
        e(
          'div',
          {
            className:
              'slowride-collage-wrap lg:col-span-7 relative w-full h-[520px] sm:h-[640px] lg:h-[760px] xl:h-[820px]'
          },

          // Box 1 (Green Box 1, Upper-Center): Front Laserlight
          e(
            'div',
            {
              className:
                'slowride-panel-box slowride-box-front group absolute overflow-hidden rounded-[3px] bg-[#0c0e13] border border-white/[0.08] shadow-2xl transition-all duration-500 ease-out hover:scale-[1.015] hover:border-white/25 hover:z-30',
              'data-box': 'front'
            },
            e('div', {
              className:
                'absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-10'
            }),
            e('img', {
              src: HONDA_ASSETS.front.src,
              alt: HONDA_ASSETS.front.alt,
              className: `w-full h-full object-cover object-center select-none pointer-events-none transition-all duration-700 ${
                loaded.front ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`,
              loading: 'eager',
              onLoad: () => markLoaded('front')
            }),
            e(
              'div',
              {
                className:
                  'absolute bottom-2.5 left-3.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              },
              e(
                'span',
                {
                  className:
                    'font-mono text-[9px] tracking-[0.25em] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase'
                },
                'HONDA LASERLIGHT'
              )
            )
          ),

          // Box 2 (Green Box 2, Lower-Left / Center): M Forged Wheel
          e(
            'div',
            {
              className:
                'slowride-panel-box slowride-box-wheel group absolute overflow-hidden rounded-[3px] bg-[#0c0e13] border border-white/[0.08] shadow-2xl transition-all duration-500 ease-out hover:scale-[1.015] hover:border-white/25 hover:z-30',
              'data-box': 'wheel'
            },
            e('div', {
              className:
                'absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-10'
            }),
            e('img', {
              src: HONDA_ASSETS.wheel.src,
              alt: HONDA_ASSETS.wheel.alt,
              className: `w-full h-full object-cover object-center select-none pointer-events-none transition-all duration-700 ${
                loaded.wheel ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`,
              loading: 'eager',
              onLoad: () => markLoaded('wheel')
            }),
            e(
              'div',
              {
                className:
                  'absolute bottom-2.5 left-3.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              },
              e(
                'span',
                {
                  className:
                    'font-mono text-[9px] tracking-[0.25em] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase'
                },
                'M FORGED ALLOY'
              )
            )
          ),

          // Box 3 (Green Box 3, Right Side): Sculptural Rear Taillight & Exhaust
          e(
            'div',
            {
              className:
                'slowride-panel-box slowride-box-rear group absolute overflow-hidden rounded-[3px] bg-[#0c0e13] border border-white/[0.08] shadow-2xl transition-all duration-500 ease-out hover:scale-[1.015] hover:border-white/25 hover:z-30',
              'data-box': 'rear'
            },
            e('div', {
              className:
                'absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-10'
            }),
            e('img', {
              src: HONDA_ASSETS.rear.src,
              alt: HONDA_ASSETS.rear.alt,
              className: `w-full h-full object-cover object-center select-none pointer-events-none transition-all duration-700 ${
                loaded.rear ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`,
              loading: 'eager',
              onLoad: () => markLoaded('rear')
            }),
            e(
              'div',
              {
                className:
                  'absolute bottom-2.5 left-3.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              },
              e(
                'span',
                {
                  className:
                    'font-mono text-[9px] tracking-[0.25em] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase'
                },
                'M SPORT EXHAUST & LED'
              )
            )
          )
        )
      )
    );
  }

  // Mount React Root
  function mount() {
    const rootEl = document.getElementById('slowride-root');
    if (!rootEl) return;
    if (window.ReactDOM && window.ReactDOM.createRoot) {
      const root = ReactDOM.createRoot(rootEl);
      root.render(e(SlowrideSection));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  // Export to window for global access
  window.SlowrideSection = SlowrideSection;
})();
