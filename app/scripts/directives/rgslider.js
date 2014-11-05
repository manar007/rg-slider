'use strict';
angular.module('rangeSlider')
  .directive('rgSlider', [function () {
    return {
      templateUrl: '../../views/rg-slider.html',
      restrict: 'E',
      scope: {
        trackerClass:   '@',
        trackBarClass:  '@',
        navigatorClass: '@',
        showNavigator:  '@',
        step:           '=',
        navigatorFrom:  '=',
        navigatorTo:    '=',
        boundVar:       '='
      },
      replace: false,
      link: function postLink(scope, element) {
        var tracker,
          rgSliderWrapper,
          wrapper = element[0],
          curX,
          totalSteps,
          selectedStep,
          positionWatcher,
          trackerWidth,
          STEP_DIFFERENCE = 1,
          wrapperOfssetLeft = wrapper.firstChild.getBoundingClientRect().left;

        /**
         * @description finds element by given classname inside the dom list of given element
         * NOTE its will return only one element
         * @param element <HTMLElement>
         * @param className <String>
         * @returns {*} <HTMLElement>
         */
        function getElementByClassName(element, className) {
          var foundedElement;

          function findElement(element, className) {
            var i,
              length = element.childNodes.length;
            if (foundedElement) {
              return;
            }
            for (i = 0; i < length; i++) {
              if (element.childNodes[i].nodeType && element.childNodes[i].nodeType === 1) {
                if (element.childNodes[i].classList.contains(className)) {
                  foundedElement = element.childNodes[i];
                  break;
                }
                else {
                  findElement(element.childNodes[i], className);
                }
              }
            }
          }

          findElement(element, className);

          return foundedElement;

        }

        tracker = getElementByClassName(element[0], 'rg-tracker');
        rgSliderWrapper = getElementByClassName(element[0], 'rg-slider-wrapper');
        trackerWidth = tracker.clientWidth;
        function startUpdatingTracker() {
          positionWatcher = true;
        }

        function mouseDownHandler() {
          startUpdatingTracker();
        }

        function mouseUpHandler() {
          if (positionWatcher) {
            positionWatcher = false;
          }
        }

        /**
         * @description Handle mousemove event, set the current X, and if slide tracker if it needed
         * @param event
         */
        function mouseMoveHandler(event) {
          curX = event.pageX - wrapperOfssetLeft;
          //console.log(curX);
          if (positionWatcher) {
            slideTracker();
          }
        }

        /**
         * @description Calculate the position of tracker, where he must go and return
         * @returns {number}
         * @param {number} currentStep is the boundVar value, if it defined we calculating with exact step
         */
        function getExpectedPosition(currentStep) {
          var goTo = ((100 * (curX - trackerWidth)) / rgSliderWrapper.clientWidth),
            availableWidth = 100 - ((100 * trackerWidth) / rgSliderWrapper.clientWidth);
          // to not get negative value
          if (goTo < 0) {
            goTo = 0;
          }

          scope.curValue = Math.round(goTo);
          // if setted step go calculate exact step
          if (totalSteps) {
            goTo = calculateByStep(goTo,currentStep);
          }

          return (goTo <= availableWidth) ? goTo : availableWidth;
        }

        /**
         * @description Calculate position of tracker depended on step / if step enabled
         * @param {number} value
         * @param {number} currentStep
         * @returns {number}
         */
        function calculateByStep(value, currentStep) {
          var eachStep = 100 / totalSteps,
            rounded = (value >= 0) ? Math.round(value / eachStep) : currentStep,
            goTo = Math.floor(rounded * eachStep);
          // set current step in curValue
          scope.curValue = scope.navList[rounded];
          // if the value is last value then set it
          if (goTo === 100) {
            scope.curValue = scope.navList[rounded - 1] + 1;
          }

          return goTo;
        }

        /**
         * @description Fire watchers and update boundVar value
         */
        function updateBoundVar() {
          scope.$evalAsync(function (scope) {
            scope.boundVar = scope.curValue;
          });
        }

        /**
         * @description Render tracker and update boundVar
         */
        function slideTracker(currentStep) {
          tracker.style.left = getExpectedPosition(currentStep) + '%';
          updateBoundVar();
        }

        /**
         * @description initialize event listeners
         */
        function initEventListeners() {
          tracker.addEventListener('mousedown', mouseDownHandler);
          wrapper.addEventListener('click', slideTracker);
          document.addEventListener('mouseup', mouseUpHandler);
          document.addEventListener('mousemove', mouseMoveHandler);
        }

        function removeEventListeners() {
          document.removeEventListener('mouseup', mouseUpHandler);
          document.removeEventListener('mousemove', mouseMoveHandler);
        }

        /**
         * @description Generate navigation list if scope.showNavigator is true and step is provided
         */
        function generateNavigatorListByStep() {
          var navList = [], i;
          for (i = 1; i <= totalSteps; i++) {
            navList.push(i);
          }
          scope.navList = navList;
        }

        /**
         * @description Generate navigation list if scope.showNavigator is true and (navigatorFrom && navigatorTo)  is provided
         */
        function generateNavigatorList() {
          scope.navigatorFrom = parseInt(scope.navigatorFrom, 10);
          scope.navigatorTo = parseInt(scope.navigatorTo, 10);
          var navList = [], i, length = totalSteps + scope.navigatorFrom - STEP_DIFFERENCE;
          // Generate error when navigatorFrom > navigatorTo
          if (scope.navigatorFrom > scope.navigatorTo) {
            throw new Error('navigatorFrom: ' + scope.navigatorFrom + ' must be lower than navigatorTo: ' + scope.navigatorTo);
          }

          for (i = scope.navigatorFrom; i <= length; i++) {
            navList.push(i);
          }
          scope.navList = navList;

        }

        /**
         * @description Set tracker position / if we have default value in boundVar slide to it, if not set first element from nav list
         */
        function setTracker() {
          // Update value in curValue and skip rest because we don't have navigation list
          if (!angular.isArray(scope.navList)) {
            setCurrentValue();
            return;
          }

          var index = scope.navList.indexOf(scope.boundVar);

          if (index !== -1) {
            slideTracker(index);
          }
          else {
            setCurrentValue();
          }
        }

        /**
         * @description Set current value to bound var and call $digest
         */
        function setCurrentValue() {
          scope.curValue = (totalSteps) ? scope.navList[0] : 0;
          updateBoundVar();
        }



        /**
         * @description Main initialization function which will be called when directive is initialized
         * - Register watchers and event Listeneres
         * - Check provided scope variables
         * - Generate needed variables
         */
        function init() {
          scope.$on('$destroy', removeEventListeners);
          initEventListeners();
          selectedStep = 0;
          // navigatorFrom and step property cant be used together because when setted navigatorFrom step will be calculated automatically
          if (scope.navigatorFrom && scope.step) {
            throw new Error('navigatorFrom and step can not be used together');
          }
          // Check if we have seted steps range in scope
          if (scope.navigatorFrom !== undefined && scope.navigatorTo && scope.showNavigator) {
            totalSteps = scope.navigatorTo - scope.navigatorFrom;
            generateNavigatorList();

          }
          // check if we have only setted step
          if (scope.step) {
            totalSteps = parseInt(scope.step, 10) - STEP_DIFFERENCE;
            generateNavigatorListByStep();

          }
          // if we total steps then set ul>li's exact width
          if (totalSteps) {
            scope.listItemWidth = Math.round((rgSliderWrapper.clientWidth * (100 / totalSteps)) / 100) + 'px';
            // Set first value as current value

          }

          setTracker();

        }

        init();
      }
    };
  }]);
