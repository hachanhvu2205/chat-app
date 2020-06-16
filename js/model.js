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
            console.log(model.conversations);
            if (model.conversations.length > 0) {
                model.currentConversation = model.conversations[0]
                console.log(model.currentConversation)
            }
            resolve()
        })
    })
}
model.setUpListenConversations = () => {
    collectionName = "conversations"
    let isFirstRun = true
    firebase.firestore().collection(collectionName).where('users', 'array-contains', model.currentUser.email).
    onSnapshot(res => {
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        console.log(res.docChanges())
        const docChanges = res.docChanges()
        for (docChange of docChanges) {
            const type = docChange.type
            const doc = getDataFromDoc(docChange.doc)

            if (type === 'modified') {
                for (let index = 0; index < model.conversations.length; index++) {
                    if (model.conversations[index].id === doc.id) {
                        model.conversations[index] = doc
                    }
                }
                if (model.currentConversation.id === doc.id) {
                    model.currentConversation = doc
                    view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length - 1])
                }
            }
            console.log(doc)
        }
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

model.addMessage = (message) => {
    const collectionName = 'conversations'
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate).then(res => {
        console.log("updated")
    })

}