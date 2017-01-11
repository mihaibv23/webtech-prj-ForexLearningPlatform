(function() {

    var app = angular.module('mihai');

    app.controller('appCtrl', ['$scope', 'appService', '$state', function($scope, appService, $state) {

        $scope.categories = {};
        $scope.selectedarticle = {};
        $scope.commentlist = [];
        $scope.articlenames = [];
        $scope.comment = {};
        $scope.isEdit = false;
        $scope.articlelist = [];
        $scope.isActCat = 0;
        $scope.isActArt = 0;
        $scope.selectedCategory={};

        $scope.getcategories = function() {
            $('body').addClass('spinnerOn'); // add Class to body to show spinner

            appService.getcategory()
                .then(function(response) {
                        $scope.categories = response.success;
                        $('body').removeClass('spinnerOn');

                        //$scope.getarticlebycategory($scope.categories[0].categoryId);
                    },
                    function(reject) {
                        console.log(reject);
                    });
        };
        $scope.getcategories();

        $scope.getarticlebycategory = function(categoryid, categoryobj) {

            $scope.isActCat = categoryid;
            $scope.isActArt = 0;
            $scope.selectedarticle = {};
            $scope.commentlist = [];
            $scope.articlenames = [];
            $scope.comment = {};
            $scope.articlelist = [];
            
            $scope.selectedCategory=categoryobj;

            $('body').addClass('spinnerOn');
            appService.getarticlebycategory(categoryid)
                .then(function(response) {
                        $('body').removeClass('spinnerOn');

                        if (response.articles != undefined && response.articles.length > 0) {
                            $scope.getcommentbyarticle(response.articles[0].articleId);
                            $scope.selectedarticle = response.articles[0];

                            for (var i = 0; i < response.articles.length; i++) {
                                $scope.articlenames.push({
                                    "name": response.articles[i].name,
                                    "id": response.articles[i].articleId
                                });
                            }

                            $scope.articlelist = response.articles;
                        }
                        else {
                            window.alert("now articles found for this category");
                        }
                    },
                    function(reject) {
                        console.log(reject);
                    });
        };

        $scope.getcommentbyarticle = function(articleid) {
            $('body').addClass('spinnerOn');
            appService.getcommentbyarticle(articleid)
                .then(function(response) {
                        $scope.commentlist = response.comments;
                        $('body').removeClass('spinnerOn');
                    },
                    function(reject) {
                        console.log(reject);
                    });
        };

        $scope.postcomment = function(comment) {

            if (comment.commentId === null || comment.commentId === undefined) {
                comment.articleId = $scope.selectedarticle.articleId;
                appService.postcomment(comment)
                    .then(function(response) {
                            $scope.commentlist.push(response.comment);
                            $scope.comment = {};
                        },
                        function(reject) {
                            console.log(reject);
                        });
            }
            else {
                appService.putcomment(comment)
                    .then(function(response) {
                            $scope.getcommentbyarticle(response.articleId);
                            $scope.comment = {};
                            $scope.isEdit = false;
                        },
                        function(reject) {
                            console.log(reject);
                        });
            }
        };

        $scope.editcomment = function(comment) {
            $scope.isEdit = true;
            $scope.comment = comment;
        };

        $scope.deletecomment = function(commentid) {
            appService.deletecomment(commentid)
                .then(function(response) {
                        $scope.getcommentbyarticle($scope.selectedarticle.articleId);
                    },
                    function(reject) {
                        console.log(reject);
                    });
        };

        $scope.setArticle = function(articlename) {
            for (var i = 0; i < $scope.articlelist.length; i++) {
                if ($scope.articlelist[i].name === articlename) {
                    $scope.selectedarticle = $scope.articlelist[i];
                    $scope.getcommentbyarticle($scope.selectedarticle.articleId);
                    $scope.isActArt = $scope.selectedarticle.articleId;
                }
            }
        };

        $scope.backtohome = function() {
            $scope.categories = {};
            $scope.selectedarticle = {};
            $scope.commentlist = [];
            $scope.articlenames = [];
            $scope.comment = {};
            $scope.isEdit = false;
            $scope.articlelist = [];
            $scope.isActCat = 0;
            $scope.isActArt = 0;
            $scope.selectedCategory={};
            
            $scope.getcategories();
        }

    }]);

})();
