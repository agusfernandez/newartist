document.addEventListener("DOMContentLoaded", function () {

  fetch("https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Bad%20Bunny&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*")
    .then(response => {
      console.log("Response status:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("Data received:", data);

      const pages = data.query?.pages;
      if (!pages) {
        console.warn("No se encontraron imágenes");
        return;
      }

      const imageUrls = Object.values(pages)
        .map(p => p.imageinfo?.[0]?.url)
        .filter(Boolean);

      console.log("URLs de imágenes:", imageUrls);

      if (imageUrls.length === 0) {
        console.warn("No se pudieron extraer URLs");
        return;
      }

      renderCarousel(imageUrls);
    })
    .catch(err => {
      console.error("Error al cargar imágenes:", err);
    });


  function renderCarousel(imageUrls) {
    const container = document.querySelector('.gallery-slider');

    if (!container) {
      console.error("No se encontró el contenedor");
      return;
    }

    imageUrls.forEach(url => {
      const slide = `
        <div class="slide-item">
          <img src="${url}" alt="Bad Bunny">
        </div>
      `;
      container.insertAdjacentHTML('beforeend', slide);
    });

    var $carousel = $('.gallery-slider');

    var settings = {
      dots: false,
      arrows: true,
      slide: '.slide-item',
      slidesToShow: 3,
      centerMode: true,
      centerPadding: '60px',
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: { 
            slidesToShow: 2,
            centerPadding: '40px'
          }
        },
        {
          breakpoint: 480,
          settings: { 
            slidesToShow: 1,
            centerPadding: '30px'
          }
        }
      ]
    };

    function setSlideVisibility() {
      // Encuentra los slides visibles (donde aria-hidden="false")
      var visibleSlides = $carousel.find('.slide-item[aria-hidden="false"]');
      
      // Asegura que todos los slides visibles tengan opacidad 1
      $(visibleSlides).each(function() {
        $(this).css('opacity', 1);
      });

      // Oculta el primer slide parcial (lado izquierdo)
      $(visibleSlides).first().prev().css('opacity', 0);
    }

    // Inicializa Slick
    $carousel.slick(settings);
    
    // Comienza en el slide 1 (no en el 0)
    $carousel.slick('slickGoTo', 1);
    
    // Aplica visibilidad inicial
    setSlideVisibility();

    // Actualiza visibilidad después de cada cambio
    $carousel.on('afterChange', function() {
      setSlideVisibility();
    });

    console.log('Slick initialized for gallery');
  }

});