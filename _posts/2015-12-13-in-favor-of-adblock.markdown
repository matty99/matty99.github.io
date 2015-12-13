---
layout: post
title: "Why I openly admit to using an Ad-blocker"
description: Adding to the content creator vs. ad-block discussion
tags:
- Ad-block
- State of the web
date: 2015-12-13
---

Lately there has been a whole lot of hubbub around Ad-blockers. I wanted to add to that discussion.

There are lots of arguments against Ad-blockers and blockers in general, people claiming that ads support small content creators and cover server costs. Those things may be true, but I'm here to tell you about the dark side of ads. All the things that ads support that I know I don't want in my society. You'll notice it's a long post. It's because there is a whole lot more bad than good when it comes to ads.

# Pop-ups and the return of pop-ups

I remember many years ago every time you were done browsing the web you would close your browser and then you would have to also close anywhere from 3-10 ad windows as well.

Or you would visit a site and immediately you would be bombarded by pop-ups. Closing those windows would spawn new pop-up windows.

We finally purged the pop-up plague and had a peaceful web for a few years, then someone decided to create modal windows. You can claim they aren't pop-ups, but they are, and deep down you know that too.

If you plan to make a modal window on your site, there is only one way to make a proper modal window:
* The X button should be visible and clear.
* The X button should also be in the top right or top left corner where you expect it to be.
* The escape button should close the window.
* Click off should work.
* It shouldn't cover the whole page (that means you need to take into account mobile as well!)
* Converting the user should prevent the pop-up from showing up in the future.

If you don't do all or at least most of these, I can easily claim that your users don't know how to leave your window and you are forcing them to convert to see.

Side note: There is a popular javascript library that tracks your mouse and shows the user a pop-up when they are about to navigate away from your page. You can't seriously think that's a good idea.

# Slowing down the web with bad code

Almost every ad provider uses the following line in their provided code snippet.

{% highlight javascript %}
document.write('<script src="'+src+'" type="text/javascript"></scr' + 'ipt>')
{% endhighlight %}

Why not just write to the DOM directly? Why not make it async? It's definitely not required content. Why slow down load time for no reason? I only see negatives of doing it this way.

{% highlight html %}
<script async src="src" type="text/javascript"></script>
{% endhighlight %}

Doing this will improve your page speed significantly.

# Click baiting

If people get paid for clicks, why not trick people into clicking on things?

Adsense has fairly strict rules against this sort of thing, but it's not clear how well enforced they are. As a website owner, you are rewarded for blending in ads with your content. I even see ad companies promoting this sort of thing. This is because when you get a click, they are paid too.

How many times have you visited a download page and seen more than one download button. I'm not talking about mirror download pages, I'm talking about download buttons that are actually ads. In some cases they are even malicious programs.

# Data selling

Companies sell data about you! If you didn't know before, now you know. Here is the process:

- When you enter your gender, you get gender targeted ads.
- When you you enter your birthday, you get age-targeted ads.
- When you tell them where you live, you will get country specific ads.
- When you...I think you get the point

Here are a few concrete examples of this happening:
- Linkedin started selling resume skills to recruiters. In fact it just became the source of endless recruiter spam so I just left.
- Facebook started lying on your news feed about things your friends did. Your friend liked this. Your friend looked at this. No they didn't, that's bullshit. My news feed became just lies several days in a row, so I just left.

I find it pretty awful that companies are profiting off of data that I publicize about myself. I can no longer go to a site and enter in any information about myself without second guessing.

# Browser fingerprinting

This to me is the absolute worst thing that has happened as a result of ads. I actually didn't become adamant about blocking ads until this became the trendy thing to do.

To sum this up, ads clicked on one site influence ads you see on another. Think about what that means!

If everyone used Adsense on their site, Google would know what sites you visited in what order at what time, how long you stayed on each site...the list goes on. This is, by definition, mass surveillance.

It's not even about what you do with the information, because showing the same ads between sites is pretty insignificant. It's more about what you could do with this information.

# Beyond the web

- Junk mail. Guess what people get paid to send you junk mail. If they didn't, you wouldn't get it.
- Telemarketers. There are no spam folders on your phone. You still get that call. The people on the other end of that call are paid to advertise a product to you. If they weren't you wouldn't be annoyed at dinner.

# Reducing overall quality

A good restaurant or a well placed store can stay open for years. This happens because it is offering a service that is useful to people and people are supporting it.

A bad shop may only stay open for a year, maybe even less. On the other hand a bad website can stay open forever. As a result there are thousands of low quality sites out there that just never go away. They still get a pay cheque every month from ad revenue, this covers the cost of the hosting, so there is no reason to ever take the site down.

How do I expect small online businesses to survive if they can't use ads to cover their costs? The same way I expect shop owners to survive. Build a product that people need, that they pay for. Relying on ads to make money probably means your product sales aren't converting. You need to fix your product and make it better.

# To wrap up

I could go on forever about this, and what I wrote about above is still only a partial list. I have a hard time seeing the good in the way ads are used on the web and I doubt I ever will.

I don't even have that much against the actual ads themselves, it's the people behind it that make it a problem.

Seeing ads on billboards or flyers don't bother me because they aren't intrusive, but ads on the web have crossed that line. I don't want my web to be intrusive.