---
title: Replacing colors with ImageMagick
layout: post
---

I've run out of black ink on my printer and I had to print one page full of black stuff,
the color of the document itself wasn't important, the content just had to be readable.

I've tried to use OSX built-in Quartz filters to change all black pixels to blue, and
there's actually one already called "Blue Tone" but it didn't work that well for the
document (PDF) that I had to print. It couldn't change the black text and just changed
other images and drawings to blue. I've even tried to mess up with [ColorSync][], which is
a built-in tool in OSX that allows you to create your own filters.

Tired of that and thinking that it had to be simpler than that, I've remembered of the
command-line tool called `convert`, which is provided by ImageMagick. I just had to do
one Google search to find [how to do it][1]:

    $ convert blackish_doc.png -fill blue -opaque black blueish_doc.png

Just had to convert the PDF to PNG before using this line and it saved my life ;)

[1]: http://www.imagemagick.org/Usage/color_basics/#replace
[ColorSync]: http://en.wikipedia.org/wiki/ColorSync

