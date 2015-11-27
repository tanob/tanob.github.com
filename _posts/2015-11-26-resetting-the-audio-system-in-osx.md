---
layout: post
title: Resetting the audio system in OSX
---

How many times have you come through this scenario: you join an online meeting and say "Hello", the person in the other side can see your mouth is moving and says "I can't hear you", you start looking at the different levels of sound preferences and it all looks right, still for some reason the mic input level doesn't move.

Next time try killing the "coreaudiod" process in OSX. After that just try closing and opening the video call app, or reloading the page if it's inside a browser.

![Killing coreaudiod via Activity Monitor]({{ site.url }}/files/2015-11-26-resetting-the-audio-system-in-osx/activity-monitor-kill-coreaudiod.png)

The only downside of this is that the speaker menu icon at the system menu bar will get gray, though you can still adjust the sound output level through the Sound panel at System Preferences.
