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

    const bugetsSlider = new Swiper('.block-bugets__slider', {
        slidesPerView: 'auto',
        spaceBetween: 13,
        wrapperClass: 'block-bugets__row',
        slideClass: 'block-bugets__col',
        slideActiveClass: 'block-bugets__col--active',
        loop: true,
        loopFillGroupWithBlank: true,
        breakpoints: {
            640: {
                spaceBetween: 30,
            },
        },
    })

    // video player

    const playBtns = document.querySelectorAll('.video-play-btn')
    const closeBtn = document.querySelector('.video-player-modal__close')
    const videContainer = document.querySelector('.video-player-modal__container')
    const videoModalElm = document.querySelector('.video-player-modal')


    function openVideoModal(src) {
        const iframe = document.createElement('iframe')
        iframe.src = src
        videoModalElm.classList.add('is-active')
        videContainer.appendChild(iframe)
    }

    function closeVideoModal() {
        videoModalElm.classList.remove('is-active')
        videContainer.innerHTML = ''
    }

    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', () => {
            openVideoModal(playBtn.dataset.src)
        })
    })

    closeBtn.addEventListener('click', () => {
        closeVideoModal()
    })


    // select
    const selectElms = document.querySelectorAll('.search-matching__select')

    selectElms.forEach(selectElm => {
        const openBtn = selectElm.querySelector('.search-matching__select-main')
        const selectedText = selectElm.querySelector('.search-matching__select-text')
        const options = selectElm.querySelectorAll('.search-matching__select-option')

        openBtn.addEventListener('click', () => {
            selectElm.classList.add('is-active')
        })

        options.forEach(option => {
            option.addEventListener('click', () => {
                selectElm.classList.remove('is-active')
                selectedText.dataset.value = option.dataset.value
                selectedText.innerHTML = option.innerText
            })
        })

        selectElm.addEventListener('mouseleave', ()=> {
            selectElm.classList.remove('is-active')
        })
    })

    // music items
    const mItems = document.querySelectorAll('.music-item')

    mItems.forEach(mItem => {
        mItem.addEventListener('click', ()=> {
            mItems.forEach(r => r.classList.remove('is-active'))
            mItem.classList.add('is-active')
        })
    })
}