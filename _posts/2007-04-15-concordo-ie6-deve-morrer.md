---
layout: post
title: 'Concordo: IE6 deve morrer'
date: '2007-04-15T22:41:00.000-03:00'
author: Adriano Bonat
tags:
- javascript
- ie
- web
- css
modified_time: '2007-04-15T23:19:20.926-03:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-6645041349919211783
blogger_orig_url: http://tanob.blogspot.com/2007/04/concordo-ie6-deve-morrer.html
---

_Como o Blogger não suporta Trackback ainda, então vai na mão mesmo:  
[http://www.tableless.com.br/ie6-deve-morrer](http://www.tableless.com.br/ie6-deve-morrer)_

Na última sexta-feira, [13](http://en.wikipedia.org/wiki/Friday_13) por coincidência, tive 2 dores de cabeça com o IE6.  

**Problema #1**: um Javascript responsável por salvar alguns dados no servidor:  

{% highlight javascript %}
for (country in countries) { ... }  
{% endhighlight %}

isso funciona no Firefox, porém o IE acusava um problema. Graças a um debugger de Javascript que tenho instalado, consegui constatar que era esta expressão a culpada, então um amigo falou: "Coloca um _var_ ali na declaração de _country_". Dito e feito, o correto é:  

{% highlight javascript %}
for (var country in countries) { ... }  
{% endhighlight %}

**Problema #2:** tags A com background-image, quando se passava o mouse por cima do link, algumas vezes, acontecia que a imagem desaparecia e aparecia novamente, em inglês _flickering_. Pesquisando vi que isso já é um bug conhecido do IE6, [uma página](http://www.fivesevensix.com/studies/ie6flicker/) fazia uma série de teorias explicando o porque daquele bug, [outra](http://plone.org/documentation/how-to/flickering-background-images-internet-explorer) apenas relatava a solução que foi adotada, a [terceira e última](http://www.brunildo.org/test/IEAbackima.html) foi mais útil, explica que a causa do problema está nos _response headers_ HTTP, mais precisamente no _Expires_. Como queria uma solução mais rápida e que respondesse na mesma moeda ao IE, optei pela solução que usa um Javascript apenas no IE6, que altera um parâmetro não documentado do browser:

{% highlight html %}
<!--[if IE 6]><script type="text/javascript">
try {
document.execCommand("BackgroundImageCache", false, true);
} catch(err) {}
</script><![endif]-->
{% endhighlight %}

Solucionado! Muito melhor que perder tempo² (meu tempo desenvolvendo uma solução para retornar as imagens com o header _Expires_, e o tempo do processador do servidor depois para servir as imagens através dessa solução e não do procedimento padrão do servidor HTTP).

