import { useEffect, useRef } from 'react';

const PIXELS_PER_SECOND = 28;
const STRIP_GAP = 14;
const GROUP_COUNT = 3;
const colorClasses = [
  'signal-strip__item--pink',
  'signal-strip__item--blue',
  'signal-strip__item--mint',
  'signal-strip__item--gold',
];

function SignalStrip({ items }) {
  const trackRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    if (!items.length || !trackRef.current || !groupRef.current) {
      return undefined;
    }

    const track = trackRef.current;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    let groupWidth = 0;
    let baseOffset = 0;
    let offset = 0;
    let lastTime = 0;

    const applyTransform = () => {
      track.style.transform = `translateX(${-(baseOffset + offset)}px)`;
    };

    const updateMetrics = () => {
      const nextWidth = groupRef.current?.getBoundingClientRect().width ?? 0;

      if (!nextWidth) {
        return;
      }

      groupWidth = nextWidth;
      baseOffset = nextWidth;
      offset %= nextWidth;
      track.style.setProperty('--signal-gap', `${STRIP_GAP}px`);
      applyTransform();
    };

    const step = (time) => {
      if (!groupWidth) {
        frameId = requestAnimationFrame(step);
        return;
      }

      if (mediaQuery.matches) {
        offset = 0;
        lastTime = time;
        applyTransform();
        frameId = requestAnimationFrame(step);
        return;
      }

      if (!lastTime) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;
      offset += (delta / 1000) * PIXELS_PER_SECOND;

      if (offset >= groupWidth) {
        offset %= groupWidth;
      }

      applyTransform();
      frameId = requestAnimationFrame(step);
    };

    const handleMotionChange = () => {
      lastTime = 0;
      offset = 0;
      applyTransform();
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(groupRef.current);

    document.fonts?.ready?.then(updateMetrics).catch(() => {
      //
    });

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <section className="signal-strip" aria-label="Signal strip">
      <div className="signal-strip__viewport">
        <div ref={trackRef} className="signal-strip__track" style={{ '--signal-gap': `${STRIP_GAP}px` }}>
          {Array.from({ length: GROUP_COUNT }, (_, groupIndex) => (
            <div
              key={`signal-group-${groupIndex}`}
              ref={groupIndex === 1 ? groupRef : undefined}
              className="signal-strip__group"
              aria-hidden={groupIndex !== 1}
            >
              {items.map((item, index) => {
                const colorClass = colorClasses[index % colorClasses.length];

                return (
                  <span key={`${item}-${groupIndex}-${index}`} className={`signal-strip__item ${colorClass}`}>
                    {item}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SignalStrip;
