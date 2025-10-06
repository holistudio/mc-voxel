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

## Future Reference

https://github.com/RayTracing/raytracing.github.io/