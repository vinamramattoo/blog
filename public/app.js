(function () {
  angular
      .module("blogApp", [])
      .controller("blogController", blogController);

    function blogController($scope, $http){
      $scope.createPost = createPost;
      $scope.deletePost = deletePost;
      $scope.editPost = editPost;
      // $scope.updatePost = updatePost;

        function init(){
            getAllPosts();
        }

        init();

        function getAllPosts(){
          $http
            .get("/api/blogPost")
            .then(
              function(posts){
              $scope.posts = posts.data;
            },
              function(err){
                $scope.msg = "failure"
              }
          )}

        function createPost(post) {
            console.log(post);
            $http.post("/api/blogPost", post)  .then(
                function(posts){
              getAllPosts();
              },
                function(err){
                  $scope.msg = "creation failed"
                })
        }

        function deletePost(id){
          $http.delete("/api/blogPost/"+id)
          .then(
            function(posts){
          getAllPosts();
          },
            function(err){
              $scope.msg = "deletion failed"
            })
        }

        function editPost(id){
          $http.get("/api/blogPost/"+id)
          .then(
            function(post){
              $scope.post = post.data;
          },
            function(err){
              $scope.msg = "couldnt retrieve data"
            })
        }

    }
})();
