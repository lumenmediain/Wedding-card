import type { EventKind } from "@/config/types";
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`flourish ${className}`}
      viewBox="0 0 240 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 21h65c20 0 28-13 39-13s15 10 11 13c-4 3-9-1-5-5m120 5h-65c-20 0-28-13-39-13s-15 10-11 13c4 3 9-1 5-5M55 25c26 0 31 13 46 8s8-13 1-9m83 1c-26 0-31 13-46 8s-8-13-1-9"
        stroke="currentColor"
      />
      <path d="m120 26 5 5-5 5-5-5z" fill="currentColor" />
      <circle cx="8" cy="21" r="2" fill="currentColor" />
      <circle cx="232" cy="21" r="2" fill="currentColor" />
    </svg>
  );
}
export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 220 320"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M15 315C108 252 33 141 179 15M39 282C128 264 148 194 206 182M55 234C8 191 23 127 5 101M68 175c53-10 78-39 95-83M104 92C71 62 88 31 83 6" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g
            key={i}
            transform={`translate(${35 + i * 24} ${270 - i * 44}) rotate(${i * 13})`}
          >
            <path
              d="M0 0C-40-8-30-42-30-42S9-28 0 0Z"
              fill="currentColor"
              fillOpacity=".13"
            />
            <path
              d="M2-4C31-43 56-23 56-23S33 6 2-4Z"
              fill="currentColor"
              fillOpacity=".13"
            />
          </g>
        ))}
      </g>
      <g stroke="currentColor">
        {[
          [168, 44],
          [169, 159],
          [45, 151],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <ellipse
                key={a}
                rx="6"
                ry="16"
                cy="-12"
                transform={`rotate(${a})`}
                fill="currentColor"
                fillOpacity=".15"
              />
            ))}
            <circle r="6" fill="currentColor" />
          </g>
        ))}
      </g>
    </svg>
  );
}
export function Crest() {
  return (
    <svg viewBox="0 0 160 170" className="crest" fill="none" aria-hidden="true">
      <path
        d="M23 151V73C23 38 59 39 80 12c21 27 57 26 57 61v78Z"
        stroke="currentColor"
      />
      <path
        d="M31 143V75C31 45 63 46 80 24c17 22 49 21 49 51v68Z"
        stroke="currentColor"
        strokeOpacity=".45"
      />
      <path
        d="M54 136V90c0-18 17-21 26-35 9 14 26 17 26 35v46M46 148h68M80 3v9"
        stroke="currentColor"
      />
      <path d="m74 107 6-7 6 7-6 7z" fill="currentColor" />
    </svg>
  );
}
export function EventIcon({ kind }: { kind: EventKind }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="event-icon"
    >
      {kind === "anand" ? (
        <>
          <path d="M18 81h64M24 77V44h52v33M20 43h60M35 42c0-15 15-17 15-29 0 12 15 14 15 29M50 7v7M37 77V62c0-9 13-11 13-18 0 7 13 9 13 18v15M15 81V53m70 28V53" />
          <circle cx="50" cy="7" r="2" />
        </>
      ) : kind === "lunch" ? (
        <>
          <path d="M15 65h70M22 62a28 28 0 0 1 56 0M43 32a7 7 0 0 1 14 0M17 71h66M31 78h38M50 26v-8M10 45v37m-5-40v13h10V42M90 42v40m-5-40v17h5" />
        </>
      ) : kind === "vidaai" ? (
        <>
          <path d="M19 70h64L70 34H31L19 70ZM27 34h47M23 27h55M50 15v12M12 70h76M24 76h51M31 70V44h38v26M50 44v26" />
          <path d="M35 44c5 10 5 19-2 26m32-26c-5 10-5 19 2 26" />
          <circle cx="50" cy="13" r="2" />
        </>
      ) : (
        <>
          <path d="M18 78h64M23 75V37h54v38M18 37h64M28 37c0-12 22-18 22-25 0 7 22 13 22 25M36 75V55c0-7 14-10 14-15 0 5 14 8 14 15v20M14 50v25m72-25v25" />
          <path d="m20 29 5 4m50 0 5-4M50 8V4" />
          <circle cx="14" cy="47" r="3" />
          <circle cx="86" cy="47" r="3" />
        </>
      )}
    </svg>
  );
}
