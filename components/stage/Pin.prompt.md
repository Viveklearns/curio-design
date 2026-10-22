Annotation pin pointing at a part of the 3D subject; its look changes with level (name → explanation → measurement).

```jsx
<Pin x={24} y={22} level={level} index={0} title="Piston"
  detail={level === 2 ? 'A tiny explosion pushes it down.' : 'bore 89 mm · stroke 80 mm'} />
<Pin x={66} y={62} side="left" level={level} index={1} title="Cylinders" detail="60° V · 3.5 L" />
```

- Pins on the right half of the stage use `side="left"` so labels never clip.
- Toggle `visible` after the camera settles; pass `index` in reading order for the stagger.
