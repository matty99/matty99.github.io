---
layout: post
title:  "Orbiting Animation"
description: A canvas animation that orbits circles at random speeds and distances from the cursor
tags:
- Front end development
- Canvas
date: 2017-02-04
---

A fun little canvas animation that orbits circles at random speeds and distances from the cursor. I generate random colours for each of the circles. Using a hsl instead of rgb I am able to restrict the colours to a set of natural looking ones. Reminded me all about trigonometry and how good of a tool it is for animation.

<canvas id="canvas" width="800" height="800"></canvas>
<script type="text/javascript">

  // Globals
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Mouse position
  var mouseX = Math.floor(canvas.width / 2);
  var mouseY = Math.floor(canvas.height / 2);

  // Generate random bounded number
  function random(min, max) {
    return parseInt(Math.random() * (max - min + 1), 10) + min;
  }

  // Generate random natural looking colour
  function randomColor() {
    var hue = random(100, 360);       // values can be between 1 - 360
    var saturation = random(70, 100); // values can be between 0 - 100%
    var lightness = random(60, 70);   // values can be between 0 - 100%
    return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
  }

  // Every circle will inherit from this class
  var circleInterface = {
    x: mouseX,
    y: mouseY,
    animationDuration: 2 * Math.PI,
    bounds: function (value, min, max) {
      return Math.max(min + this.radius, Math.min(max - this.radius, value));
    },
    setCoordinates: function (x, y) {
      this.x = this.bounds(x, 0, canvas.width);
      this.y = this.bounds(y, 0, canvas.height);
    },
  };

  // Build the array of circles that will be animated
  var circles = [];
  for (var i = 0; i < 20; i++) {
    var circle = {
      radius: random(5, 8),
      margin: random(50, 200),
      speed: random(2, 5),
      offset: random(0, 6),
      color: randomColor(),
    };
    circles.push(Object.assign(circle, circleInterface));
  }

  // Get current position of the mouse on the canvas
  function getMousePosition(canvas, event) {
    var boundingBox = canvas.getBoundingClientRect();
    return {
      x: event.clientX - boundingBox.left,
      y: event.clientY - boundingBox.top,
    };
  }

  // Listen to mouse movements and record them
  canvas.addEventListener('mousemove', function(event) {
    var mousePosition = getMousePosition(canvas, event);
    mouseX = mousePosition.x;
    mouseY = mousePosition.y;
  }, false);

  function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
  }

  // Main animation loop
  function animate(timestep) {

    // Adjust animation speed
    timestep = (timestep / 1000);

    // Clear last frame
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    circles.forEach(function (circle) {

      // Determine new intended position of the circle
      var targetX = mouseX + circle.margin * Math.cos(circle.speed * timestep + circle.offset);
      var targetY = mouseY + circle.margin * Math.sin(circle.speed * timestep + circle.offset);

      // The angle of the line between the current point and the target point
      var angle = Math.atan2(targetY - circle.y, targetX - circle.x);

      // Calculate the new intended position of the circle
      var newX = circle.x + (circle.speed * Math.cos(angle));
      var newY = circle.y + (circle.speed * Math.sin(angle));

      // Save the new values to the object
      circle.setCoordinates(newX, newY);

      // Draw the frame
      drawCircle(circle);
    });

    // Call the animatiion to continue the loop
    requestAnimationFrame(animate);
  }

  // Starts the animation loop
  requestAnimationFrame(animate);

</script>

{% highlight javascript %}
// Globals
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Mouse position
var mouseX = Math.floor(canvas.width / 2);
var mouseY = Math.floor(canvas.height / 2);

// Generate random bounded number
function random(min, max) {
  return parseInt(Math.random() * (max - min + 1), 10) + min;
}

// Generate random natural looking colour
function randomColor() {
  var hue = random(100, 360);       // values can be between 1 - 360
  var saturation = random(70, 100); // values can be between 0 - 100%
  var lightness = random(60, 70);   // values can be between 0 - 100%
  return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
}

// Every circle will inherit from this class
var circleInterface = {
  x: mouseX,
  y: mouseY,
  animationDuration: 2 * Math.PI,
  bounds: function (value, min, max) {
    return Math.max(min + this.radius, Math.min(max - this.radius, value));
  },
  setCoordinates: function (x, y) {
    this.x = this.bounds(x, 0, canvas.width);
    this.y = this.bounds(y, 0, canvas.height);
  },
};

// Build the array of circles that will be animated
var circles = [];
for (var i = 0; i < 20; i++) {
  var circle = {
    radius: random(5, 8),
    margin: random(50, 200),
    speed: random(2, 5),
    offset: random(0, 6),
    color: randomColor(),
  };
  circles.push(Object.assign(circle, circleInterface));
}

// Get current position of the mouse on the canvas
function getMousePosition(canvas, event) {
  var boundingBox = canvas.getBoundingClientRect();
  return {
    x: event.clientX - boundingBox.left,
    y: event.clientY - boundingBox.top,
  };
}

// Listen to mouse movements and record them
canvas.addEventListener('mousemove', function(event) {
  var mousePosition = getMousePosition(canvas, event);
  mouseX = mousePosition.x;
  mouseY = mousePosition.y;
}, false);

function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
}

// Main animation loop
function animate(timestep) {

  // Adjust animation speed
  timestep = (timestep / 1000);

  // Clear last frame
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach(function (circle) {

    // Determine new intended position of the circle
    var targetX = mouseX + circle.margin * Math.cos(circle.speed * timestep + circle.offset);
    var targetY = mouseY + circle.margin * Math.sin(circle.speed * timestep + circle.offset);

    // The angle of the line between the current point and the target point
    var angle = Math.atan2(targetY - circle.y, targetX - circle.x);

    // Calculate the new intended position of the circle
    var newX = circle.x + (circle.speed * Math.cos(angle));
    var newY = circle.y + (circle.speed * Math.sin(angle));

    // Save the new values to the object
    circle.setCoordinates(newX, newY);

    // Draw the frame
    drawCircle(circle);
  });

  // Call the animatiion to continue the loop
  requestAnimationFrame(animate);
}

// Starts the animation loop
requestAnimationFrame(animate);

{% endhighlight %}
