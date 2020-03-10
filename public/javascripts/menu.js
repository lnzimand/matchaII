$(document).ready(function(){
    var element = $('meta[name="active-menu"]').attr('content');
    console.log(element)
    $('#' + element).addClass('active');
})