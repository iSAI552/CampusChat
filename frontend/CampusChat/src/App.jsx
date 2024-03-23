// import React from "react";
import OtpPage from "./pages/Otp";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/Login";
import LogOutPage from "./pages/Logout";
import CreatePostPage from "./pages/createPost";
import GetPostPage from "./pages/getUserPost";
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
            <h1>----------------------------------------------------------------------------------------------</h1>
            <CreatePostPage />
            <h1>----------------------------------------------------------------------------------------------</h1>
            <GetPostPage />
        </>
    );
}

export default App;
