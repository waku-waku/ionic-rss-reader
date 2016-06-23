'use strict';

angular
  .module('lunaIonic')
  .controller('HomeCtrl',
    ['$scope', '$timeout','RssResource','$http',
      function ($scope, $timeout, RssResource, $http) {

        var vm = this;

        // $http.get('http://localhost:3000/header').success(function(datas) {
        //   $scope.datas = datas;
        // });

        RssResource
          .parseFeed('http://hamusoku.com/index.rdf')
          .then(function (data) {
            console.log(data);
            var entries = data.data.responseData.feed.entries;
            for (var i=0; i<entries.length; i++) {
              var imgsrc = entries[i].content.match(/src="(.*?)"/igm);

              entries[i].image = imgsrc[0].slice(5, -1);
            }
            $scope.items = entries;
          })
          .catch(function () {
              $timeout(function () {
                
              }, 800);
          });

      }]);
