import { Vote } from "../models/vote.models.js";
import {asyncHandler} from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { isValidObjectId } from "mongoose";
import { Post } from "../models/post.models.js";

const updateVotesCount = async () => {
    try {
        const result = await Vote.aggregate([
            {
                $group: {
                    _id: "$postId",
                    upvotes: { $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] } },
                    downvotes: { $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] } }
                }
            }
        ]);

        // Update each post with the aggregated upvotes and downvotes
        result.forEach(async (voteResult) => {
            const { _id, upvotes, downvotes } = voteResult;
            await Post.updateOne({ _id }, { upvotes, downvotes });
        });
    } catch (error) {
        console.error("Error while updating upvotes and downvotes counts:", error);
    }
};

const votePost = asyncHandler( async (req, res) => {
    const {postId, voteType} = req.params
    if(!isValidObjectId(postId)){
        throw new ApiError(404, "Invalid PostId")
    }
    if(voteType !== "upvote" && voteType !== "downvote"){
        throw new ApiError(400, "Invalid VoteType")
    }

    const post = Post.findById(postId)
    if(!post){
        throw new ApiError(404, "Post Not Found")
    }

    let voteDoc = await Vote.findOne({
        userId: req.user._id,
        postId: postId
    })

    if(!voteDoc){
        await Vote.create({
            userId: req.user._id,
            postId,
            voteType
        })
    } else{
        if(voteDoc.voteType === voteType){
            await voteDoc.deleteOne({_id: voteDoc._id}).catch(err => {
                throw new ApiError(500, "Error while ${voteType}ing the vote")
            })
        } else{
            voteDoc.voteType = voteType
            await voteDoc.save()
        }
    }

    voteDoc = await Vote.findOne({
        userId: req.user._id,
        postId: postId
    })
    updateVotesCount();

    if(voteDoc){
        return res.status(200).json(new ApiResponse(200, `${voteType}`))
    } else{
        return res.status(201).json(new ApiResponse(201, "None"))
    }

})

const voteComment = asyncHandler( async (req, res) => {
    const {commentId, voteType} = req.params
    if(!isValidObjectId(commentId)){
        throw new ApiError(404, "Invalid CommentId")
    }
    if(voteType !== "upvote" && voteType !== "downvote"){
        throw new ApiError(400, "Invalid VoteType")
    }

    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404, "Comment Not Found")
    }

    const voteDoc = await Vote.findOne({
        userId: req.user._id,
        commentId: commentId
    })

    if(!voteDoc){
        await Vote.create({
            userId: req.user._id,
            commentId,
            voteType
        })
    } else{
        if(voteDoc.voteType === voteType){
            await voteDoc.deleteOne({_id: voteDoc._id}).catch(err => {
                throw new ApiError(500, "Error while ${voteType}ing the vote")
            })
        } else{
            voteDoc.voteType = voteType
            await voteDoc.save()
        }
    }

    if(voteDoc){
        return res.status(200).json(new ApiResponse(200, "Vote Updated Successfully"))
    } else{
        return res.status(201).json(new ApiResponse(201, "Vote Added Successfully"))
    }
})

const getUpvotedPosts = asyncHandler( async (req, res) => {
    
    const posts = await Vote.find({
        userId: req.user._id,
        postId: { $exists: true },
        voteType: "upvote"
    }).populate('postId')

    return res.status(200).json(new ApiResponse(200, posts, "Liked Posts Fetched Successfully"))
})
const getDownVotedPosts = asyncHandler( async (req, res) => {
    
    const posts = await Vote.find({
        userId: req.user._id,
        postId: { $exists: true },
        voteType: "downvote"
    }).populate('postId')

    return res.status(200).json(new ApiResponse(200, posts, "Unliked Posts Fetched Successfully"))
})

export {votePost, voteComment, getUpvotedPosts, getDownVotedPosts}