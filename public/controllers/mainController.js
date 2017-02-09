(function() {
    'use strict';
    angular
      .module('app')
      .controller('MainController', MainController);

    MainController.$inject = ['$localStorage', '$stateParams', '$state', '$http'];

    function MainController($localStorage, $stateParams, $state, $http) {

      var vm = this;
      vm.url = "views/mainView.html";
      vm.users = [];
      vm.name = '';

      if ($stateParams.user != undefined) {
        vm.name = $stateParams.user.name;
      } else {
        $http.get('http://localhost:3300/api/get-users')
        .then(function successCallback(response) {
          vm.users = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      }

      vm.submitEnter = submitEnter;

      vm.addItemToTable = addItemToTable;
      vm.editItemTable = editItemTable;
      vm.deleteItemFromTable = deleteItemFromTable;

      vm.submit = submit;

      //submit on key enter (main page)
      function submitEnter(key) {
        if(key == 13) {
          vm.addItemToTable();
        }
      }

      //insert
      function addItemToTable() {
        if(vm.name) {
          $http.put('http://localhost:3300/api/add-user/', {name: vm.name})
          .then(function successCallback(response) {
            vm.users = response.data;
          }, function errorCallback(response) {
            console.log(response);
          });
          //vm.$storage.users.push({name: vm.name});
          vm.name = '';
        }
      }

      //selected user and go to edit state
      function editItemTable(user) {
        $state.go('edit', {user: {
          _id: user._id,
          name: user.name
        }});
      }

      // Delete
      function deleteItemFromTable(user) {

        $http.delete('http://localhost:3300/api/del-user/' + user._id)
        .then(function successCallback(response) {
          vm.users = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });

      }

      // Update
      function submit() {

        $http.put('http://localhost:3300/api/update-user/' + $stateParams.user._id, JSON.stringify({name: vm.name}))
        .then(function successCallback(response) {
          $state.go('main');
        }, function errorCallback(response) {
          console.log(response);
          $state.go('main');
        });


      }

    }
})();
