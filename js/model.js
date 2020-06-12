const model = {};
model.register = ({ firstName, lastName, email, password }) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
        firebase.auth().currentUser.updateProfile({
            displayName: firstName + ' ' + lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        view.setActiveScreen('loginScreen')
    }).catch(err => {
        console.log(err)
        alert(err.message)
    })
}
model.login = ({ email, password }) => {
    document.getElementById('login-text').style = 'display:none'
    document.getElementById('loading-icon').style = 'display:block'
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
        console.log(response)
        if (!response.user.emailVerified) {
            alert('Please verify email !')

        } else {

            model.currentUser = {
                displayName: response.user.displayName,
                uid: response.user.uid,
                email: response.user.email

            }
            view.setActiveScreen('chatScreen')
        }
    }).catch(error => {
        document.getElementById('login-text').style = 'display:block'
        document.getElementById('loading-icon').style = 'display:none'

    })
}
model.currentUser = undefined;