(function ($) {
  $(window).on("load", function () {
    $(".filter__checkbox-wrapper").mCustomScrollbar({
      axis: 'y',
      theme: 'minimal-dark',
      scrollInertia: '200',
      mouseWheel: {
        deltaFactor: 200
      }
    });
  });

})(jQuery);


$(document).ready(function init() {
  let $slider = $('.card__slider').slick({
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: 'progressive'
  });
  $('.hide-filter').click(function () {
    $slider.slick('refresh');
  })

  $('.catalog__tags').slick({
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    variableWidth: true,
    responsive: [
    {
      breakpoint: 660,
      settings: {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 570,
      settings: {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 420,
      settings: {
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }

  ]
  });
});