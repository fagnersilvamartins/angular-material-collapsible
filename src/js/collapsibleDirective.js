(function () {
    'use strict';

    angular
        .module('ngMaterialCollapsible')
        .directive('mdCollapsible', MdCollapsible)
        .directive('mdCollapsibleItem', MdCollapsibleItem)
        .directive('mdCollapsibleHeader', MdCollapsibleHeader)
        .directive('mdCollapsibleBody', MdCollapsibleBody);

    function MdCollapsible() {
        return {
            restrict: 'E',
            link: function (scope, element) {
                element.attr('layout', 'column');
                element.addClass('layout-column');
            }
        };
    }

    function MdCollapsibleItem() {
        return {
            restrict: 'E',
            scope: {
                isOpen: '=?mdOpen'
            },
            link: function (scope, element) {
                if (scope.isOpen) {
                    element.addClass('active');
                }
            }
        };
    }

    function MdCollapsibleBody() {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div layout="column" ng-transclude></div>',
        };
    }

    function MdCollapsibleHeader() {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div layout="row" class="md-collapsible-tools" ng-transclude></div>',
            link: function (scope, element) {

                var CLASS_ACTIVE = 'active';
                element.on('click', onClick);

                function onClick(event) {
                    if (verifyClick(event)) {

                        var parentElement = angular.element(element[0].parentElement);

                        if (parentElement.hasClass(CLASS_ACTIVE)) {
                            parentElement.removeClass(CLASS_ACTIVE);
                            return;
                        }

                        var collapsible = angular.element(parentElement[0].parentElement);
                        if (!collapsible.hasClass('multiple-open')) {
                            removeClassActive(collapsible);
                        }
                        parentElement.addClass(CLASS_ACTIVE);
                    }
                }

                function verifyClick(event) {
                    var arrayNotEvent = ['md-icon', 'md-button', 'button', 'a', 'md-checkbox'];
                    return arrayNotEvent.indexOf(event.target.localName) < 0 && !event.target.hasAttribute('md-ink-ripple-checkbox');
                }

                function removeClassActive(collapsible) {
                    angular.forEach(collapsible[0].children, function (item) {
                        item = angular.element(item);
                        if (item.hasClass(CLASS_ACTIVE)) {
                            item.removeClass(CLASS_ACTIVE);
                        }
                    });
                }

            }
        };
    }

})();
