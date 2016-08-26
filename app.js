var app = angular.module('gallery-app',[] );
app.directive('scrollToItem', function() {
    return {
        restrict: 'A',
        scope: {
            scrollTo: "@"
        },
        link: function(scope, $elm,attr) {

            $elm.on('click', function() {
                $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top }, "slow");
            });
        }
    }});

app.controller('galleryCtrl', function($scope, $http){
  var pageId = "markpeabodycustombuilder";
  $scope.thumbnailView = true;
  $scope.error = false;

  // get albums, including thumbnail, name + description //
  $scope.getAlbums = function(id){
    console.log("getting albums")
    pageId = id;
    $http.get("http://45.55.157.150:3005/albums?pageId="+ pageId).then(function(response){
      console.log(response);
      if(response.data.error){
        $scope.error = true;
      }
      else
      if(response.data) {
        $scope.error = false;
        $scope.albums = response.data.data;
      }
    })
  };

  $scope.viewAlbum = function(albumId) {
    $http.get("http://45.55.157.150:3005/albumPhotos?albumId=" + albumId).then(function(response){
      console.log(response);
      if(response.data) {
        $scope.currentAlbum = response.data.data;
      }
      $scope.thumbnailView = false;

    })
  };
  $scope.backToAlbums = function(){
    $scope.thumbnailView = true;
  }

  $scope.openModal = function(source) {
    $scope.modalImage=source;
  }
  //getAlbums();
});
