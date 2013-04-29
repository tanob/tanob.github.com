---
title: Custom vimrc for project specific settings
layout: post
---

Today I wanted to load some custom settings in my vim session when working on a particular project. I wanted that to avoid polluting my user's vimrc with project specific things. After some googling around I found (not surprisingly!) a StackOverflow [thread][so-thread]. The usage of a plugin to scan directories just sounded too much, not even mentioning the load time increase that would add. I just wanted something simple like an environment variable.

As I couldn't use what the thread mentions (MYVIMRC and VIMINIT), I just went ahead and added the following to my vimrc:

{% highlight vim %}
" This allows project specific vim settings
if filereadable($CUSTOM_VIMRC)
  source $CUSTOM_VIMRC
endif
{% endhighlight %}

With that I just export `CUSTOM_VIMRC` when loading my project environment settings (you can use fancy things like [virtualenv][virtualenv] or a shell alias that does a bunch of nested calls). For example:

    export CUSTOM_VIMRC=/Volumes/Project/.vimrc

[so-thread]: http://stackoverflow.com/questions/456792/vim-apply-settings-on-files-in-directory
[virtualenv]: http://www.virtualenv.org/

