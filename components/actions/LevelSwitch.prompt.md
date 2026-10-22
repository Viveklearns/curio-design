Level 1/2/3 switch whose indicator slides between segments; sits top-right of the studio frame.

```jsx
const [level, setLevel] = React.useState(1);
<LevelSwitch value={level} onChange={setLevel} />
<LevelSwitch tone="paper" value={2} />
```

- Never label by age. Changing level re-renders pins, readouts and the question.
