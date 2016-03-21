---
layout: post
title:  "Website Optimization"
description: A flashback to a website I build over a year ago. I go over the code explaining where I went wrong and offering improvements. The focus of the series is page speed optimizations.
tags:
- Web development
- Front end development
- Self-improvement
date: 2015-09-12
---
### Introduction

A year ago I was working as a Front End Developer at a company called NthGen Software Inc. and my first project was to redesign their website with their two designers. By the time I had gotten there the design was essentially finished, which, in hindsight, should have been a red flag for me. Wanting to impress and make a splash I tried to match the design pixel for pixel without considering load times, performance issues, and most importantly the user. This piece takes a look at all the code I wrote as an inexperienced developer, explains why I wrote it that way, and suggests improvements in hopes of learning a few lessons for future projects.

The site takes a long time to load, is slow, and when I show it off it reflects poorly on the work I am capable of doing. I'm writing this post because I approached the company in hopes that they would let me fix it but they were uninterested in the proposal. I wanted someone to benefit from these changes besides me, so I hope someone will read this post and gain something from it.

### Build it static

The decision to not have a server for the site happened late in the project, but had the biggest impact on the site in how much bad code it generated as a result. The entire site was to be hosted in AWS Buckets instead of giving it a server. This was a huge and unnecessary handicap to save a little bit of money on hosting. The difference between buckets and a medium instance is a significant sum of money, and the company has probably saved a lot of money with this decision. However, they could have saved even more since the site didn't need a dedicated server. They ran an application in house that had multiple servers and they could have just dropped it on one of those instead, making the site essentially free to host. The traffic from the one site would not affect the other in any significant way meaning they really had nothing to worry about.

For a lot of the project I accepted the decisions that were made higher up because I wasn't comfortable arguing with them about the correct choice. We've arrived at the root of the problem, me. I didn't stand up nearly strong enough for the necessity of server and as a result my project suffered.

**Lesson learned:** As the engineer, it is your job to know what's best for your project and to stand up for that. You need to be open to suggestions, but in the end the decision needs to come from you.


### Contact form

Welcome to the first consequence of not having a server. A contact form needs a server side file to send an email because browsers don't have a mail server baked in. On the server it needs as little as a single PHP file to do the job. How did we do this without a server? The correct response is something along the lines of JSONP or CORS, however it was decided that it would take too long to set these up. Instead we did something which I'm pretty sure is a security vulnerability. I didn't write the code on the server, nor do I have any idea how it works, so I cannot confirm or deny that it's a security vulnerability. This isn't a position you ever want to be in as an engineer. You either don't know it is a security vulnerability or you do know it's one and you patch it.

**Lesson learned:** Be more reactive to bad smells in your code. If code feels ugly as you're writing it, you're probably doing it wrong. That growing feeling in the bottom of your stomach is your coding experience preparing your stomach to expel fluid.


### Make it CMS-like

The staff section and job posts are hypothetically constantly changing, so they should be easy to change. The best way to do this is to generate a template partial on the server side based on a JSON file, cache it (so you only have to process it once in a while), and include the compiled page in your HTML file when you send it to the user. The way it was done was client side, meaning we lose the caching step and it slows down the initial load time of the site.

This is another consequence of not having a server, and trying to do too much within the static site constraints. The templates were populated by data from AJAX calls being pumped into Mustache templates. My version of the site doesn't need to generate templates on the client side, so I've removed code that supports that.

**Lesson learned:** Don't sacrifice load time to try to make things easier for you to manage. The site is for the user after all.


### Backwards compatibility

By default I would be loading a page that said please update your browser. I used a browser detector called Bowser.js to find out if the user was using an old browser and if they weren't I would load the rest of the page.

The better way to do this is with feature detection with Modernizr.js (which I'm already using on the page). If the user doesn't have certain features, redirect them to a different page that tells the user to update their browser. That way, in the regular case the user starts loading the page right away instead of waiting on browser detection code to run.

There is something really ugly about any sort of browser detection, but until you can guarantee everyone is running an up-to-date browser you have to do some.

**Lesson learned:** Don't try to combine two pages into one, especially in a static site.


### Wait to load

Up until now I've been mostly been dealing with bad decisions I made as an engineer and their consequences. Now comes the funny stuff. Reasons why I was a bad coder.

I covered the screen with a black fixed full screen overlay and faded it out when the page had loaded. That means all videos and all images were now blocking the user from seeing the site. Videos can stream from the server and the site can start running without the video being completely loaded so there is no reason to do this.

The worst part was that there was no signal of what the website was doing. I would show the site to friends and they would say "It's just black" or they would be tempted to refresh the page. I would have to assure them, "Just wait for it! It's coming. I promise." I can only imagine the bounce rate the original site has experienced due to this poor code.

Since I've cut down on whole bunch of things that slow the loading of the page down, I no longer need any sort of loading page in my version of the site.

**Lesson learned:** If you need a loading screen, make it clear that it is a loading screen.


### Bad meta tag:

In the header of the site you will find the following tag:
{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
{% endhighlight %}

I've changed this to instead read:
{% highlight html %}
<meta name="viewport" content="width=device-width,initial-scale=1.0">
{% endhighlight %}

A responsive page shouldn't deny people the ability to zoom in, that is just silly. I will go a step further. No site should deny users the ability to zoom in on content. There are tons of people out there with visual disabilities that can't view your site at regular zoom. Furthermore, if you've ever opened a site on your phone and not been able to read something, what would you do if you couldn't zoom in on it either? Think about how frustrating would that be. In my case, my site was already responsive so I had nothing to worry about.

**Lesson learned:** Put your users first.


### Bad square code

I was generating lots of responsive squares using Javascript. This isn't necessarily bad, since you don't want to write out that much HTML. The problem was I was also setting their width and height in Javascript. This was simply a case of inexperience and lack of research at the time. I didn't think about how much I was going to be impacting browser performance with this kind of code, but now I know.

{% highlight javascript %}
function create_square_background () {
  var num_columns = 20;
  var num_rows = 20;
  var i;
  for (i = 0; i < num_columns * num_rows; i++) {
    var square = $("<div>", {class: "square"});
    $("#intro-cover header").append(square);
  }
}
{% endhighlight %}

Since the squares needed to be responsive I also needed to change them whenever the screen was resized.

{% highlight javascript %}
function resizeHeaderSquares() {
  var width = $("#intro-cover header").width() / NUM_HEADER_COLUMNS;
  var numRows = Math.ceil($("#intro-cover header").height() / width);
  for (var i = squareList.length - 1; i >= 0; i--) {
    squareList[i].width(width).height(width);
  }
}
{% endhighlight %}

This code would crash the browser on phones trying to run the site. If you rotated your screen to landscape you would have to restart the page, simple as that. There was also a bit of code that would add squares depending on if the height of the screen exceeded the width of the screen. I will deal with this in a later post.

Javascript to generate the squares is not a bad thing. It saves you a lot of code in your HTML file, and is quite elegant. The problem is the resizing. Any time you resize the screen you're doing a loop through at least 400 DOM objects and modifying their CSS. There is no reason to do this if you can do it in pure CSS instead. The work around is simple.

{% highlight css %}
.square {
  width: 5%;
  float: left;
}
.square:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
{% endhighlight %}

And the Javascript to generate the squares:

{% highlight javascript %}
function create_square_background () {
  var num_columns = 20;
  var num_rows = 20;

  var i;
  for (i = 0; i < num_columns * num_rows; i++) {
    var square = $("<div>;", {class: "square"});
    $("#intro-cover header").append(square);
  }
}
{% endhighlight %}

**Lesson learned:** Take the proper time to read and research every solution to the features you implement.


### Results (tl;dr)

Just by being more critical of design decisions and making small Javascript changes I was able to make a huge impact on load and running time of the site. Here are some statistics:

* Load time from ~5.25 seconds down to ~1.50 seconds
* 123 Requests down to 92 Requests
* Sending 5.5 MB down to 4.1 MB

I saved almost 4 seconds of load time! I'm extremely impressed by this. There is still tons of room to improve but I don't think they are worthy of a blog post. Here are some potential next steps to improve site speed even more:

* Bootstrap is unnecessary - I only use it for the grid and the menu. Removing it from dependencies will reduce page weight thus improving load time.
* The LESS I originally wrote is unreadable and inefficient. Improving this would make the site more maintainable and make the CSS files transferred smaller.
* Move code to make site responsive out of Javascript and into CSS, doing so will improve speed at run time.
* Combining and minifying CSS and Javascript files is always possible

Thanks for reading! I hope you got something out of this post. Once again, you can check out [my version of the site here](/)
