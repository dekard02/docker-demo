import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

console.log('='.repeat(30) + ' Subject ' + '='.repeat(30));
const subject = new Subject<number>();
subject.next(1);

subject.subscribe((val) => console.log('subject subsriber 1: ' + val));
subject.next(2);

subject.subscribe((val) => console.log('subject subsriber 1: ' + val));
subject.next(3);

subject.complete();
subject.next(4);

// ==============================================================
console.log('='.repeat(30) + ' BehaviorSubject ' + '='.repeat(30));
const behaviorSubject = new BehaviorSubject('a');

behaviorSubject.subscribe((val) =>
  console.log('behaviorSubject subsriber 1: ' + val)
);
behaviorSubject.next('b');

behaviorSubject.subscribe((val) =>
  console.log('behaviorSubject subsriber 2: ' + val)
);
behaviorSubject.next('c');

behaviorSubject.complete();
behaviorSubject.next('d');

// ==============================================================
console.log('='.repeat(30) + ' ReplaySubject ' + '='.repeat(30));
const replaySubject = new ReplaySubject<string>(2);
replaySubject.next('i');

replaySubject.subscribe((val) =>
  console.log('replaySubject subsriber 1: ' + val)
);
replaySubject.next('ii');

replaySubject.subscribe((val) =>
  console.log('replaySubject subsriber 2: ' + val)
);
replaySubject.next('iii');

replaySubject.subscribe((val) =>
  console.log('replaySubject subsriber 3: ' + val)
);
replaySubject.next('iv');

replaySubject.complete();
replaySubject.next('v');
