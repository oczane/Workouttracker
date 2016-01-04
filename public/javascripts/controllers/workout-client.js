app.controller("workoutController", function ($scope, $http) {
    $scope.workouts = [];
    $scope.errorMessage = '';
    var rest_url = 'http://127.0.0.1:3000/workouts/';
    
    GetWorkOuts = function(){
        $http({ method: 'GET', url: rest_url}).
            success(function (data, status, headers, config) {
                $scope.workouts = data.workouts;
            }).
            error(function (data, status, headers, config) {
                $scope.errorMessage = "Nothing found";
            });
    }

    GetWorkOuts();

    $scope.GetWorkOut = function() {

        $http.get(rest_url + $scope.edit_id, {
                                    
        }).
        success(function (data, status, headers, config) {

           $scope.workout_edit_description = data.description + 'sddd';
           $scope.workout_edit_name = data.name + 'ssss';

        }).
        error(function (data, status, headers, config) {

        $scope.errorMessage = "something went wrong";

        });
 
     };

    $scope.Save = function() {

        $http.post(rest_url, {
                                    workout_name: $scope.workout_name, workout_description: $scope.workout_description
        }).
        success(function (data, status, headers, config) {

           GetWorkOuts();

           $scope.workout_description = '';
           $scope.workout_name = '';
        }).
        error(function (data, status, headers, config) {

        $scope.errorMessage = "something went wrong";

        });
 
     };

     $scope.Update = function() {

        $http.put(rest_url, {
                                    id: $scope.edit_id, workout_name: $scope.workout_edit_name, workout_description: $scope.workout_edit_description
        }).
        success(function (data, status, headers, config) {

           GetWorkOuts();

           $scope.edit_id = '';
           $scope.workout_edit_description = '';
           $scope.workout_edit_name = '';
        }).
        error(function (data, status, headers, config) {

        $scope.errorMessage = "something went wrong";

        });
 
     };

     $scope.DeleteWorkout = function() {
        $http.delete(rest_url + $scope.delete_id, {
                                    
        }).
        success(function (data, status, headers, config) {

           GetWorkOuts();

           $scope.delete_id = '';
           $scope.errorMessage = '';
        }).
        error(function (data, status, headers, config) {
            if (status == "404")
                $scope.errorMessage = "Could not find workout";
            else
                $scope.errorMessage = "Something went wrong";    
        });
 
     };
  
});