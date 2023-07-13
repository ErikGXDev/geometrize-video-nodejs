A neat script that turns your videos into geometric primitives.

### Seagulls

**Left half: Geometrized<br>Right half: Original**

https://raw.githubusercontent.com/ErikGaDev/geometrize-video-script/main/readme/seagulls.mp4

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

**Left half: Original<br>Right half: Geometrized**

https://raw.githubusercontent.com/ErikGaDev/geometrize-video-script/main/readme/wildlife.mp4

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
