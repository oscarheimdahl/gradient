import { Card } from '@/components/ui/card';
import { AppStateContextProvider, useAppState } from '@/lib/context';
import { ButtonRow } from './components/ButtonRow';
import { ColorRow } from './components/ColorRow';
import { GradientBox } from './components/GradientBox';
import { GradientTypeToggle } from './components/GradientTypeToggle';
import { RotationSlider } from './components/RotationSlider';

import { GithubLink } from './components/GithubLink';

function App() {
  return (
    <AppStateContextProvider>
      <AppContent />
    </AppStateContextProvider>
  );
}

function AppContent() {
  return (
    <div
      className={`h-full w-full p-8 dark:bg-black bg-neutral-50 grid place-content-center transition-colors`}
    >
      <ShadowCard />
      <GithubLink />
    </div>
  );
}

function ShadowCard() {
  const colorStops = useAppState().colorStops;

  const shadowLeftColor = colorStops[0]?.color ?? '#000000';
  const shadowLeft = `${shadowLeftColor}33 -20px 5px 100px`;
  const shadowRightColor = colorStops[1]?.color ?? '#000000';
  const shadowRight = `${shadowRightColor}33 20px 5px 100px`;

  return (
    <Card
      style={{
        transition: 'box-shadow 1s',
        boxShadow: `${shadowLeft}, ${shadowRight}`,
      }}
      className='relative p-4 flex flex-col w-96 transition-colors'
    >
      <div className='flex flex-col gap-8 p-4 rounded-md'>
        <ColorRow />
        <GradientBox />
        <ButtonRow />
        <GradientTypeToggle />
        <RotationSlider />
      </div>
    </Card>
  );
}

export default App;
