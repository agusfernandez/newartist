

var $carousel = $('.songs-slick');

var settings = {
  dots: false,
  arrows: true,
  slide: 'iframe',
  slidesToShow: 3,
  centerMode: true,
  centerPadding: '60px',
   responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 2,
            centerPadding: '20px'
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            centerMode: false,
            centerPadding: '0'
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            centerPadding: '0'
          }
        }
      ]
};

function setSlideVisibility() {
  //Find the visible slides i.e. where aria-hidden="false"
  var visibleSlides = $carousel.find('iframe[aria-hidden="false"]');
  //Make sure all of the visible slides have an opacity of 1
  $(visibleSlides).each(function() {
    $(this).css('opacity', 1);
  });

  //Set the opacity of the first and last partial slides.
  $(visibleSlides).first().prev().css('opacity', 0);
}

$carousel.slick(settings);
$carousel.slick('slickGoTo', 1);
setSlideVisibility();

$carousel.on('afterChange', function() {
  setSlideVisibility();
});
