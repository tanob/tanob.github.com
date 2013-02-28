---
title: CI Configuration Under Control
layout: post
---

One of the practices of Continuous Integration (CI) is to keep everything you need to build your system in one place, even better if it is version controlled so, for example, you can see the diff that made something break or to help you understand when certain functionality got introduced.

Usually together with that people use CI servers that are constantly looking for changes in your version control system (VCS). These servers are configured to know where to find the source code for your projects, they know how to build them, they know the sequence of builds required to leave your artifacts ready to be deployed. It's highly recommended that they also know how to deploy your application to the different environments you may have (e.g. QA, UAT, Pre-Production, Production).

The problem I've noticed in most of the projects using CI servers is that their configuration is not under version control together with your source code. This isn't a [new idea](http://paulhammant.com/2011/09/30/branchable-continuous-integration/) and here are some benefits I can see on that:

* having the configuration in a text file using some format like YAML, JSON or XML allows you to use your [preferred text editor](http://www.vim.org) and avoids the slow configuration through the UI;
* version control will tell you who made a change, what part of the configuration got changed, when did it happen and the reason why it changed will be in the commit message;
* you can easily revert the change;
* it allows you to see your CI configuration evolving together with your system's code;
* if you're migrating to another CI server that supports a text configuration file you can easily transform your current configuration.

Having the configuration as a text file shouldn't make you go crazy on the number of commands per job, I highly recommend your job configuration to just call a few commands, e.g. bundle install && rake test package. Remember that the developers should be using the same commands on their development machines to verify their changes before pushing them, so make it simple!

In summary, the idea is to disable the UI administration of the CI server and have its configuration in a VCS. The CI server will have a job/pipeline watching the VCS and on every change it will reconfigure itself, e.g. jobs that are running but got removed from the config should be stopped and removed from the UI, new jobs will show up in the UI and will start being monitored by the CI server.

## Implementing that with [Go](http://www.thoughtworks-studios.com/go-continuous-delivery)

You can see how I've implemented it with Go [here](https://github.com/tanob/go-config-under-control). In the case of Go the configuration is XML-based and they provide a [XSD](https://github.com/tanob/go-config-under-control/blob/master/cruise-config.xsd) so we can actually validate if its syntax is fine.

There's a Ruby script that will merge the pipeline configurations into Go's, its config file is usually located in /etc/go/cruise-config.xml. Go watches it looking for changes, when there's any it tries to apply it and if everything is fine it will update its internal configuration file. By the way, internally they keep it versioned using Git!

In case of some problem in the configuration, Go will simply reject it and will output the error in the server's log. It will also warn you about it through its UI. Notice that the merge script starts watching the log file after applying the changes, if some error happens it will output it so the developer can easily fix it.

Talking about problems, here are some I had while playing with this idea:

* we all know that XML isn't that human friendly, it at least it makes editing hard, maybe we could have the actual configuration in another format, like YAML;
* it is fundamental to have a tool to validate your changes locally. In the case of my implementation I've wrote a Rake task that uses the XSD but that didn't help me when I've configured a [Stage's name with spaces](https://github.com/tanob/go-config-under-control/commit/d4dab631ddb216583c0d5418711c18bbb36d6567), Go rejected that but the syntax was fine, maybe it can be improved with a tool like [travis-lint](https://github.com/travis-ci/travis-lint).

## Other CI Servers

I haven't looked if it is possible to do that in other CI servers like [Jenkins](http://jenkins-ci.org/) or [Bamboo](http://www.atlassian.com/software/bamboo/overview), so let me know of your experiences.

