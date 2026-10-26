"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { WeddingData, WeddingEvent } from "@/config/types";
import { theme } from "@/config/theme.config";
import { assets, scenes, motionSettings } from "@/config/scenes.config";
import {
  formatDate,
  formatTime,
  directionsUrl,
  safeExternalUrl,
} from "@/lib/wedding";
import { Botanical, Crest, EventIcon, Flourish } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Invitation({ wedding: w }: { wedding: WeddingData }) {
  const [opened, setOpened] = useState(false),
    [opening, setOpening] = useState(false),
    [active, setActive] = useState(w.events[0]?.id),
    [playing, setPlaying] = useState(false),
    [audioError, setAudioError] = useState("");
  const reduced = useReducedMotion(),
    audio = useRef<HTMLAudioElement>(null),
    firstSection = useRef<HTMLElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const event = w.events.find((e) => e.id === active) || w.events[0];
  const enabled = scenes.filter((s) => s.enabled);
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
      if (timer.current) clearTimeout(timer.current);
    };
  }, [opened]);
  function finish() {
    if (timer.current) clearTimeout(timer.current);
    setOpened(true);
    setOpening(false);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      firstSection.current?.focus({ preventScroll: true });
    });
  }
  function open() {
    if (opening) return;
    if (reduced) {
      finish();
      return;
    }
    setOpening(true);
    timer.current = setTimeout(finish, motionSettings.openingDuration * 1000);
  }
  async function toggleMusic() {
    if (!audio.current) return;
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      try {
        await audio.current.play();
        setPlaying(true);
        setAudioError("");
      } catch {
        setAudioError("Music is unavailable. Please try again.");
      }
    }
  }
  const cssVars = Object.fromEntries(
    Object.entries(theme.colors).map(([k, v]) => [`--${k}`, v]),
  ) as CSSProperties;
  const rsvp = safeExternalUrl(w.optional.rsvp.url);
  return (
    <div
      className={`invitation-world ${opened ? "is-open" : ""}`}
      style={cssVars}
    >
      <a href="#blessings" className="skip-link" onClick={() => finish()}>
        Skip to invitation
      </a>
      <AnimatePresence>
        {!opened && (
          <motion.div
            className={`cover-stage ${opening ? "opening" : ""}`}
            key="cover"
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
          >
            <div className="paper-underlay" aria-hidden="true" />
            <div className="book-spine" aria-hidden="true" />
            <motion.div
              className="cover"
              animate={
                opening
                  ? { rotateY: -115, rotateZ: -1, x: "-5%" }
                  : { rotateY: 0, rotateZ: 0, x: 0 }
              }
              transition={{
                duration: reduced ? 0 : motionSettings.openingDuration,
                ease: [0.65, 0, 0.2, 1],
              }}
            >
              <div className="cover-foil" aria-hidden="true" />
              <Botanical className="cover-flower top-left" />
              <Botanical className="cover-flower bottom-right" />
              <div className="cover-inner">
                <Crest />
                <h1>
                  <span>{w.groom.fullName}</span>
                  <em>weds</em>
                  <span>{w.bride.fullName}</span>
                </h1>
                <Flourish />
                <button
                  className="open-button"
                  onClick={open}
                  disabled={opening}
                >
                  Open Invitation <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div className="cover-shade" aria-hidden="true" />
            </motion.div>
            <button className="skip-animation" onClick={finish}>
              Skip animation <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div inert={!opened} aria-hidden={!opened}>
        <header className="site-header">
          <a
            href="#blessings"
            className="monogram"
            aria-label="Back to blessings"
          >
            {w.groom.fullName[0]}
            <span>&</span>
            {w.bride.fullName[0]}
          </a>
          <nav aria-label="Invitation chapters">
            {enabled.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <span className="header-date">
            {w.date.split("-").reverse().join(" · ")}
          </span>
        </header>
        <main>
          {enabled.map((s) => {
            if (s.id === "blessings")
              return (
                <section
                  ref={firstSection}
                  tabIndex={-1}
                  id={s.id}
                  key={s.id}
                  className="blessings section-paper"
                  aria-labelledby="blessing-heading"
                >
                  <div className="page-rail left" />
                  <div className="page-rail right" />
                  <div className="blessings-content">
                    <p lang="pa" className="invocation">
                      {w.invocation}
                    </p>
                    <Flourish />
                    <h2 id="blessing-heading" className="sr-only">
                      {s.title}
                    </h2>
                    <blockquote lang="pa" className="gurbani">
                      {w.scripture.text}
                    </blockquote>
                    <a
                      className="scripture-source"
                      href={w.scripture.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {w.scripture.attribution}
                    </a>
                    <div className="quiet-divider" />
                    <p className="blessing-message">{w.messages.blessing}</p>
                    <p className="eyebrow">{formatDate(w.date)}</p>
                    <a className="scroll-cue" href="#invitation">
                      The invitation <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                </section>
              );
            if (s.id === "invitation")
              return (
                <section
                  id={s.id}
                  key={s.id}
                  className="formal section-paper"
                  aria-labelledby="invitation-heading"
                >
                  <Botanical className="formal-flower left" />
                  <Botanical className="formal-flower right" />
                  <Reveal>
                    <p className="eyebrow">{s.eyebrow}</p>
                    <h2 id="invitation-heading" className="host-name">
                      {w.host.name}
                    </h2>
                    <p className="invitation-copy">
                      {w.host.invitation}
                      <br /> {w.host.relationship}
                    </p>
                    <div className="couple-names">
                      <h3>{w.bride.fullName}</h3>
                      <p className="parent-line">
                        Daughter of {w.bride.mother}
                        <br />& {w.bride.father}
                      </p>
                      <span className="with">with</span>
                      <h3>{w.groom.fullName}</h3>
                      <p className="parent-line">
                        Son of {w.groom.mother}
                        <br />& {w.groom.father}
                        {w.groom.hometown && (
                          <>
                            <br />
                            of {w.groom.hometown}
                          </>
                        )}
                      </p>
                    </div>
                    <Flourish />
                    <p className="formal-date">{formatDate(w.date)}</p>
                    <p lang="pa" className="punjabi-welcome">
                      {w.messages.punjabi}
                    </p>
                  </Reveal>
                </section>
              );
            if (s.id === "venue")
              return (
                <section
                  id={s.id}
                  key={s.id}
                  className="venue-section section-paper"
                  aria-labelledby="venue-heading"
                >
                  <Reveal>
                    <p className="eyebrow">{s.eyebrow}</p>
                    <h2 id="venue-heading">{s.title}</h2>
                    <div className="palace-art">
                      <Image
                        src={assets.palace}
                        alt={assets.palaceAlt}
                        width={1536}
                        height={1024}
                        sizes="(max-width: 768px) 100vw, 1100px"
                      />
                      <span className="art-caption">
                        An illustrated welcome
                      </span>
                    </div>
                    <div className="venue-details">
                      {w.venues.length ? (
                        w.venues.map((v) => (
                          <div className="venue" key={v.id}>
                            <p className="eyebrow">{v.label}</p>
                            <h3>{v.name || "Venue details to be confirmed"}</h3>
                            <address>
                              {v.address || "Address to be confirmed"}
                            </address>
                            <p className="venue-date">{formatDate(w.date)}</p>
                            {directionsUrl(v) && (
                              <a
                                className="button"
                                target="_blank"
                                rel="noreferrer"
                                href={directionsUrl(v)}
                              >
                                Get Directions <span aria-hidden="true">↗</span>
                              </a>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>Venue details to be confirmed</p>
                      )}
                    </div>
                  </Reveal>
                </section>
              );
            if (s.id === "itinerary")
              return (
                <section
                  id={s.id}
                  key={s.id}
                  className="itinerary"
                  aria-labelledby="itinerary-heading"
                >
                  <div className="phulkari-band" />
                  <Reveal>
                    <p className="eyebrow">{formatDate(w.date)}</p>
                    <h2 id="itinerary-heading">{s.title}</h2>
                    <Flourish />
                    <div className="itinerary-layout">
                      <div className="event-preview" aria-live="polite">
                        {event && (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={event.id}
                              initial={reduced ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="event-arch">
                                <EventIcon kind={event.kind} />
                                <span>
                                  {String(w.events.indexOf(event) + 1).padStart(
                                    2,
                                    "0",
                                  )}
                                </span>
                              </div>
                              <h3>{event.name}</h3>
                              <p>{event.description}</p>
                              {event.venueId && (
                                <p className="event-venue">
                                  {
                                    w.venues.find((v) => v.id === event.venueId)
                                      ?.name
                                  }
                                </p>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </div>
                      <ol className="event-list">
                        {w.events.map((e, i) => (
                          <li key={e.id}>
                            <button
                              className={active === e.id ? "selected" : ""}
                              onClick={() => setActive(e.id)}
                              aria-pressed={active === e.id}
                            >
                              <span className="event-number">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="event-name">
                                {e.name}
                                {e.illustrative && (
                                  <small>Illustrative timing</small>
                                )}
                              </span>
                              <time
                                dateTime={`${e.date || w.date}T${e.time}:00+05:30`}
                              >
                                {formatTime(e.time)}
                              </time>
                              <span className="event-arrow" aria-hidden="true">
                                ↗
                              </span>
                            </button>
                          </li>
                        ))}
                      </ol>
                    </div>
                    {w.optional.reception && (
                      <Reception event={w.optional.reception} />
                    )}
                  </Reveal>
                  <div className="phulkari-band bottom" />
                </section>
              );
            return (
              <section
                id={s.id}
                key={s.id}
                className="family section-paper"
                aria-labelledby="family-heading"
              >
                <Botanical className="family-flower" />
                <Reveal>
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h2 id="family-heading">{s.title}</h2>
                  <div className="family-names">
                    {w.family.map((name) => (
                      <p key={name}>{name}</p>
                    ))}
                  </div>
                  <Flourish />
                  <div className="printed-blessing">
                    <p className="eyebrow">{w.printedBlessing.label}</p>
                    {w.printedBlessing.lines.map((line) => (
                      <p lang="pa" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="closing">{w.messages.closing}</p>
                  {w.messages.children && (
                    <p className="children-message">{w.messages.children}</p>
                  )}
                  {w.optional.photos.length > 0 && (
                    <div className="photo-gallery">
                      {w.optional.photos.map((p) => (
                        <Image
                          key={p.src}
                          {...p}
                          sizes="(max-width: 700px) 90vw, 500px"
                          alt={p.alt}
                        />
                      ))}
                    </div>
                  )}
                  {w.optional.contacts.map((c) => (
                    <p key={c.name}>
                      {c.name}
                      {c.phone && (
                        <>
                          {" "}
                          ·{" "}
                          <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}>
                            {c.phone}
                          </a>
                        </>
                      )}
                      {c.email && (
                        <>
                          {" "}
                          · <a href={`mailto:${c.email}`}>{c.email}</a>
                        </>
                      )}
                    </p>
                  ))}
                  {w.optional.rsvp.enabled && rsvp && (
                    <a
                      href={rsvp}
                      className="button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {w.optional.rsvp.label} ↗
                    </a>
                  )}
                  <a href="#blessings" className="back-top">
                    Back to the beginning ↑
                  </a>
                </Reveal>
              </section>
            );
          })}
        </main>
        <footer>
          <span>
            {w.groom.fullName} & {w.bride.fullName}
          </span>
          <span>
            With love ·{" "}
            {new Intl.DateTimeFormat("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(w.date + "T12:00:00Z"))}
          </span>
        </footer>
        {w.optional.music && (
          <>
            <audio
              ref={audio}
              src={w.optional.music.src}
              loop
              preload="none"
              onError={() => {
                setPlaying(false);
                setAudioError("Music is unavailable.");
              }}
            />
            <button
              className="music-toggle"
              onClick={toggleMusic}
              aria-pressed={playing}
            >
              {playing ? "Pause" : "Play"} {w.optional.music.title}
            </button>
            {audioError && (
              <p role="status" className="audio-error">
                {audioError}
              </p>
            )}
          </>
        )}
      </div>
      <noscript>
        <style>{`.cover-stage{display:none!important}.invitation-world [inert]{display:block!important}`}</style>
        <p>
          This invitation requires JavaScript for the opening animation. The
          wedding is on {formatDate(w.date)}.{" "}
          {w.venues.map((v) => `${v.name}, ${v.address}`).join("; ")}.{" "}
          {w.events.map((e) => `${e.name}: ${formatTime(e.time)}`).join(" · ")}.
        </p>
      </noscript>
    </div>
  );
}
function Reception({ event }: { event: WeddingEvent }) {
  return (
    <div className="reception">
      <h3>{event.name}</h3>
      <p>
        {event.date && formatDate(event.date)} · {formatTime(event.time)}
      </p>
      <p>{event.description}</p>
    </div>
  );
}
