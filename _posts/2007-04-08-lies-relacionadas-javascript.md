---
layout: post
title: Lições relacionadas a Javascript
date: '2007-04-08T04:04:00.000-03:00'
author: Adriano Bonat
tags:
- javascript
- jquery
- ajax
- json
modified_time: '2007-04-08T04:12:10.444-03:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-5868102733555656982
blogger_orig_url: http://tanob.blogspot.com/2007/04/lies-relacionadas-javascript.html
---

Trabalhando com Javascript e "Ajax" em um projeto tomei as seguintes lições:  

*   Opera 8.5 não lida bem com respostas cujo mime-type é 'application/json', a solução foi atualizar para a 9.0;  

*   IE não gosta de vírgulas extra em suas matrizes, por exemplo `[1,2,3,]`, ele interpreta aquela última vírgula como um outro elemento da matriz;  

*   Usando as facilidades "Ajax" do jQuery, caso ocorra uma exceção dentro da callback de success, o jQuery irá chamar a callback de error;

