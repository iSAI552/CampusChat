// import React from "react";
import OtpPage from "./pages/user/Otp";
import SignUpPage from "./pages/user/SignUp";
import LogInPage from "./pages/user/Login";
import LogOutPage from "./pages/user/Logout";
import CreatePostPage from "./pages/posts/CreatePost";
import GetPostPage from "./pages/posts/GetUserPost";
import UpdatePostPage from "./pages/posts/UpdatePost";
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
            <h1>----------------------------------------------------------------------------------------------</h1>
            <UpdatePostPage />
        </>
    );
}

export default App;
