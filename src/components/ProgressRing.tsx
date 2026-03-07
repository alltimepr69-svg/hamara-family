import { useEffect, useId } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface ProgressRingProps {
  radius:     number;
  stroke:     number;
  progress:   number;
  /** Tailwind stroke class e.g. "stroke-amber-500" */
  color?:     string;
  /** Hex color for the SVG glow filter and tip dot e.g. "#f59e0b" */
  hexColor?:  string;
  className?: string;
  /** Seconds before the spring starts animating (for stagger) */
  delay?:     number;
}

export const ProgressRing = ({
  radius,
  stroke,
  progress,
  color    = 'stroke-amber-500',
  hexColor,
  className,
  delay    = 0,
}: ProgressRingProps) => {
  // useId gives a stable unique string per instance — safe for SVG filter IDs
  const uid              = useId().replace(/:/g, '');
  const normalizedRadius = radius - stroke * 2;
  const circumference    = normalizedRadius * 2 * Math.PI;
  const clamped          = Math.min(Math.max(progress, 0), 100);

  // ─── Spring physics ─────────────────────────────────────────────────────────
  // stiffness 52 + damping 13 = slight satisfying overshoot then settle
  const spring = useSpring(0, { stiffness: 52, damping: 13, mass: 0.9 });

  useEffect(() => {
    const t = setTimeout(() => spring.set(clamped), delay * 1000);
    return () => clearTimeout(t);
  }, [clamped, delay, spring]);

  // Stroke dashoffset derived from the spring value
  const dashOffset = useTransform(spring, p =>
    circumference - (p / 100) * circumference
  );

  // ─── Tip-dot coordinates ─────────────────────────────────────────────────────
  // SVG circle starts at 3 o'clock; the SVG is CSS-rotated -90deg so it appears
  // at 12 o'clock. Formula in un-rotated SVG space:
  //   angle = (p/100) * 2π
  // After the CSS rotation the tip sits at the correct visual position.
  const tipX = useTransform(spring, p =>
    radius + normalizedRadius * Math.cos((Math.min(p, 100) / 100) * 2 * Math.PI)
  );
  const tipY = useTransform(spring, p =>
    radius + normalizedRadius * Math.sin((Math.min(p, 100) / 100) * 2 * Math.PI)
  );

  const showTip  = clamped > 3;
  const filterId = `ring-glow-${uid}`;

  return (
    <div className={className}>
      <svg
        height={radius * 2}
        width={radius * 2}
        // overflow visible so the SVG glow filter doesn't clip
        style={{ overflow: 'visible' }}
        className="rotate-[-90deg]"
      >
        {hexColor && (
          <defs>
            {/* Soft outer glow: blur + merge with source so arc stays sharp */}
            <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        {/* ── Track ring — barely-there halo ── */}
        <circle
          stroke="white"
          strokeOpacity="0.06"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* ── Progress arc ── */}
        <motion.circle
          className={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: dashOffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          filter={hexColor ? `url(#${filterId})` : undefined}
        />

        {/* ── Tip dot — bright cap that tracks the arc endpoint in real-time ── */}
        {showTip && hexColor && (
          <motion.circle
            r={stroke * 0.58}
            fill={hexColor}
            style={{ cx: tipX, cy: tipY }}
          />
        )}
      </svg>
    </div>
  );
};
