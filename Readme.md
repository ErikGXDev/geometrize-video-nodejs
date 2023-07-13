A neat script that turns your videos into geometric primitives.

# How to use

1. Clone the repository
2. Get the executable for you OS from https://github.com/ErikGaDev/geometrize-haxe-cli/releases/latest
3. Put it in the same directory as the index.js file
4. Run `npm install`
5. Configure `settings.json` (See [Settings](#Settings))
6. Run `node index.js`

# Settings

Here are keys and values you can put into your `settings.json` file:

| Argument    | Description                                                                  | Expected Value                                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| shapes      | What shapes to use for geometrizing                                          | One or more of: rectangle, rotated_rectangle, triangle, ellipse, rotated_ellipse, circle, line, quadratic_bezier, polyline (**separated by space**) |
| shapeAmount | How many shapes per frame                                                    | number higher than 0 (100-1000 recommended)                                                                                                         |
| candidates  | Number of candidate shapes added to image output                             | number higher than 0 (20-500 recommended)                                                                                                           |
| mutations   | Number of mutations per candidate                                            | number higher than 0 (20-200 recommended)                                                                                                           |
| alpha       | Alpha value of shapes                                                        | number between 1-255 (128 recommended)                                                                                                              |
| fps         | Target fps of geometrized video                                              | number higher than 0                                                                                                                                |
| workers     | How many concurrent scripts/threads that compute a section of the video each | number between 0-16 (4-8 recommended)                                                                                                               |

# Examples

### Seagulls

**Left half: Geometrized<br>Right half: Original**

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

**Left half: Original<br>Right half: Geometrized**

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
