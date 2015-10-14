angular.module('flickrApp', ['ngRoute', 'flickrServices'])
.config(['$routeProvider', function flickrRouter($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: function($scope){
            }
        })
} ])
.controller('FlickrAppCtrl', 
		['$scope',  '$location', 'FlickrService', function ($scope, $location, FlickrService) {

    $scope.search = function(search, page){
        $scope.loading = true;
        var getSearchData = FlickrService.search(search, page);
        getSearchData.then(function(data) {
            $scope.photos = data.photos;
            $scope.photos = data.photos.photo;
            $scope.page = data.photos.page;
            $scope.pages = data.photos.pages;
            $scope.total = data.photos.total;
            $scope.paginator();
            $scope.loading = false;
        }, function(err) {
            console.log('Data Loading Failed: ' + err);
            $scope.loading = false;
        });
    }
    $scope.loading = true;

    $scope.paginator = function(){
        var self = this;
        var curPage = $scope.page;
        var totalPages = $scope.pages;
        var pageNav = [];

        if(curPage > 1){
            pageNav.push({text: '<< Back', number: curPage - 1, current: false});
        }

        for(var i=1;i <= totalPages;i++){
            if(i==curPage){
                if(curPage==1){
                    pageNav.push({text: curPage, number: curPage, current: true});
                }
            }else{
                if(i >= curPage - 4 && i < curPage + 4 ){
                    pageNav.push({text: i, number: i, current: true});
                }
            }
        }
        if(curPage < totalPages){
            pageNav.push({text: 'Next >>', number: (curPage + 1), current: false});
        }
        $scope.pageNav = pageNav;
    }
    $scope.search();
}
]);



    
