/**
* @name getTasks/handleSuccess
* @description Get all names and tasks
* @param response -
*/
danApp.service('taskService', function($http) {

  return({
    getTasks: getTasks
  });

  function getTasks() {
    var request = $http({
      method: 'get',
      url: '/tasks',
      params: {
        action: 'get'
      }
    });
    return (request.then(handleSuccess));
  }

  function handleSuccess(response) {
    return (response.data);
  }

});