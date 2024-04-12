import { Card } from '@/components/ui/card';
import {
  AppStateContextProvider,
  useAppState,
  useDispatch,
} from '@/lib/context';
import { useGradient } from '@/lib/hooks';
import { ColorRow } from './components/ColorRow';
import { GradientBox } from './components/GradientBox';
import { ButtonRow } from './components/ButtonRow';
import { RotationSlider } from './components/RotationSlider';
import { GradientTypeToggle } from './components/GradientTypeToggle';

function App() {
  return (
    <AppStateContextProvider>
      {/* <Preview /> */}
      <AppContent />
    </AppStateContextProvider>
  );
}
function Preview() {
  const bgGradient = useGradient();

  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch({ type: 'SET_PREVIEW', payload: false })}
      style={{
        background: bgGradient,
      }}
      className='absolute w-full h-full top-0 '
    ></button>
  );
}

function AppContent() {
  return (
    <div
      className={` absolute top-0 h-full w-full p-8 bg-black grid place-content-center transition-colors`}
    >
      <ShadowCard />
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
      className='p-4 flex flex-col w-96'
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
