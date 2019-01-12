// JavaScript source code

/*
1. New React Project
2. Gut Source
3. Add index.js and firebase.js
4. npm install -S firebase
*/


import React from 'react';
import ReactDOM from 'react-dom';
import firebase, { auth, provider,database } from './firebase.js';

/*class DataBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { output: "" };
    }

    render() {
               
       database.ref("Users/"+this.props.userIn.uid+"/Stock").once('value', (snapshot) => {
           this.setState({ output: snapshot.val() });
        });
        
        return (
            <div style={{ "text-align": "center" }}>
                {this.state.output}
            </div>    
                );
        }
    }
    */


class DataBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: ""
        };
        this.build = this.build.bind(this);
        this.build();
    }

    build() {
        var tempObj = { Name: "", PurchaseDate: "", PurchasePrice: "", NumberShares: "" };
        var topNum = 0, bottomNum = 0;
        var countLow = 0, countTop = 0;

        database.ref("Users/" + this.props.userIn.uid + "/Stocks").on('value', (snapshot) => {
            this.topNum = snapshot.numChildren();
            snapshot.forEach((child) => {
                this.tempObj = { Name: "", PurchaseDate: "", PurchasePrice: "", NumberShares: "" };
                this.bottomNum = child.numChildren();
                child.forEach((childTwo) => {


                    if (this.countLow == this.bottomNum) {
                        if (this.countTop == this.topNum) {

                        }
                    }

                });


            });
        });
        
       
    }

    printFormat() {
        var length = this.state.stocks.length;
        var out = [];
        for (let x = 0; x < length; x++) {
            out[x] = (<li>{
                "Name: " + this.state.stocks[x].Name + "   -   " +
                "Purchase Price: " + this.state.stocks[x].PurchasePrice + "   -   " +
                "Purchase Date: " + this.state.stocks[x].PurchaseDate + "   -   " +
                "Number of Shares: " + this.state.stocks[x].NumberShares + "   -   "
            }</li>
            );
        }
        return out;
    }

    render() {
        //this.build();
        var output = this.printFormat();
        return (
            <div style={{ "text-align": "center" }}>
                <ul>{output}</ul>
            </div>
        );
    }
}


class MainHold extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
        this.updateUser = this.updateUser.bind(this);
    }
    updateUser(userIn) {
        this.setState({ user: userIn })
        
    }
    render() {
        
        if (this.state.user != null) {
            var data = <DataBase userIn={this.state.user} />
        }
        return (
            <div>
                <Reg />
                <br/><br/><br/><br/><br/>
                <Login userback={this.updateUser}/>
                <br /><br />
                {data}
            </div>
        );

    }
}

class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginStatus: "" };

    }
    loginStatus(updateVal) {
        this.setState({
            loginStatus: updateVal
        });
    }

    submit(e, user, pass, pass2) {
        
        e.preventDefault();
        
        if (pass === pass2) {
            auth.createUserWithEmailAndPassword(user, pass).then(
                () => { this.setState({ loginStatus: "Register Successful" }); }
            ).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                this.setState({ loginStatus: error.message + ". Please try again." });

            });
        } else {
            this.setState({ loginStatus: "Passwords did not match. Please try again" });
        }
    }

    render() {
        return (
            <div style={{ "text-align": "center" }}>
                Register:<br/>
                {this.state.loginStatus}
                <form onSubmit={(e, user = document.getElementById("RegUsername").value, pass = document.getElementById("RegPassword").value, pass2 = document.getElementById("RegPassword2").value) => { this.submit(e, user, pass,pass2) }}>
                    <label>
                        Username:
                        <input type="text" name="RegUsername" id="RegUsername" />
                    </label>
                    <br></br>
                    <label>
                        Password:
                        <input type="password" name="RegPassword" id="RegPassword" />
                    </label>
                    <br></br>
                    <label>
                        Re-Enter Password:
                        <input type="password" name="RegPassword2" id="RegPassword2" />
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div >
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginStatus: "" };
        //this.submit = this.submit.bind();
    }
    loginStatus(updateVal) {
        this.setState({
            loginStatus: updateVal
        });
    }

    submit(e, user, pass) {
        e.preventDefault();
        
        
        auth.signInWithEmailAndPassword(user, pass).then((value) => {
            this.setState({ loginStatus: "Login Sucessful. UID is: " + value.user.uid });
            this.props.userback(value.user);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            this.setState({ loginStatus: error.message + ". Please try again." });

        });
        
        
    }

    render() {
        return (
            <div style={{ "text-align": "center" }}>
                Login:<br />
                {this.state.loginStatus}
                <form onSubmit={(e, user = document.getElementById("LoginUsername").value, pass = document.getElementById("LoginPassword").value) => { this.submit(e,user,pass) }}> 
                    <label>
                        Username:
                        <input type="text" name="LoginUsername" id="LoginUsername" />
                    </label>
                    <br></br>
                    <label>
                        Password:
                        <input type="password" name="LoginPassword" id="LoginPassword" />
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div >
        );
    }
}


//render to the HTML
ReactDOM.render(
    <MainHold />,
    document.getElementById('root')
);
