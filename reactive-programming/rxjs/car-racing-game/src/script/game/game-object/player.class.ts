import { interval, map, tap } from 'rxjs';
import { GameImageComponent } from '../../game-looper/game-component.class';
import { CAR_WIDTH, GAME_WIDTH, PLAYER_IMAGE } from '../../constants';

export class Player extends GameImageComponent {
  movingDirection: 'ahead' | 'right' | 'left' = 'ahead';
  moving$;

  constructor(
    public x: number,
    public y: number,
    public speed: number,
    public width: number,
    public height: number
  ) {
    super(x, y, PLAYER_IMAGE, width, height);

    this.moving$ = interval(10).pipe(
      map(() => this),
      tap(({ movingDirection }) => {
        switch (movingDirection) {
          case 'right':
            if (this.x > GAME_WIDTH - CAR_WIDTH - 5) break;
            this.x += speed + 2;
            break;
          case 'left':
            if (this.x < 0 + 5) break;
            this.x -= speed + 2;
            break;
        }
      })
    );
  }
}
