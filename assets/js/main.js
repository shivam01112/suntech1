;(function($){

$(document).ready(function(){

//========== HEADER ACTIVE STRATS ============= // 
  var $header = $("#vl-header-sticky");
  var $window = $(window);
  function toggleStickyHeader() {
    var scrollTop = $window.scrollTop();
    if (scrollTop < 100) {
      $header.removeClass("header-sticky");
    } else {
      $header.addClass("header-sticky");
    }
  }
  $window.on("scroll", toggleStickyHeader);
  toggleStickyHeader();
//========== HEADER ACTIVE ENDS ============= //

//========== MOBILE MENU STARTS ============= //
  var vlMenuWrap = $('.vl-mobile-menu-active > ul').clone();
  var vlSideMenu = $('.vl-offcanvas-menu nav');
  vlSideMenu.append(vlMenuWrap);
  
  if ($(vlSideMenu).find('.sub-menu, .vl-mega-menu').length !== 0) {
    $(vlSideMenu).find('.sub-menu, .vl-mega-menu').parent().append('<button class="vl-menu-close"><i class="fas fa-chevron-right"></i></button>');
  }

  var sideMenuList = $('.vl-offcanvas-menu nav > ul > li button.vl-menu-close, .vl-offcanvas-menu nav > ul li.has-dropdown > a');
  $(sideMenuList).on('click', function (e) {
    e.preventDefault();
    var $parent = $(this).parent();

    if (!$parent.hasClass('active')) {
      $parent.addClass('active');
      $(this).siblings('.sub-menu, .vl-mega-menu').slideDown();
    } else {
      $(this).siblings('.sub-menu, .vl-mega-menu').slideUp();
      $parent.removeClass('active');
    }
  });

  $(".vl-offcanvas-toggle").on('click', function() {
    $(".vl-offcanvas").addClass("vl-offcanvas-open");
    $(".vl-offcanvas-overlay").addClass("vl-offcanvas-overlay-open");
  });

  $(".vl-offcanvas-close-toggle, .vl-offcanvas-overlay").on('click', function() {
    $(".vl-offcanvas").removeClass("vl-offcanvas-open");
    $(".vl-offcanvas-overlay").removeClass("vl-offcanvas-overlay-open");
  });
//========== MOBILE MENU ENDS ============= //

//========== PAGE PROGRESS STARTS ============= //
  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
  var updateProgress = function() {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > offset) {
      $(".progress-wrap").addClass("active-progress");
    } else {
      $(".progress-wrap").removeClass("active-progress");
    }
  });
  $(".progress-wrap").on("click", function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 550);
    return false;
  });

//========== PAGE PROGRESS STARTS ============= // 

//========== PRICING AREA ============= //
$("#ce-toggle").change(function () {
  const isChecked = $(this).is(":checked");
  $(".plan-toggle-wrap").toggleClass("active", isChecked);
  $(".tab-content #yearly").toggle(!isChecked);
  $(".tab-content #monthly").toggle(isChecked);
});
//========== PRICING AREA ============= //

//========== VIDEO POPUP STARTS ============= //
if ($(".popup-youtube").length > 0) {
  $(".popup-youtube").magnificPopup({
    type: "iframe",
  });
}
//========== VIDEO POPUP ENDS ============= //
AOS.init;
AOS.init({disable: 'mobile'});

//========== NICE SELECT ============= //
$('select').niceSelect();

});

//========== TESTIMONIAL AREA ============= //
// SLIDER //
$(".case-slider-area").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
  prevArrow: $(".next-arrow"),
  nextArrow: $(".prev-arrow"), 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


// SLIDER //
$(".testimonial-slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
  prevArrow: $(".next-arrow1"),
  nextArrow: $(".prev-arrow1"), 
});


// SLIDER //
$(".hero-main-slider").slick({
  autoplay:true,
  autoplaySpeed:1500,
  speed:2000,
  slidesToShow:1,
  slidesToScroll:1,
  pauseOnHover:false,
  dots:false,
  arrows:true,
  pauseOnDotsHover:true,
  cssEase:'linear',
  fade:true,
  draggable:true,
  prevArrow: $(".next-arrow-hero"),
  nextArrow: $(".prev-arrow-hero"), 
}); 


// SLIDER //
$(".testimonial-bottom-slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


// SLIDER //
$(".team-slider-boxarea").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
  prevArrow: $(".t-prev-area"),
  nextArrow: $(".t-next-area"), 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

// SLIDER //
$(".cas3-widget-slider-area").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
  prevArrow: $(".next-arrow-case3"),
  nextArrow: $(".prev-arrow-case3"), 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


// SLIDER //
$(".brand-images-slider").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
});

// SLIDER //
$(".testimonial4-images").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay:true,
  autoplaySpeed:2000,
  loop: true,
  focusOnSelect: true,
  vertical:false,
  asNavFor: ".testimonial4-contetnt-area",
  infinite: true,
  fade:true,
});

$(".testimonial4-contetnt-area").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: ".testimonial4-images",
  dots: false,
  arrows: true,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  prevArrow: $(".prev-arrow-testi4"),
  nextArrow: $(".next-arrow-testi4"), 
});

// SLIDER //
$(".service-widget-slider-area").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
  prevArrow: $(".next-arrow-ser4"),
  nextArrow: $(".prev-arrow-ser4"), 
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

$(".testimonial7-contetnt-area").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay:true,
  autoplaySpeed:2000,
  loop: true,
  focusOnSelect: true,
  vertical:false,
  infinite: true,
  fade:false,
  dots: true,
});

// SLIDER //
$(".testimonial8-slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: ".brand-images-area",
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  autoplay:true,
  autoplaySpeed:2000,
  infinite: true,
});

$(".brand-images-area").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: ".testimonial8-slider",
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true,
  loop: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
});


//========== PRELOADER ============= //
$(window).on("load", function (event) {
  setTimeout(function () {
    $(".preloader").fadeToggle();
  }, 200);
});
})(jQuery);


//========== COUNTER UP============= //
const ucounter = $('.counter');
if (ucounter.length > 0) {
  ucounter.countUp();
};



var $j = jQuery.noConflict();

$j(document).ready(function () {
  var countersStarted = false;

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;

        // Delay by 1 second before starting the animation
        setTimeout(function () {
          $j('.counter-number').each(function () {
            var $this = $j(this),
                countTo = $this.attr('data-count');

            $j({ countNum: 0 }).animate(
              { countNum: countTo },
              {
                duration: 3000,
                easing: 'swing',
                step: function () {
                  $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function () {
                  $this.text(Math.floor(this.countNum).toLocaleString() + '+');
                },
              }
            );
          });
        }, 300); // 1000ms = 1s delay

        observer.disconnect(); // Stop observing
      }
    });
  }, {
    threshold: 0.5 // Start when 50% of the section is visible
  });

  var target = document.querySelector('.counter-section'); // Change to your actual selector
  if (target) observer.observe(target);
});






    
        // TrimbleMaps.setAPIKey('1F06E6D8639B214A924AE90C0E3064D3');

        // const map = new TrimbleMaps.Map({
        //     container: 'map',
        //     center: [10, 40],
        //     zoom: 2.2
        // });

        // const countries = [
        //     { name: "Canada", coords: [-106.3468, 56.1304], flag: "https://flagcdn.com/w40/ca.png" },
        //     { name: "United Kingdom", coords: [-3.4360, 55.3781], flag: "https://flagcdn.com/w40/gb.png" },
        //     { name: "Germany", coords: [10.4515, 51.1657], flag: "https://flagcdn.com/w40/de.png" },
        //     { name: "Romania", coords: [24.9668, 45.9432], flag: "https://flagcdn.com/w40/ro.png" },
        //     { name: "Serbia", coords: [21.0059, 44.0165], flag: "https://flagcdn.com/w40/rs.png" },
        //     { name: "Croatia", coords: [15.2, 45.1], flag: "https://flagcdn.com/w40/hr.png" },
        //     { name: "Slovakia", coords: [19.6990, 48.6690], flag: "https://flagcdn.com/w40/sk.png" },
        //     { name: "Bulgaria", coords: [25.4858, 42.7339], flag: "https://flagcdn.com/w40/bg.png" },
        //     { name: "Jordan", coords: [36.2384, 30.5852], flag: "https://flagcdn.com/w40/jo.png" },
        //     { name: "Israel", coords: [34.8516, 31.0461], flag: "https://flagcdn.com/w40/il.png" },
        //     { name: "Saudi Arabia", coords: [45.0792, 23.8859], flag: "https://flagcdn.com/w40/sa.png" },
        //     { name: "Qatar", coords: [51.1839, 25.3548], flag: "https://flagcdn.com/w40/qa.png" },
        //     { name: "UAE", coords: [53.8478, 23.4241], flag: "https://flagcdn.com/w40/ae.png" },
        //     { name: "Iraq", coords: [43.6793, 33.2232], flag: "https://flagcdn.com/w40/iq.png" },
        //     { name: "Kuwait", coords: [47.4818, 29.3117], flag: "https://flagcdn.com/w40/kw.png" },
        //     { name: "Oman", coords: [57.8492, 21.5126], flag: "https://flagcdn.com/w40/om.png" },
        //     { name: "Bahrain", coords: [50.5577, 26.0667], flag: "https://flagcdn.com/w40/bh.png" },
        //     { name: "Russia", coords: [105.3188, 61.5240], flag: "https://flagcdn.com/w40/ru.png" }
        // ];

        // countries.forEach((country) => {
        //     const el = document.createElement('div');
        //     el.className = 'marker-flag';
        //     el.style.backgroundImage = `url('${country.flag}')`;
        //     el.title = country.name;

        //     new TrimbleMaps.Marker({ element: el })
        //         .setLngLat(country.coords)
        //         .addTo(map);
        // });
    


        