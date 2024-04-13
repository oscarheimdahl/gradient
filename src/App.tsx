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
      <div
        className={`min-h-full p-4 relative w-full dark:bg-black bg-neutral-50 flex justify-center transition-colors`}
      >
        <GithubLink />
        <ShadowCard />
      </div>
    </AppStateContextProvider>
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
      className={`my-auto relative transition-colors flex flex-col w-full h-fit
      gap-4 p-4 pb-4 min-w-72 max-w-96
      sm:gap-8 sm:p-8 sm:pb-12 sm:max-w-[28rem]
      `}
    >
      {/* <div className=' rounded-md'> */}
      <ColorRow />
      <GradientBox />
      <ButtonRow />
      <GradientTypeToggle />
      <RotationSlider />
      {/* </div> */}
    </Card>
  );
}

export default App;
