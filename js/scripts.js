window.addEventListener('scroll', function(){

  var wScroll = this.pageYOffset;

  if (wScroll < 800) {
  	document.querySelector('.logo').style.
     transform = 'translate(0, -'+ wScroll /20 +'%)';
  };


	if (wScroll > 800) {
    document.querySelector('nav').style.
    transform = 'translate(0, 0)';
  } else {
    document.querySelector('nav').style.
    transform = 'translate(0, -56px)';
  };

});
