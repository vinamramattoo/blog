(function () {
  angular
      .module("blogApp", [])
      .controller("blogController", blogController);

    function blogController($scope){
      $scope.createPost = createPost;

        function createPost() {
            console.log("post created");
        }
    }
})();
