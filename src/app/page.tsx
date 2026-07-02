"use client";

import { FormEvent, useEffect, useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import Reveal from "@/components/Reveal";

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
};

type FormState = {
  fullName: string;
  attending: "Sí" | "No";
  childrenCount: string;
  adultsCount: string;
  notes: string;
};

const EVENT_DATE = new Date("2026-10-18T17:00:00-03:00");
const EVENT_LOCATION_URL = "#";

const galleryImages = [
  {
    src: "/gallery/foto-1.jpg",
    alt: "Ambientación infantil con arcoíris, globos y escenario pastel",
  },
  {
    src: "/gallery/foto-2.jpg",
    alt: "Mesa dulce infantil con globos y telas en tonos pastel",
  },
  {
    src: "/gallery/foto-3.jpg",
    alt: "Arco de globos con temática de unicornios para cumpleaños",
  },
  {
    src: "/gallery/foto-4.jpg",
    alt: "Picnic infantil al aire libre con decoración en colores suaves",
  },
];

const recommendations = [
  {
    emoji: "🧦",
    title: "Traer medias para los juegos",
  },
  {
    emoji: "🗓️",
    title: "Confirmar asistencia con anticipación",
  },
  {
    emoji: "🍓",
    title: "Avisar si hay alergias",
  },
];

const initialFormState: FormState = {
  fullName: "",
  attending: "Sí",
  childrenCount: "",
  adultsCount: "",
  notes: "",
};

function getInitialCountdown(): TimeLeft {
  return {
    days: "00",
    hours: "00",
    minutes: "00",
  };
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const difference = Math.max(0, targetDate.getTime() - Date.now());

  return {
    days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
      2,
      "0",
    ),
    hours: String(
      Math.floor((difference / (1000 * 60 * 60)) % 24),
    ).padStart(2, "0"),
    minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
      2,
      "0",
    ),
  };
}

function SectionTitle({
  badge,
  title,
  description,
}: {
  badge?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {badge ? (
        <span className="inline-flex rounded-full border border-[rgba(58,46,57,0.08)] bg-white/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)] shadow-[0_12px_24px_rgba(58,46,57,0.06)]">
          {badge}
        </span>
      ) : null}
      <h2 className="mt-5 font-serif-display text-3xl tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[color:rgba(58,46,57,0.76)] sm:text-base">
        {description}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/60 bg-white/70 p-5 shadow-[0_20px_40px_rgba(58,46,57,0.08)] backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(58,46,57,0.48)]">
        {label}
      </p>
      <p className="mt-3 text-lg font-semibold text-[var(--color-ink)] sm:text-xl">
        {value}
      </p>
    </div>
  );
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getInitialCountdown);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const countdownItems = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
  ];

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft(EVENT_DATE));

    updateCountdown();

    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formState.fullName.trim()) {
      setSuccessMessage("");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    await new Promise((resolve) => window.setTimeout(resolve, 500));

    setFormState(initialFormState);
    setSuccessMessage("Gracias por confirmar. Esta es una versión demo.");
    setIsSubmitting(false);
  }

  function handleViewInvitationClick() {
    document
      .getElementById("invitacion")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[var(--background)] text-[var(--color-ink)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(167,216,240,0.55),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(255,200,221,0.54),transparent_22%),radial-gradient(circle_at_15%_78%,rgba(184,235,208,0.5),transparent_24%),radial-gradient(circle_at_70%_68%,rgba(205,180,219,0.34),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,248,236,0.94))]" />
      <div className="pointer-events-none absolute left-[-3rem] top-24 -z-10 h-40 w-40 rounded-full bg-[rgba(255,232,163,0.72)] blur-2xl sm:h-56 sm:w-56" />
      <div className="pointer-events-none absolute right-[-3rem] top-40 -z-10 h-44 w-44 rounded-full bg-[rgba(167,216,240,0.62)] blur-2xl sm:h-64 sm:w-64" />
      <div className="pointer-events-none absolute bottom-24 left-1/2 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(205,180,219,0.38)] blur-3xl sm:h-72 sm:w-72" />

      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/55 bg-[rgba(255,253,248,0.72)] shadow-[0_28px_80px_rgba(58,46,57,0.1)] backdrop-blur-xl sm:rounded-[2.5rem]">
          <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-4 top-8 h-20 w-14 rounded-full bg-[var(--color-accent-pink)] opacity-75 blur-[2px] sm:left-10 sm:h-28 sm:w-20" />
              <div className="absolute left-10 top-14 h-8 w-8 rounded-full border-4 border-white/70 bg-[var(--color-accent-yellow)] sm:left-20 sm:top-16 sm:h-10 sm:w-10" />
              <div className="absolute right-6 top-10 h-16 w-16 rounded-full border-[10px] border-[var(--color-accent-blue)]/80 border-b-transparent border-l-transparent rotate-12 sm:right-14 sm:h-24 sm:w-24" />
              <div className="absolute bottom-10 right-4 flex gap-2 sm:right-10">
                <span className="h-3 w-3 rounded-full bg-[var(--color-accent-mint)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--color-accent-lilac)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--color-accent-yellow)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--color-accent-pink)]" />
              </div>
              <div className="absolute bottom-8 left-4 h-20 w-28 rounded-[999px] bg-white/70 sm:left-12 sm:h-24 sm:w-36" />
              <div className="absolute bottom-14 left-12 h-16 w-16 rounded-full bg-white/70 sm:left-20 sm:h-20 sm:w-20" />
              <div className="absolute bottom-12 left-24 h-14 w-14 rounded-full bg-white/70 sm:left-36 sm:h-16 sm:w-16" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-[rgba(58,46,57,0.08)] bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-strong)] shadow-[0_16px_30px_rgba(58,46,57,0.06)]">
                Estás invitado
              </span>
              <h1 className="mt-6 font-serif-display text-5xl leading-none tracking-[-0.04em] text-[var(--color-ink)] sm:text-7xl lg:text-8xl">
                Cumple de Emma
              </h1>
              <p className="mt-4 text-2xl font-semibold text-[var(--color-accent-strong)] sm:text-3xl">
                5 años
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.34em] text-[color:rgba(58,46,57,0.6)] sm:text-base">
                18 · 10 · 2026
              </p>
              <p className="mx-auto mt-7 max-w-2xl rounded-[1.75rem] bg-white/60 px-6 py-5 text-base leading-7 text-[color:rgba(58,46,57,0.82)] shadow-[0_18px_36px_rgba(58,46,57,0.06)] backdrop-blur-sm sm:text-lg">
                Te esperamos para compartir una tarde llena de juegos, risas y
                mucha diversión.
              </p>
              <button
                type="button"
                onClick={handleViewInvitationClick}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-7 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-white-warm)] shadow-[0_18px_34px_rgba(110,95,150,0.24)] transition hover:-translate-y-0.5 hover:bg-[#8872bc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:min-h-14 sm:px-9"
              >
                Ver invitación
              </button>
            </div>
          </section>

          <div id="invitacion" className="px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12">
            <Reveal>
              <section className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,248,236,0.9))] px-5 py-10 shadow-[0_20px_60px_rgba(58,46,57,0.06)] sm:px-8 sm:py-12">
                <SectionTitle
                  badge="Cuenta regresiva"
                  title="Falta poquito para festejar"
                  description="Preparamos una invitación demo pensada para salones y celebraciones infantiles, con una estética cálida, moderna y fácil de adaptar."
                />

                <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:mt-10 sm:gap-5">
                  {countdownItems.map((item, index) => (
                    <Reveal key={item.label} delay={120 + index * 80}>
                      <div className="rounded-[1.75rem] border border-white/60 bg-white/78 px-3 py-5 text-center shadow-[0_16px_34px_rgba(58,46,57,0.06)]">
                        <p className="font-serif-display text-4xl text-[var(--color-ink)] sm:text-5xl">
                          {item.value}
                        </p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(58,46,57,0.5)]">
                          {item.label}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={120}>
              <section className="py-12 sm:py-16">
                <SectionTitle
                  badge="Evento"
                  title="Datos del cumple"
                  description="Toda la información importante, presentada de manera clara para que esta demo funcione como una invitación vendible desde el primer vistazo."
                />

                <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-3">
                  <InfoCard label="Fecha" value="Sábado 18 de octubre" />
                  <InfoCard label="Hora" value="17:00 hs" />
                  <InfoCard label="Lugar" value="Salón Arcoíris" />
                  <InfoCard label="Dirección" value="Av. Siempre Viva 1234" />
                  <InfoCard label="Ciudad" value="Buenos Aires" />
                  <div className="rounded-[1.75rem] border border-white/60 bg-[linear-gradient(160deg,rgba(167,216,240,0.34),rgba(255,255,255,0.82))] p-5 shadow-[0_20px_40px_rgba(58,46,57,0.08)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(58,46,57,0.48)]">
                      Ubicación
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:rgba(58,46,57,0.74)]">
                      Llegá fácil al salón con un acceso directo de ejemplo.
                    </p>
                    <a
                      href={EVENT_LOCATION_URL}
                      className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-white/85 px-5 text-sm font-semibold text-[var(--color-ink)] shadow-[0_12px_24px_rgba(58,46,57,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal delay={120}>
              <section className="py-4 sm:py-6">
                <SectionTitle
                  badge="Galería"
                  title="Un cumple lleno de magia"
                  description="Algunas imágenes de inspiración para imaginar la celebración."
                />
                <div className="mt-8 sm:mt-10">
                  <ImageCarousel images={galleryImages} />
                </div>
              </section>
            </Reveal>

            <Reveal delay={120}>
              <section className="py-12 sm:py-16">
                <SectionTitle
                  badge="Confirmación"
                  title="Confirmá asistencia"
                  description="Ayudanos a organizar todo para que Emma disfrute su día con vos."
                />

                <div className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-white/60 bg-white/72 p-5 shadow-[0_24px_60px_rgba(58,46,57,0.08)] backdrop-blur-sm sm:mt-10 sm:p-8">
                  <form onSubmit={handleSubmit} className="grid gap-5">
                    <label className="space-y-2 text-sm font-medium text-[var(--color-ink)]">
                      <span>Nombre y apellido</span>
                      <input
                        required
                        value={formState.fullName}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            fullName: event.target.value,
                          }))
                        }
                        disabled={isSubmitting}
                        placeholder="Nombre del invitado"
                        className="w-full rounded-2xl border border-[rgba(58,46,57,0.1)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-accent-blue)] focus:ring-4 focus:ring-[rgba(167,216,240,0.3)]"
                      />
                    </label>

                    <label className="space-y-2 text-sm font-medium text-[var(--color-ink)]">
                      <span>¿Asistís?</span>
                      <select
                        value={formState.attending}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            attending: event.target.value as "Sí" | "No",
                          }))
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-2xl border border-[rgba(58,46,57,0.1)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-accent-blue)] focus:ring-4 focus:ring-[rgba(167,216,240,0.3)]"
                      >
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                      </select>
                    </label>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="space-y-2 text-sm font-medium text-[var(--color-ink)]">
                        <span>Cantidad de niños</span>
                        <input
                          inputMode="numeric"
                          value={formState.childrenCount}
                          onChange={(event) =>
                            setFormState((current) => ({
                              ...current,
                              childrenCount: event.target.value,
                            }))
                          }
                          disabled={isSubmitting}
                          placeholder="0"
                          className="w-full rounded-2xl border border-[rgba(58,46,57,0.1)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-accent-mint)] focus:ring-4 focus:ring-[rgba(184,235,208,0.35)]"
                        />
                      </label>

                      <label className="space-y-2 text-sm font-medium text-[var(--color-ink)]">
                        <span>Cantidad de adultos</span>
                        <input
                          inputMode="numeric"
                          value={formState.adultsCount}
                          onChange={(event) =>
                            setFormState((current) => ({
                              ...current,
                              adultsCount: event.target.value,
                            }))
                          }
                          disabled={isSubmitting}
                          placeholder="0"
                          className="w-full rounded-2xl border border-[rgba(58,46,57,0.1)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-accent-mint)] focus:ring-4 focus:ring-[rgba(184,235,208,0.35)]"
                        />
                      </label>
                    </div>

                    <label className="space-y-2 text-sm font-medium text-[var(--color-ink)]">
                      <span>¿Alguna alergia o comentario?</span>
                      <textarea
                        rows={4}
                        value={formState.notes}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            notes: event.target.value,
                          }))
                        }
                        disabled={isSubmitting}
                        placeholder="Escribí acá cualquier dato útil para la organización"
                        className="w-full resize-none rounded-2xl border border-[rgba(58,46,57,0.1)] bg-white px-4 py-3 text-base outline-none transition focus:border-[var(--color-accent-pink)] focus:ring-4 focus:ring-[rgba(255,200,221,0.35)]"
                      />
                    </label>

                    <div className="pt-2 text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-white-warm)] shadow-[0_18px_34px_rgba(110,95,150,0.24)] transition hover:-translate-y-0.5 hover:bg-[#8872bc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:w-auto sm:min-w-72"
                      >
                        {isSubmitting ? "Enviando..." : "Confirmar asistencia"}
                      </button>
                      {successMessage ? (
                        <p className="mt-4 text-sm font-medium text-[var(--color-accent-strong)]">
                          {successMessage}
                        </p>
                      ) : null}
                    </div>
                  </form>
                </div>
              </section>
            </Reveal>

            <Reveal delay={120}>
              <section className="pb-8 pt-2 sm:pb-10">
                <SectionTitle
                  badge="Tips"
                  title="Recomendaciones"
                  description="Pequeños recordatorios para que la experiencia sea cómoda y ordenada para todos."
                />

                <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
                  {recommendations.map((item, index) => (
                    <Reveal key={item.title} delay={120 + index * 80}>
                      <article className="rounded-[1.75rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,248,236,0.86))] p-5 text-center shadow-[0_18px_38px_rgba(58,46,57,0.07)]">
                        <span className="text-3xl">{item.emoji}</span>
                        <h3 className="mt-4 text-lg font-semibold text-[var(--color-ink)]">
                          {item.title}
                        </h3>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={120}>
              <footer className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,200,221,0.18))] px-5 py-10 text-center shadow-[0_18px_44px_rgba(58,46,57,0.06)] sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:rgba(58,46,57,0.48)]">
                  Gracias por ser parte de este día tan especial.
                </p>
                <p className="mt-5 font-serif-display text-4xl text-[var(--color-ink)] sm:text-5xl">
                  Emma · 5 años
                </p>
              </footer>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
