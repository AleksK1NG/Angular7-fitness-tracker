import {
  TrainingActions,
  SET_FINISHED_TRAININGS,
  SET_AVAILABLE_TRAININGS,
  START_TRAINING,
  STOP_TRAINING
} from './training.actions';
import { Exercise } from './exercise.model';

export interface State {
  availableExercises: Array<Exercise>;
  finishedExercises: Array<Exercise>;
  activeTraining: Exercise;
}

const initialState: State = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export const trainingReducer = (state = initialState, action: TrainingActions) => {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: action.payload
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default:
      return state;
  }
};

export const getAvailableTrainings = (state: State) => state.availableExercises;
export const getFinishedTrainings = (state: State) => state.finishedExercises;
export const getActiveTraining = (state: State) => state.activeTraining;
