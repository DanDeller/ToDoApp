danApp.service('taskService', function($http, $route, $q) {

  return {
    readTasks: readTasks,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask
  };

  /**
  * @name readTasks/handleSuccess
  * @description Get all names and tasks
  * @param response
  * @return request/response
  */
  function readTasks() {
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


  /**
  * @name createTask
  * @description Create new names and tasks
  * @param name, task
  * @return createTask
  */
  function createTask(name, task) {
    var data = {};
    data.name = name;
    data.task = task;

    $http({
      method: 'post',
      url: '/tasks',
      data: data,
      params: {
        action: 'post'
      }
    }).then(function(data) {
      $route.reload();
    }, function(error) {
      alert('Create failed due to:' + error);
    });
    return createTask;
  }


  /**
  * @name updateTask
  * @description Update names and tasks
  * @param id, name, task
  * @return updateTask
  */
  function updateTask(id, name, task) {
    var data = {};
    data.id = id;
    data.name = name;
    data.task = task;

    $http({
      method: 'patch',
      url: '/tasks',
      data: data,
      params: {
        action: 'patch'
      }
    }).then(function(data) {
      $route.reload();
    }, function(error) {
      alert('Update failed due to:' + error);
    });
    return updateTask;
  }


  /**
  * @name deleteTask
  * @description Delete names and tasks
  * @param name, task
  * @return deleteTask
  */
  function deleteTask(id, name, task) {
    $http({
      method: 'delete',
      url: 'http://localhost:3000/tasks/?id=' + id,
      params: {
        action: 'delete'
      }
    }).then(function() {
      $route.reload();
    }, function(error) {
      alert('Delete failed due to:' + error);
    });
    return deleteTask;
  }

});