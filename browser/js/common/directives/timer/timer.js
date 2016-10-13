app.directive("timer", function($q, $interval, Socket) {
    return {
        restrict: 'E',
        scope: {
            time: '='
        },
        templateUrl: "js/common/directives/timer/timer.html",
        link: function(scope) {
            scope.time_left = scope.time;
            var start=scope.time;
            scope.time_remaining = convert(scope.time_left);
            scope.countdown = function() {
                var timer = $interval(function() {
                    scope.time_left -= 1;
                    scope.time_remaining = convert(scope.time_left);
                    if (scope.time_left < 1) {
                        scope.time_remaining = "0:00";
                        $interval.cancel(timer);
                        scope.time_left=start;
                    }
                }, 1000);
            };

            // scope.messages = ["Get Ready!", "Get Set!", "Go!", '/'];
            //     var index = 0;
            //     var prepare = $interval(function() {
            //         scope.time_remaining = scope.messages[index];
            //         index++;
            //         console.log(scope.time_remaining);
            //         if (scope.time_remaining === "/") {
            //             scope.time_remaining = convert(time);
            //             $interval.cancel(prepare);
            //             var timer = $interval(function() {
            //                 time -= 1;
            //                 scope.time_remaining = convert(time);
            //                 if (time < 1) {
            //                     scope.time_remaining = "Time up!";
            //                     $interval.cancel(timer);
            //                 }
            //             }, 1000);
            //         }
            //     }, 1000);
            // };

            Socket.on('startBoard', function() {
                scope.countdown(scope.time_left);
            });


            function convert(time) {
                var seconds = (time % 60).toString();
                var conversion = (Math.floor(time / 60)) + ':';
                if (seconds.length < 2) {
                    conversion += '0' + seconds;
                } else {
                    conversion += seconds;
                }
                return conversion;
            }
        }
    }
})
