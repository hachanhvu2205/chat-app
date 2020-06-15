const model = {};
model.conversations = undefined;
model.currentConversation = undefined;
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

model.loadConversations = () => {
    const promise = new Promise((resolve, reject) => {
        const collectionName = "conversations"
        firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).get().then(res => {
            model.conversations = getDataFromDocs(res.docs)
            if (model.conversations.length > 0) {
                model.currentConversation = model.conversations[0]
            }
            resolve()
        })

    })
    return promise
}
let user = firebase.auth().currentUser;
if (user != null) {
    uid = user.uid;
}

function updateFirebase() {
    const collectionName = "conversations"
    const fb = firebase.firestore()
    data = {
        content: document.getElementById('chat-form').value,
        createdAt: Date(),
        owner: model.currentUser.displayName
    }
    firebase.firestore().collection(collectionName).doc(user.uid).update(data).then(res => {
        console.log("updated")
    })
}
getDataFromDoc = (doc) => {
    let user = doc.data()
    user.id = doc.id
    return (user)
}

getDataFromDocs = (docs) => {
    return docs.map(getDataFromDoc)
}