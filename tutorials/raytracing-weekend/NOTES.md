# Notes

Link: https://raytracing.github.io/books/RayTracingInOneWeekend.html

## 1. Overview

"Ray tracing" can mean many things.

This is technically a "path tracer."

## 2. Output an Image

### 2.1 PPM Image Format

PPM file is a text readable image file
 - P3 means colors are in ASCII
 - then specify number of COLUMNS then ROWS
 - then specify the value for the max color (white = `255`)
 - then specify the RGB triplets
 - NOTE: a single line in the PPM file corresponds to a row

### 2.2 Creating Image File

Write `main.cc` with the code

Write `CMakeLists.txt`. Specify the `.exe` filename with this line:

```
add_executable(inOneWeekend main.cc)
```

After writing `main.cc` and `CMakeLists.txt`, build the app with CMake.

```
cmake -B build
cmake --build build
```

Then run the newly built program to generate the image:

```
build\Debug\inOneWeekend.exe > image.ppm
```

Optimized building command for release:

```
cmake --build build --config release
```

then

```
build\Release\inOneWeekend.exe > image.ppm
```

### 2.3 Progress Tracker

```
std::clog << "\rScanlines remaining: " << (image_height - j) << ' ' << std::flush;
```

This will only show up during the for loop then clear out when it's done generating the image

"Don't worry — you'll have lots of time in the future to watch a slowly updating progress line as we expand our ray tracer." lulz

## 3. vec3 Class

Usually geometry and colors are 4D
 - RGB also needs a transparency alpha
 - 3D position needs a 4th for "homogenous coordinate"

We will use the same class for colors and positions - can allow for silly things like subtract position from color but also LESS CODE.

## Rays, Camera, Background

### 4.1 ray Class

Compute what color is seen along a ray

```
P(t) = A + t * b
```
 - `P_vector` is a position along a line
 - `A_vector` is the ray's origin
 - `b_vector` is the ray's  direction
 - `t_scalar` is a real number (`double`) used to "move along the ray"

In C++ functions `ray::origin()` and `ray::direction()` both return an immutable reference to their members

## Future Reference

https://github.com/RayTracing/raytracing.github.io/