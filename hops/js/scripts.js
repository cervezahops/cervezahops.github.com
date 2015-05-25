// Image Resizer
function resizeIMG() {
  var screenW = document.documentElement.clientWidth,
      dataElem = document.querySelectorAll('[data-img]'),
      path = "url('img/",
      ext = ".jpg')";

  for (var e = 0; e < dataElem.length; e++) {
    var fileName = dataElem[e].getAttribute('data-img');

    if (screenW < 800) {
      dataElem[e].style.backgroundImage = path + fileName + "_@low" + ext;
     } else {
      dataElem[e].style.backgroundImage = path + fileName + ext;
    }
  }
}

document.addEventListener('load', resizeIMG, true);
// This adds a resize listener, to change image in case the user opens the webpage in desktop with the window resize < 800px -- window.addEventListener('resize', resizeIMG)

function smoothScroll(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop === 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    };
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

function mobileMenu() {
  classA('nav-menu')[0].classList.toggle("is-active");
  classA('aside-menu')[0].classList.toggle("show-mobile");
}

function laPutaMadre(counter, aTag, check) {
  aTag[counter].addEventListener("click", function(event) {
    event.preventDefault();
    if (check === "mobile") {
      mobileMenu();
    }
    var scrollValue = aTag[counter].getAttribute('href'),
        scrollID = scrollValue.substring(1, scrollValue.length);
    smoothScroll(document.getElementById(scrollID));
  }, false);
}

classA('nav-menu')[0].addEventListener('click', mobileMenu);

var aMobile = classA('aside-menu')[0].getElementsByTagName("a"),
    aDesktop = classA('nav-large')[0].getElementsByTagName("a");

for (var an = 0; an < aMobile.length; an++) {
  laPutaMadre(an, aMobile, 'mobile');
}
for (var ac = 0; ac < aDesktop.length - 1; ac++) {
  laPutaMadre(ac, aDesktop);
}

// Scroll Animations

var check = true,
    check2 = true,
    checkAbout = true,
    navMenu = document.getElementById('menu'),
    navHeight = 75;

  function idTop(id) {
    var navID = document.getElementById(id),
        offsets = navID.getBoundingClientRect(),
        topNav = offsets.top + window.pageYOffset - navID.ownerDocument.documentElement.clientTop;
    return topNav;
  }

  function classA(el) {
    return document.getElementsByClassName(el);
  }

  function doTime(i, el) {
    setTimeout(function(){
      classA(el)[i].className += " show";
    }, i * 120);
  }

window.addEventListener('scroll', function(){

  var wScroll = this.pageYOffset,
      screenW = document.documentElement.clientWidth,
      screenH = document.documentElement.clientHeight;

// Navbar links active state - only for desktop

  if (screenW > 1000) {
    for (var n = 0; n < aDesktop.length - 1; n++) {
      var idValue = aDesktop[n].getAttribute('href'),
          checkID = idValue.substring(1, idValue.length),
          checkEnd = 'end';

      if (n !== aDesktop.length - 2) {
        var idValueEnd = aDesktop[n + 1].getAttribute('href'),
            checkEnd = idValueEnd.substring(1, idValueEnd.length);
      }

      if (wScroll >= idTop(checkID) - navHeight && wScroll < idTop(checkEnd) - navHeight) {
        if (aDesktop[n].className !== "hover-line active") {
          aDesktop[n].className = "hover-line active";
        }
      } else {
        if (aDesktop[n].className !== "hover-line") {
          aDesktop[n].className = "hover-line";
        }
      }
    }
  }

// Parallax animations

  if (wScroll > idTop('about') - (navHeight - 100) && check2) {
    for (var i = 0; i < classA('b').length; i++) {
      doTime(i, 'b');
    }
    check2 = false;
  }

	if (wScroll > idTop('beer') - navHeight && check) {
    for (var h = 0; h < classA('beer-container').length; h++) {
      doTime(h, 'beer-container');
    }
    check = false;
  }

  if (wScroll > 100 - navHeight && checkAbout) {
    navMenu.className = "show-nav";
    checkAbout = false;
  } else if (wScroll < 100 - navHeight && !checkAbout) {
    navMenu.className = "";
    checkAbout = true;
  }

});
