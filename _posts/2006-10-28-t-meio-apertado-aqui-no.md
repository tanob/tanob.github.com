---
layout: post
title: Tá meio apertado aqui não?
date: '2006-10-28T15:16:00.000-03:00'
author: Adriano Bonat
tags:
- linux
modified_time: '2006-10-28T18:31:11.665-03:00'
blogger_id: tag:blogger.com,1999:blog-7775148158662908387.post-1226015148184639704
blogger_orig_url: http://tanob.blogspot.com/2006/10/t-meio-apertado-aqui-no.html
---

Comprei um HD de 160GB (uau, bom poderia ser maior...) há uns 2 meses para substituir meu velho HD de 40GB, e na hora da decisão pelo modo de particionar, e qual sistema de arquivos vou utilizar, optei em utilizar o [LVM](http://en.wikipedia.org/wiki/Lvm).

Deixei a partição root com 10GB formatados como reiserfs, e criei uma outra partição primária com 80GB, marcada como LVM (type 0x8e). Criei volumes lógicos para música (15GB), vídeos (15GB), downloads em geral (15GB), e até mesmo pro meu /home (5GB).

Formatei as partições com o [XFS](http://en.wikipedia.org/wiki/Xfs), pois já estava pensando que no futuro, quando necessário, este sistema de arquivos me facilitaria a vida ao estender os volumes lógicos...

E não é que ontem recebi um aviso do Azureus que o espaço já tinha acabado pros meus downloads? Corri para a linha de comando e evoquei os seguintes comandos mágicos:

{% highlight bash %}
# lvextend -L+5G /dev/data_vg/misc_lv
File descriptor 11 left open
Extending logical volume misc_lv to 20,00 GB
Logical volume misc_lv successfully resized

# xfs_growfs /var/misc
xfs_growfs: XFS_IOC_FSGROWFSDATA xfsctl failed: Não há espaço disponível no dispositivo
{% endhighlight %}

Oh-oh! Falta de espaço?! Claro né, porque que estou dando um resize então?!
Tinha apenas 200KB de espaço livre, acredito que isso não era suficiente pro XFS efetuar o resize, então movi algumas coisas de lugar e...

{% highlight bash %}
# xfs_growfs /var/misc
data blocks changed from 3932160 to 5242880
{% endhighlight %}

Shazam! Na hora, sem desmontar, sem reiniciar o computador, sem parar nenhuma aplicação, aumentou minha partição para 20GB:

{% highlight bash %}
# df -h | grep misc
/dev/mapper/data_vg-misc_lv 20G 15G 5,1G 75% /var/misc
{% endhighlight %}

Muito bom, a única coisa que não gostei foi daquele problema de falta de espaço, me fez ter que mover arquivos, bem que o sistema de arquivos poderia já ter um espaço reservado para estes casos.

Fica a dica, se estiver no Linux, use o LVM para gerenciar as partições, é uma solução muito flexível, além de não deixar o teu download parado por muito tempo pela falta de espaço :D

