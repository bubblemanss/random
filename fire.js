var obj = $('#fire');
var fps = 200;
var letters = obj.html().split('');
obj.empty();
$.each(letters,function(el){
    obj.append($('<span>'+this+'</span>'));
});
var animateLetters = obj.find('span');
setInterval(function(){
    animateLetters.each(function(){
        $(this).css('fontSize', 80+(Math.floor(Math.random()*50)));
    });
},fps);
