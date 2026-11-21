import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full px-gutter-desktop flex items-center justify-between gap-space-lg">
        {/* Search Input */}
        <div className="flex items-center gap-space-md flex-1 max-w-lg">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              className="w-full h-10 pl-10 pr-4 bg-background-secondary rounded-lg font-body-md text-body-md text-on-surface placeholder:text-text-secondary focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Search transactions, schemes, EMIs, or ask AI... (Press '/' to focus)"
              type="text"
            />
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-space-md">
          <button
            className="flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-colors font-label-md text-label-md"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">help_center</span>
            <span className="hidden sm:inline">Support</span>
          </button>
          <button
            aria-label="Notifications"
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
          </button>
          <div className="h-6 w-px bg-border-subtle mx-space-xs"></div>
          <div className="flex items-center gap-space-sm pl-space-xs">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATTQTqVciEbHm51AzXq2FZ4d-T1PNZR5hvw_9cTPGl79Uz-fexARU30pIwVOihnJtLmpa2JIHDjDwj92Ihl_eRtiadWZMZj7faIQVSRWnTlrLq7iO1olRZvDSjez5f0HUDLVgKbHQefWhZKrvOPfKstJOUxmsuEOCHnGaoft2ph-GI-UZPE1QXvIHrQcnVCCds1Cgflfv-g7MpAU4TCKcVFXtjsDmOR247SteEm98"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                Arjun Mehta
              </span>
              <span className="font-label-sm text-label-sm text-text-secondary leading-tight">
                Pro Tier
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
