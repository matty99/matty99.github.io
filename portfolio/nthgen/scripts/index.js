// Create the squares in the first section of the page
function create_square_background () {
  var num_columns = 20;
  var num_rows = 20;
  var i;
  for (i = 0; i < num_columns * num_rows; i++) {
    var square = $("<div>", {class: "square"});
    $("#intro-cover header").append(square);
  }

  // Fade out logo in the squares
  setTimeout(function () {
    var square_list = document.getElementsByClassName('square');
    square_list[2 * num_columns - 3].style.backgroundColor = 'transparent';
    square_list[2 * num_columns - 2].style.backgroundColor = 'transparent';
    square_list[3 * num_columns - 2].style.backgroundColor = 'transparent';
  }, 2200);
}

function square_transition (progress) {
    var i;
    var square_list = document.getElementsByClassName('square');
    if (progress == 0) {
      for (i = 0; i < square_list.length; i++) {
        square_list[i].style.opacity = 1.0;
      }
    } else {
      i = Math.floor(square_list.length * progress);
      if (i < square_list.length) square_list[i].style.opacity = 0.0;
      if (i < square_list.length - 1) square_list[i+1].style.opacity = 0.1;
      if (i < square_list.length - 2) square_list[i+2].style.opacity = 0.2;
      if (i < square_list.length - 3) square_list[i+3].style.opacity = 0.3;
      if (i < square_list.length - 4) square_list[i+4].style.opacity = 0.4;
      if (i < square_list.length - 5) square_list[i+5].style.opacity = 0.5;
      if (i < square_list.length - 6) square_list[i+6].style.opacity = 0.6;
      if (i < square_list.length - 7) square_list[i+7].style.opacity = 0.7;
      if (i < square_list.length - 8) square_list[i+8].style.opacity = 0.8;
      if (i < square_list.length - 9) square_list[i+9].style.opacity = 0.9;
    }
}

// Scrolling header
// http://tympanus.net/codrops/2013/06/06/on-scroll-animated-header/


/* Globals */
var ww, wh; // Window Width, Window Height
var controller = new ScrollMagic(); // Main Scroll Magic controller

// Scenes
var header;

var intro1, intro2, intro3;
var buffer1, buffer2;
var video1, video2;
var split, footer1, footer2;
var ddEnterScenes = [];
var ddSubtitleEnterScenes = [];
var ddLeaveScenes = [];

// Mobile Staff controller
var staffController = new ScrollMagic({container: $("#team"), vertical: false});
var staff1 = [];
var staff2 = [];

$(function () {
    if (Modernizr.video && !Modernizr.touch) {
      // Add anchor for top of page
      createAnchorPoint("top", $(window).height());
      // Anchor point for split animation start
      createAnchorPoint("start-split", $(window).height() * 1.25);
      // Anchor point for split animation end
      createAnchorPoint("end-split", $(window).height() * 2.25);
      $("#static-intro").remove();
    }
    $("#wrapper").css({"display":"block"}); // hide content while page loads
    // Init Page
    ActivateSmoothScrolling();
    LayoutDimensions();

    if (Modernizr.video && !Modernizr.touch) {
      // Load videos
      document.getElementById("intro-video-right").load();
      document.getElementById("intro-video-right").play();
      document.getElementById("intro-video-left").load();
      document.getElementById("dd-video-left").load();
      document.getElementById("dd-video-right").load();
      ResizeIntroductionVideos();
      IntroductionScenes();
    }

    HeaderTransitions();
    ContactForm();
    TeamMembers();
});

function LayoutDimensions() {
  ww = $(window).width();
  wh = $(window).height();

  if (Modernizr.video && !Modernizr.touch) {
    $("#intro").height(wh * 3.25).width(ww);
    $("#intro-cover").height(wh);
    $("#split-screen").height(wh * 2);

    $("#left-split").width(ww).height(wh * 2);
    $("#left-inner").width(ww / 2).height(wh * 2);
    $("#right-split").width(ww).height(wh * 2);
    
    $("#design").height(wh).width(ww / 2);
    $("#develop").height(wh);
  } else {
    $("#static-intro #intro-cover").height(wh);
    $("#static-intro #second-intro").height(wh);
    $("#static-intro #split-screen").height(wh);
  }
}

/* Header Menu Transitions */
function HeaderTransitions() {
  if (!Modernizr.video || Modernizr.touch) {
    scene = new ScrollScene({duration: 150, offset: wh-150})
      .addTo(controller)
      .setTween(TweenMax.fromTo("#top-nav", 1, {autoAlpha: 0},{autoAlpha: 1}));
  }

  var sceneOptions = { duration: 150, triggerElement: $("#team-intro"), offset: wh * 0.25 }
  header = new ScrollScene(sceneOptions)
    .addTo(controller)
    .on("progress", function (e) {
      // fade in/out background colour
      $("#top-nav").css({"background-color": "rgba(52, 65, 76, "+ (e.progress * 0.8)+")"});
      // adjust menu padding/margin
      $("#top-nav .navbar-right").css({"margin-top": ((e.progress * -35) + 50) + "px"});
      // shrink logo
      $("#top-nav .menu-logo .icon-nthgen-n").css({"font-size": ((e.progress * -70) + 120) + "px"});
      $("#top-nav .menu-logo").height((e.progress * -80) + 140);
    })
    .on("start", function (e) {
      // hide/show logo text
      $("#top-nav .menu-logo .icon-nthgen-text").css({"visibility": (e.state != "BEFORE") ? "hidden" : "visible"})
    })
}

/* Introduction Scenes */
var introductionPlayed = false;
// Play Header Animations
function playIntroduction(element) {
  // Wrap each letter in a span for header Animations
  if (element.find("h1 span").length == 0) {
    element.find("h1").each(function (index, value) {
      var text = $(this).html();
      $(this).html(text.replace(/(.)/g, "<span style=\"color:transparent;\">$1</span>"));
    });
  }

  var flickerTarget = element.find(".diagonal");
  setTimeout(function () {
    flickerTarget.toggleClass("transparent");
    setTimeout(function () {
      flickerTarget.toggleClass("transparent");
      setTimeout(function () {
        flickerTarget.toggleClass("transparent");
        typeOutIntroduction(element);
        introductionPlayed = true;
      }, 200);
    }, 300);
  }, 1200);
}

function typeOutIntroduction(element) {
  // Generate ordered list of spans
  var spanList = [];
  element.find("h1 span").each(function () {
    spanList.push($(this));
  });

  // Reveal each letter individually
  var i = 0;
  var typeOut = setInterval(function () {
    spanList[i].css({"background-color":"#fff", "color":"#fff"});
    if (i > 0) spanList[i-1].attr("style", null);

    i++;

    if (i >= spanList.length) {
      spanList[i-1].attr("style", null);
      clearInterval(typeOut);
    }
  }, 10);
}

function swapIntroText(firstSection) {
  if (firstSection) {
    $("#intro .title").each(function () {
      $(this).find(".words p").eq(1).html("PUSH");
      $(this).find(".words p").eq(2).html("TO");
      $(this).find(".intro-text").html("<h1>DESIGN AND</h1><h1>BUILD THE</h1><h1>NEXT</h1><h1>GENERATION</h1>")
      $(this).find("h1").each(function (index, value) {
          var text = $(this).html();
          $(this).html(text.replace(/(.)/g, "<span style=\"color:transparent;\">$1</span>"));
        });
    });
  } else {
    $("#intro .title").each(function () {
      $(this).find(".words p").eq(1).html("FOCUS");
      $(this).find(".words p").eq(2).html("ON");
      $(this).find(".intro-text").html("<h1>Engaging UX</h1><h1>and new</h1><h1>technology</h1>")
      $(this).find("h1").each(function (index, value) {
          var text = $(this).html();
          $(this).html(text.replace(/(.)/g, "<span style=\"color:transparent;\">$1</span>"));
        });
    });
  }

  if (introductionPlayed) {
    typeOutIntroduction($("#intro>.title"));
    typeOutIntroduction($("#right-split .title"));
    typeOutIntroduction($("#left-split .title"));
  }
}

/* Split Screen Transitions */
function ddTypeOut(elements, progress) {
  var target = Math.floor(elements.length * progress);

  for (var i = 0; i < elements.length; i++) {
    if (i < target) {
      elements.eq(i).css({"background-color":"transparent", "color":"#fff"});
    } else if (i > target) {
      elements.eq(i).css({"background-color":"transparent", "color":"transparent"});
    } else { // i == target
      elements.eq(i).css({"background-color":"#fff", "color":"#fff"});
    }
  }
}

/* Transition for the design/develop icons inside the splits */
function ddEnterTransition (element, spinDirection) {
  var sceneOptions = {duration: wh * 0.25, offset: wh * 2 - (wh * 0.25 / 2)};
  // Spin and Scale
  ddEnterScenes.push(new ScrollScene(sceneOptions)
    .addTo(controller)
    .setTween(TweenMax.fromTo(element.find(".dd-symbol"), 1, {rotation: spinDirection * -180, scale: 2}, {rotation: 0, scale: 1})));
  // Fade
  ddEnterScenes.push(new ScrollScene(sceneOptions)
    .addTo(controller)
    .setTween(TweenMax.from(element.find(">div"), 1, {autoAlpha: 0})));

  ddEnterScenes.push(new ScrollScene(sceneOptions)
    .addTo(controller)
    .on("progress", function (e) {
      ddTypeOut(element.find("h1 span"), e.progress);
      if (e.state == "BEFORE")
        element.find("h1 span").eq(0).css({"background-color":"transparent", "color":"transparent"});
    }));

  ddSubtitleEnterScenes.push(new ScrollScene({duration: 100, offset: wh * 2.25 - (wh * 0.25 / 2)})
    .addTo(controller)
    .setTween(TweenMax.fromTo(element.find("p"), 1, {autoAlpha: 0}, {autoAlpha: 1})));
}

function ddLeaveTransition(element) {
  // Scale & Spin
  var sceneOptions = {duration: wh * 0.35, offset: wh * 2.5};
  ddLeaveScenes.push(new ScrollScene(sceneOptions)
    .addTo(controller)
    .setTween(TweenMax.fromTo(element.find(".dd-symbol"), 1, {scale: 1, rotation: 0}, {scale:0, rotation: 180, ease: Back.easeIn})));

  // Flashing Text
  var timeline = new TimelineMax()
  .add([
    TweenMax.to("#design h1", 0.2, {opacity: "1"}),
    TweenMax.to("#develop h1", 0.2, {opacity: "1"}),

    TweenMax.to("#design p", 0.2, {opacity: "1"}),
    TweenMax.to("#develop p", 0.2, {opacity: "1"}),
  ])
  .add([
    TweenMax.to("#design h1", 0.2, {opacity: "0"}),
    TweenMax.to("#develop h1", 0.2, {opacity: "0"}),

    TweenMax.to("#design p", 0.2, {opacity: "0"}),
    TweenMax.to("#develop p", 0.2, {opacity: "0"}),
  ])
  .add([
    TweenMax.to("#design h1", 0.2, {opacity: "1"}),
    TweenMax.to("#develop h1", 0.2, {opacity: "1"}),

    TweenMax.to("#design p", 0.2, {opacity: "1"}),
    TweenMax.to("#develop p", 0.2, {opacity: "1"}),
  ])
  .add([
    TweenMax.to("#design h1", 0.2, {opacity: "0"}),
    TweenMax.to("#develop h1", 0.2, {opacity: "0"}),

    TweenMax.to("#design p", 0.2, {opacity: "0"}),
    TweenMax.to("#develop p", 0.2, {opacity: "0"}),
  ])
  .add([
    TweenMax.to("#design h1", 0.2, {opacity: "1"}),
    TweenMax.to("#develop h1", 0.2, {opacity: "1"}),

    TweenMax.to("#design p", 0.2, {opacity: "1"}),
    TweenMax.to("#develop p", 0.2, {opacity: "1"}),
  ])
  .add([
    TweenMax.to("#design h1", 0.2, {opacity: "0"}),
    TweenMax.to("#develop h1", 0.2, {opacity: "0"}),

    TweenMax.to("#design p", 0.2, {opacity: "0"}),
    TweenMax.to("#develop p", 0.2, {opacity: "0"}),
  ]);
  ddLeaveScenes.push(new ScrollScene(sceneOptions)
    .setTween(timeline)
    .addTo(controller)
    .on("leave", function (e) {
      if (e.state == "BEFORE") {
        $("#design h1").css({opacity: "1"});
        $("#develop h1").css({opacity: "1"});
        $("#design p").css({opacity: "1"});
        $("#develop p").css({opacity: "1"});
      }
      if (e.state == "AFTER") {
        $("#design h1").css({opacity: "0"});
        $("#develop h1").css({opacity: "0"});
        $("#design p").css({opacity: "0"});
        $("#develop p").css({opacity: "0"});
      }
    }));
}

function IntroductionScenes() {
  create_square_background();

  // Wrap each letter in a span
  spanWrapEach($("#design h1"));
  spanWrapEach($("#develop h1"));

  /* Introduction Transitions */
  // Intro Cover Transitions
  intro1 = new ScrollScene({duration: wh * 1.25})
    .setPin("#split-screen", {pushFollowers : false})
    .addTo(controller)
    // Fade footer
    .setTween(TweenMax.to($("#intro-cover footer"), 1, {autoAlpha: 0}))
    // Box transitions
    .on("progress", function (e) {
      square_transition(e.progress);
    });

  // Intro text
  intro2 = new ScrollScene({duration: wh * 0.75})
    .addTo(controller)
    .on("enter", function (e) {
      $("#intro>.title").css({"opacity": 1});
      $("#right-split .title").css({"opacity": 0});
    })
    .on("leave", function (e) {
      if (e.state == "AFTER") {
        $("#right-split .title").css({"opacity": 1});
        $("#intro>.title").css({"opacity": 0});
      } 
    });
  /* End Introduction Transitions */

  intro3 = new ScrollScene({duration: wh})
    .addTo(controller)
    .on("start", function (e) {
      if (e.state == "BEFORE") {
        swapIntroText(true);
      }
    })
    .on("leave", function (e) {
      if (e.state == "AFTER") {
        swapIntroText(false);
      }
    });

  /* Buffers */
  buffer1 = new ScrollScene({duration: wh * 1.25 })
    .setPin("#split-screen", {pushFollowers : false})
    .addTo(controller)

  buffer2 = new ScrollScene({duration: wh * 0.25, offset: wh * 2.25 })
    .setPin("#intro", {pushFollowers : true})
    .addTo(controller)
  /* End Buffers */

  /* Video Controls */
  video1 = new ScrollScene({offset: -50, duration: wh  * 1.25 })
    .addTo(controller)
    .on("enter", function (e) {
      document.getElementById("intro-video-right").play();      
      $("#left-split").css({"opacity": 0});
    })
    .on("leave", function (e) {
      if (e.state == "AFTER") {
        $("#left-split").css({"opacity": 1});
        document.getElementById("intro-video-right").pause();
        if (document.getElementById("intro-video-left").duration) {
          document.getElementById("intro-video-left").currentTime = document.getElementById("intro-video-right").currentTime;
        }
      }
    });

  video2 = new ScrollScene({duration: wh * 1.25, offset: wh * 2.25 - 10})
    .addTo(controller)
    .on("enter", function (e) {
      document.getElementById("dd-video-left").play();
      document.getElementById("dd-video-right").play();
    })
    .on("leave", function (e) {
      document.getElementById("dd-video-left").pause();
      document.getElementById("dd-video-right").pause();
    });
  /* End Video Controls */

  /* Footer Nav */
  // Fade Footer in/out after intro cover
  var sceneOptions = {duration: wh * 0.25, offset: wh * 0.75};
  var scene = new ScrollScene(sceneOptions)
    .addTo(controller)
    .setTween(TweenMax.from($("#split-footer"), 1, {autoAlpha: 0}));

  // Change footer nav anchor functionality
  footer1 = new ScrollScene({duration: 1, offset: wh * 1.75})
    .addTo(controller)
    .on("start", function (e) {
      if (e.state == "BEFORE") {
        $("#split-footer a").attr("href", "#end-split")
      } else { // "AFTER"
        $("#split-footer a").attr("href", "#team-intro");
      }
    });

  // Footer position fixed/absolute
  footer2 = new ScrollScene({duration: wh * 2.25})
    .addTo(controller)
    .on("end", function (e) {
      if (e.state != "AFTER") { // "BEFORE"/"DURING"
        $("#split-footer").css({"position": "fixed"});
      } else { // "AFTER"
        $("#split-footer").css({"position": "absolute"});
      }
    });
  /* End Footer Nav */

  /* Split Screen Transitions */
  // Create split screen transition
  split = new ScrollScene({duration: wh, offset: wh * 1.25 })
    .addTo(controller)
    .on("progress", function (e) {
      $("#left-split").css({"top":e.progress * wh});
      $("#left-inner").css({"top":(e.progress * wh) - wh});
    })
    .on("enter", function (e) {
      $("#left-split").css({"opacity": 1});
    })
    .on("leave", function (e) {
      if (e.state == "BEFORE") {
        $("#left-split").css({"opacity": 0});
      } 
    });

  ddEnterTransition($("#develop"), -1);
  ddEnterTransition($("#design"), 1);

  ddLeaveTransition($("#develop"));
  ddLeaveTransition($("#design"));
  /* End Split Screen Transitions */
}

/* Stat Transitions */
var daysSince = Math.floor((new Date() - new Date(2014, 5, 5)) / (1000 * 3600 * 24));
var statValues = [];
statValues.push(1716238 + (323 * daysSince));
statValues.push(527 + (1 * Math.floor(daysSince/7)));
statValues.push(45764 + (8 * daysSince));
statValues.push(391 + (1 * Math.floor(daysSince/14)));

$(window).on('scroll', function (){
  $("#stats .stat").each(function (index) {
    if ($(this).offset().top <= document.body.scrollTop + (wh * 0.5) && !$(this).hasClass("counted")) {
      var i = 0;
      $(this).addClass("counted")
      var counting = setInterval(function () {
        i += 0.02;
        $("#stats .stat").eq(index).find("h1").html(addCommas(Math.ceil(statValues[index] * i)));
        if (i >= 1) {
          i = 1;
          $("#stats .stat").eq(index).find("h1").html(addCommas(Math.ceil(statValues[index] * i)));
          clearInterval(counting);
        }
      }, 10);
    }
  });
});
/* End Stat Transitions */

function countUpTo(scene, number) {
  var i = 0;
  var counting = setInterval(function () {
    statscene1.destroy();
    i += 0.05;
    $("#stats .stat").eq(0).find("h1").html(addCommas(Math.ceil(number * i)));
    if (i >= 1) clearInterval(counting);
  }, 10);
}

function StartOpeningScene() {
  if (Modernizr.video && !Modernizr.touch) {
    playIntroduction($("#intro>.title"));
    playIntroduction($("#right-split .title"));
    playIntroduction($("#left-split .title"));
  } else {
    playIntroduction($("#static-intro .title"));
  }
}

/* Team Section */
function TeamMembers() {
  // $.get("json/team.json", function (data) {
  //   var template = $("#team-template").html();
  //   $("#team .wrapper").html(Mustache.render(template, data));
  // });
};

// give time for dom to render template.
// avoids canvas errors on pixelate function call
$(window).load(function () {
  pixelate(); // pixelate the team photos
  carouselScene(); // create the side scrolling carousel scene
  $("#wrapper").animate({"opacity":"1"}, 800);
  // play intro animation
  StartOpeningScene();
});

function carouselScene() {
  $(".team-member").each(function () {
    el = $(this);
    sceneInOptions = {triggerElement: el, duration: 100, offset: -ww + 200 };
    sceneOutOptions = {triggerElement: el, duration: 100 };

    staff1.push(new ScrollScene(sceneInOptions)
      .addTo(staffController)
      .setTween(TweenMax.to(el.find(".img_grayscale"), 1, {autoAlpha:1})));
    staff1.push(new ScrollScene(sceneInOptions)
      .addTo(staffController)
      .setTween(TweenMax.to(el.find(".member-description"), 1, {autoAlpha:1})));

    staff2.push(new ScrollScene(sceneOutOptions)
      .addTo(staffController)
      .setTween(TweenMax.to(el.find(".img_grayscale"), 1, {autoAlpha:0})));
    staff2.push(new ScrollScene(sceneOutOptions)
      .addTo(staffController)
      .setTween(TweenMax.to(el.find(".member-description"), 1, {autoAlpha:0})));
  });

  // Disable mobile carousel on higher resolutions
  if ($(window).width() <= 1049) {
    staffController.enabled(true);
  } else {
    staffController.enabled(false);
  }
}

/* Contact Form */
function ContactForm() {
  /* Initialize Natural Language Form */
  var nlform = new NLForm(document.getElementById('nl-form'));

  $('#form_submit').click(function () {
    $("#form_submit").hide(); // hide submit button
    $("#contact-form .message-loading").show(); // show loading icon

    var data = { // Fetch form field data
      "name": $("#form_name").attr("value"),
      "department": $("#form_department").attr("value"),
      "message": $("#form_message").attr("value"),
      "email": $("#form_email").attr("value"),
      "additionalInfo": $("#form_additional").attr("value")
    };
  
    setTimeout(function () { formSuccess(nlform); }, 1000);

  });
};

function formSuccess(nlform) {
  $("#contact-form .message-loading").hide(); // hide loading icon
  $("#contact-form").animate({"left":"-100%"}, 800, function () {
    $("#contact-form").css({"left":"100%"});
    nlform._clearFlds(); // clear form
    $("#contact-form .message-success").show(); // show success message

    $("#contact-form").animate({"left":"0%"}, 1000, function () {
      setTimeout(function () {
        $("#contact-form .message-success").fadeOut(1000, function () {
          $("#form_submit").fadeIn(1000);
        });
      }, 2000);
    });
  });
}

/* Smooth Scrolling */
function ActivateSmoothScrolling() {
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      var distance = Math.abs(target.offset().top - document.body.scrollTop);
      if (target.length) {
        var duration = Math.max(1000, distance / (wh / 200));
        if (distance > 0) { // avoid infinity
          $('html,body').animate({
           scrollTop: target.offset().top
          }, duration);
        }
        return false;
      }
    }
  });
}

function ResizeIntroductionVideos() {
  // Adjust size of intro video
  $(".video").width(ww).height(wh);

  var vw = ww;
  var vh = (ww * 9) / 16;
  if (vh < wh){
    vh = wh;
    vw = (vh / 9) * 16;
  }

  $("#intro-video-right").height(vh).width(vw);
  $("#intro-video-left").height(vh).width(vw);

  // Adjust sizes of dd videos
  vh = wh + 5;
  vw = (vh / 0.875);

  if (vw < ww / 2) {
      vw = ww / 2 + 5;
      vh = (vw * 0.875);
  }

  $("#dd-video-left").height(vh).width(vw);
  $("#dd-video-right").height(vh).width(vw);
}

$(window).resize(function () {
  ww = $(window).width();

  if (Modernizr.video && !Modernizr.touch) {
    wh = Math.max($(window).height(), 480);

    // Resize sections
    $("#intro").height(wh * 3.25).width(ww);
    $("#intro-cover").height(wh).width(ww);
    $("#split-screen").height(wh * 2);

    $("#left-split").width(ww).height(wh * 2);
    $("#left-inner").width(ww / 2).height(wh * 2);
    $("#right-split").width(ww).height(wh * 2);
    
    $("#design").height(wh).width(ww / 2);
    $("#develop").height(wh);

    ResizeIntroductionVideos();
  
    // Adjust anchors
    $("#top").css({"top": wh});
    $("#start-split").css({"top": wh * 1.25});
    $("#end-split").css({"top": wh * 2.25});

    // Update Scene Triggers
    header.offset(wh * 0.25);
    header.update();

    intro1.duration(wh);
    intro1.update();
    intro2.duration(wh * 0.75);
    intro2.update();
    intro3.duration(wh);
    intro3.update();

    buffer1.duration(wh * 1.25);
    buffer2.offset(wh * 2.25);
    buffer1.update();
    buffer2.update();

    video1.duration(wh * 1.25 + 50);  
    video2.duration(wh * 1.25).offset(wh * 2.25 - 10);
    video1.update();
    video2.update();

    split.duration(wh).offset(wh * 1.25);
    split.update();

    footer1.offset(wh * 1.75);
    footer2.duration(wh * 2.25);
    footer1.update();
    footer2.update();

    for (var i = ddEnterScenes.length - 1; i >= 0; i--) {
      ddEnterScenes[i].duration(wh * 0.25).offset(wh * 2 - (wh * 0.25 / 2));
      ddEnterScenes[i].update();
    }
    for (var i = ddSubtitleEnterScenes.length - 1; i >= 0; i--) {
      ddSubtitleEnterScenes[i].offset(wh * 2.25 - (wh * 0.25 / 2));
      ddSubtitleEnterScenes[i].update();
    }

    for (var i = ddLeaveScenes.length - 1; i >= 0; i--) {
      ddLeaveScenes[i].duration(wh * 0.35).offset(wh * 2.5);
      ddLeaveScenes[i].update();
    }

    // Adjust pins
    $("#left-split").css({"top":wh});
    $("#left-inner").css({"top":0});

    // eliminates horizontal and vertical scroll space on window resize
    $(".scrollmagic-pin-spacer").css({"min-width":"0px", "min-height":"0px", "padding":"0px"});
    $("#intro").height(wh * 3.25).width(ww);
  }

  // Disable mobile carousel on higher resolutions
  if ($(window).width() <= 1049) {
      staffController.enabled(true);
      for (var i = staff1.length - 1; i >= 0; i--) {
        staff1[i].offset(-ww + 200);
      }
  } else {
    staffController.enabled(false);

    // Reset staff image styles
    $(".team-member").each(function () {
      $(this).find(".member-description").attr("style", "");
      $(this).find(".img_grayscale").css({"opacity":0, "visibility":"inherit"});
    });
  }

  /* Header */
  $("#static-intro").width(ww);

});

google.maps.event.addDomListener(window, 'load', customize_map);
function customize_map(){
  var myOptions = {
      zoom:17,
      scrollwheel: false,
      center:new google.maps.LatLng(43.763094, -79.406485),
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
  marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(43.763094, -79.406485),
      icon: 'images/nthgen-pin.png'
  });
  infowindow = new google.maps.InfoWindow({
      content:"<b>NthGen Software Inc.</b><br/>90 Sheppard Ave. East Suite 601<br/>Toronto, On M2N 3A1"
  });
  google.maps.event.addListener(marker, "click", function(){
      infowindow.open(map,marker);
  });
}