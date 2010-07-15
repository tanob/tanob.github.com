---
layout: post
title: Trying again, now with Jekyll and GitHub
---

Here I am, trying again to document my experiments, problems and solutions.

## Why I've gave up other times?

I mainly want to write about software development and all the blog engines that I tried in the past (Blogger, Wordpress) really suck when you try to put some code in your post.

Of course this is not the only reason why I never had a very often updated blog. I really don't have much extra time to write and for this reason I tend to only read from other people. I try to keep up with [Twitter](http://twitter.com/tanob). I already tried to keep up with the feeds on Google Reader. I also have lots of interesting threads on the internal [ThoughtWorks](http://thoughtworks.com) mailing lists.

But now let me try another way...

## GitHub and the Jekyll integration (aka [GitHub Pages](http://pages.GitHub.com/))

Thanks to GitHub and their integration with [Jekyll](http://jekyllrb.com/) I can now write my posts using a simple text editor, commit and push to GitHub. They process all the files on your repository as soon as you push new files to it, serving them as static files.

So far I only missed two things: a quick way to create a basic Jekyll skeleton; and a script to create the post following the filename convention (YYYY-MM-DD-post-title.markup). 

Currently I'm writing the posts using Markdown, but you can also use Textile or manually write HTML. My problem of having code within the post's text is solved because [Pygments](http://pygments.org/) can be used to highlight them. I just need to wrap the source code snippet with a [*highlight*](http://wiki.GitHub.com/mojombo/jekyll/liquid-extensions) block.

A recent example that I have for how easy everything become when you are handling with plain text files is that my fiancee started her college's monography, she is using MS Word to write it and was doing manual backup of the doc file. That made me remember of the time when I was writing my monography. I did use LaTeX and had all the advantages of text files. At that time I was not a git user, but I used [Dropbox](http://getdropbox.com) and had automatic backup every time that I saved a change to the file.

Unfortunately handling with plain text files is not a solution to every kind of computer user, but for developers, it's always a good idea to keep it simple!

