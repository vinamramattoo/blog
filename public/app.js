(function () {
  angular
      .module("blogApp", [])
      .controller("blogController", blogController);

    function blogController($scope, $http){
      $scope.createPost = createPost;
      $scope.deletePost = deletePost;

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
                $scope.posts = "no result"
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


    }
})();
