import React from 'react';

export default function Navbar({ activeTab, onTabChange, tabs }) {
  return (
    <nav className="sticky top-0 z-40 bg-cream border-b-[3px] border-ptv">
      <div className="max-w-5xl mx-auto px-3 sm:px-8 py-2 sm:py-3 flex items-center gap-3 sm:gap-6">
        <a
          href="https://52-app.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="52 Apps in 52 Weeks"
          className="shrink-0 inline-flex items-center p-1 rounded-md transition-opacity hover:opacity-70"
        >
          <img
            src="https://raw.githubusercontent.com/hayimpapa/week00-main-page/main/public/w52.png"
            alt="52 Apps Logo"
            className="h-[34px] w-auto rounded-md"
          />
        </a>

        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto -mx-1 px-1">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={[
                  'whitespace-nowrap font-display tracking-wider uppercase',
                  'px-3 sm:px-4 py-2 text-sm sm:text-base',
                  'border-b-[3px] transition-colors',
                  isActive
                    ? 'bg-tram text-ptv border-ptv'
                    : 'bg-transparent text-ptv/70 border-transparent hover:text-ptv hover:bg-ptv/5',
                ].join(' ')}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
