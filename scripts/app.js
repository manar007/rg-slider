'use strict';

/**
 * @ngdoc overview
 * @name angularRangeSliderApp
 * @description
 * # angularRangeSliderApp
 *
 * Main module of the application.
 */
angular.module('rangeSlider',[])
    .run(['$templateCache',function($templateCache){
        $templateCache.put('../../views/rg-slider.html',
                '<div class="rg-slider">' +
                     '<div class="rg-slider-wrapper"> ' +
                        '<div class="rg-slider-trackbar" ng-class="trackBarClass">' +
                             '<div class="rg-tracker"  ng-class="trackerClass"></div> ' +
                        '</div>' +
                     '</div>     ' +
                    '<div class="rg-navigator" ng-if="showNavigator" ng-class="navigatorClass">' +
                        '<ul> ' +
                            '<li ng-repeat="item in navList  track by $index" ng-style="{width: listItemWidth}">' +
                                ' <span ng-class="{rgActive: (item === curValue)}">{{item}}</span> ' +
                                '<span ng-class="{rgActive: (item+1 === curValue)}" class="rg-list-lastitem" ng-if="$last">{{item + 1 }}</span>' +
                            '</li>' +
                        '</ul>' +
                      '</div>' +
                 '</div>');
    }]);
