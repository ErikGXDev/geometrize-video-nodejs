A neat script that turns your videos into geometric primitives.

### Seagulls

https://github.com/ErikGaDev/geometrize-video-script/assets/54033728/49e25ec3-747b-4001-9776-42e89d430839

|             | Resolution | FPS | Length / Time to render |
| ----------- | ---------- | --- | ----------------------- |
| Original    | 3840x2160  | 60  | 25s long                |
| Geometrized | 1920x1080  | 24  | took 47m to render      |

Settings:

```h
"shapes": "triangle rotated_ellipse circle",
"shapeAmount": 500,
"candidates": 200,
"mutations": 50,
"alpha": 128,
"fps": 24,
"workers": 8
```

### Wildlife

https://github.com/ErikGaDev/geometrize-video-script/assets/54033728/ce5e4fa9-85f6-44ed-bf98-34ec5061772f

|             | Resolution | FPS | Length / Time to render |
| ----------- | ---------- | --- | ----------------------- |
| Original    | 1920x1080  | 30  | 27s long                |
| Geometrized | 1920x1080  | 5   | took 10m 27s to render  |

Settings:

```h
"shapes": "triangle",
"shapeAmount": 500,
"candidates": 500,
"mutations": 100,
"alpha": 128,
"fps": 5,
"workers": 4
```
