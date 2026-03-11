"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      <header className="sticky top-0 z-50 glass-effect border-b border-primary/20 px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary flex items-center justify-center rounded-lg text-slate-900">
            <span className="material-symbols-outlined text-2xl">adjust</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">MyJourney</h2>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <section className="max-w-7xl mx-auto px-6 lg:px-20 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Dein Weg zum vollen Potenzial beginnt <span className="text-primary italic">hier.</span>
            </h1>
            {!isSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                  <input required className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary focus:ring-0 transition-all outline-none" placeholder="Deine E-Mail Adresse" type="email" />
                </div>
                <button type="submit" className="h-14 px-8 rounded-xl bg-primary text-slate-900 font-black text-lg shadow-xl shadow-primary/30 hover:brightness-105 active:scale-95 transition-all">
                  Sichere dir exklusiven Early Access
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center sm:text-left">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  Danke! Du bist auf der Reise dabei.
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Teile MyJourney mit Freunden, um auf der Liste nach oben zu rutschen.
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl bg-slate-100">
              <Image alt="Workspace Dashboard" className="w-full h-full object-cover opacity-90" src="/Workspace_Dashboard.png" fill priority />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 flex flex-col gap-12 lg:gap-16">

            <div className="max-w-4xl mx-auto text-center md:text-left">
              <p className="text-2xl lg:text-3xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                Wo Disziplin auf Design trifft. <span className="text-primary font-bold">MyJourney </span> vereint Fokus, Routinen und Projekte zu einer klaren Einheit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col gap-6 group">
                <div className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                  <Image alt="Focus Player" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/Fokus.png" fill />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">headphones</span> Deep Work Pilot
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Tauche ein in deine Arbeit mit kuratierten Soundscapes und dem integrierten KI Agenten.</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 group">
                <div className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                  <Image alt="Habits Tracker" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/habit_tracker_focus_system_integration.png" fill />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">track_changes</span> Habit Roadmap
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Visualisiere deinen Weg. MyJourney macht deine t├ñglichen Fortschritte messbar und hilft dir, langfristige Routinen aufzubauen.</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 group">
                <div className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                  <Image alt="Workspace Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/Workspace_Dashboard.png" fill />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">dashboard</span> Workspace Hub
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Deine Schaltzentrale f├╝r alles, was z├ñhlt. Strukturiere deine Etappen mit maximaler Klarheit.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 bg-primary flex items-center justify-center rounded-lg text-slate-900">
                <span className="material-symbols-outlined text-lg">adjust</span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">MyJourney</h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              Dein Begleiter f├╝r das, was wirklich z├ñhlt.
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-4">Product</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-500">
              <li><span className="cursor-pointer hover:text-primary transition-colors">Deep Work Pilot</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Workspace Hub</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Habit Roadmap</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Company & Legal</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-500">
              <li><span className="cursor-pointer hover:text-primary transition-colors">Impressum</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Datenschutz</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Kontakt</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs text-slate-500">
          <p>┬® 2026 MyJourney. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
