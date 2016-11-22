/** set width **/
var slide_width = parseInt($(".slide").css("width"));
var slide_count = $(".slide__main li").length;
$(".slide__main").css({"width":slide_count*slide_width,"margin-left":-1*slide_width});
$(".slide__main li").css({"width":slide_width});

/** set init **/
$(".slide__main").prepend($(".slide__main li:last-child"));

$(".slide__main").swipe({
  swipe:function(event, direction, distance, duration, fingerCount, fingerData){
    if(direction == 'left'){
      slide_to_left();
    }else if(direction == 'right'){
      slide_to_right();
    }
  }
});

$(".slide__action_left").bind("click", function(e){
  e.preventDefault();
  slide_to_right();
});
$(".slide__action_right").bind("click", function(e){
  e.preventDefault();
  slide_to_left();
});

function slide_to_left() {
  //console.log('to_left');
  var slide = $(".slide__main");
  var nav = $(".slide__nav");
  var width = slide.find("li").width();
  //console.log(width);
  var item = slide.find("li:first-child");
  slide.animate({left:-width}, 1000, function(){
    slide.append(item);
    slide.css({left:''});
    nav.prepend(nav.find("li:last-child"));
  });
}

function slide_to_right(){
  var slide = $(".slide__main");
  var nav = $(".slide__nav");
  var width = slide.find("li").width();
  var item = slide.find("li:last-child");
  slide.animate({left:+width}, 1000, function(){
    slide.prepend(item);
    slide.css({left:''});
    nav.append(nav.find("li:first-child"));
  });
}

window.setInterval(function(){
  slide_to_left();
}, 3000);
