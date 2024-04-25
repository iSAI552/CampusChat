import { Vote } from "../models/vote.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";
import { Post } from "../models/post.models.js";

const updateVoteCount = asyncHandler(async (postId) => {
    const upvoteCount = await Vote.countDocuments({
        postId,
        voteType: "upvote",
    });
    const downvoteCount = await Vote.countDocuments({
        postId,
        voteType: "downvote",
    });

    await Post.findByIdAndUpdate(postId, {
        upvotes: upvoteCount,
        downvotes: downvoteCount,
    });
});

const votePost = asyncHandler(async (req, res) => {
    const { postId, voteType } = req.params;
    if (!isValidObjectId(postId)) {
        throw new ApiError(404, "Invalid PostId");
    }
    if (voteType !== "upvote" && voteType !== "downvote") {
        throw new ApiError(400, "Invalid VoteType");
    }

    const post = Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post Not Found");
    }

    let voteDoc = await Vote.findOne({
        userId: req.user._id,
        postId: postId,
    });

    if (!voteDoc) {
        await Vote.create({
            userId: req.user._id,
            postId,
            voteType,
        });
    } else {
        if (voteDoc.voteType === voteType) {
            await voteDoc.deleteOne({ _id: voteDoc._id }).catch((err) => {
                throw new ApiError(500, "Error while ${voteType}ing the vote");
            });
        } else {
            voteDoc.voteType = voteType;
            await voteDoc.save();
        }
    }

    voteDoc = await Vote.findOne({
        userId: req.user._id,
        postId: postId,
    });

    updateVoteCount(postId);

    if (voteDoc) {
        return res.status(200).json(new ApiResponse(200, `${voteType}`));
    } else {
        return res.status(201).json(new ApiResponse(201, "None"));
    }
});

const voteComment = asyncHandler(async (req, res) => {
    const { commentId, voteType } = req.params;
    if (!isValidObjectId(commentId)) {
        throw new ApiError(404, "Invalid CommentId");
    }
    if (voteType !== "upvote" && voteType !== "downvote") {
        throw new ApiError(400, "Invalid VoteType");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment Not Found");
    }

    const voteDoc = await Vote.findOne({
        userId: req.user._id,
        commentId: commentId,
    });

    if (!voteDoc) {
        await Vote.create({
            userId: req.user._id,
            commentId,
            voteType,
        });
    } else {
        if (voteDoc.voteType === voteType) {
            await voteDoc.deleteOne({ _id: voteDoc._id }).catch((err) => {
                throw new ApiError(500, "Error while ${voteType}ing the vote");
            });
        } else {
            voteDoc.voteType = voteType;
            await voteDoc.save();
        }
    }

    if (voteDoc) {
        return res
            .status(200)
            .json(new ApiResponse(200, "Vote Updated Successfully"));
    } else {
        return res
            .status(201)
            .json(new ApiResponse(201, "Vote Added Successfully"));
    }
});

const getUpvotedPosts = asyncHandler(async (req, res) => {
    const posts = await Vote.aggregate([
        {
            $match: {
                userId: req.user._id,
                postId: { $exists: true },
                voteType: "upvote",
            },
        },
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
            },
        },
        {
            $project:{
                _id:0,
                postId:1
            }
        }
    ]);
    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Liked Posts Fetched Successfully"));
});

const getDownVotedPosts = asyncHandler(async (req, res) => {
    const posts = await Vote.aggregate([
        {
            $match: {
                userId: req.user._id,
                postId: { $exists: true },
                voteType: "downvote",
            },
        },
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
            },
        },
        {
            $project:{
                _id:0,
                postId:1
            }
        }
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200, posts, "Unliked Posts Fetched Successfully")
        );
});

export { votePost, voteComment, getUpvotedPosts, getDownVotedPosts };
