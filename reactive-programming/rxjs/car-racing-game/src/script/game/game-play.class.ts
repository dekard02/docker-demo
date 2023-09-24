import { interval, takeWhile, tap, withLatestFrom } from 'rxjs';
import { CAR_HEIGHT, CAR_WIDTH } from '../constants';
import { Car } from './game-object/car.class';
import { GameState } from './game.type';

export class GamePlay {
  constructor(public gameState: GameState) {}

  keyDown(keyCodes: string[]) {
    const player = this.gameState.player$.getValue();
    if (keyCodes.length === 0) {
      player.movingDirection = 'ahead';
      return;
    }

    keyCodes.forEach((code) => {
      switch (code) {
        case 'ArrowRight':
          player.movingDirection = 'right';
          break;
        case 'ArrowLeft':
          player.movingDirection = 'left';
          break;
        default:
          player.movingDirection = 'ahead';
          break;
      }
    });

    this.gameState.player$.next(player);
  }

  handleCollision() {
    this.gameState.player$
      .getValue()
      .moving$.pipe(
        withLatestFrom(this.gameState.gameInfo$),
        takeWhile(([_, gameInfo]) => !gameInfo.isOver)
      )
      .subscribe(([player, gameInfo]) => {
        const cars = this.gameState.cars$.getValue();
        cars.forEach((car) => {
          if (
            car.x + CAR_WIDTH >= player.x &&
            car.x <= player.x + CAR_WIDTH &&
            car.y + CAR_HEIGHT >= player.y &&
            car.y <= player.y + CAR_HEIGHT
          ) {
            if (!car.isCrash) {
              gameInfo.lives--;
              car.isCrash = true;

              if (gameInfo.lives === 0) {
                gameInfo.isOver = true;
              }
              this.gameState.gameInfo$.next(gameInfo);
            }
          }
        });
      });
  }

  appendRandomCar() {
    const cars = this.gameState.cars$.getValue();
    if (cars.length > 4) return;

    const car = Car.randomCar(this.gameState.gameInfo$.value.level);
    this.gameState.cars$.next([...cars, car]);

    car.onCarDisapper$.subscribe((disapperCar) => {
      const cars = this.gameState.cars$
        .getValue()
        .filter((car) => car !== disapperCar);
      this.gameState.cars$.next(cars);
    });
    return car;
  }

  handleScore() {
    interval(100)
      .pipe(
        withLatestFrom(this.gameState.gameInfo$),
        takeWhile(([_, gameInfo]) => !gameInfo.isOver),
        tap(([_, gameInfo]) => {
          this.gameState.gameInfo$.next({
            ...gameInfo,
            score: ++gameInfo.score,
          });
        })
      )
      .subscribe();
  }

  handleLevelUp() {
    interval(5000)
      .pipe(
        withLatestFrom(this.gameState.gameInfo$),
        takeWhile(([_, gameInfo]) => !gameInfo.isOver),
        tap(([_, gameInfo]) => {
          if (gameInfo.level === 10) return;
          this.gameState.gameInfo$.next({
            ...gameInfo,
            level: ++gameInfo.level,
          });
        })
      )
      .subscribe(([_, gameInfo]) => {
        const player = this.gameState.player$.value;
        player.speed = gameInfo.level;
        this.gameState.player$.next(player);

        const road = this.gameState.road$.value;
        road.changeSpeed(gameInfo.level);
        this.gameState.road$.next(road);
      });
  }
}
