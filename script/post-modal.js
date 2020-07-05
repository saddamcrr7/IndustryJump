function postModal() {
    const modalElm = document.querySelector('.ij-post-modal')
    const closeBtn = modalElm.querySelector('.ij-post-modal__close')
    const cancelBtn = modalElm.querySelector('.post-project__btn--cancel')
    const backBtn = modalElm.querySelector('.post-project__btn--back')
    const proceedBtn = modalElm.querySelector('.post-project__btn--proceed')
    const postBtn = modalElm.querySelector('.post-project__btn--post-project')
    const backdrop = modalElm.querySelector('.ij-post-modal__backdrop')
    const navItems = modalElm.querySelectorAll('.post-project__nav-item')
    const postForms = modalElm.querySelectorAll('.post-project__form')
    const openBtns = document.querySelectorAll('.post-project-btn')

    function open(event) {
        event.preventDefault()
        modalElm.classList.add('is-active')
    }

    function close(event) {
        event.preventDefault()
        modalElm.classList.remove('is-active')
    }

    openBtns.forEach(openBtn => {
        openBtn.addEventListener('click', (e) => open(e))
    })

    closeBtn.addEventListener('click', (e) => close(e))
    cancelBtn.addEventListener('click', (e) => close(e))
    backdrop.addEventListener('click', (e) => close(e))


    let formIndex = 0
    let isInputEmpty = false

    function valideForm() {
        const selectedForm = postForms[formIndex]
        const inputs = selectedForm.querySelectorAll('.post-project__form-input')

        let h = []

        inputs.forEach((input, i) => {
            if (input.value.length > 0) {
                h.push(true)
            } else {
                h.push(false)
            }
        })

        isInputEmpty = h.every(Boolean)
    }


    function nextForm() {
        valideForm()
        if (formIndex == (postForms.length - 1) || isInputEmpty == false) return
        formIndex += 1
        formSlide(formIndex)
        navItems[formIndex].classList.add('is-active')
        btnCntrols(formIndex)

    }

    function prevForm() {
        if (formIndex == 0) return
        navItems[formIndex].classList.remove('is-active')
        formIndex -= 1
        formSlide(formIndex)
        btnCntrols(formIndex)
    }

    function formSlide(index) {
        postForms.forEach(postForm => postForm.classList.remove('is-active'))
        postForms[index].classList.add('is-active')
    }

    function btnCntrols(index) {
        if (index > 0) {
            cancelBtn.classList.remove('is-active')
            backBtn.classList.add('is-active')
        } else {
            cancelBtn.classList.add('is-active')
            backBtn.classList.remove('is-active')
        }

        if (formIndex == (postForms.length - 1)) {
            proceedBtn.classList.remove('is-active')
            postBtn.classList.add('is-active')
            isInputEmpty = false
        } else {
            proceedBtn.classList.add('is-active')
            postBtn.classList.remove('is-active')
        }
    }

    function disabledBtn() {
        if (isInputEmpty == false) {
            proceedBtn.disabled = true
        } else {
            proceedBtn.disabled = false
        }
    }


    proceedBtn.addEventListener('click', () => nextForm())
    backBtn.addEventListener('click', () => prevForm())
    postBtn.addEventListener('click', (e) => {
        if (isInputEmpty == false) return
        close(e)
        postForms.forEach(postForm => postForm.classList.remove('is-active'))
        navItems.forEach(postForm => postForm.classList.remove('is-active'))
        postForms[0].classList.add('is-active')
        navItems[0].classList.add('is-active')
        formIndex = 0
        cancelBtn.classList.add('is-active')
        backBtn.classList.remove('is-active')
        proceedBtn.classList.add('is-active')
        postBtn.classList.remove('is-active')

        const inputs = document.querySelectorAll('.post-project__form-input')
        inputs.forEach(input => input.value = '')
    })

    const creativeInput = document.querySelector('.post-project__form--creative .post-project__form-input')
    const creativeTags = document.querySelectorAll('.post-project__form--creative .post-project__tag')

    creativeTags.forEach(tag => {
        tag.addEventListener('click', () => {
            creativeInput.value = tag.innerText
        })
    })

}

postModal()