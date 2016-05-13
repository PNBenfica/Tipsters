$(function() {

    $('#side-menu').metisMenu();

    $("#sport-events-sidebar").click(function() {
        // $('#sport-events-sidebar').animate({
        //     scrollTop: $("#side-menu").offset().top
        // }, 2000);
        $('#sport-events-sidebar').parent().find('.nav-second-level li:first-child a:first-child').click();

        var container = $('.sidebar'),
            scrollTo = $('#sport-events-sidebar');
        container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        }, 500);
    });

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }

    if (width > 768)
        $(".sidebar").css("min-height", (height) + "px");
    else
        $(".sidebar").css("min-height", (0) + "px");
    });

    // var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url || url.href.indexOf(this.href) == 0;
    // }).addClass('active').parent().parent().addClass('in').parent();
    // if (element.is('li')) {
    //     element.addClass('active');
    // }
});
