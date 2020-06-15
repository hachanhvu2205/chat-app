const view = {};
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault()
                const formData = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                }
                controller.register(formData)
            })
            const redirectLogin = document.getElementById('redirect-login')
            redirectLogin.addEventListener('click', (e) => {
                view.setActiveScreen('loginScreen')
            })
            break
        case 'loginScreen':
            document.getElementById('app').innerHTML = components.loginScreen
            const redirectRegister = document.getElementById('redirect-register')
            redirectRegister.addEventListener('click', (e) => {
                view.setActiveScreen('registerScreen')
            })
            const loginForm = document.getElementById('login-form1')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const formData = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                }
                controller.login(formData)
            })
            break
        case 'chatScreen':
            document.getElementById('app').innerHTML = components.chatScreen
            model.loadConversations().then(res => {
                view.setCurrentConversations()
            })
            const sendMessageForm = document.getElementById('chat-form')
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                console.log(sendMessageForm.message.value)
                const message = {
                    // messages: firebase.FieldValue.arrayUnion({
                    //createdAt: new Date(),
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email
                        //  })
                }
                if (sendMessageForm.message.value === '') return
                    // view.addMessage(message)
                    //const chatBotMessage = {
                    //  content: sendMessageForm.message.value,
                    //owner: 'Chatbot'
                    //}
                    //view.addMessage(chatBotMessage)
                sendMessageForm.message.value = ''
            })

    }
}
view.setCurrentConversations = () => {
    for (oneMessage of model.currentConversation.messages) {
        view.addMessage(oneMessage)
    }
}

view.setMessageError = (elementId, message) => {
    document.getElementById(elementId).innerText = message
}
view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add("message-container")
    console.log(message)
    const className = (message.owner === model.currentUser.email) ? 'your' : 'their'
    messageWrapper.innerHTML = `
    <div class="message ${className}">
    <span class="sender">${message.owner}</span>
    <span class="message-content">${message.content}</span>
</div>
    `

    document.getElementsByClassName("conversation-detail")[0].appendChild(messageWrapper)


}