window.onload = () => {
    // view.setActiveScreen('loginScreen')
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
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
    console.log(firebase.app())
        // templateFunction()
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user);

            model.currentUser = {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email
            }
            if (user.emailVerified) {
                view.setActiveScreen('chatScreen')
            } else {
                view.setActiveScreen('loginScreen')
            }
        } else {
            view.setActiveScreen('loginScreen')
        }
    })
}

let templateFunction = () => {
        const collectionName = 'users'
            // get 1 document
        const docId = 'LKgIoFBovsJbd1QlpoeP'
        firebase.firestore().collection(collectionName).doc(docId).get().then(res => {
                console.log(res)
                console.log(getDataFromDoc(res))
            })
            // get multi document
        firebase.firestore().collection(collectionName).where('age', '==', 24).get().then(res => {
                console.log(getDataFromDocs(res.docs))
            })
            // update document
        const dataToUpdate = {
            name: 'Ha',
            age: '29',
            // phoneNumber: firebase.firestore.FieldValue.arrayUnion('09123123123'),
            phoneNumber: firebase.firestore.FieldValue.arrayRemove('09123123123')
        }
        firebase.firestore().collection(collectionName).doc(docId).update(dataToUpdate).then(res => {
                console.log('Updated!')
            })
            // create document
        dataToCreate = {
                name: 'Ahihi',
                age: '40',
                address: 'Ha Noi'
            }
            // firebase.firestore().collection(collectionName).add(dataToCreate).then(res => {
            //   console.log('Created!')
            // })

        // delete document
        const docIdDelete = 'wdEPozXrUcYP2aRNYtoz'
        firebase.firestore().collection(collectionName).doc(docIdDelete).delete().then(res => {
            console.log('Deleted')
        })
    }
    // getDataFromDoc = (doc) =>{
    //   let user = doc.data()
    //   user.id = doc.id
    //   return user
    // }
    // getDataFromDocs = (docs) => {
    //   return docs.map(getDataFromDoc)
    // }

function learnMap() {
    arr1 = [1, 2, 3, 4, 5]
    arr2 = []
    arr2 = arr1.map(multiple)
    console.log(arr2)
}

function multiple(num) {
    return num * 2
}