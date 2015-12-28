---
layout: post
title:  "The Socratic Square"
description: A look into all the possibilities and common mistakes for making a square in the browser.
tags:
- Web Development
- CSS
date: 2015-12-27
---

*Teacher:* The one thing I know for certain about squares is that their height and width are equal. How do we do this in CSS? Easy.

{% highlight css %}
.square {
  height: 50px;
  width: 50px;
}
{% endhighlight %}

*Student:* Perfect! But what if I want the size of the square to change?

*Teacher:* Well I guess you could set a variable...call it _size_ I guess...and set the height and width to that variable.

{% highlight scss %}
$square-size: 75px;
.square {
  height: $square-size;
  width: $square-size;
}
{% endhighlight %}

*Student:* Hm. Okay, but that's still just one size.

*Teacher:* Well you can change it to whatever you want it to be now.

*Student:* Yea, but what if I don't know how big it should be?

*Teacher:* What do you mean, if you don't know?

*Student:* Well, like it can be 20px sometimes, and then 75px other times, and even 125px this other time.

*Teacher:* You can have multiple square classes, like big square, little square, but I don't think that's what you mean. What does the size of the square depend on?

*Student:* Hm, probably the size of the screen.

*Teacher:* Does it have a fixed size at certain screen widths, or does it change smoothly with the size of the screen?

*Student:* Smooth! I think I know how to do fixed sizes now. I tried this, but it didn't work.

{% highlight css %}
.square {
  height: 10%;
  width: 10%;
}
{% endhighlight %}

*Teacher:* Ah yes, good try. There are many ways to do this. An example of that would be like this:

{% highlight css %}
.square {
  width: 10%;
  height: 0;
  padding-bottom: 10%;
}
{% endhighlight %}

*Student:* Huh?! But that makes no sense.

*Teacher:* You're right. It makes no sense. It's a little bit more intuitive in javascript, but it's a lot of code and it's not very fast if you have a lot of squares.

{% highlight javascript %}
window.onresize = function () {
  var size = window.innerWidth / 10;
  var squares = document.getElementsByClassName('square');
  for (var i=0; i <= sqaures.length; i++) {
    squares[i].width = size;
    squares[i].height = size;
  }
}
{% endhighlight %}

*Teacher:* The problem is you don't really want to be doing these sorts of style changes in javascript because when you resize the window, the browser already applies all the CSS changes, and then it calls your javascript, which modifies styles again, and then the browser has to apply the changes again. It's working against the browser and slowing down the website. Also, if you have a lot of squares on a page it takes a lot longer to apply styles to each square and recalculate than if you did it with CSS.

*Student:* Ugh, but it's so clunky. Why's it work anyways?

*Teacher:* According to the specification - If the vertical paddings are specified in percent (%) values the size is a percent of the width of the containing element.

*Student:* Gross. So it's really just a hack.

*Teacher:* Right. There is still another way though. Take a look at this.

{% highlight css %}
.square {
  width: 10vw;
  height: 10vw;
}
{% endhighlight %}

*Student:* Hey! That looks pretty good. What's that?

*Teacher:* _vw_ is a unit just like _px_ or _em_, just that _vw_ is relative to 1% of the width of the viewport. That also means it won't always work. It's always relative to the width of the screen, where as if you use percent it's the width of the containing element.

*Student:* ...

*Teacher:* You seem troubled.

*Student:* Yea. I just don't understand why it can't be done more simply. Why can't I just write something like:

```
.square {
  height = width;
}
```

The code describes exactly what I mean and it is word-for-word the defenition of a square. Like you said "The one thing I know for certain about squares is that their height and width are equal"

*Teacher:* There is [GSS](https://gridstylesheets.org/). It might be little while longer before you can start using it on all your websites though.

```
.square[width] == .square[height];
```

*Student:* Ugh, I can't wait. That is just gorgeous. I guess I'll settle for the padding trick for now. Now, how do you make a triangle?

*Teacher:* Class dismissed.

*Student:* Wait but...

*Teacher:* I SAID CLASS DISMISSED!