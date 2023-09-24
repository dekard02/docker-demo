import { Observable, filter, interval, map, share, tap } from 'rxjs';
import { GameRectShapeComponent } from '../../game-looper/game-component.class';
import { GAME_HEIGHT } from '../../constants';

export class RoadLine extends GameRectShapeComponent {
  onRoadLineDisapper$: Observable<RoadLine>;
  onRoadLineMoving$: Observable<RoadLine>;
  isMoving = true;

  constructor(
    public x: number,
    public y: number,
    public speed: number,
    public color: string,
    public width: number,
    public heigh: number
  ) {
    super(x, y, color, width, heigh);

    this.onRoadLineMoving$ = interval(5).pipe(
      map(() => this),
      filter((line) => line.isMoving),
      tap((line) => {
        if (this.isMoving) {
          line.y += speed;
        }
      }),
      share()
    );

    this.onRoadLineDisapper$ = this.onRoadLineMoving$.pipe(
      filter((line) => line.y - GAME_HEIGHT > 50),
      tap((line) => {
        line.onRoadLineDisapper$.subscribe((line) => {
          line.y = -50;
        });
      })
    );
  }
}
