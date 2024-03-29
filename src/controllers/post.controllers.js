import { Post } from "../models/post.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { isValidObjectId } from "mongoose";

const createPost = asyncHandler(async (req, res) => {
    const { title, content, groupId, tags } = req.body;
    if( !title || !content || !groupId) {
        throw new ApiError(400, "Title, content and groupId are required");
    }
    
    const post = await Post.create({
        title,
        content,
        userId: req.user._id,
        groupId: groupId,
        tags: tags || ["general"]
    });

    if(!post) {
        throw new ApiError(500, "Post could not be created");
    } 
    return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"))

});

const getUserPosts = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if(!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const posts = await Post.find({ userId: userId })

    if(!posts) {
        throw new ApiError(404, "Posts not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts retrieved successfully"));

});

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { title, content, tags } = req.body;
    if(!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post ID");
    }
    const post = await Post.findById(postId);
    if(!post) {
        throw new ApiError(404, "Post not found");
    }

    if(req.user._id.toString() !== post.userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this post");
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    await post.save();

    return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if(!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post ID");
    }
    const post = await Post.findById(postId);
    if(!post) {
        throw new ApiError(404, "Post not found");
    }
    if(req.user._id.toString() !== post.userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }

    Post.deleteOne({ _id: postId }).catch((err) => {
        throw new ApiError(500, err, "Post could not be deleted");
    });

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});

export { createPost, getUserPosts, updatePost, deletePost };