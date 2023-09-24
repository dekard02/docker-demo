import { RoadLine } from './road-line.class';
import { GameRectShapeComponent } from '../../game-looper/game-component.class';
import { GAME_HEIGHT, GAME_WIDTH } from '../../constants';
import { BehaviorSubject, takeWhile, tap } from 'rxjs';

export class Road extends GameRectShapeComponent {
  roadLines: RoadLine[] = [];
  roadMoving$ = new BehaviorSubject(true);
  isMoving = true;

  private static readonly ROAD_LINE_WIDTH = 10;
  private static readonly ROAD_LINE_HEIGH = 30;

  constructor() {
    super(0, 0, '#837e7e', GAME_WIDTH, GAME_HEIGHT);

    for (let i = -1; i <= 6; i++) {
      const x = GAME_WIDTH / 2 - Road.ROAD_LINE_WIDTH / 2;
      const y = i * 75;
      this.roadLines.push(
        new RoadLine(
          x,
          y,
          1,
          '#ffffff',
          Road.ROAD_LINE_WIDTH,
          Road.ROAD_LINE_HEIGH
        )
      );
    }

    this.roadLines.forEach((line) => {
      line.onRoadLineMoving$
        .pipe(
          tap((road) => {
            road.isMoving = this.isMoving;
          }),
          takeWhile(() => this.isMoving)
        )
        .subscribe();
      line.onRoadLineDisapper$.pipe(takeWhile(() => this.isMoving)).subscribe();
    });
  }

  changeSpeed(speed: number) {
    this.roadLines.forEach((line) => {
      line.speed = speed;
    });
  }
}
