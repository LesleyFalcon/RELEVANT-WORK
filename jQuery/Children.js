        function removeAllChildren(querySelector) {
         
            $(".card-group").children().remove();
            $(" .do-not-remove").children().empty();

        };
        removeAllChildren();

        
        function addChild(querySelector, elementOrjQueryObject) {
          
            $(".card-group").append();
        };


        function removeElement(querySelector) {
            console.log(querySelector);

            return $("p .to-be-removed").remove();

        }






