---
title: Git, please tell me commits that added a line containing $x
layout: post
---

I was looking for a way in [homebrew](http://mxcl.github.com/homebrew/) to use an old version for a formula. Thanks to the fact that homebrew directory is actually a git repository, I could simply checkout an older version for the formula, I just needed to know which commit added support to the version I wanted. I've started naively with the following:

    git log -S9.0.3 Library/Formula/postgresql.rb

The problem with this is that the "pickaxe" option will search for lines in commits that added or removed that string, but I'm only interested in commits that added the string. So I started looking for some command or option in git that would provide that. Unfortunately I couldn't find anything so I decided to go on with an alias:

    git config alias.which-commits-added-line-containing \
        '!f() { for sha1 in `git l -S$1 --format=%H`; do \
            (git show $sha1 | grep ^\+.*$1.*$ > /dev/null) && echo $sha1; \
        done; }; f'

This alias, called `which-commits-added-line-containing`, is defining a function that passes the first argument to the alias as the value for the `git log` pickaxe option. For each of the commits that added or removed a line containing that string I will check using `grep` if the string was added in that commit. `grep` return status will be zero if it finds the pattern in the input so the command chaining (&&) will execute the `echo` command that finally prints the commit's SHA1 that added a line containing the string.

Looks simple, doesn't it? :)

