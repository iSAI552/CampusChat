// import React from "react";
import OtpPage from "./pages/user/Otp";
import SignUpPage from "./pages/user/SignUp";
import LogInPage from "./pages/user/Login";
import LogOutPage from "./pages/user/Logout";
import CreatePostPage from "./pages/posts/CreatePost";
import GetPostPage from "./pages/posts/GetUserPost";
import UpdatePostPage from "./pages/posts/UpdatePost";
import DeletePostPage from "./pages/posts/DeletePost";
import VotePostPage from "./pages/vote/VotePost";
import VoteCommentPage from "./pages/vote/VoteComment";
import UpvotedPostsPage from "./pages/vote/UpvotedPosts";
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
            <h1>----------------------------------------------------------------------------------------------</h1>
            <DeletePostPage />
            <h1>----------------------------------------------------------------------------------------------</h1>
            <VotePostPage />
            <h1>----------------------------------------------------------------------------------------------</h1>
            <VoteCommentPage />
            <h1>----------------------------------------------------------------------------------------------</h1>
            <UpvotedPostsPage />
        </>
    );
}

export default App;
