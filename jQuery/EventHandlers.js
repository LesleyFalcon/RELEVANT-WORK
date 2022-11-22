        function wireUpHandlers() {
            $("#alpha").on("click", onAlphaClicked);
            $("#beta").on("click", onBetaClicked);
            $("#gamma").on("click", onGammaClicked);
            $("#cmdClick").on("click", onProfileSelected);
            $("#cmdMouse").on("mouseover mouseout", onProfileSelected);
            $("#cmdDoubleClick").on("dblclick", onProfileSelected);
            $("#cmdCtrl").on("click", onProfileSelected);
            $("#members-container").on("click", ".item", onChildClicked);

        }

      function startUp() {
            wireUpHandlers();
        }



        function onAlphaClicked(e) {
            
            e.preventDefault();
        }



        function onBetaClicked(e) {
            console.log("beta");
            e.preventDefault();
        }


        function onGammaClicked(e) {
             
            console.log("gama");
            e.preventDefault();
        }


        function showMessage(elementId, isSelected) {
            
            $("#msg").html(elementId + " " + isSelected);
        }


        function onProfileSelected(e) {

            if (e.target.getAttribute("id")) {

                $(e.target).closest(".card").toggleClass("isSelected");
            }


            if (e.target.getAttribute("id") === "cmdCtrl" && e.ctrlKey) {
             

                $(e.target).closest(".card").toggleClass("isSelected");
            }
             }
            



            var myItem = $(this).attr("id");
            var isSelected = $(this).closest(".card").hasClass("isSelected");//hasClass checks if it has that class attached to it
            showMessage(myItem, isSelected);
        }


          function onChildClicked(e) {
            e.preventDefault();

        }




