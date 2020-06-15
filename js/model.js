const model = {};
model.currentUser = undefined;
model.conversations = undefined;
model.currentConversaton = undefined;
model.register = ({ firstName, lastName, email, password }) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
        // handle success
        firebase.auth().currentUser.updateProfile({
            displayName: `${firstName} ${lastName}`
        })
        firebase.auth().currentUser.sendEmailVerification()
        view.setActiveScreen('loginScreen')
    }).catch((err) => {
        // handle error
        console.log(err)
        alert(err.message)
    })
}

model.login = ({ email, password }) => {
    document.getElementById('login-text').style = 'display: none'
    document.getElementById('loading-icon').style = 'display: block'
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
        console.log(response)
        if (!response.user.emailVerified) {
            alert('Please verify email !')
            document.getElementById('login-text').style = 'display: block'
            document.getElementById('loading-icon').style = 'display: none'
        } else {
            // alert('Login success !')
            model.currentUser = {
                displayName: response.user.displayName,
                uid: response.user.uid,
                email: response.user.email
            }
            view.setActiveScreen('chatScreen')
        }
    }).catch(err => {
        document.getElementById('login-text').style = 'display: block'
        document.getElementById('loading-icon').style = 'display: none'
        console.log(err)
        alert(err.message)
    })
}
model.loadConversations = () => {
    return new Promise((resolve, reject) => {
        const collectionName = 'conversations'
        firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).get().then(res => {
            model.conversations = getDataFromDocs(res.docs)
            if (model.conversations.length > 0) {
                model.currentConversaton = model.conversations[0]
                console.log(model.currentConversaton)
            }
            resolve()
        })
    })
}
getDataFromDoc = (doc) => {
    let user = doc.data()
    user.id = doc.id
    return user
}
getDataFromDocs = (docs) => {
    return docs.map(getDataFromDoc)
}

const sendMessageForm = document.getElementById('chat-form')
const message = {
    messages: firebase.FieldValue.arrayUnion({
        createdAt: new Date(),
        content: sendMessageForm.message.value,
        owner: model.currentUser.email
    })
}

model.updateConversation = (message) => {
    firebase.firestore().collection('conversations').doc("fuQKqU2YYt575vIVAizR").update(message).then(res => {
        console.log("updated")
    })
}