'use strict';

describe('Directive: autoComplete', function () {

  // load the directive's module
  beforeEach(module('arbetsprovApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<auto-complete></auto-complete>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the autoComplete directive');
  }));
});
