(function() {
    'use strict';
    angular
      .module('app')
      .controller('MainController', MainController);

    MainController.$inject = ['$localStorage', '$stateParams', '$state'];

    function MainController($localStorage, $stateParams, $state) {

      var vm = this;
      vm.url = "views/mainView.html";
      vm.$storage = $localStorage.$default({users: []});
      vm.name = '';

      if ($stateParams.index != undefined) {
        vm.name = vm.$storage.users[$stateParams.index].name;
      }

      vm.submitEnter = submitEnter;

      vm.addItemToTable = addItemToTable;
      vm.editItemTable = editItemTable;
      vm.deleteItemFromTable = deleteItemFromTable;

      vm.submit = submit;

      function submitEnter(key) {
        if(key == 13) {
          vm.addItemToTable();
        }
      }

      function addItemToTable() {
        if(vm.name) {
          vm.$storage.users.push({name: vm.name});
          vm.name = '';
        }
      }

      function editItemTable(index) {
        $state.go('edit', {"index": index});
      }

      function deleteItemFromTable(index) {
        vm.$storage.users.splice(index, 1);
      }

      function submit() {
        vm.$storage.users.splice($stateParams.index, 1, {name: vm.name});
        $localStorage.$reset({users: vm.$storage.users});

        console.log($localStorage.users[$stateParams.index]);
        console.log($localStorage);
        
        $state.go('main');
      }

    }
})();
