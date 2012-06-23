---
title: Nokogiri and Bundler
layout: post
---

So you're using [Nokogiri](http://rubygems.org/gems/nokogiri) and sometimes you're getting a segmentation fault, that's because Nokogiri likes to be run with new versions of libxml2. If you're using [Homebrew](http://mxcl.github.com/homebrew/) to manage packages in OSX and [Bundler](http://gembundler.com) to manage your Ruby gems, you can get consistent installations of Nokogiri linked with the latest versions of libxml2 following these commands:

    $ brew install libxml2 libxslt
    $ brew link libxml2 libxslt
    $
    $ prefix=$(brew --prefix)
    $ bundle config build.nokogiri --with-xml2-include=$prefix/include/libxml2 --with-xml2-lib=$prefix/lib --with-xslt-dir=$prefix/include/libxslt
    $ gem install nokogiri
    $ nokogiri -v
    # Nokogiri (1.5.4)
        ---
        warnings: []
        nokogiri: 1.5.4
        ruby:
          version: 1.9.3
          platform: x86_64-darwin11.4.0
          description: ruby 1.9.3p194 (2012-04-20 revision 35410) [x86_64-darwin11.4.0]
          engine: ruby
        libxml:
          binding: extension
          compiled: 2.8.0
          loaded: 2.8.0

[bundle config](http://gembundler.com/man/bundle-config.1.html) allows you to set the configuration flags to be used when installing a gem through Bundler.

Hope this helps you keep using Nokogiri without the segfault headaches :)

