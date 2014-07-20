# Weather App

> A simple app built with angular, underscore and gulp to query weather information for the top 100 US cities.

The application makes use of the Open Weather API. It's forked from this [original](https://github.com/Thinkful/angular-weather-app)
implementation with additions to add critical-path CSS optimisation, ng-annotations and other minor fixes.

Live demos of both a [normal](http://addyosmani.github.io/critical-css-weather-app/output/normal/) build and [critical-css optimized](http://addyosmani.github.io/critical-css-weather-app/output/critical) build are both available.

Before:

![](http://i.imgur.com/WCX8ke2.png)

After:

![](http://i.imgur.com/mOsDBf3.png)

## Installation

* `cd` into the project directory and run `npm install`
* Then run `gulp`
* Open a browser at `localhost:8080`.

## Usage

Normal build:

```sh
$ gulp build
```

Build with critical-path CSS:

```sh
$ gulp critical
```
