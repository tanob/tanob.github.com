---
layout: post
title: Brincando com Erlang
date: '2007-08-22T01:30:00.000-03:00'
author: Adriano Bonat
tags: 
modified_time: '2007-08-22T02:30:36.384-03:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-7583240777254625276
blogger_orig_url: http://tanob.blogspot.com/2007/08/brincando-com-erlang.html
---

Ultimamente tenho visto [muitos posts](http://del.icio.us/tanob/erlang) comentando sobre a linguagem Erlang, que é uma linguagem funcional para programação concorrente, embora alguns defendam que também é orientada à objeto, já que Erlang oferece envio de mensagens como método para sincronização e comunicação entre processos, e orientação à objeto, na teoria, nada mais é do que troca de mensagens entre os objetos.

Como tive uma cadeira na faculdade sobre programação funcional (recomendo a todos aprenderem uma linguagem funcional ou de paradigma diferente do imperativo) usando Haskell, e gostei muito, resolvi começar a brincar com Erlang, que já tem um [framework web](http://erlyweb.org/) e um [banco de dados](http://www.erlang.org/doc/apps/mnesia/index.html) super escalável!

Para começar, instalei o pacote "erlang" no Debian Etch, muito simples.

Então vamos para nosso primeiro programa, "hello world" ou Fibonacci? Ok, ok...

1. Crie um arquivo chamado hello.erl, com o seguinte código:

        -module(hello).  
        -export([hello/0]).  

        hello() -> io:format("Hello world!~n").
2. Chame o interpretador Erlang com o comando "erl";
3. Compile o programa:  

        c(hello).
4. Isto deve gerar um aviso `{ok, hello}`;
5. Vamos executar:  

        hello:hello().
6. Pronto, satisfeito?

Agora vamos ver como implementar o cálculo de Fibonacci de um número em Erlang, repare que o nome do arquivo deve ser fibonacci.erl, combinando com o nome do módulo:  
{% highlight erlang %}
-module(fibonacci).  
-export([fib/1]).  

fib(0) -> 0;  
fib(1) -> 1;  
fib(N) -> fib(N - 1) + fib(N - 2).  
{% endhighlight %}

Reparem que há um pattern matching nos 2 casos básicos, e após a implementação recursiva para qualquer N > 1, com base disso podemos diminuir um pouco o código:  

{% highlight erlang %}
fib(N) when N =< 1 -> N;  
fib(N) -> fib(N - 1) + fib(N - 2).  
{% endhighlight %}

A chamada desde código após a compilação é trivial, por exemplo:  

{% highlight erlang %}
fibonacci:fib(10)  
{% endhighlight %}

O código em Haskell é muito semelhante (como não seria com esse pingo de código? :D)  

{% highlight erlang %}
fib n  
| n <= 1 = n  
| otherwise = fib (n-1) + fib (n-2)  
{% endhighlight %}

Vá brincando, tente números mais altos, com 50 já vai demorar bastante o resultado, o que me sugestiona implementar algum mecanismo de programação dinâmica, uma idéia para um próximo post é implementar isso usando um processo servidor de resultados, exercitando então o mecanismo de troca de mensagens.  

Finalizo por aqui, e [clique aqui](http://home.hiwaay.net/%7Ejalison/Fib500.html) se quiser conferir a lista dos 500 primeiros valores para a série de Fibonacci.

