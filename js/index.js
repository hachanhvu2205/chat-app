window.onload = () => {
    //view.setActiveScreen('registerScreen')
    var firebaseConfig = {
        apiKey: "AIzaSyA9OI5avzbeFQEFse3_vPv_T2s0G6z-c3o",
        authDomain: "chat-app-cb42c.firebaseapp.com",
        databaseURL: "https://chat-app-cb42c.firebaseio.com",
        projectId: "chat-app-cb42c",
        storageBucket: "chat-app-cb42c.appspot.com",
        messagingSenderId: "204044814318",
        appId: "1:204044814318:web:2ebde309f246f5cb18b0ff",
        measurementId: "G-0JFGJQC5R8"
    };
    firebase.initializeApp(firebaseConfig);
    //templateFunction()
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (!user.emailVerified) { view.setActiveScreen('loginScreen') }
            model.currentUser = {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email

            }
            view.setActiveScreen('chatScreen')

        } else {
            view.setActiveScreen('loginScreen')
        }
    })
}

let templateFunction = () => {
    const collectionName = "users"
        //get 1 document
    const docId = "bDmpyACP6OL6UO0ZQI5i"
    firebase.firestore().collection(collectionName).doc(docId).get().then(res => {

            console.log(getDataFromDoc(res))
        })
        // get multi document
    firebase.firestore().collection(collectionName).where('name', '==', 'Alex').get().then(res => {

            console.log(getDataFromDocs(res.docs))
        })
        // update document
    const dataToUpdate = {
        name: 'Ha',
        age: 29,
        phoneNumber: firebase.firestore.FieldValue.arrayUnion('097123124'),
        phoneNumber: firebase.firestore.FieldValue.arrayRemove('097123123')
    }
    firebase.firestore().collection(collectionName).doc(docId).update(dataToUpdate).then(res => {})
        // create document
    const dataToCreate = {
            name: 'Ahihi',
            age: 40,
            address: 'Ha Noi'
        }
        // firebase.firestore().collection(collectionName).add(dataToCreate).then(res => {
        //       console.log('created')
        // })
        //delete document
    const docIdDelete = "WJcGZHMZfWOZPYXAaNXa"
    firebase.firestore().collection(collectionName).doc(docIdDelete).delete().then(res => {
        console.log('Deleted')
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

function learnMap() {
    arr1 = [1, 2, 3, 4, 5]
    const arr2 = arr1.map(x => x * 2)
    return (arr2)

}