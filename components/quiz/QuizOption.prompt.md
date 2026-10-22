Quiz answer row with correct (green fill, check springs in) and retry ("Not quite", sideways nudge) states.

```jsx
<QuizOption state={picked === 1 ? 'correct' : 'idle'} onClick={() => setPicked(1)}>The crankshaft</QuizOption>
<QuizOption state={wrongTries ? 'retry' : 'idle'} attempt={wrongTries} onClick={() => setWrongTries(n => n + 1)}>The fuel tank</QuizOption>
```

- Never use red or "Wrong". Pair with a hint that points at the stage.
