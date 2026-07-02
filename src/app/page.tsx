"use client";

import { FormEvent, useState } from "react";

const GOOGLE_SCRIPT_URL = "PEGAR_URL_DE_APPS_SCRIPT_ACA";
const HERO_IMAGE_URL = "/hero/casamientos-1.webp";

const eventDetails = [
  { label: "Fecha", value: "Domingo 15 de noviembre" },
  { label: "Hora", value: "20:00 hs" },
  { label: "Lugar", value: "Salón Las Magnolias" },
  { label: "Dirección", value: "Av. del Encuentro 1450, Buenos Aires" },
];

function Divider() {
  return (
    <div
      className="mx-auto flex w-full max-w-56 items-center gap-3"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-[rgba(217,181,109,0.72)]" />
      <span className="h-1.5 w-1.5 rotate-45 border border-[rgba(217,181,109,0.86)]" />
      <span className="h-px flex-1 bg-[rgba(217,181,109,0.72)]" />
    </div>
  );
}

function BranchOrnament() {
  return (
    <div
      className="mx-auto flex items-center justify-center gap-2 text-[rgba(217,181,109,0.78)]"
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-current" />
      <span className="relative h-8 w-12">
        <span className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] bg-current" />
        <span className="absolute left-4 top-2 h-3 w-1.5 rotate-[-28deg] rounded-full border border-current" />
        <span className="absolute right-4 bottom-2 h-3 w-1.5 rotate-[28deg] rounded-full border border-current" />
      </span>
      <span className="h-px w-10 bg-current" />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[rgba(234,216,197,0.9)] py-4 first:border-t-0 first:pt-0 last:pb-0 sm:grid sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6">
      <p className="text-xs font-semibold uppercase text-[rgba(74,46,42,0.52)]">
        {label}
      </p>
      <p className="mt-1 text-base font-medium leading-7 text-[var(--color-ink)] sm:mt-0 sm:text-lg">
        {value}
      </p>
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-[rgba(74,46,42,0.78)]"
    >
      {children}
    </label>
  );
}

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!fullName.trim()) {
      setError("Por favor ingresá tu nombre.");
      return;
    }

    if (!attendance) {
      setError("Por favor indicá si asistís.");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          fullName,
          attendance,
          dietaryRestrictions,
          comment,
        }),
      });

      setFullName("");
      setAttendance("");
      setDietaryRestrictions("");
      setComment("");
      setSuccess("Gracias por confirmar tu asistencia.");
    } catch {
      setError("No pudimos enviar tu confirmación. Intentá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)] px-4 py-6 text-[var(--color-ink)] sm:px-6 sm:py-10">
      <article className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[rgba(217,181,109,0.34)] bg-[var(--color-white-warm)] shadow-[0_18px_48px_rgba(74,46,42,0.06)]">
        <header
          className="relative flex min-h-[72svh] items-end justify-center bg-cover bg-center px-5 pb-12 pt-20 text-center text-[var(--color-white-warm)] sm:min-h-[680px] sm:px-10 sm:pb-16"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(20, 15, 13, 0.24), rgba(20, 15, 13, 0.72)), url(${HERO_IMAGE_URL})`,
          }}
        >
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-sm font-semibold uppercase text-[rgba(255,253,248,0.86)]">
              Nos casamos
            </p>

            <div className="my-6">
              <Divider />
            </div>

            <h1 className="mx-auto max-w-2xl font-serif-display text-5xl leading-none text-[var(--color-white-warm)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.38)] sm:text-6xl md:text-7xl">
              Sofía & Mateo
            </h1>

            <p className="mt-7 text-sm font-semibold uppercase text-[rgba(255,253,248,0.88)] sm:text-base">
              15 · 11 · 2026
            </p>

            <p className="mx-auto mt-8 max-w-xl text-balance text-base leading-8 text-[rgba(255,253,248,0.9)] sm:text-lg">
              Con mucha alegría queremos invitarte a compartir uno de los días
              más importantes de nuestra vida.
            </p>
          </div>
        </header>

        <div className="px-5 py-9 sm:px-10 sm:py-12">
          <section className="border-y border-[rgba(217,181,109,0.32)] py-8 sm:py-10">
            <div className="text-center">
              <BranchOrnament />
              <h2 className="mt-5 font-serif-display text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
                Datos del evento
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-xl">
              {eventDetails.map((detail) => (
                <DetailRow
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
            </div>
          </section>

          <section className="border-b border-[rgba(217,181,109,0.32)] py-8 sm:py-10">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase text-[var(--color-accent-strong)]">
                Confirmación
              </p>
              <h2 className="mt-3 font-serif-display text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
                Confirmá tu asistencia
              </h2>
              <p className="mt-5 text-base leading-7 text-[rgba(74,46,42,0.72)]">
                Para ayudarnos a organizar mejor este día tan especial, te
                pedimos que confirmes tu asistencia con anticipación.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 grid max-w-xl gap-5 rounded-2xl border border-[rgba(234,216,197,0.95)] bg-[rgba(255,248,241,0.34)] p-4 sm:p-6"
            >
              <div className="grid gap-2">
                <FieldLabel htmlFor="fullName">Nombre y apellido</FieldLabel>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-xl border border-[rgba(234,216,197,0.95)] bg-[var(--color-white-warm)] px-4 text-base text-[var(--color-ink)] outline-none transition focus:border-[rgba(217,181,109,0.78)] focus:ring-2 focus:ring-[rgba(217,181,109,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
                  autoComplete="name"
                />
              </div>

              <div className="grid gap-2">
                <FieldLabel htmlFor="attendance">¿Asistís?</FieldLabel>
                <select
                  id="attendance"
                  name="attendance"
                  value={attendance}
                  onChange={(event) => setAttendance(event.target.value)}
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-xl border border-[rgba(234,216,197,0.95)] bg-[var(--color-white-warm)] px-4 text-base text-[var(--color-ink)] outline-none transition focus:border-[rgba(217,181,109,0.78)] focus:ring-2 focus:ring-[rgba(217,181,109,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="">Seleccioná una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="grid gap-2">
                <FieldLabel htmlFor="dietaryRestrictions">
                  Restricciones alimentarias
                </FieldLabel>
                <input
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  type="text"
                  value={dietaryRestrictions}
                  onChange={(event) =>
                    setDietaryRestrictions(event.target.value)
                  }
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-xl border border-[rgba(234,216,197,0.95)] bg-[var(--color-white-warm)] px-4 text-base text-[var(--color-ink)] outline-none transition focus:border-[rgba(217,181,109,0.78)] focus:ring-2 focus:ring-[rgba(217,181,109,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              <div className="grid gap-2">
                <FieldLabel htmlFor="comment">
                  ¿Algo que debamos saber?
                </FieldLabel>
                <textarea
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-[rgba(234,216,197,0.95)] bg-[var(--color-white-warm)] px-4 py-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[rgba(217,181,109,0.78)] focus:ring-2 focus:ring-[rgba(217,181,109,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              {error ? (
                <p className="text-sm font-medium text-[#8f3d36]">{error}</p>
              ) : null}

              {success ? (
                <p className="text-sm font-medium text-[var(--color-accent-strong)]">
                  {success}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-12 w-full rounded-xl bg-[var(--color-ink)] px-5 text-sm font-semibold uppercase text-[var(--color-white-warm)] transition hover:bg-[#5c3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(217,181,109,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-white-warm)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Confirmar asistencia"}
              </button>
            </form>
          </section>

          <footer className="pt-8 text-center sm:pt-10">
            <p className="mx-auto max-w-lg text-base leading-7 text-[rgba(74,46,42,0.76)]">
              Te esperamos para celebrar juntos este momento tan especial.
            </p>
            <div className="my-6">
              <Divider />
            </div>
            <p className="font-serif-display text-4xl text-[var(--color-ink)] sm:text-5xl">
              Sofía & Mateo
            </p>
          </footer>
        </div>
      </article>
    </main>
  );
}
