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
        proceedBtn.disabled = false
    }

    function close(event) {
        event.preventDefault()
        modalElm.classList.remove('is-active')
        proceedBtn.disabled = true
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
        const formGroups = selectedForm.querySelectorAll('.post-project__form-group')

        let h = []

        inputs.forEach((input, i) => {
            if (input.value.length > 0) {
                h.push(true)
            } else {
                h.push(false)
                const div = document.createElement('div')
                div.classList.add('post-project__form-erroText')
                div.innerHTML = 'Please fill out the form above to proceed'
                formGroups[i].classList.add('post-project__form-group--error')
                formGroups[i].appendChild(div)
                proceedBtn.disabled = true
                input.addEventListener('blur', (e) => {
                    if (e.target.value.length > 0) {
                        formGroups[i].classList.remove('post-project__form-group--error')
                        formGroups[i].removeChild(div)
                        proceedBtn.disabled = false
                    }
                })

                creativeTags.forEach(tag => {
                    tag.addEventListener('click', (e) => {
                        formGroups[i].classList.remove('post-project__form-group--error')
                        formGroups[i].removeChild(div)
                        proceedBtn.disabled = false
                    })
                })
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
        valideForm()
        proceedBtn.disabled = false
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

    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const div = document.createElement('div')
    div.classList.add('post-project__form-erroText')
    div.innerHTML = 'Please fill out the correct Email'

    const inputEmail = document.querySelector('.post-project__form-input--email')
    inputEmail.addEventListener('blur', (e) => {
        if (!emailIsValid(e.target.value)) {
            e.target.parentNode.classList.add('post-project__form-group--error')
            e.target.parentNode.appendChild(div)
            isInputEmpty = false
            postBtn.disabled = true
        } else {
            isInputEmpty = true
            postBtn.disabled = false
        }
    })

    inputEmail.addEventListener('focus', (e) => {
        if (e.target.parentNode.childNodes.length > 5) {
            e.target.parentNode.classList.remove('post-project__form-group--error')
            e.target.parentNode.removeChild(div)
        }
    })

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