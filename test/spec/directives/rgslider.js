'use strict';

describe('Directive: rgSlider', function () {

  // load the directive's module
  beforeEach(module('angularRangeSliderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rg-slider></rg-slider>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rgSlider directive');
  }));
});
