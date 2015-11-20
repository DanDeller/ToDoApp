/**
* @name eventFocus
* @description after adding a task focus on create task input
* @param taskFactory
*/
// hey
danApp.directive('eventFocus', function(taskFactory) {
  return function(scope, elem, attr) {
    elem.on('click', function() {
      taskFactory.focusIt(attr.eventFocusId);
    });
    scope.$on('$destroy', function() {
      elem.off(attr.eventFocus);
    });
  };
});