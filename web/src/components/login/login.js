import {  useState } from "react";
import { validLogin } from "../../controller/login.controller";
import "./login.css";

// function sendDetails(username, password) {
//     const result = false;
//     if(username === "") {

//     }
//     if(password === "") {

//     }
//     return result;
// }

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(username, password);
        const result = await validLogin(username, password);
        console.log(result);
        if(result.success === true) {
            // move to home
            props.updateUser(true);
        }
        else {
            // failed login, try again
            alert(result.message);
        }
    }
    
    return (
        <div>
        <div className="login-text"><h3>Login to SecuriTree</h3></div>
        <div className="container login">
        <form className="login-form" action="" onSubmit={handleSubmit}>
            <div className="row form-floating login-form-input">
                <input className="form-control" id="username" placeholder="Username" onInput={e => setUsername(e.target.value)} required/>
                <label htmlFor="username">Username</label>
                <div className="invalid-feedback">
                    Please enter a username.
                </div>
            </div>
            <div className="row form-floating login-form-input">
                <input className="form-control" id="password" type="password" placeholder="Password" onInput={e => setPassword(e.target.value)} required/>
                <label htmlFor="password">Password</label>
                <div className="invalid-feedback">
                    Please enter a password.
                </div>
            </div>
            <div className="login-form-submit"><button type="submit" className="btn btn-primary login-btn">Login</button></div>
        </form>      
        </div>
        </div>
    )
}

export default Login;