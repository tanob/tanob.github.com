---
title: Robolectric and warnings about error binding shadow classes
layout: post
---

If you are developing for Android and using [Robolectric](http://robolectric.org) in your unit-tests, depending on how you're running them, you may get the following warnings:

    Warning: an error occurred while binding shadow class: ShadowGeoPoint
    Warning: an error occurred while binding shadow class: ShadowItemizedOverlay
    Warning: an error occurred while binding shadow class: ShadowMapController
    Warning: an error occurred while binding shadow class: ShadowMapActivity
    Warning: an error occurred while binding shadow class: ShadowMapView
    Warning: an error occurred while binding shadow class: ShadowOverlayItem

in my case this was being caused because some of the classes in the Android SDK (android.jar) have dependencies in the Google API jars, this was simply solved adding them as dependencies in my project.

