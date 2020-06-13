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

    const heroSlider = new Swiper('.block-hero__slider', {
        slidesPerView: 'auto',
        spaceBetween: 95,
        wrapperClass: 'block-hero__slider-row',
        slideClass: 'block-hero__slider-item',
        slideActiveClass: 'block-hero__slider-item--active',
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.block-hero__slider-pagination',
            clickable: true,
        },
    })
};