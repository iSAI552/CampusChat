// import React from "react";
import OtpPage from "./pages/Otp";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/Login";
import LogOutPage from "./pages/Logout";
function App() {
    // here pass myEmail as props to signup page

    return (
        <>
            <OtpPage />
            <h1>----------------------------------------------------------------------------------------------</h1>
            <SignUpPage myEmail="oneT@gmail.com" />
            <h1>----------------------------------------------------------------------------------------------</h1>
            <LogInPage />
            <h1>----------------------------------------------------------------------------------------------</h1>
            <LogOutPage />
        </>
    );
}

export default App;
