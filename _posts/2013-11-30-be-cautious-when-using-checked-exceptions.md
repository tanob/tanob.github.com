---
title: Be cautious when using checked exceptions
layout: post
---

While I think checked exceptions are useful when you want to make it explicit in the API that calling a specific method in the interface can have an exception as result, it might be harmful if used indiscriminately.

The issues are related to the fact that the throws declaration is part of the method signature.

Consequences:

* it will restrict the usage of some frameworks. Example: in a more functional style with Guava you won’t be able to use a [Function][] to transform lists if any call in the implementation has a checked exception. In this particular case it will make you handle the exception in each transformation.

{% highlight java %}
  Lists.transform(list, new Function<From, To>() {
    @Override
    public To apply(From from) {
      return transformIt(from); // what if it has a checked-exception?
    }
  });
{% endhighlight %}

* it violates the [Open/Closed Principle][oop], as Uncle Bob mentions in the book Clean Code. A change in the signature of a method will have a cascade effect in the call hierarchy of that method.

I wrote this post after refactoring some code that was using checked exceptions. The funny part was that there was no place in the codebase actually throwing the exception.

[oop]: http://en.wikipedia.org/wiki/Open/closed_principle
[Function]: http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/base/Function.html

