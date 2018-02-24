(function () {
  angular
      .module("blogApp", [])
      .controller("blogController", blogController);

    function blogController($scope, $http){
      $scope.createPost = createPost;
      $scope.deletePost = deletePost;
      $scope.editPost = editPost;
      $scope.updatePost = updatePost;
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
              swal("awwwwwww!", "Something failed", "error");
              }
          )}

        function createPost(post) {
            console.log(post);
            $http.post("/api/blogPost", post)  .then(
                function(posts){
                swal("WO HO HO!", "Created Sucessfully", "success");
              getAllPosts();
              },
                function(err){
              swal("awwwwwww!", "Something failed", "error");
                })
        }

        function deletePost(id){
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Blog!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              $http.delete("/api/blogPost/"+id)
              .then(
                function(posts){
              getAllPosts();
                swal("WO HO HO!!", "Deleted Sucessfully", "info");
              },
                function(err){
                swal("awwwwwww!", "Something failed", "error");
              });
            } else {
              swal("Your Blog is safe  Whew!");
                swal("WOAAAAAAH!!", "Your Blog is safe  Whew!", "info");
            }
          });


        }

        function editPost(id){
          $http.get("/api/blogPost/"+id)
          .then(
            function(post){
              $scope.post = post.data;
          },
            function(err){
              swal("awwwwwww!", "Something failed", "error");
            })
        }

        function updatePost(post){
          $http.put("/api/blogPost/"+post._id,post)
          .then(
            function(post){
                getAllPosts();
            swal("WO HO HO!!", "updated Sucessfully", "success");
          },
            function(err){
                swal("awwwwwww!", "Something failed", "error");
            })
        }

    }
})();
