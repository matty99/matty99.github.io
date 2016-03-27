// On window load. This waits until images have loaded which is essential
function pixelate() {
  // clone image
  $('.member-photo img').each(function() {
    var el = $(this);
    el.css({
        "position": "absolute"
      })
      .wrap("<div class='img_wrapper' style='display: inline-block;'>")
      .clone()
      .addClass('img_grayscale')
      .css({
        "position": "absolute",
        "z-index": "5",
        "opacity": "0"
      })
      .insertBefore(el)
      .queue(function() {
        var el = $(this);
        el.parent().css({
          "width": $('.member-photo img').width(),
          "height": $('.member-photo img').height()
        });
        el.dequeue();
      });
    if (Modernizr.canvas) {
      this.src = teamMemberHover(this.src);
    } else {
      $('.member-symbol').hide();
    }
  });

  // Fade image
  $('.member-photo').mouseover(function() {
    if ($(window).width() > 1049) $(this).parent().find('img:first').stop().animate({
      opacity: 1
    }, 600);
  })
  $('.img_grayscale').mouseout(function() {
    if ($(window).width() > 1049) $(this).stop().animate({
      opacity: 0
    }, 600);
  });
}

// Grayscale & Pixelate w/ canvas method
function teamMemberHover(src) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var imgObj = new Image();
  imgObj.src = src;
  canvas.width = imgObj.width;
  canvas.height = imgObj.height;

  // Pixelation
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;

  var relativeWidth = canvas.width * 0.15 * 0.4;
  var relativeHeight = canvas.height * 0.2 * 0.25;

  ctx.drawImage(imgObj, 0, 0, relativeWidth, relativeHeight);
  ctx.drawImage(canvas, 0, 0, relativeWidth, relativeHeight, 0, 0, canvas.width, canvas.height);

  // Greyscale
  var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var y = 0; y < imgPixels.height; y++) {
    for (var x = 0; x < imgPixels.width; x++) {
      var i = (y * 4) * imgPixels.width + x * 4;
      var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
      imgPixels.data[i] = avg;
      imgPixels.data[i + 1] = avg;
      imgPixels.data[i + 2] = avg;
    }
  }

  ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
  return canvas.toDataURL();
}
