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
    console.log(firebase.app())
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user)
            model.currentUser = {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email
            }
            view.setActiveScreen('loginScreen')
        } else {
            view.setActiveScreen('loginScreen')
        }
    })
}