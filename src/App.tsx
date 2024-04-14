import { AppStateContextProvider } from '@/lib/context';

import { GithubLink } from '@/components/GithubLink';
import { ShadowCard } from '@/components/ShadowCard';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
  return (
    <AppStateContextProvider>
      <TooltipProvider delayDuration={1000} skipDelayDuration={0}>
        <AppContent />
      </TooltipProvider>
    </AppStateContextProvider>
  );
}

function AppContent() {
  return (
    <div
      className={`min-h-full p-4 relative w-full dark:bg-black bg-neutral-50 flex justify-center transition-colors`}
    >
      <GithubLink />
      <ShadowCard />
    </div>
  );
}

export default App;
