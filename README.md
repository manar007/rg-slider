rg-slider
========

AngularJS simple range slider  directive WITHOUT jQuery dependency

[**Demo**](http://manar007.github.io/rg-slider/)


### Installing
----------

Install via `bower`

```sh
bower install rg-slider --save
```


Embed files to your html

```html
<link rel="stylesheet" href="bower_components/rg-slider/dist/rg-slider.min.css">

<script src="bower_components/rg-slider/dist/rg-slider.min.js"></script>

```

**or**

[Download](https://github.com/manar007/rg-slider/archive/master.zip) repo and copy files from `dist` folder




### Simple Usage
----------

```js
// add 'rangeSlider' as dependency to your module
var yourModule = angular.module("yourModule", ['rangeSlider']);
```

And add the `rg-slider` directive in to your html , and assign the bound value 
```html
<script>
angular.controller('YourController', function($scope){
    $scope.sliderValue = null;
    
});
</script>
```
```html
 <rg-slider bound-var="sliderValue"></rg-slider>
```

--------------

### Options
--------------
`boundVar (string)`  -   The model property whom will be bound slider existing value of each change


--------------
`trackerClass (string)`  -   Applying calsss to the tracker button 

**Example**


```html
<rg-slider tracker-class="my-trackker-calss"  bound-var="sliderValue"></rg-slider>

``` 
----------

`trackBarClass  (string)`  -  Applying calsss to the slider background div's 

**Example**


```html
<rg-slider track-bar-class="my-trackbar-calss"  bound-var="sliderValue"></rg-slider>

``` 
----------

`navigatorClass  (string)`  -  Applying calsss to the slider  navigatior list and you can easly change them

**Example**


```html
<rg-slider navigator-class="my-trackbar-calss"  bound-var="sliderValue"></rg-slider>

``` 
----------

`showNavigator (boolean)`  -  Defines show/hide navigator from slider, by defult it *false* 

**Example**


```html
<rg-slider show-navigator="true"  bound-var="sliderValue"></rg-slider>

``` 
----------

`step (number)`  -  Defines how many steps will have your slider. Try to provide such number which steps can be fill on your view


> **Note**

> Your provided step will bound as a value to your boundVar, its mean when you providing 5 step slider, each step value which assigned to `boundVar` will be from *1 -5*. If you didnt provided the value it will be from *0-99*

**Example**


```html
<rg-slider show-navigator="true" step="10"  bound-var="sliderValue"></rg-slider>

``` 

----------

`navigatorFrom (number)` ; `navigatorTo(number)`  -  Defines how many steps will have your slider but with exact range


> **Note**

> Your provided step will bound as a value to your boundVar, its mean when you providing `navigator-from="6"`  to `navigator-to="13"` in this case value will start from *6* and will go to *13*

**Example**


```html
<rg-slider navigator-from="6" navigator-to="13"  bound-var="sliderValue"></rg-slider>

``` 

----------

> **Note**

> **Don't use `step` and `navigatorFrom` `navigatorTo"` together it will throw an Error** 

> Because when you providing navigatorFrom and navigatorTo the step will be calculated automatically.

----------
### For Development

----------
- Clone project
 

- `npm install`
- `bower install`
- `grunt serve`
- **And do your best :)**





### TODO
----------

- Write e2e tests
- add suport with 2 trackers
- Accept non numerical navigation, e.g navigate-from= "A" navigate-to"Z"
