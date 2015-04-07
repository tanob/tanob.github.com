---
layout: post
title: JQuery, CSS e ids (X)HTML
date: '2007-03-24T12:02:00.000-03:00'
author: Adriano Bonat
tags:
- xhtml
- javascript
- jquery
- css
modified_time: '2007-03-24T12:50:59.397-03:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-6993289534129936532
blogger_orig_url: http://tanob.blogspot.com/2007/03/jquery-css-e-ids-xhtml.html
---

Em um projeto que estou trabalhando no momento estou usando o [JQuery](http://jquery.org/), porém me deparei com um problema ao tentar utilizar o seu `$()` com elementos que contenham ids com caracteres como ponto e dois-pontos, que são [caracteres válidos em ids](http://www.w3.org/TR/html401/types.html#type-id).  

Preparei um arquivo de testes e postei o problema na lista do JQuery, e em alguns minutos obtive entre as respostas uma que apontava que já existia um [bug report para este problema](http://dev.jquery.com/ticket/143) (aqui entra a lição de sempre procurar pelo problema no bug tracker do projeto!), que até agora ainda não foi solucionado, existe uma sugestão de patch que altera a expressão regular do CSS selector do JQuery para uma solução parecida com o que já existe na especificação do CSS...  

{% highlight html %}
<style>
#test.x { background-color:green; color:yellow; }  
</style>  
...  
<p id="test.x">P with id 'test.x'.</p>
{% endhighlight %}

O código acima não irá funcionar como esperado, ele na verdade seleciona o elemento com id `test` e classe `x`, para ter o efeito desejado deve-se usar `#test\.x`, ou seja, "escapa"-se o ponto, o que informa ao interpretador CSS para cancelar a busca pela classe.  

A solução temporária é eu aplicar o patch e compilar a minha própria versão do JQuery...

