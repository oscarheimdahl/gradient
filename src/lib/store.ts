import { newRandomColorStop } from '@/lib/utils';

export type ColorStop = {
  color: string;
  id: `${string}-${string}-${string}-${string}-${string}`;
  opacity: string;
};

export enum GradientType {
  Linear = 'linear',
  Radial = 'radial',
}

export type AppState = {
  rotation: number;
  colorStops: ColorStop[];
  gradientType: GradientType;
  preview: boolean;
  userHasTriedOpacity: boolean;
};

export const initialState: AppState = {
  rotation: 120,
  colorStops: [newRandomColorStop(), newRandomColorStop()],
  gradientType: GradientType.Linear,
  preview: false,
  userHasTriedOpacity: !!localStorage.getItem('userHasTriedOpacity'),
};

export type ActionType =
  | { type: 'SET_ROTATION'; payload: number }
  | { type: 'SET_GRADIENT_TYPE'; payload: GradientType }
  | { type: 'SET_COLOR_STOPS'; payload: ColorStop[] }
  | { type: 'REVERSE_COLOR_STOPS' }
  | { type: 'RANDOMIZE_COLOR_STOPS' }
  | { type: 'DELETE_COLOR_STOP'; payload: string }
  | {
      type: 'UPDATE_COLOR_STOP';
      payload: { id: string; color: string; opacity: string };
    }
  | { type: 'ADD_COLOR_STOP'; payload: ColorStop }
  | { type: 'SET_PREVIEW'; payload: boolean }
  | { type: 'SET_USER_HAS_TRIED_OPACITY' };

export function reducer(state: AppState, action: ActionType) {
  if (action.type === 'SET_ROTATION') {
    return { ...state, rotation: action.payload };
  }
  if (action.type === 'SET_GRADIENT_TYPE') {
    return { ...state, gradientType: action.payload };
  }
  if (action.type === 'SET_COLOR_STOPS') {
    return { ...state, colorStops: action.payload };
  }
  if (action.type === 'REVERSE_COLOR_STOPS') {
    return { ...state, colorStops: [...state.colorStops].reverse() };
  }
  if (action.type === 'DELETE_COLOR_STOP') {
    return {
      ...state,
      colorStops: state.colorStops.filter(
        (colorStop) => colorStop.id !== action.payload
      ),
    };
  }
  if (action.type === 'UPDATE_COLOR_STOP') {
    return {
      ...state,
      colorStops: state.colorStops.map((colorStop) =>
        colorStop.id === action.payload.id
          ? { ...colorStop, ...action.payload }
          : colorStop
      ),
    };
  }
  if (action.type === 'ADD_COLOR_STOP') {
    return {
      ...state,
      colorStops: [...state.colorStops, action.payload],
    };
  }
  if (action.type === 'RANDOMIZE_COLOR_STOPS') {
    return {
      ...state,
      rotation: Math.floor(Math.random() * 360),
      colorStops: Array(state.colorStops.length)
        .fill(null)
        .map(newRandomColorStop),
    };
  }
  if (action.type === 'SET_PREVIEW') {
    return {
      ...state,
      preview: action.payload,
    };
  }
  if (action.type === 'SET_USER_HAS_TRIED_OPACITY') {
    localStorage.setItem('userHasTriedOpacity', 'true');
    return {
      ...state,
      userHasTriedOpacity: true,
    };
  }

  return state;
}
