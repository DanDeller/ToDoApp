angular.module('danApp').service('taskService', function($http) {

  return({
    getTasks: getTasks,
    updateTask: updateTask
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



  function updateTask(id) {
    // var data = {};
    // data.id = id;
    // data.name = $('.task-name').val();
    // data.task = $('.task-task').val();

    // console.log(data)

    // var test = $http({
    //   method: 'patch',
    //   url: '/tasks',
    //   data: data,
    //   params: {
    //     action: 'patch'
    //   }
    // });
    // return (test.then(handleUpdate));
  }

  function handleUpdate(response) {
    return (response.data);
  }

});