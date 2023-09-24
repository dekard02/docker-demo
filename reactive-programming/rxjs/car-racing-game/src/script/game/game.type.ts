import { BehaviorSubject } from 'rxjs';
import { Car } from './game-object/car.class';
import { Player } from './game-object/player.class';
import { Road } from './game-object/road.class';

export interface GameInfo {
  isOver: boolean;
  score: number;
  lives: number;
  level: number;
}

export interface GameState {
  cars$: BehaviorSubject<Car[]>;
  road$: BehaviorSubject<Road>;
  player$: BehaviorSubject<Player>;
  gameInfo$: BehaviorSubject<GameInfo>;
}
