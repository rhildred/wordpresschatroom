var app = angular.module("myApp", ["firebase"]);
app.controller("myCtrl", function($scope, $firebaseArray, $firebaseAuth) {
    var phonegapReady = function(){
        $scope.ref = null;
        getRef();
        console.log("we are in phonegap with window['cordova'] = " + window['cordova'] + " navigator "+ navigator['userAgent']);
    };
    var getRef = function(){
        if($scope.ref == null){
            $scope.ref = new Firebase("https://dazzling-heat-1553.firebaseio.com/messages/room1");
            $scope.ref.onAuth(function(authData) {
                if (authData) {
                    console.log("Authenticated with uid:", authData.uid);
                    $scope.auth = authData;
                    // create a synchronized array
                    $scope.messages = $firebaseArray($scope.ref);
                    // add new items to the array
                    // the message is automatically added to our Firebase database!
                } else {
                    console.log("Client unauthenticated.")
                }
            });
        }
        return $scope.ref;
    }
    $scope.auth = null;
    $scope.ref = null;
    getRef();
    document.addEventListener("deviceready", phonegapReady, false);
    $scope.addMessage = function() {
        $scope.messages.$add({
            text: $scope.newMessageText,
            sender: $scope.auth.google.displayName,
            uid:$scope.auth.uid
        });
        $scope.newMessageText = "";
    };
    $scope.login =function() {
        var provider = 'google';
        var scope = {scope:'email'};
        var auth = $firebaseAuth(getRef());
        auth.$authWithOAuthPopup(provider, scope, function(error, authData){
            if (error) {
                // an error occurred while attempting login
                alert("error: " + error);
            }
        });
    };
    $scope.logout = function(){
        $scope.auth = null;
        getRef().unauth();
    }
});            
