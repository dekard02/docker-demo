import { random } from './../../utils/random.util';
import {
  CAR_HEIGHT,
  CAR_IMAGES,
  CAR_WIDTH,
  EXPLOSION_HEIGH,
  EXPLOSION_IMAGE,
  EXPLOSION_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
} from '../../constants';
import { GameImageComponent } from '../../game-looper/game-component.class';
import {
  tap,
  filter,
  map,
  Observable,
  takeWhile,
  share,
  take,
  interval,
} from 'rxjs';

export class Car extends GameImageComponent {
  onCarDisapper$: Observable<Car>;
  onCarMoving$: Observable<Car>;
  isCrash = false;

  constructor(
    public x: number,
    public y: number,
    public speed: number,
    public imagePath: string,
    public width: number,
    public heigh: number
  ) {
    super(x, y, imagePath, width, heigh);
    const moving$ = interval(10).pipe(
      map(() => this),
      tap((car) => {
        car.y += speed;
        if (car.isCrash) {
          car.imagePath = EXPLOSION_IMAGE;
          car.heigh = EXPLOSION_HEIGH;
          car.width = EXPLOSION_WIDTH;
        }
      }),
      share()
    );

    this.onCarMoving$ = moving$.pipe(takeWhile((car) => car.y < GAME_HEIGHT));

    this.onCarDisapper$ = moving$.pipe(
      filter((car) => car.y - GAME_HEIGHT > 50),
      take(1)
    );
  }

  isCarDisapear() {
    return this.y - GAME_HEIGHT > 100;
  }

  static randomCar(speed: number): Car {
    const randomX = random(0, GAME_WIDTH - CAR_WIDTH);
    const y = 0 - CAR_HEIGHT - 5;
    const randomImage = CAR_IMAGES[random(0, CAR_IMAGES.length - 1)];

    return new Car(randomX, y, speed, randomImage, CAR_WIDTH, CAR_HEIGHT);
  }
}
