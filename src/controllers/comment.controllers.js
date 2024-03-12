
import { isValidObjectId } from 'mongoose';
import { Comment } from '../models/comment.models.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Post } from '../models/post.models.js'

const getPostComments = asyncHandler( async (req, res) => {
    const postId = req?.params
    const {page = 1, limit = 10} = req.query

    if(!isValidObjectId(postId)){
        throw new ApiError(404, "Invalid PostId")
    }

    if(!(await Post.findById(postId))) throw new ApiError(404,"Post Not Found")

    const comments = await Comment.aggregatePaginate([
        {
            $match: {
                postId
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $project: {
                "user.password": 0,
                "user.email": 0,
                "user.refreshToken": 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: limit * (page - 1)
        },
        {
            $limit: limit
        }
    ])


    if(!comments){
        throw new ApiError(404, "No Comments Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comments,
            "Comments Fetched Successfully"
        )
    )

})

const addPostComment = asyncHandler( async (req, res) => {
    const {postId, parentCommentId} = req.params
    const {content} = req.body

    if(!isValidObjectId(postId)){
        throw new ApiError(404, "Invalid PostId")
    }

    if(!(await Post.findById(postId))) throw new ApiError(404,"Post Not Found")

    const comment = await Comment.create({
        postId : postId || null,
        userId: req.user._id,
        content: content,
        parentCommentId: parentCommentId || null,
    })

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            comment,
            "Comment Added Successfully"
        )
    )

})

const updatePostComment = asyncHandler( async (req, res) => {
    const {commentId} = req.params
    const {content} = req.body

    if(!isValidObjectId(commentId)){
        throw new ApiError(404, "Invalid CommentId")
    }

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            content
        },
        {
            new: true
        }
    )

    if(!comment){
        throw new ApiError(404, "Comment Not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comment,
            "Comment Updated Successfully"
        )
    )

})

const deletePostComment = asyncHandler( async (req, res) => {
    const {commentId} = req.params

    if(!isValidObjectId(commentId)){
        throw new ApiError(404, "Invalid CommentId")
    }

    const comment = await Comment.findByIdAndDelete(commentId)

    if(!comment){
        throw new ApiError(404, "Comment Not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Comment Deleted Successfully"
        )
    )

})

export {getPostComments, addPostComment, updatePostComment, deletePostComment}