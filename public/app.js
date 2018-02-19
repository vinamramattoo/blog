(function () {
  angular
      .module("blogApp", [])
      .controller("blogController", blogController);

    function blogController($scope, $http){
      $scope.createPost = createPost;

        function createPost(post) {
            console.log(post);
            $http.post("/api/blogPost", post);
        }
    }
})();
  
