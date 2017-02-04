---
layout: post
title: "The hackiest code I have ever written"
description: Bad code I wrote and some explanation as to why it was written.
tags:
- Web development
- Javascript
date: 2016-09-14
---

I have been programming for various companies for about 5 years now and I've been able to get away with not writing any code that made me had to warn my fellow developers about an upcoming hack. Writing hacks is not uncommon, and a lot of them are out of the programmers choice, so I'm fortunate to have avoided it for so long. To give you an idea of how common they are, if you search the words "this is a hack" on github, you get a solid 16.5 million results (granted not all of those are code, but still a shockingly high number).

Anyways, here is the code and then I'll go into the problem and why this was the only solution that we come up with.

{% highlight javascript %}
setTimeout(function() {
  if (!this.state.loaded) {
    window.location.reload();
  }
}, 5000);
{% endhighlight %}

### Problem overview
The client would leave their app running in the browser for a few hours. When they would return and try navigating around the site, none of the pages would finish loading.

It is a single page React application, with nothing really too fancy going on. The pages are mostly data driven, with api calls wrapped in promises triggering most of the behaviours on each page.

After the few hours, everything in the "then" clause was ignored, meaning once getting into this _state_ the _promises_ weren't being kept and the entire site didn't _react_ to any user action any longer.

Seriously though, the requests were going through and coming back fine, just the component state was not being updated.

The problem seemed like it wasn't in our control, so no change in our code base would fix the core issue. It seemed, rather, a property of the browser. Perhaps to minimize background CPU usage javascript jobs were killed, in particular the ones in charge of watching for state changes in the app.

The worst part was, the client didn't know what to do when the app got in this state, so even if the loading spinner was spinning for 10 minutes the client still thought the site was loading. Normally people refresh in the scenario, but I guess they had a lot of trust in our app. Instead we wrote a refresh for them.

The pages this happened on never took more than 3 seconds to load, even with a slow connection, so 5 seconds was a safe number to check if the page was still loading and refresh otherwise. Once the page was refreshed, the app would go back to working completely normally.

I still can't think of anything else to do besides teaching the client to hit refresh. It's not like you can detect with javascript if your javascript stops executing. Weird stuff.
