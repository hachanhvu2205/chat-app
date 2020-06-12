const components = {};
components.registerScreen = `
<div class="register-wrapper">
            <div class="form-wrapper">
                <div class="title">
                    Mindx Chat
                </div>
                <form id="register-form" >
                    <div class="name-wrapper">
                        <div class="input-wrapper">
                            <input class="input" type="text" name="firstName" placeholder="First name">
                            <div class="error" id="error-first-name"></div>
                        </div>
                        <div class="input-wrapper">
                            <input class="input" type="text" name="lastName" placeholder="Last name">
                            <div class="error" id="error-last-name"></div>
                        </div>
                    </div>
                        <div class="input-wrapper">
                            <input class="input"type="text" name="email" placeholder="Email">
                            <div class="error" id="error-email"></div>
                        </div>
                        <div class="input-wrapper">
                            <input class="input"type="password" name="password" placeholder="Password">
                            <div class="error" id="error-confirm-password"></div>
                        </div>
                        <div class="input-wrapper">
                            <input class="input" type="password" name="confirmPassword" placeholder="Confirm Password">
                            <div class="error" id="error-confirm-password"></div>
                        </div>
                        <div class="submit-wrapper">
                            <div>
                                Already have an account ?<a id="redirect-login" >login</a>
                            </div>
                            
                            <input class="input" type="submit" value="Register">
                        </div>
                </form>
            </div>
</div>
`

components.loginScreen = `
<div class="login-wrapper1">
            <div class="form-wrapper1">
                <div class="title1">
                    Techkid Chat
                </div>
                <form id="login-form1">
                    <div class="input-wrapper1">
                        <input class="input" type="text" name="email" placeholder="Email">
                        <div class="error" id="error-email1"></div>
                    </div>
                    <div class="input-wrapper1">
                        <input class="input" type="password" name="password" placeholder="Password">
                        <div class="error" id="error-confirm-Password1"></div>
                    </div>
                    <div class="submit-wrapper1">
                        <div >
                            Don't have an account?<a id="redirect-register" >Register</a>
                        </div>
                        <button type="submit">
                            <span id="login-text">Login</span>
                            <i id="loading-icon" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                        </button>
                    </div>
                </form>
            </div>
</div>
`

components.chatScreen = `
<div class="chat-container">
            <div class="header">
                MindX Chat
            </div>

            <div class="main">
                <div class="conversation-name">
                    Your conversation
                </div>
                <div class="conversation-detail">
 
                </div>
                <form id="chat-form">
                    <div class="input-chat-wrapper">
                        <input type="text" id ="textSend" name="message" placeholder="Type a message....">
                        <button onclick="disabledChat()" type="submit"><i  class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        </div>
`