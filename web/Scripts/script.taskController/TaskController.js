(function () {
    angular.module('App').controller('TaskController', ['$scope', '$http', function ($scope, $http) {
        $scope = $scope || {};
        $scope.taskList = [];
        $scope.request = {};
        $scope.mostrarMesangem = false;
        $scope.mostrarMesangemErro = false;
        $scope.mensagemSucesso = "";
        $scope.mensagemErro = "";

        $scope.save = function () {
            if (!validarForm())
                return;
             
            $http({
                url: '/app/tasklist/save',
                method: "POST",
                data: $scope.request
            })
                .then(function (response) {
                    init();
                },
                    function (error) {
                        mostrarMensagemErro(error.data.Message);
                    });
        };

        $scope.edit = function (selectedItem) {
            carregaInfoTask(selectedItem);
        };

        $scope.cancel = function () {
            init();
        };

        $scope.delete = function () {
            if ($scope.request.id == "0") {
                mostrarMensagemErro("Remover");
                
            } else {
                $http({
                    url: '/app/tasklist/remove/delete',
                    method: "POST",
                    data: $scope.request.id
                })
                    .then(function (response) {
                        console.log(response.data);
                        
                        $scope.mostrarMesangem = true;
                        $scope.mensagemSucesso = response.data;
                        setTimeout(function () {
                            $scope.mostrarMesangem = false;
                            $scope.mensagemSucesso = "";
                            $scope.$apply();
                        }, 3000);

                        init();
                    },
                        function (error) {
                            console.log(error);
                            mostrarMensagemErro(error.data.Message);
       
                        });
            }
        };

        function validarForm() {
            if ($scope.request.Titulo && $scope.request.Descricao && $scope.request.DataConclusao != "")
                return true;

            return false;
        };

        function getTasks() {
            $http({
                method: 'GET',
                url: '/app/tasklist/getTasks'
            }).then(function successCallback(response) {
                $scope.taskList = response.data;
                ; 
            }, function errorCallback(error) {
                mostrarMensagemErro(error.data.Message);
            });
        };

        function uploadTask(task) {
            console.log(task);
            $scope.request.id=task.id;
            $scope.request.title = task.title;
            $scope.request.description = task.description;
            $scope.request.status = task.status.toString();
            $scope.request.descriptionStatus = task.DescricaoStatus;
            $scope.request.creationdate = task.DataCriacao;
            $scope.request.doneDate = new Date(task.DataConclusao);

            console.log('Catched up task ' + $scope.request.id);
        }

        function init() {
            $scope.request.id = "0";
            $scope.request.title = "";
            $scope.request.description = "";
            $scope.request.status = "0";
            $scope.request.descriptionStatus = "Novo";
            $scope.request.creationdate = "";
            $scope.request.doneDate = "";

            getTasks();
        };

        init();
    }]);
})();