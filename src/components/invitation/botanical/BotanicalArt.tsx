/** @format */

/**
 * Hand-drawn botanical illustration primitives.
 *
 * Every element is built from one almond "blade" outline so blooms, leaves and
 * fronds share a family resemblance. Leaves are placed by sampling the stem
 * curves themselves, which is what keeps the clusters looking drawn rather
 * than scattered.
 *
 * Nothing here is random at render time — positions come from a seeded hash so
 * the server and client produce identical markup.
 */

type Cubic = [number, number, number, number, number, number, number, number];

function hash(seed: number) {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;

  return Number((v - Math.floor(v)).toFixed(4));
}

function round(value: number) {
  return Number(value.toFixed(2));
}

/** Almond outline pointing up from the origin — petal, leaf and pinna alike. */
function blade(length: number, width: number, belly = 0.6) {
  const l = round(length);
  const w = round(width);

  return `M0 0C${round(-w * 0.5)} ${round(-l * 0.18)} ${round(-w)} ${round(
    -l * belly,
  )} 0 ${-l}C${w} ${round(-l * belly)} ${round(w * 0.5)} ${round(
    -l * 0.18,
  )} 0 0Z`;
}

function cubicPath(c: Cubic) {
  return `M${c[0]} ${c[1]}C${c[2]} ${c[3]} ${c[4]} ${c[5]} ${c[6]} ${c[7]}`;
}

function pointAt(c: Cubic, t: number) {
  const u = 1 - t;

  return {
    x:
      u * u * u * c[0] +
      3 * u * u * t * c[2] +
      3 * u * t * t * c[4] +
      t ** 3 * c[6],
    y:
      u * u * u * c[1] +
      3 * u * u * t * c[3] +
      3 * u * t * t * c[5] +
      t ** 3 * c[7],
  };
}

/** Tangent direction in degrees, used to sit each leaf flush on its stem. */
function angleAt(c: Cubic, t: number) {
  const u = 1 - t;

  const dx =
    3 * u * u * (c[2] - c[0]) +
    6 * u * t * (c[4] - c[2]) +
    3 * t * t * (c[6] - c[4]);

  const dy =
    3 * u * u * (c[3] - c[1]) +
    6 * u * t * (c[5] - c[3]) +
    3 * t * t * (c[7] - c[5]);

  return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
}

/* ---------------------------------------------------------------------------
   LEAF
   --------------------------------------------------------------------------- */

function Leaf({
  x,
  y,
  angle,
  length,
  width,
  fill,
  opacity = 0.8,
}: {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  fill: string;
  opacity?: number;
}) {
  return (
    <path
      d={blade(length, width)}
      fill={fill}
      opacity={opacity}
      transform={`translate(${round(x)} ${round(y)}) rotate(${round(angle)})`}
    />
  );
}

/** Leaves sampled along a stem, alternating sides like a real branch. */
function LeafRun({
  stem,
  from,
  to,
  count,
  length,
  width,
  fill,
  seed,
  taper = 0.45,
}: {
  stem: Cubic;
  from: number;
  to: number;
  count: number;
  length: number;
  width: number;
  fill: string;
  seed: number;
  taper?: number;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const t = from + ((to - from) * i) / Math.max(count - 1, 1);

        const p = pointAt(stem, t);

        const base = angleAt(stem, t);

        const side = i % 2 === 0 ? 1 : -1;

        const spread = 52 + hash(seed + i) * 26;

        const scale = 1 - taper * (i / count) + hash(seed + i * 7) * 0.18;

        return (
          <Leaf
            key={i}
            x={p.x}
            y={p.y}
            angle={base + side * spread}
            length={length * scale}
            width={width * scale}
            fill={fill}
            opacity={0.72 + hash(seed + i * 13) * 0.22}
          />
        );
      })}
    </>
  );
}

/* ---------------------------------------------------------------------------
   BLOOM — layered petals spiralling out of a soft centre
   --------------------------------------------------------------------------- */

function Bloom({
  x,
  y,
  radius,
  seed,
  petalFill,
  heartFill,
  tilt = 0,
}: {
  x: number;
  y: number;
  radius: number;
  seed: number;
  petalFill: string;
  heartFill: string;
  tilt?: number;
}) {
  /* Wide, deep-bellied petals in overlapping rings read as a peony. Narrow,
     well-separated petals would read as a daisy. */
  const rings = [
    { count: 10, scale: 1, opacity: 0.5, offset: 0, width: 0.58, belly: 0.8 },
    {
      count: 8,
      scale: 0.74,
      opacity: 0.66,
      offset: 17,
      width: 0.62,
      belly: 0.82,
    },
    {
      count: 6,
      scale: 0.46,
      opacity: 0.82,
      offset: 31,
      width: 0.68,
      belly: 0.84,
    },
  ];

  return (
    <g transform={`translate(${round(x)} ${round(y)}) rotate(${round(tilt)})`}>
      {/* Soft wash in the petal's own colour, not a dark disc. */}
      <ellipse
        rx={round(radius * 1.04)}
        ry={round(radius * 0.94)}
        fill={petalFill}
        opacity="0.16"
      />

      {rings.map((ring, r) =>
        Array.from({ length: ring.count }, (_, i) => {
          const a =
            ring.offset + (360 / ring.count) * i + hash(seed + r * 31 + i) * 11;

          const len =
            radius * ring.scale * (0.9 + hash(seed + i * 17 + r) * 0.2);

          /* Every third petal drops a shade so the bloom gains a core. */
          const shaded = (i + r) % 3 === 0;

          return (
            <path
              key={`${r}-${i}`}
              d={blade(len, len * ring.width, ring.belly)}
              fill={shaded ? heartFill : petalFill}
              opacity={shaded ? ring.opacity * 0.55 : ring.opacity}
              transform={`rotate(${round(a)})`}
            />
          );
        }),
      )}

      <circle r={round(radius * 0.13)} fill={heartFill} opacity="0.55" />

      {Array.from({ length: 5 }, (_, i) => (
        <circle
          key={i}
          cx={round(Math.cos((i / 5) * Math.PI * 2) * radius * 0.1)}
          cy={round(Math.sin((i / 5) * Math.PI * 2) * radius * 0.1)}
          r={round(radius * 0.035)}
          fill="var(--bot-gold)"
          opacity="0.8"
        />
      ))}
    </g>
  );
}

/* ---------------------------------------------------------------------------
   FERN
   --------------------------------------------------------------------------- */

function Fern({
  x,
  y,
  angle,
  length,
  fill,
  seed,
}: {
  x: number;
  y: number;
  angle: number;
  length: number;
  fill: string;
  seed: number;
}) {
  const spine: Cubic = [
    0,
    0,
    -length * 0.16,
    -length * 0.4,
    length * 0.1,
    -length * 0.7,
    0,
    -length,
  ];

  return (
    <g transform={`translate(${round(x)} ${round(y)}) rotate(${round(angle)})`}>
      <path
        d={cubicPath(spine)}
        stroke="var(--bot-stem)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />

      <LeafRun
        stem={spine}
        from={0.1}
        to={0.95}
        count={9}
        length={length * 0.24}
        width={length * 0.06}
        fill={fill}
        seed={seed}
        taper={0.66}
      />
    </g>
  );
}

/* ---------------------------------------------------------------------------
   GARDEN CLUSTER — the workhorse used for the opening panels and page frame
   --------------------------------------------------------------------------- */

const CLUSTERS: {
  stems: Cubic[];
  blooms: { t: number; stem: number; radius: number; tilt: number }[];
  ferns: { t: number; stem: number; length: number; angle: number }[];
}[] = [
  {
    stems: [
      [24, 1000, 92, 812, 58, 606, 168, 452],
      [10, 884, 128, 762, 214, 690, 322, 628],
      [42, 690, 108, 548, 96, 402, 62, 262],
      [150, 470, 214, 366, 252, 258, 244, 122],
    ],
    blooms: [
      { t: 1, stem: 0, radius: 84, tilt: -12 },
      { t: 1, stem: 3, radius: 58, tilt: 18 },
      { t: 1, stem: 1, radius: 66, tilt: 6 },
      { t: 1, stem: 2, radius: 42, tilt: -22 },
    ],
    ferns: [
      { t: 0.2, stem: 0, length: 240, angle: -24 },
      { t: 0.5, stem: 1, length: 190, angle: 34 },
    ],
  },
  {
    stems: [
      [40, 1000, 10, 800, 120, 640, 96, 470],
      [26, 902, 150, 820, 236, 726, 268, 596],
      [58, 660, 148, 540, 210, 430, 180, 296],
      [96, 470, 40, 372, 62, 236, 138, 130],
    ],
    blooms: [
      { t: 1, stem: 3, radius: 72, tilt: 14 },
      { t: 1, stem: 1, radius: 88, tilt: -8 },
      { t: 1, stem: 2, radius: 50, tilt: 26 },
      { t: 0.55, stem: 0, radius: 38, tilt: -16 },
    ],
    ferns: [
      { t: 0.28, stem: 1, length: 214, angle: 28 },
      { t: 0.62, stem: 0, length: 176, angle: -32 },
    ],
  },
  {
    stems: [
      [20, 1000, 106, 846, 46, 662, 152, 512],
      [34, 860, 168, 786, 228, 660, 210, 528],
      [64, 712, 130, 590, 176, 468, 128, 340],
      [152, 512, 246, 424, 268, 292, 196, 168],
    ],
    blooms: [
      { t: 1, stem: 0, radius: 68, tilt: 8 },
      { t: 1, stem: 3, radius: 80, tilt: -18 },
      { t: 1, stem: 1, radius: 46, tilt: 22 },
      { t: 0.6, stem: 2, radius: 36, tilt: -6 },
    ],
    ferns: [
      { t: 0.18, stem: 0, length: 226, angle: -18 },
      { t: 0.44, stem: 2, length: 168, angle: 40 },
    ],
  },
];

/**
 * A corner planting: stems, ferns, leaves and blooms.
 * Drawn against a 320×1000 box anchored at its bottom-left.
 */
export function GardenCluster({
  variant = 0,
  className,
}: {
  variant?: 0 | 1 | 2;
  className?: string;
}) {
  const cfg = CLUSTERS[variant % CLUSTERS.length];

  const seed = variant * 97 + 11;

  return (
    <svg
      className={className}
      viewBox="0 0 320 1000"
      preserveAspectRatio="xMinYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <g data-bot-layer="back">
        {cfg.ferns.map((f, i) => {
          const p = pointAt(cfg.stems[f.stem], f.t);

          return (
            <Fern
              key={i}
              x={p.x}
              y={p.y}
              angle={f.angle}
              length={f.length}
              fill="var(--bot-sage)"
              seed={seed + i * 41}
            />
          );
        })}

        {/* Understorey. Deliberately dark and low-contrast — it exists to
            close the gaps between the drawn stems, not to be looked at. */}
        {cfg.stems.map((stem, i) =>
          Array.from({ length: 8 }, (_, j) => {
            const t = 0.06 + 0.9 * ((j + hash(seed + i * 5 + j)) / 8);

            const p = pointAt(stem, t);

            const spin = hash(seed + i * 13 + j * 3) * 360;

            const size = 46 + hash(seed + i * 7 + j) * 44;

            return (
              <Leaf
                key={`${i}-${j}`}
                x={p.x + (hash(seed + j * 11 + i) - 0.5) * 150}
                y={p.y + (hash(seed + j * 19 + i) - 0.5) * 130}
                angle={spin}
                length={size}
                width={size * 0.42}
                fill={j % 2 === 0 ? "var(--bot-stem)" : "var(--bot-olive)"}
                opacity={0.34 + hash(seed + j * 23) * 0.2}
              />
            );
          }),
        )}
      </g>

      <g data-bot-layer="mid">
        {cfg.stems.map((stem, i) => (
          <path
            key={i}
            d={cubicPath(stem)}
            stroke="var(--bot-stem)"
            strokeWidth={i === 0 ? 2.4 : 1.7}
            fill="none"
            strokeLinecap="round"
            opacity="0.62"
          />
        ))}

        {cfg.stems.map((stem, i) => (
          <LeafRun
            key={i}
            stem={stem}
            from={0.12}
            to={0.94}
            count={i === 0 ? 7 : 5}
            length={i === 0 ? 66 : 52}
            width={i === 0 ? 28 : 22}
            fill={i % 2 === 0 ? "var(--bot-olive)" : "var(--bot-sage)"}
            seed={seed + i * 23}
          />
        ))}
      </g>

      <g data-bot-layer="front">
        {cfg.blooms.slice(0, 3).map((b, i) => {
          const p = pointAt(cfg.stems[b.stem], b.t);

          return (
            <Bloom
              key={i}
              x={p.x}
              y={p.y}
              radius={b.radius}
              tilt={b.tilt}
              seed={seed + i * 59}
              petalFill={i % 2 === 0 ? "var(--bot-cream)" : "var(--bot-blush)"}
              heartFill="var(--bot-gold)"
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   ARCHING BRANCH — spans the top or bottom edge
   --------------------------------------------------------------------------- */

export function ArchingBranch({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const stems: Cubic[] = [
    [0, 40, 220, 150, 560, 8, 900, 118],
    [60, 8, 300, 104, 620, 58, 900, 30],
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 900 190"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      {stems.map((stem, i) => (
        <g key={i}>
          <path
            d={cubicPath(stem)}
            stroke="var(--bot-stem)"
            strokeWidth={i === 0 ? 2.2 : 1.5}
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />

          <LeafRun
            stem={stem}
            from={0.04}
            to={0.97}
            count={i === 0 ? 13 : 10}
            length={i === 0 ? 50 : 38}
            width={i === 0 ? 21 : 16}
            fill={i === 0 ? "var(--bot-sage)" : "var(--bot-olive)"}
            seed={i * 37 + 5}
            taper={0.2}
          />
        </g>
      ))}

      <Bloom
        x={196}
        y={86}
        radius={38}
        seed={71}
        tilt={-14}
        petalFill="var(--bot-cream)"
        heartFill="var(--bot-gold)"
      />

      <Bloom
        x={688}
        y={64}
        radius={30}
        seed={113}
        tilt={20}
        petalFill="var(--bot-blush)"
        heartFill="var(--bot-gold)"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   SPRIG — small accent for section corners
   --------------------------------------------------------------------------- */

export function Sprig({
  className,
  bloom = true,
  seed = 3,
}: {
  className?: string;
  bloom?: boolean;
  seed?: number;
}) {
  const stem: Cubic = [12, 188, 44, 140, 30, 82, 78, 22];

  return (
    <svg
      className={className}
      viewBox="0 0 140 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={cubicPath(stem)}
        stroke="var(--bot-stem)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.65"
      />

      <LeafRun
        stem={stem}
        from={0.1}
        to={0.92}
        count={8}
        length={34}
        width={13}
        fill="var(--bot-sage)"
        seed={seed}
        taper={0.42}
      />

      {bloom ? (
        <Bloom
          x={78}
          y={22}
          radius={24}
          seed={seed + 17}
          petalFill="var(--bot-cream)"
          heartFill="var(--bot-gold)"
        />
      ) : null}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   PETAL — single mark used by the falling particles
   --------------------------------------------------------------------------- */
export function PetalMark({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="-14 -30 28 32"
      aria-hidden="true"
      focusable="false"
    >
      <path d={blade(28, 13, 0.66)} fill="var(--bot-blush)" opacity="0.85" />

      <path
        d={`M0 -2L0 -24`}
        stroke="var(--bot-gold)"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
