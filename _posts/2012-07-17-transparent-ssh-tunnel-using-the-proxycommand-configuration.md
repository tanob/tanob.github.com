---
title: Transparent SSH tunnel using the ProxyCommand configuration
layout: post
---

I'm currently working on a client that restricts the IPs allowed to SSH into their servers, of course, for security reasons.
That is a PITA when you're sick working from home and need to do something on those servers.
Today this happened to me and looking for better alternatives than manually jumping to one of the boxes with access I've learned the SSH configuration _ProxyCommand_.

This is how my ~/.ssh/config _Host_ configuration looked before:

    Host client-qa01
      HostName 10.0.0.33
      IdentityFile ~/.ssh/keys/client/id_rsa_qa
      User client-qa

This is how it looks after _ProxyCommand_:

    Host client-qa01
      ProxyCommand ssh -W %h:%p jumpbox-host
      HostName 10.0.0.33
      IdentityFile ~/.ssh/keys/client/id_rsa_qa
      User client-qa

where _jumpbox-host_ is the machine with access to the client's server.

The command _ssh -W_ comes since OpenSSH 5.4 and works similarly to _netcat_, it establishes an SSH tunnel between my local machine and _jumpbox-host_.

With this configuration instead of manually ssh'ing to _jumpbox-host_ and later ssh'ing to the target client server I can simply "ssh client-qa01" and SSH will transparently connect to the client's server through _jumpbox-host_.

Useful, huh? :)

