---
layout: post
title: Olá via FeedBurner
date: '2007-04-24T01:09:00.000-03:00'
author: Adriano Bonat
tags: 
modified_time: '2007-04-24T01:36:17.442-03:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-1590467357310290881
blogger_orig_url: http://tanob.blogspot.com/2007/04/ol-via-feedburner.html
---

Adeus aos feeds não rastreáveis do blogger :D  

Sempre ouvi (na realidade li) que o Feedburner oferece um excelente serviço, então decidi conferir, principalmente porque quero conferir quantas pessoas estão lendo meu blog.  

Leio muitos feeds, muito raramente vou ao site ler algo, então acompanhar quantas pessoas estão lendo teus textos pelos page views não dá, uma solução de _tracking_ dos feeds é necessária, e como pode ver (se estiver lendo através da página ;)) na direita está o "Feedburner FeedCount", que te informa o número de leitores do feed provido por este blog.  

Outro serviço legal do FeedBurner é o PingShot, que notifica vários servidores quando um novo post é publicado, muito útil, por exemplo, para usuários do Blogger como eu, que não possuem um serviço como este disponível.  

Para seguir a filosofia <acronym title="Don't Repeat Yourself">DRY</acronym>, editei o template do blog para não disponibilizar o feed que o Blogger provê. Para fazer isto vi que existe uma tag `<b:include data="'blog'" name="'all-head-content'"/>` entre o `<head>` e o `<title>`, esta tag é depois substituida por tags `<link>` e `<meta>`. Apenas substitui esta tag pelo código gerado por ela, substituídos os `<link>` relacionados a feed RSS/Atom dos posts pelo `<link>` oferencendo feed Atom do FeedBurner.

