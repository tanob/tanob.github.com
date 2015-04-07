---
layout: post
title: Bookmarklet para Google Reader
date: '2008-12-09T11:30:00.004-02:00'
author: Adriano Bonat
tags:
- javascript
- google
modified_time: '2008-12-09T11:47:24.035-02:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-882767228298930455
blogger_orig_url: http://tanob.blogspot.com/2008/12/bookmarklet-para-google-reader.html
---

Por algumas razões estou utilizando no dia-a-dia o Google Chrome (sim, ele não tem add-ons e é *extremamente* minimalista). Para contornar a falta de uma maneira de adicionar o feed da página atual no leitor de feeds fiz o seguinte bookmarklet, que pode ser utilizado em qualquer outro browser:

> javascript:(function(){function fs(){var r=[];for(var i=0,ls=document.getElementsByTagName('link');i<ls.length;i++)if(ls[i].type in {'application/rss+xml':0,'application/atom+xml':0})r.push(ls[i]);return r}var ls=fs();if(ls.length>0)location.href='http://fusion.google.com/add?feedurl='+encodeURIComponent(ls[0].href);else alert('No feeds available!');})()

Como o engine do Blogger não me deixou criar um link com esse código, vais ter que copiar e criar na mão o bookmarklet na barra de favoritos. Ah, se não sabe, Control+B mostra a barra de favoritos no Chrome.

