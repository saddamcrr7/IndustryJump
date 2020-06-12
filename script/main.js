
window.onload = function () {
    // navbar
    const pageHeader = document.querySelector(".page-header")
    const toggler = document.querySelector(".mobile-menu-toggle")
    const openClassName = "page-header__mobile__open"

    toggler.addEventListener('click', () => {
        pageHeader.classList.forEach(cls => {
            if (cls.indexOf(openClassName) !== -1) {
                pageHeader.classList.remove(openClassName)
            } else {
                pageHeader.classList.add(openClassName)
            }
        })
    })


    // slider 
    const breakpoint = window.matchMedia('(max-width: 990px)');
    let storiesSlider

    const breakpointChecker = function () {
        if (breakpoint.matches === true) {
            if (storiesSlider !== undefined) storiesSlider.destroy(true, true);
            return;
        } else if (breakpoint.matches === false) {
            return enableSwiper();
        }
    };


    const enableSwiper = function () {
        storiesSlider =  new Swiper('.block-find-team__videos-slider', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            wrapperClass: 'block-find-team__videos',
            slideClass: 'video',
            slideActiveClass: 'video--slide-active',
        })

    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  
    const community = new Swiper('.community-member-slider', {
        // Optional parameters
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            
            767: {
                slidesPerView: 1,
                spaceBetween: 5,
            },
        },
    })
};

