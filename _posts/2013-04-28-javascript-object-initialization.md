---
title: Javascript object initialization
layout: post
---

I was about to write this post since a long time ago, when I was talking with two of my friends at work.
I was reading some Javascript code that they were writing and I've noticed they were writing "classes" like this:

{% highlight javascript %}
function User(name) {
  return {
    greeting: function() {
      return 'Hello, ' + name + '!';
    }
  }
}

User('Ford Prefect').greeting();
{% endhighlight %}

Objects in Javascript are basically a map (aka hash) of keys to values. A key that maps to a function can be considered a method, and a key that maps to a primitive type is what we call a public attribute (aka instance variable). This implementation works exactly like that, when we call `User` it will return a map with a key (`greeting`) that points to a function. In this case `name` isn't an attribute and `greeting` can access its value because in Javascript the inner functions get access to all outer variables and arguments, that's what's called a _closure_.

While I understand that this is valid Javascript and it works, I knew you can also write it like this:

{% highlight javascript %}
function User(name) {
  this.name = name;
}

User.prototype.greeting = function() {
  return 'Hello, ' + this.name + '!';
}

new User('Ford Prefect').greeting();
{% endhighlight %}

The ones that are more seasoned to traditional object oriented languages (e.g. Java, Python, Ruby) will recognize that the first function works like an object constructor, it receives a `name` parameter and stores it in an instance variable. This "class" also has a "method" in its prototype that uses that instance variable to build the user's greeting.

This implementation has some differences in comparison with the first one:

* name is a public attribute, it can be read and changed by any code external to that object;
* `greeting` is added to the `User`'s prototype;
* we're using `new` to initialize the object before calling `greeting`;
* any method that we add to `User`'s prototype will be available to any existing or future instance of `User`;
* the object initialization [is][fast-init-so] [faster][fast-init-ejohn] and the object consumes less memory when you create lots of instances of that class.

Regarding the memory consumption bit I've decided to run a quick experiment to prove it. You can find the two implementations [here][github-impls] that you'll run with the [node.js](http://nodejs.org/) runtime and below is a graph that compares the memory consumption outputs.

![Javascript memory consumption using different object instantiation]({{ site.url }}/files/2013-04-28-javascript-object-initialization/graph.png)

With that in mind I'd strongly suggest to use the patterns that Crockford shows in his text [Private Members in JavaScript][crock-private], following that you'll get the benefits of prototype when dealing with public stuff and you can mix it with closures to make some values private in your implementation.

[crock-private]: http://www.crockford.com/javascript/private.html
[fast-init-ejohn]: http://ejohn.org/blog/simple-class-instantiation/
[fast-init-so]: http://stackoverflow.com/questions/3493252/javascript-prototype-operator-performance-saves-memory-but-is-it-faster
[github-impls]: https://github.com/tanob/tanob.github.com/tree/master/files/2013-04-28-javascript-object-initialization/

