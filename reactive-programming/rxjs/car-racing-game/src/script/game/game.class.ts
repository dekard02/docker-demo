import { GameLooper } from '../game-looper/game-looper.class';
import { Car } from './game-object/car.class';
import { GameInfo, GameState } from './game.type';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  skipWhile,
  takeWhile,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import { Player } from './game-object/player.class';
import { CAR_HEIGHT, CAR_WIDTH, GAME_HEIGHT, GAME_WIDTH } from '../constants';
import { Road } from './game-object/road.class';
import { GamePlay } from './game-play.class';

export class Game {
  gameLooper: GameLooper;
  gamePlay: GamePlay;
  gameState: GameState;
  gameInput$ = new BehaviorSubject<string[]>([]);

  gameInfoElem = {
    lives: this.document.getElementById('lives'),
    score: this.document.getElementById('score'),
    level: this.document.getElementById('level'),
  };

  constructor(
    private readonly canvasCtx: CanvasRenderingContext2D,
    private readonly document: Document
  ) {
    this.gameLooper = new GameLooper(canvasCtx, document);

    this.gameState = this.initGameState();
    this.gamePlay = new GamePlay(this.gameState);

    this.init();
  }

  initGameState() {
    return {
      cars$: new BehaviorSubject<Car[]>([]),
      player$: new BehaviorSubject<Player>(
        new Player(
          GAME_WIDTH / 2 - CAR_WIDTH / 2,
          GAME_HEIGHT - CAR_HEIGHT - 10,
          1,
          CAR_WIDTH,
          CAR_HEIGHT
        )
      ),
      road$: new BehaviorSubject<Road>(new Road()),
      gameInfo$: new BehaviorSubject<GameInfo>({
        isOver: false,
        lives: 3,
        score: 0,
        level: 1,
      }),
    };
  }

  private init() {
    combineLatest([
      this.gameState.road$,
      this.gameState.cars$,
      this.gameState.gameInfo$,
      this.gameState.player$,
    ])
      .pipe(
        tap(([road, cars, gameInfo, player]) => {
          this.gameLooper.gameRenderer.setComponents(
            road,
            ...road.roadLines,
            ...cars,
            player
          );
        }),
        takeWhile(([road, cars, gameInfo, player]) => !gameInfo.isOver)
      )
      .subscribe();

    this.gameLooper.keyCodeIsDown$.subscribe((keyCodes) =>
      this.gamePlay.keyDown(keyCodes)
    );
  }

  start() {
    this.gameLooper.startLooping();

    this.boot();
  }

  gameRestart() {
    this.gameState = this.initGameState();
    this.gamePlay = new GamePlay(this.gameState);

    this.init();
    this.boot();
  }

  private boot() {
    this.randomCar();
    this.gamePlay.handleCollision();
    this.gamePlay.handleScore();
    this.gamePlay.handleLevelUp();
    this.displayGameInfo();
    this.onGameOver();
  }

  private onGameOver() {
    this.gameState.gameInfo$
      .pipe(
        filter((gameInfo) => gameInfo.isOver === true),
        delay(100)
      )
      .subscribe(() => {
        this.gameState.road$.value.isMoving = false;
        const score = this.gameState.gameInfo$.value.score;
        alert(`Hết cứu, bạn đã thua và được ${score} điểm, hãy chơi lại`);

        this.document.dispatchEvent(
          new KeyboardEvent('keyup', {
            key: 'ArrowLeft',
            code: 'ArrowLeft',
            view: window,
          })
        );

        this.document.dispatchEvent(
          new KeyboardEvent('keyup', {
            key: 'ArrowRight',
            code: 'ArrowRight',
            view: window,
          })
        );

        this.gameRestart();
      });
  }

  private randomCar() {
    timer(0, 1000)
      .pipe(
        skipWhile(() => {
          return !this.document.hasFocus();
        }),
        withLatestFrom(this.gameState.gameInfo$, this.gameState.cars$),
        takeWhile(([_, gameInfo]) => !gameInfo.isOver),
        tap(() => this.gamePlay.appendRandomCar())
      )
      .subscribe();
  }

  private displayGameInfo() {
    this.gameState.gameInfo$
      .pipe(takeWhile((gameInfo) => !gameInfo.isOver))
      .subscribe((gameInfo) => {
        this.gameInfoElem.level!.innerText = 'Level: ' + gameInfo.level;
        this.gameInfoElem.score!.innerText = 'Score: ' + gameInfo.score;
        this.gameInfoElem.lives!.innerText = 'Lives: ' + gameInfo.lives;
      });
  }
}
