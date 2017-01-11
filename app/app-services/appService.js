(function() {

    var app = angular.module('mihai');

    app.factory('appService', ['$resource', '$q', function($resource, $q) {

        return {
            getcategory: function() {
                var deferred = $q.defer();

                $resource('/api/getallcategories')
                    .get(function(response) {
                            deferred.resolve(response);
                        },
                        function(response) {
                            deferred.reject(response);
                        });

                return deferred.promise;
            },
            getarticlebycategory: function(categoryid) {
                var deferred = $q.defer();

                $resource('/api/getarticlesbycategory?catid=' + categoryid)
                    .get(function(response) {
                            deferred.resolve(response);
                        },
                        function(response) {
                            deferred.reject(response);
                        });

                return deferred.promise;
            },
            getcommentbyarticle: function(articleid) {
                var deferred = $q.defer();

                $resource('/api/getcommentbyarticle?articleid=' + articleid)
                    .get(function(response) {
                            deferred.resolve(response);
                        },
                        function(response) {
                            deferred.reject(response);
                        });

                return deferred.promise;
            },
            postcomment: function(comment) {
                var deferred = $q.defer();

                $resource('/api/postcomment')
                    .save(comment, function(response) {
                            deferred.resolve(response);
                        },
                        function(response) {
                            deferred.reject(response);
                        });

                return deferred.promise;
            },
            putcomment: function(comment) {
                var deferred = $q.defer();

                $resource('/api/putcomment')
                    .save(comment, function(response) {
                            deferred.resolve(response);
                        },
                        function(response) {
                            deferred.reject(response);
                        });

                return deferred.promise;
            },
            deletecomment:function(commentid){
                 var deferred = $q.defer();

                $resource('/api/deletecomment?commentid='+commentid)
                    .remove(function(response) {
                            deferred.resolve(response);
                        },
                        function(response) {
                            deferred.reject(response);
                        });

                return deferred.promise;
            }

        };

    }]);

})();
