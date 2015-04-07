---
layout: post
title: Programação dinâmica & Concorrência
date: '2007-08-28T00:11:00.000-03:00'
author: Adriano Bonat
tags: 
modified_time: '2007-08-28T00:23:48.049-03:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-3847407899008825490
blogger_orig_url: http://tanob.blogspot.com/2007/08/programao-dinmica-concorrncia.html
---

Como havia falado no post anterior, eis aqui a implementação de um processo servidor de resultados para cálculo de Fibonacci, juntamente com um "cache" dos resultados prévios.  

{% highlight erlang %}
-module(fibserver).
-export([fibserver/0, fibserver/1, fib/1, start/0]).

fibserver() ->
 % Start the Fibonacci Server with some basic pre-defined values...
 fibserver([{0,0}, {1,1}]).

fibserver(Values) ->
 receive
  {getValue, ReqPid, X} ->
   ValueExists = lists:keymember(X, 1, Values),
   if
    ValueExists ->
     {value, {_, V}} = lists:keysearch(X, 1, Values);
    true ->
     V = notFound
   end,
   % Send to the request process the atom notFound, or the Fibonacci of X.
   ReqPid ! V,
   fibserver(Values);
  {putValue, ValueTuple} ->
   fibserver(Values ++ [ValueTuple])
 end.

fib(N) ->
 % Ask the server for the Fibonacci of N...
 fibServer ! {getValue, self(), N},
 receive
  % If the value doesn't exist yet, then...
  notFound ->
   % ...calculate it...
   FibN = fib(N - 1) + fib(N - 2),
   % ...update the server with this new value...
   fibServer ! {putValue, {N, FibN}},
   % ...return the calculated value.
   FibN;
  X ->
   % The value was already in the server.
   X
 end.

start() ->
 % Just start the process identified by the atom 'fibServer',
 % as the execution of the fibserver:fibserver/0,
 % that means, module fibserver, function fibserver
 % that receives zero parameters.
 register(fibServer, spawn(fibserver, fibserver, [])).
{% endhighlight %}

Coloquei alguns comentários, mas para o total entendimento do código, você deve ter uma [noção básica](http://erlang.org/doc/getting_started/part_frame.html) sobre Erlang, qualquer dúvida só postar.

Para testar:

    $ erl  
    Erlang (BEAM) emulator version 5.5.2 [source] [async-threads:0] [kernel-poll:false]  
    
    Eshell V5.5.2 (abort with ^G)  
    1> c(fibserver).  
    {ok,fibserver}  
    2> fibserver:start().  
    true  
    3> fibserver:fib(1000).  
    43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875  

O resultado é praticamente instantâneo :)  

PS.: me esqueci de comentar como sair do shell do Erlang, basta pressionar Control-C, e então "a[enter]", ou então executar a função `halt()`.

