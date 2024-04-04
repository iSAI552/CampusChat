// import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import AddPostCommentPage from "./pages/comment/AddPostComment";
import GetPostCommentPage from "./pages/comment/GetPostComment";
import UpdatePostCommentPage from "./pages/comment/UpdatePostComment";
import DeletePostCommentPage from "./pages/comment/DeletePostComment";
function App() {
    // here pass myEmail as props to signup page

    return (
        // <>
        //     <OtpPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <SignUpPage myEmail="oneT@gmail.com" />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <LogInPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <LogOutPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <CreatePostPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <GetPostPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <UpdatePostPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <DeletePostPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <VotePostPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <VoteCommentPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <UpvotedPostsPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <AddPostCommentPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <GetPostCommentPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <UpdatePostCommentPage />
        //     <h1>----------------------------------------------------------------------------------------------</h1>
        //     <DeletePostCommentPage />
        // </>
        <>
            <BrowserRouter>
                <Routes>
                    {/*-------------------User-------------------*/}
                    <Route path="/" element={<OtpPage />} />
                    <Route index element={<OtpPage />} />
                    <Route path="/otp" element={<OtpPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/logout" element={<LogOutPage />} />
                    {/*-------------------Posts-------------------*/}
                    <Route path="/createpost" element={<CreatePostPage />} />
                    <Route path="/getpost" element={<GetPostPage />} />
                    <Route path="/updatepost" element={<UpdatePostPage />} />
                    <Route path="/deletepost" element={<DeletePostPage />} />
                    {/*-------------------Vote-------------------*/}
                    <Route path="/votepost" element={<VotePostPage />} />
                    <Route path="/votecomment" element={<VoteCommentPage />} />
                    <Route path="/upvotedposts" element={<UpvotedPostsPage />} />
                    {/*-------------------Post_Comments-------------------*/}
                    <Route path="/addpostcomment" element={<AddPostCommentPage />} />
                    <Route path="/getpostcomment" element={<GetPostCommentPage />} />
                    <Route path="/updatepostcomment" element={<UpdatePostCommentPage />} />
                    <Route path="/deletepostcomment" element={<DeletePostCommentPage />} />
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
