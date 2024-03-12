import { Vote } from "../models/vote.models";
import {asyncHandler} from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { isValidObjectId } from "mongoose";
import { Post } from "../models/post.models.js";

const postVote = asyncHandler( async (req, res) => {
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

    const voteDoc = await Vote.findOne({
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

    if(voteDoc){
        return res.status(200).json(new ApiResponse(200, "Vote Updated Successfully"))
    } else{
        return res.status(201).json(new ApiResponse(201, "Vote Added Successfully"))
    }

})

export {postVote}