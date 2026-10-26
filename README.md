# The Royal Punjabi Wedding

A cinematic, accessible Next.js invitation for **Amritpal Singh & Akamdeep Kaur**, transcribed from the family's supplied wedding card. Wedding: **Wednesday, 4 November 2026**. Venue: **Satyam Palace, Hisar Road, Sirsa**.

## Run

Node.js 20.9+ required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 or `/invite/amritpal-akamdeep`.

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
```

The browser tests cover desktop/mobile opening, reduced motion, keyboard skip, printed content, schedule order, directions, image loading, no horizontal overflow, and unknown invitation routing.

## Personalize

- `src/config/wedding.config.ts`: all names, parents, host, date, addresses, verified scripture, printed family blessing, ordered events, messages, photographs, music, reception, contacts and RSVP.
- `src/config/theme.config.ts`: theme colors and font names. Fonts are self-hosted at build time by `next/font/google`; adjust the corresponding font imports in `src/app/layout.tsx` when changing families.
- `src/config/scenes.config.ts`: enabled chapters, labels, artwork and animation timing. Venue appears before the schedule by default.
- `src/config/types.ts`: reusable typed content contracts.
- `src/components`: invitation presentation, SVG ornaments and motion behavior.
- `public/art`: optimized original illustration and lightweight SVG paper/Phulkari patterns.

The event array is rendered in the supplied order, never automatically sorted. Add breakfast, Milni, dance or any other events only when supplied by the family. Times use 24-hour `HH:mm` in configuration. Current timezone: Asia/Kolkata. Unconfigured parents can use explicit `[Father's name to be confirmed]` / `[Mother's name to be confirmed]` placeholders. Missing venue data produces a confirmation message rather than fake directions.

## Printed-card transcription

- Host: Sardar Satnam Singh Nagi, inviting guests to his beloved granddaughter's marriage.
- Bride: Akamdeep Kaur; parents Sardarni Narinder Kaur & S. Sukhdev Singh.
- Groom: Amritpal Singh; parents Sardarni Rajvinder Kaur & S. Jaimal Singh, of Sirsa.
- Reception of Barat 9:15 AM; Anand Karaj 11:15 AM; Lunch 1:15 PM; Doli 4:15 PM.
- With best compliments: All Nagi & Sohal Family; Relatives & Friends.

The actual card supersedes the earlier demonstration spelling “Ekam Deep Kaur” and example times. The separate Anand Karaj venue is not printed; it is intentionally not assigned a guessed Gurdwara. Add it in `venues` and the event's `venueId` when known. Only the supplied address text is used for the Google Maps search; no verified place pin is claimed.

## Sacred text

The first interior page preserves the printed line **ਲਖ ਖੁਸੀਆ ਪਾਤਿਸਾਹੀਆ ਜੇ ਸਤਿਗੁਰੁ ਨਦਰਿ ਕਰੇਇ ॥**, verified against Sri Guru Granth Sahib Ji, Ang 44: https://www.srigranth.org/servlet/gurbani.gurbani?Action=Page&Param=44

The separate two-line blessing from the printed invitation is also preserved, under “Blessing from the family’s invitation.” It is not attributed to Sri Guru Granth Sahib Ji. Invitation copy is separate from scripture. Any replacement scripture should be verified and approved by the family.

## Optional features

Music is absent by default. Supply a licensed local audio asset and configure `optional.music`; playback starts only on a guest's explicit action. No autoplay. RSVP is disabled until a real HTTPS destination is provided. No form pretends to submit. Photos, children's messages, contacts and reception remain hidden unless configured. There is no authentication, payment, tracking, backend or storage of guest details.

## Hosting

Deploy as a standard Next.js application on Vercel or any Node host: build with `npm run build`, run with `npm start`. No environment variables required. The page is prepared at `/invite/amritpal-akamdeep`; unknown slugs return 404. A future invitation registry can select a typed config by slug without changing scene components. This repository does not deploy hosting by itself.

Page metadata uses the wedding configuration. Indexing is disabled for this personal invitation; change `robots` in `src/app/layout.tsx` if wanted. Set a production `metadataBase` and social preview image when a public domain is chosen. Font downloads require access to Google Fonts during builds; deployed pages serve the generated font files locally.

## Design and asset provenance

Original artwork in `public/art/heritage-palace.webp` was created with the built-in image generation tool for this project, optimized as WebP, and is decorative, **not a depiction of the actual venue**. Prompt: “Hand-painted Punjabi heritage palace entrance, ivory sandstone scalloped arches, maroon drapes, marigold garlands, dusty roses, peacock-green foliage, brass lanterns, warm sunlight; miniature watercolor wedding stationery on ivory paper; no people, text, symbols, logos or purple.” SVG ornaments, embroidery patterns and motion are original code.

Design research: https://doorsofjoy.com/ (cinematic invitation sequencing), https://invitima.com/ (illustrated invitation journeys), https://thealphabetpress.com/wedding/ (craft and stationery finishing). No source code, photographs or artwork were copied from these sites. The family's printed content remains the source of truth.
