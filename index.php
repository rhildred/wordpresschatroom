<?php

/*

Plugin Name: Live Chat

*/
wp_register_script( 'your_css_and_js1', plugins_url('js/angular.min.js',__FILE__ ));
wp_enqueue_script('your_css_and_js1');
wp_register_script( 'your_css_and_js2', plugins_url('js/firebase.js',__FILE__ ));
wp_enqueue_script('your_css_and_js2');
wp_register_script( 'your_css_and_js3', plugins_url('js/angularfire.min.js',__FILE__ ));
wp_enqueue_script('your_css_and_js3');
wp_register_script( 'your_css_and_js4', plugins_url('js/main.js',__FILE__ ));
wp_enqueue_script('your_css_and_js4');

// bring in html snippet

function livechat_shortcodes_init()
{
    function livechat_shortcode($atts = [], $content = null)
    {
        $content .= <<<EOT
       <div ng-app="myApp" ng-controller="myCtrl">
            <form ng-hide="auth != null">
                <p>This is a chat program that uses firebase as the back end. Click the login button to verify your user name with google and send messages.</p>
                <button ng-hide="google!=null" type = "submit" ng-click="login()">Login</button>
            </form>
            <form ng-hide="auth == null">
                <div ng-repeat="(n, message) in messages track by n">{{message.sender}}:{{message.text}}</div>
                <p >Message : <input type="text" ng-model="newMessageText"></p>
                <button type = "submit" ng-click="addMessage()">Send</button>
                <button ng-click="logout()">Logout</button>
            </form>
        </div>
EOT;
        return $content;
    }
    add_shortcode('live-chat', 'livechat_shortcode');
}
add_action('init', 'livechat_shortcodes_init');
