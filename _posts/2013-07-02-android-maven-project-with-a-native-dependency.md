---
title: Android maven project with a native dependency
layout: post
---

In my current Android project we're using the [Android maven plugin] and recently we got
a pre-built native library (.so) as a dependency.

I had some trial and errors and had to read the plugin's source code to get it working,
the project's wiki [about it][wiki-native-lib] isn't up-to-date on how to do it.

First, as this native dependency is not in a Maven repository, we're using the [maven install plugin]
to install it in the local maven repository:

{% highlight xml %}
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-install-plugin</artifactId>
        <version>2.4</version>
        <inherited>false</inherited>

        <executions>
            <execution>
                <id>foo-native</id>
                <goals><goal>install-file</goal></goals>
                <phase>initialize</phase>
                <configuration>
                    <file>${project.basedir}/tmp/libFoo.so</file>
                    <groupId>com.foo.bar</groupId>
                    <artifactId>libFoo</artifactId>
                    <version>1.0</version>
                    <packaging>so</packaging>
                    <classifier>armeabi</classifier>
                </configuration>
            </execution>
        </executions>
    </plugin>
{% endhighlight %}

It is important to set the `packaging` as "so" and set the `classifier` with the shared-object's
target architecture. In our case it is "armeabi" but the plugin also recognize these others:
"armeabi-v7a", "mips" and "x86".

After getting the dependency installed you'll list it under your `<dependencies>` like this:

{% highlight xml %}
    <dependency>
        <groupId>com.foo.bar</groupId>
        <artifactId>libFoo</artifactId>
        <version>1.0</version>
        <type>so</type>
        <classifier>armeabi</classifier>
    </dependency>
{% endhighlight %}

That's it, after running `mvn clean package` the generated APK should have the `.so`:

    $ jar tf app/target/app.apk | grep armeabi
    lib/armeabi/libFoo.so


[Android maven plugin]: https://code.google.com/p/maven-android-plugin
[wiki-native-lib]: https://code.google.com/p/maven-android-plugin/wiki/NativeLibsAsDependencies
[maven install plugin]: http://maven.apache.org/plugins/maven-install-plugin/

