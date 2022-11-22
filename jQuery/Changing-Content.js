
        function startUp() {
            changeHeadLineImg();
            addLinkButton();
            setTagLine();
        };


        function changeHeadLineImg(imgUrl) {
          
            $(".row .col-lg-7 img").attr("src", "https://cdn.pixabay.com/photo/2021/06/04/17/04/caldera-6310371_960_720.jpg")
        };



        var addLinkButton = function () {
                    
            $(".call-to-action").html("<a class='btn btn-primary' href='#' role='button'> Link </a>");
        };


         var addHtmlToFirstCard = function () {
          
            $(".card-body").eq(0).html('<h6>Welcome!</h6><p>Click here for more info<li>Sign Up!</li><li>Sign Up!</li></p>');
        };


        function setTagLine(tagText) {
            console.log(tagText);
            
            $(".col-lg-5 > h1").text("Sabio Tag Line");
        };
