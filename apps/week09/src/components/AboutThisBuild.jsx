import React from 'react';
import './AboutThisBuild.css';

const REPO_NAME = 'week09-melbourne-suburbs';
const GITHUB_URL = `https://github.com/hayimpapa/${REPO_NAME}`;

export default function AboutThisBuild() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <header className="mb-10">
        <h1 className="font-display text-5xl sm:text-7xl leading-[0.9]">
          About This Build
        </h1>
        <p
          className="about-build-subtitle font-editorial italic text-lg sm:text-xl mt-4 text-ptv/80"
          dangerouslySetInnerHTML={{
            __html:
              'Week 09 of <strong>52 Apps in 52 Weeks Before I Turn 52</strong> by Hey I\'m Papa',
          }}
        />
      </header>

      <div className="space-y-6 sm:space-y-8">
        <article className="about-build-card zine-card bg-white p-6 sm:p-8">
          <h2 className="about-build-heading font-display text-2xl sm:text-3xl text-ptv">
            The Problem
          </h2>
          <p className="font-karla text-base sm:text-lg mt-3 text-ptv/85 leading-relaxed">
            Picking a Melbourne suburb is chaos. Price, vibe, transport, coffee,
            schools, dog parks, the eternal bogan-vs-hipster calculus — every
            local has an opinion and every listing site flattens it into a
            filter. This app is for anyone staring at a map of Melbourne and
            asking, only half-seriously, "where do I actually belong?"
          </p>
        </article>

        <article className="about-build-card zine-card bg-white p-6 sm:p-8">
          <h2 className="about-build-heading font-display text-2xl sm:text-3xl text-ptv">
            The App
          </h2>
          <p className="font-karla text-base sm:text-lg mt-3 text-ptv/85 leading-relaxed">
            A cheeky suburb recommender. 20 questions across 5 tram-stop steps,
            a weighted shortlist scored client-side, and a Melbourne-local
            Claude that ranks your top 5 with witty taglines. Built with{' '}
            <strong>React + Vite</strong> and <strong>Tailwind</strong> (custom
            Yarra-Trams-yellow / PTV-navy / Myki-green palette),{' '}
            <strong>framer-motion</strong> for tram-style transitions,{' '}
            <strong>Supabase</strong> for the suburb dataset, and a{' '}
            <strong>Vercel serverless function</strong> calling the{' '}
            <strong>Anthropic Claude API</strong>.
          </p>
        </article>

        <article className="about-build-card zine-card bg-white p-6 sm:p-8">
          <h2 className="about-build-heading font-display text-2xl sm:text-3xl text-ptv">
            GitHub Repo
          </h2>
          <p className="font-karla text-base sm:text-lg mt-3 text-ptv/85 leading-relaxed">
            Poke around the code, steal ideas, file issues — it's all open.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="zine-btn bg-myki text-white shadow-zine hover:bg-[#009147] mt-5"
          >
            View on GitHub
          </a>
        </article>
      </div>
    </section>
  );
}
