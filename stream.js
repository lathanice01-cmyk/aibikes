/**
 * HONDA DIAGONAL MOTION GALLERY (16 IMAGES STREAM - CONTINUOUS CONVOY / FOLLOW ONE BY ONE)
 * Section below HONDA i7 Hero section.
 *
 * Features:
 * - 16 curated high-resolution HONDA automotive images.
 * - CONTINUOUS FOLLOW CONVOY: Cards are attached in lockstep along the 315° diagonal track.
 *   As you scroll, each card closely follows the one in front of it from the bottom-right corner
 *   to the top-left corner and goes completely out of range.
 * - Slowed-down, cinematic, ultra-smooth scroll progression.
 * - Glowing diagonal guide beam visually linking the following sequence.
 * - Real-time HUD displaying convoy telemetry, lead vehicle, and exit count (0/16 -> 16/16).
 */

(function () {
  const e = React.createElement;
  const { useState, useEffect, useRef } = React;

  // 16 Curated Authentic HONDA Images
  const STREAM_IMAGES = [
    {
      id: 1,
      num: '01',
      title: 'HONDA i7 xDRIVE60',
      subtitle: 'FLAGSHIP ELECTRIC LUXURY • 544 HP',
      src: 'source/bmw_i7_hero_bg.jpg',
      alt: 'Black HONDA i7 electric luxury flagship sedan on wet reflective asphalt'
    },
    {
      id: 2,
      num: '02',
      title: 'ALPINE DYNAMICS',
      subtitle: 'HIGH-ALTITUDE CARVE • DUAL-MOTOR AWD',
      src: 'source/bmw_trail_mountain.jpg',
      alt: 'HONDA electric sedan carving alpine mountain road'
    },
    {
      id: 3,
      num: '03',
      title: 'AERODYNAMIC SILHOUETTE',
      subtitle: 'HIGHWAY CRUISE • LOW DRAG PROFILE',
      src: 'source/bmw_trail_side.jpg',
      alt: 'HONDA aerodynamic side profile on coastal highway'
    },
    {
      id: 4,
      num: '04',
      title: 'INTERACTION BAR COCKPIT',
      subtitle: 'CURVED DISPLAY & CRYSTAL TRIM',
      src: 'source/bmw_trail_interior.jpg',
      alt: 'HONDA Curved Display and illuminated Interaction Bar cockpit'
    },
    {
      id: 5,
      num: '05',
      title: 'HONDA LASERLIGHT SYSTEM',
      subtitle: 'GLOWING DRL HALOS & M DOUBLE SLATS',
      src: 'source/slowride_front_bmw.jpg',
      alt: 'HONDA Laserlight front headlight and M kidney grille'
    },
    {
      id: 6,
      num: '06',
      title: 'M FORGED ALLOY RIM',
      subtitle: 'M COMPOUND VENTILATED BRAKES',
      src: 'source/slowride_wheel_bmw.jpg',
      alt: 'HONDA M forged multi-spoke alloy rim with Roundel emblem and blue caliper'
    },
    {
      id: 7,
      num: '07',
      title: 'SCULPTURAL 3D LED REAR',
      subtitle: 'SPORT QUAD DIFFUSER & L-SHAPED BAR',
      src: 'source/slowride_rear_bmw.jpg',
      alt: 'HONDA sculptural 3D LED taillight bar and quad sport exhaust'
    },
    {
      id: 8,
      num: '08',
      title: 'HONDA M4 COMPETITION',
      subtitle: 'TWIN-TURBO 503 HP TRACK EDITION',
      src: 'source/bmw_m4_performance.jpg',
      alt: 'HONDA M4 Competition performance coupe in dark studio'
    },
    {
      id: 9,
      num: '09',
      title: 'THE M POWER COLLECTION',
      subtitle: 'X5 M, M4, X7 M60i MOTORSPORT LINEUP',
      src: 'source/cars.jpeg',
      alt: 'HONDA M Power lineup showcase on dark studio floor'
    },
    {
      id: 10,
      num: '10',
      title: 'TRIPLE DOMINANCE',
      subtitle: 'M POWER MASTERPIECES • COMPETITION',
      src: 'bmw_lineup.jpg',
      alt: 'HONDA triple performance vehicle studio front view'
    },
    {
      id: 11,
      num: '11',
      title: 'LASERLIGHT OPTICS MACRO',
      subtitle: 'PRECISION PROJECTOR CASING & BLUE ACCENTS',
      src: 'source/slowride_front_hd.jpg',
      alt: 'HONDA high-definition Laserlight headlight macro lens close-up'
    },
    {
      id: 12,
      num: '12',
      title: 'DARK GUNMETAL FORGED RIM',
      subtitle: 'CROSS-DRILLED ROTOR & LOW PROFILE MICHELIN',
      src: 'source/slowride_wheel_hd.jpg',
      alt: 'Gunmetal forged performance alloy rim with drilled steel brake rotor'
    },
    {
      id: 13,
      num: '13',
      title: 'AERODYNAMIC REAR DIFFUSER',
      subtitle: 'CARBON FIBER EXHAUST APRON',
      src: 'source/slowride_rear_hd.jpg',
      alt: 'Rear 3/4 detail showing red LED bar and polished chrome exhaust tip'
    },
    {
      id: 14,
      num: '14',
      title: 'APEX 3D ARCHITECTURE',
      subtitle: 'LOW FRONT GROUND EFFECT STANCE',
      src: 'car_hero_fallback.png',
      alt: '3D engineered automotive apex presentation in studio lighting'
    },
    {
      id: 15,
      num: '15',
      title: 'KINETIC TRACK PROFILE',
      subtitle: 'WIND TUNNEL OPTIMIZED FORM',
      src: 'car_side_fallback.png',
      alt: 'Sleek aerodynamic side profile silhouette on dark track'
    },
    {
      id: 16,
      num: '16',
      title: 'M PERFORMANCE STANCE',
      subtitle: 'AGGRESSIVE LOWER AIR INTAKES & CARBON SPOILER',
      src: 'source/slowride_front.png',
      alt: 'Aggressive low front angle automotive presentation'
    }
  ];

  // Parameters for continuous "follow one attached one image" chain:
  // Spacing between consecutive attached images along diagonal track: 0.22
  // Total track units needed for all 16 cards to complete their journey:
  const CARD_SPACING = 0.22;
  const TOTAL_TRACK_UNITS = 1.0 + (STREAM_IMAGES.length - 1) * CARD_SPACING; // 1.0 + 15 * 0.22 = 4.30

  function StreamSection() {
    const [streamProgress, setStreamProgress] = useState(0);
    const cardRefs = useRef([]);

    useEffect(() => {
      let animId;
      let currentP = 0;
      let lastReportedP = -1;

      const updateMotion = () => {
        // Read progress computed in main.js
        const raw = getComputedStyle(document.documentElement).getPropertyValue('--stream-progress');
        const targetP = parseFloat(raw) || 0;

        // Smooth cinematic interpolation (exponential damping) to slow down and glide gracefully
        currentP += (targetP - currentP) * 0.048;
        if (Math.abs(targetP - currentP) < 0.0003) {
          currentP = targetP;
        }

        // Throttle React state updates to avoid unnecessary 60fps re-renders of the full component
        if (Math.abs(currentP - lastReportedP) > 0.003 || currentP === 0 || currentP === 1) {
          setStreamProgress(currentP);
          lastReportedP = currentP;
        }

        // Compute overall convoy position along the diagonal track
        const trackPos = currentP * TOTAL_TRACK_UNITS;

        // Vector from bottom-right (112vw, 112vh) to top-left (-42vw, -42vh):
        const startX = 112;
        const startY = 112;
        const dx = -154; // 112 - 154 = -42vw
        const dy = -154; // 112 - 154 = -42vh

        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          // Position of this card along the diagonal line (Card i follows Card i-1)
          const pos = trackPos - idx * CARD_SPACING;

          // When card hasn't reached entry or has completely exited:
          if (pos < -0.06) {
            el.style.transform = 'translate3d(115vw, 115vh, 0) rotate(-11deg) scale(0.85)';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            return;
          }
          if (pos > 1.06) {
            el.style.transform = 'translate3d(-45vw, -45vh, 0) rotate(-11deg) scale(0.85)';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            return;
          }

          // Current coordinates on diagonal axis
          const currentX = startX + dx * pos;
          const currentY = startY + dy * pos;

          // Scale: gentle center magnification when passing middle of viewport
          const centerDist = Math.min(1.0, Math.abs(pos - 0.5) * 2);
          const dynScale = (1.06 - centerDist * 0.12).toFixed(3);

          // Opacity: fade in upon entering bottom-right, stay solid across screen, fade as it leaves top-left
          let opacity = 1.0;
          if (pos < 0.05) {
            opacity = Math.max(0, (pos + 0.05) / 0.10);
          } else if (pos > 0.95) {
            opacity = Math.max(0, (1.05 - pos) / 0.10);
          }

          el.style.transform = `translate3d(${currentX.toFixed(2)}vw, ${currentY.toFixed(2)}vh, 0) rotate(-11deg) scale(${dynScale})`;
          el.style.opacity = opacity.toFixed(3);
          el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        });

        animId = requestAnimationFrame(updateMotion);
      };

      animId = requestAnimationFrame(updateMotion);
      return () => cancelAnimationFrame(animId);
    }, []);

    // Current lead vehicle crossing center of screen
    const trackPos = streamProgress * TOTAL_TRACK_UNITS;
    let closestIndex = 0;
    let minCenterDiff = 999;
    STREAM_IMAGES.forEach((_, idx) => {
      const pos = trackPos - idx * CARD_SPACING;
      const diff = Math.abs(pos - 0.5);
      if (diff < minCenterDiff) {
        minCenterDiff = diff;
        closestIndex = idx;
      }
    });

    const activeVehicle = STREAM_IMAGES[closestIndex];

    const outOfRangeCount = STREAM_IMAGES.filter((_, idx) => {
      const pos = trackPos - idx * CARD_SPACING;
      return pos >= 1.0;
    }).length;

    const onScreenCount = STREAM_IMAGES.filter((_, idx) => {
      const pos = trackPos - idx * CARD_SPACING;
      return pos >= 0.0 && pos < 1.0;
    }).length;

    return e(
      'div',
      {
        className:
          'stream-inner relative w-full h-full min-h-screen bg-[#040608] text-white overflow-hidden select-none flex flex-col justify-between'
      },
      // Subtle background grid & radial atmospheric lighting
      e('div', {
        className: 'absolute inset-0 pointer-events-none z-0',
        style: {
          backgroundImage:
            'radial-gradient(circle at 80% 80%, rgba(28, 105, 210, 0.18) 0%, transparent 60%), radial-gradient(circle at 20% 20%, rgba(28, 105, 210, 0.12) 0%, transparent 55%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px'
        }
      }),

      // Diagonal Guide Beam Track
      e('div', { className: 'stream-diagonal-track' }),

      // Editorial Watermark Typography in Background
      e(
        'div',
        {
          className:
            'absolute inset-0 z-0 flex flex-col items-center justify-center text-center pointer-events-none px-6'
        },
        e(
          'span',
          {
            className:
              'text-[11px] font-["Orbitron"] font-bold tracking-[0.45em] text-[#1c69d2] uppercase mb-3 drop-shadow-[0_0_12px_rgba(28,105,210,0.6)]'
          },
          'HONDA CINEMATIC STREAM // 16 VEHICLES ATTACHED'
        ),
        e(
          'h2',
          {
            className:
              'text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-["Space_Grotesk"] tracking-tight uppercase text-white/[0.045] leading-none select-none'
          },
          'ART OF',
          e('br'),
          'VELOCITY'
        ),
        e(
          'p',
          {
            className:
              'text-xs sm:text-sm text-neutral-400 font-["Inter"] tracking-[0.25em] uppercase mt-4 max-w-md'
          },
          'DIAGONAL CORRIDOR 315° • CONTINUOUS CONVOY SE → NW'
        )
      ),

      // Top HUD Bar: Trajectory and Status Telemetry
      e(
        'header',
        {
          className:
            'relative z-20 w-full max-w-[1840px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4 flex items-center justify-between pointer-events-none'
        },
        // Left: Section indicator
        e(
          'div',
          { className: 'flex items-center gap-3.5' },
          e('span', { className: 'w-2.5 h-2.5 rounded-full bg-[#1c69d2] animate-pulse drop-shadow-[0_0_8px_#1c69d2]' }),
          e(
            'span',
            { className: 'text-[11px] font-["Orbitron"] tracking-[0.25em] uppercase text-white font-semibold' },
            'SEQUENCE 08 // CONVOY IN LOCKSTEP'
          )
        ),

        // Center: Active vehicle callout & progress bar
        e(
          'div',
          { className: 'hidden md:flex items-center gap-4' },
          e(
            'div',
            {
              className:
                'px-4 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md flex items-center gap-2.5 shadow-lg'
            },
            e('span', { className: 'w-2 h-2 rounded-full bg-[#26a0fc]' }),
            e(
              'span',
              { className: 'text-[10px] font-["Orbitron"] tracking-[0.2em] uppercase text-white' },
              outOfRangeCount === 16
                ? 'ALL 16 OUT OF RANGE'
                : `[ ${activeVehicle.num} / 16 ] ${activeVehicle.title}`
            )
          ),
          e(
            'div',
            { className: 'w-40 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800' },
            e('div', {
              className: 'h-full bg-gradient-to-r from-[#1c69d2] via-[#26a0fc] to-[#4facfe] transition-all duration-75',
              style: { width: `${(streamProgress * 100).toFixed(1)}%` }
            })
          ),
          e(
            'span',
            { className: 'text-[10px] font-mono text-[#26a0fc] font-bold' },
            `${Math.round(streamProgress * 100)}%`
          )
        ),

        // Right: Out of Range HUD counter
        e(
          'div',
          { className: 'flex items-center gap-4 text-right' },
          e(
            'div',
            { className: 'flex flex-col' },
            e(
              'span',
              { className: 'text-sm font-["Orbitron"] font-bold text-white tracking-wider' },
              `${outOfRangeCount} / 16 EXITED`
            ),
            e(
              'span',
              { className: 'text-[9px] font-["Inter"] tracking-[0.2em] uppercase text-[#1c69d2] font-semibold' },
              onScreenCount > 0 ? `${onScreenCount} IN AIR CORRIDOR` : (outOfRangeCount === 16 ? 'TOP-LEFT OUT OF RANGE' : 'INCOMING FROM SE')
            )
          )
        )
      ),

      // 16 Moving Images Diagonal Stream Layer (Attached Convoy)
      e(
        'div',
        {
          className:
            'absolute inset-0 z-10 pointer-events-none overflow-hidden',
          'aria-hidden': 'true'
        },
        STREAM_IMAGES.map((img, idx) =>
          e(
            'div',
            {
              key: img.id,
              ref: (el) => (cardRefs.current[idx] = el),
              className:
                'stream-card absolute top-0 left-0 w-[420px] sm:w-[520px] md:w-[600px] rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(28,105,210,0.95)] cursor-pointer group',
              style: {
                willChange: 'transform, opacity',
                transform: 'translate3d(115vw, 115vh, 0) rotate(-11deg)',
                opacity: 0
              }
            },
            e(
              'div',
              {
                className:
                  'relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-blue-400/40 bg-black/90 backdrop-blur-xl shadow-[0_25px_65px_rgba(0,0,0,0.92),0_0_30px_rgba(28,105,210,0.4)]'
              },
              // Image
              e('img', {
                src: img.src,
                alt: img.alt,
                loading: 'eager',
                className:
                  'w-full h-full object-cover filter brightness-[1.02] contrast-[1.08] transition-transform duration-700 group-hover:scale-105'
              }),

              // Dark ambient gradient overlays
              e('div', {
                className:
                  'absolute inset-0 bg-gradient-to-t from-[#040608]/95 via-[#040608]/25 to-black/20 pointer-events-none'
              }),

              // Blue neon edge highlight on hover
              e('div', {
                className:
                  'absolute inset-0 border border-transparent group-hover:border-[#1c69d2] rounded-2xl transition-colors duration-300 pointer-events-none'
              }),

              // Number Badge (Top-Right)
              e(
                'div',
                {
                  className:
                    'absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#26a0fc] font-bold tracking-widest shadow-md'
                },
                `${img.num} / 16`
              ),

              // Title & Subtitle (Bottom)
              e(
                'div',
                {
                  className:
                    'absolute bottom-3.5 left-4 right-4 flex flex-col pointer-events-none'
                },
                e(
                  'span',
                  {
                    className:
                      'text-xs sm:text-sm md:text-base font-["Space_Grotesk"] font-bold text-white tracking-wide uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]'
                  },
                  img.title
                ),
                e(
                  'span',
                  {
                    className:
                      'text-[9px] sm:text-[10px] font-["Inter"] text-neutral-300 tracking-[0.16em] uppercase mt-0.5 font-medium'
                  },
                  img.subtitle
                )
              )
            )
          )
        )
      ),

      // Bottom Footer Telemetry
      e(
        'footer',
        {
          className:
            'relative z-20 w-full max-w-[1840px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 pt-4 flex items-end justify-between pointer-events-none'
        },
        // Bottom left coordinates
        e(
          'div',
          { className: 'flex items-center gap-6 text-[10px] font-mono text-neutral-400' },
          e('span', null, 'VECTOR: [X: +1.00, Y: -1.00]'),
          e('span', { className: 'hidden sm:inline text-neutral-600' }, '•'),
          e('span', { className: 'hidden sm:inline' }, 'AXIS: 315° CONTINUOUS CONVOY'),
          e('span', { className: 'hidden sm:inline text-neutral-600' }, '•'),
          e('span', { className: 'text-[#1c69d2] font-semibold' }, 'STATUS: 16 ATTACHED IN LOCKSTEP')
        ),

        // Bottom right scroll prompt
        e(
          'div',
          {
            className:
              'flex items-center gap-3 text-[10px] font-["Orbitron"] tracking-[0.25em] text-neutral-400 uppercase pointer-events-auto'
          },
          e('span', null, 'HONDA M POWER SHOWCASE'),
          e('div', { className: 'w-8 h-[1px] bg-neutral-700' })
        )
      )
    );
  }

  // Mount to DOM
  window.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('stream-root');
    if (rootEl && window.ReactDOM) {
      const root = ReactDOM.createRoot(rootEl);
      root.render(e(StreamSection));
    }
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    const rootEl = document.getElementById('stream-root');
    if (rootEl && window.ReactDOM && !rootEl.hasChildNodes()) {
      const root = ReactDOM.createRoot(rootEl);
      root.render(e(StreamSection));
    }
  }
})();
