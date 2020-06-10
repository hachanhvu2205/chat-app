const controller = {};
controller.register = (formData) => {
    if (!formData.firstName || formData.firstName === "") {
        view.setMessageError('error-first-name', 'Please input first name')
    } else {
        view.setMessageError('error-first-name', '')
    }
    if (!formData.lastName || formData.lastName === "") {
        view.setMessageError('error-last-name', 'Please input last name')
    } else {
        view.setMessageError('error-last-name', '')
    }
    if (!formData.email || formData.email === "") {
        view.setMessageError('error-email', 'Please input email')
    } else {
        view.setMessageError('error-email', '')
    }
    if (!formData.confirmPassword || formData.confirmPassword === "") {
        view.setMessageError('error-confirm-password', 'Please input password')
    } else if (formData.confirmPassword !== formData.password) {
        view.setMessageError('error-confirm-password', "Password didn't match")
    } else {
        view.setMessageError('error-confirm-password', '')
    }
    if (formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword) {
        model.register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        })
    }
}
controller.login = (formData) => {
    if (formData.email && formData.password) {
        model.login({
            email: formData.email,
            password: formData.password
        })
    }
}