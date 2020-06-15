const controller = {};
controller.register = (formData) => {
    if (!formData.firstName || formData.firstName === '') {
        view.setMessageError('error-first-name', 'Please input first name')
    } else {
        view.setMessageError('error-first-name', '')
    }
    if (!formData.email || formData.email === '') {
        view.setMessageError('error-email', 'Please input email')
    } else {
        view.setMessageError('error-email', '')
    }
    if (!formData.password || formData.password === '') {
        view.setMessageError('error-password', 'Please input password')
    } else {
        view.setMessageError('error-password', '')
    }
    if (!formData.confirmPassword || formData.confirmPassword === '') {
        view.setMessageError('error-confirm-password', 'Please input confirm password')
    } else if (formData.confirmPassword !== formData.password) {
        view.setMessageError('error-confirm-password', "Password didn't match")
    } else {
        view.setMessageError('error-confirm-password', '')
    }
    if (formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword) {
        console.log(formData.firstName)
        model.register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        })
    }
}

controller.login = (formData) => {
    // validate input
    if (!formData.password || formData.password === '') {
        view.setMessageError('error-password', 'Please input password')
    } else {
        view.setMessageError('error-password', '')
    }
    if (!formData.email || formData.email === '') {
        view.setMessageError('error-email', 'Please input email')
    } else {
        view.setMessageError('error-email', '')
    }
    if (formData.email && formData.password) {
        model.login({
            email: formData.email,
            password: formData.password
        })
    }
}