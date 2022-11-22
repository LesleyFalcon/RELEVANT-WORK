        function startUp() {
            removeColors();

        };

        
        var removeColors = function () {
          
            $("a.after-loop-item").removeClass("card-templates card-snippets card-guides");
        };



        var toggleColors = function () {

            $(".after-loop a").toggleClass("card-templates card-snippet card-guides");

        };


        var addClass = function (querySelector, className) {
         
            $(".after-loop div").addClass("learn-to-code")

       };

