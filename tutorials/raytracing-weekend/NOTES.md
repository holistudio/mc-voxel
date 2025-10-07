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

### 4.2 Send rays into scene

 1. Compute the ray's direction from the "eye through the pixel"
 2. Determine when the ray intersects or hits an object
 3. Compute the color at the intersection point. 

Always use a non-square image or window size, otherwise you'll confuse x and y

```
auto aspect_ratio = 16.0 / 9.0;
int image_width = 400;

// Calculate the image height, and ensure that it's at least 1.
int image_height = int(image_width / aspect_ratio);
image_height = (image_height < 1) ? 1 : image_height;

// Viewport widths less than one are ok since they are real valued.
auto viewport_height = 2.0;
auto viewport_width = viewport_height * (double(image_width)/image_height);
```

 - Viewport height can be real-valued
 - Image height cannot. It MUST be an integer
 - `aspect_ratio` is the ideal ratio but may not be the actual ratio between `image_width` and `image_height`
 - Image height has to be rounded down to the nearest integer, but that can increase the aspect ratio.

Assume camera center is in the middle of the viewport. +Y is up, +Z forward, +X right directions.
 - BUT our viewport/image coordinate is (0,0) on the upper left corner of the image and scans top to down, so Y increases as we go down the image.
 - Let `Q` be the origin of the image coordinate system
 - `V_u` goes from left to right at a step of `delta_u`
 - `V_v` goes from top to bottom at a step of `delta_v`
 - The first pixel coordinate is (`delta_u/2`,`delta_v/2`) from `Q`



## Future Reference

https://github.com/RayTracing/raytracing.github.io/