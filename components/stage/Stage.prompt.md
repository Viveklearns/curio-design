Stage panel for the 3D subject (three.js canvas goes inside); place Pins as absolutely positioned children.

```jsx
<Stage minHeight={480}>
  <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
  <Pin x={24} y={22} level={level} title="Piston" detail="A tiny explosion pushes it down." />
</Stage>
```

- `tone`: studio (default) | day
