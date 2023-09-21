import {
  EMPTY,
  concat,
  delay,
  filter,
  finalize,
  interval,
  map,
  merge,
  of,
  reduce,
  startWith,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

const obv$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  map((each, index) => each * 2),
  filter((value, index) => value % 2 === 0)
);

obv$
  .pipe(
    startWith(0),
    tap((val) => console.log('🔰 Before map: ' + val)),
    map((value, index) => value * 2),
    tap((val) => console.log('🏁 After map: ' + val)),
    finalize(() => console.log('Observable completed!!! 💥💥💥'))
  )
  .subscribe((each) => console.log(each));

obv$
  .pipe(reduce((acc, val) => acc + val, 0))
  .subscribe((sum) => console.log('Sum: ' + sum));

console.log('='.repeat(70));

merge(
  interval(1000).pipe(
    takeUntil(timer(3050)),
    map(() => '⏲ intervel 1')
  ),
  interval(500).pipe(
    take(5),
    map(() => '⏲ intervel 2')
  )
).subscribe((val) => console.log(val));

concat(
  EMPTY.pipe(startWith('='.repeat(70)), delay(4000)),
  EMPTY.pipe(startWith('3'), delay(1000)),
  EMPTY.pipe(startWith('2'), delay(1000)),
  EMPTY.pipe(startWith('1'), delay(1000)),
  EMPTY.pipe(startWith(`TIME'S UP!!! ⌛⌛⌛`))
).subscribe(console.log);
