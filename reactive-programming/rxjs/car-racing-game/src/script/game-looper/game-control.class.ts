import { Observable, fromEvent, map, merge, scan, share } from 'rxjs';
import { EventType } from './type/game-control.type';

export class GameControl {
  keyDown$: Observable<EventType>;
  keyUp$: Observable<EventType>;
  keyCodeListener$: Observable<string[]>;

  constructor(private document: Document) {
    this.keyDown$ = fromEvent(document, 'keydown').pipe(
      map((event) => ({
        type: 'keydown',
        event: event as KeyboardEvent,
      }))
    );

    this.keyUp$ = fromEvent(document, 'keyup').pipe(
      map((event) => ({
        type: 'keyup',
        event: event as KeyboardEvent,
      }))
    );

    this.keyCodeListener$ = merge(this.keyDown$, this.keyUp$).pipe(
      scan((acc, keyEvent) => {
        if (keyEvent.type === 'keydown') {
          acc.add(keyEvent.event.code);
        } else {
          acc.delete(keyEvent.event.code);
        }
        return acc;
      }, new Set<string>()),
      map((codeSet) => Array.from(codeSet)),
      share()
    );
  }
}
