danApp.service('taskService', function($http, $route) {

  return {
    readTasks: readTasks,
    createTask: createTask,
    updateTask: updateTask
  };

  /**
  * @name getTasks/handleSuccess
  * @description Get all names and tasks
  * @param response
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
    });
    $route.reload();
    return createTask;
  }


  /**
  * @name updateTask
  * @description Update names and tasks
  * @param name, task
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
    });
    $route.reload();
    return updateTask;
  }

});










































