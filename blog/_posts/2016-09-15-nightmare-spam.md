---
layout: post
title: "I have a bad feeling about this"
description: They promised 2-factor authorization was just for security!
tags:
- Spam
- Security
date: 2016-09-15
---

Today I received a spam text message. Now I already hate spam quite a bit, in fact, immensely, but this struck a special chord with me. Your phone is very personal, even more so than an email address. Email is often about 25% personal, 50% work, 25% garbage, but text messages are almost always 100% personal.

This simple spam text message actually made me really worried. Think for a moment about two-factor authorization.

Two-factor authorization through text is, to me, REALLY annoying. The biggest reason is that I don't want you to have access to my phone number. You already have my email and you usually spam me with crap I don't want until I unsubscribe myself from it all, and now you want my phone number too? No way!

My phone number is probably stored in plain text too, because otherwise you wouldn't be able to send me a text message. That leaves me even more vulnerable to a security breach.

It's possible that the only thing stored in the database is the api key which is linked to the phone number in the text messaging service. This would mean you would need access to both databases to know who all the phone numbers belong to. Even still, cracking the phone number database would be sufficient, since you don't need the name of the person you're spamming, you just need valid phone numbers of people you want to bother.

Somewhere these phone numbers are stored in plain text, I can just feel it. If I'm right, the dark ages are coming.

Please tell me it's common practice to obfuscate phone numbers in some way. Please! I don't want anymore spam!
