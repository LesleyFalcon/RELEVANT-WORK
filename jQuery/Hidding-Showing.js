         function startUp() {

            hideFirstCard();
            makeInvisible();
            hideLastCard();
        };


        var hideFirstCard = function () {
          
          $("div.col:first-child").hide();
         
          };

        var makeInvisible = function () {
          
          $(".inv").css("visibility", "hidden");
        };

        var hideLastCard = function () {
            
          $("div.col:last-child").addClass("d-none");
        };
