---
layout: post
title: "How 5 minutes of work saved me hours of work"
description: A short trick to reduce the amount of backwards compatibility work you have to do for your site.
tags:
- Web development
- Front end development
- Backwards compatibility
date: 2015-11-1
---

I recently spent quite a bit of time looking at the analytics on the site I run. Here is a graph I found that I'm proud of.

This is a graph of IE7 usage relative to other IE versions over time.
![IE Usage](/images/posts/ie-usage.png)

You may be asking how I coerced my visitors into upgrading their browser, or how I assassinated all IE7 users while still maintaining a similar volume of users. I can assure you, no one was harmed or threatened throughout August to achieve these results.

I did one thing to achieve these results, and one thing only. I starting using an "Update your browser" plug-in on my site.


### What's my point?

I accomplished this in 5 minutes of work. Not only that, but I was ready to add backwards compatibility to my site to support these users, but instead I got them to update. This means I don't need to add any border radius hacks, transparency hacks, or any other crap to my site.

The high conversion rates I saw also indicates that it's likely my users didn't even know they were out of date until the plug-in I added told them to update.

How do I know it was me and not something else? This is a graph of Firefox 39 usage vs Firefox 40 usage plotted over a graph of overall Firefox usage. It almost shows the exact day I made the commit.
![Mozilla Usage](/images/posts/mozilla-usage.png)


### Conclusion

There are tons of people that complain about supporting this or that but few people are doing anything about it. Adding a tiny plug-in is a way you can be proactive in promoting a positive change. Changes like this one will bring us one step closer to never supporting outdated browsers.

It seems as though Chrome and Opera do a great job of ensuring their users are up to date, perhaps it's time IE and Firefox learn a thing or two. Until then though, I'll settle for a 16kb plug-in to do the trick.
