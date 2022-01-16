$(window).scroll(function(){
    if(window.scrollY == 675){
        $("#about-us").addClass("anim");
        $(window).unbind('scroll');
    }
});