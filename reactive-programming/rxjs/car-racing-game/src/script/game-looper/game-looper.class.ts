import {
  BehaviorSubject,
  EMPTY,
  Observable,
  buffer,
  bufferCount,
  expand,
  filter,
  map,
  of,
  share,
} from 'rxjs';
import { GameRenderer } from './game-renderer.class';
import { FrameData } from './type/game-looper.type';
import { GameControl } from './game-control.class';

export class GameLooper {
  gameRenderer: GameRenderer;
  gameControl: GameControl;
  frames$: Observable<number>;
  keyCodeIsDown$ = new BehaviorSubject<string[]>([]);

  constructor(
    public canvasCtx: CanvasRenderingContext2D,
    private document: Document
  ) {
    this.gameRenderer = new GameRenderer(canvasCtx);

    this.frames$ = of(undefined).pipe(
      expand((val) => this.calculateStep(val)),
      filter((frame) => frame !== undefined),
      map((frame) => frame.deltaTime),
      share()
    );

    this.gameControl = new GameControl(document);
  }

  getFps$() {
    return this.frames$.pipe(
      bufferCount(10),
      map((frames) => {
        const total = frames.reduce((acc, curr) => {
          acc += curr;
          return acc;
        }, 0);

        return 1 / (total / frames.length);
      })
    );
  }

  private calculateStep(
    prevFrame: FrameData | undefined
  ): Observable<FrameData> {
    const obv$ = new Observable<FrameData>((subscriber) => {
      requestAnimationFrame((frameStartTime) => {
        const deltaTime = prevFrame
          ? (frameStartTime - prevFrame.frameStartTime) / 1000
          : 0;
        subscriber.next({ frameStartTime, deltaTime });
      });
    });
    return obv$;
  }

  startLooping() {
    this.frames$.subscribe(() => this.gameRenderer.render());
    this.gameControl.keyCodeListener$.subscribe((codes) =>
      this.keyCodeIsDown$.next(codes)
    );
  }
}
