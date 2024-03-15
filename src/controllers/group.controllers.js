import { Group } from '../models/group.models.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { isValidObjectId } from 'mongoose';
import { Post } from '../models/post.models.js';

const createGroup = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        throw new ApiError(400, 'Name and description are required');
    }
    
    const group = await Group.create({
        name,
        description,
    });
    
    if (!group) {
        throw new ApiError(500, 'Group could not be created');
    }
    return res
        .status(201)
        .json(new ApiResponse(201, group, 'Group created successfully'));
});

const deleteGroup = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    if (!isValidObjectId(groupId)) {
        throw new ApiError(400, 'Invalid group ID');
    }
    const group = await Group.findById(groupId);
    if (!group) {
        throw new ApiError(404, 'Group not found');
    }
    
    await Group.deleteOne({ _id: groupId }).catch((err) => {
        throw new ApiError(500, 'Group could not be deleted')
    });

    return res
        .status(200)
        .json(new ApiResponse(200, 'Group deleted successfully'));
});

const getGroupPosts = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    if (!isValidObjectId(groupId)) {
        throw new ApiError(400, 'Invalid group ID');
    }
    const group = await Group.findById(groupId);
    if (!group) {
        throw new ApiError(404, 'Group not found');
    }
    const groupPosts = await Post.find({ group: groupId });
    if(!groupPosts) {
        throw new ApiError(404, 'No posts found for this group');
    }
    return res
        .status(200)
        .json(new ApiResponse(200, groupPosts, 'Group posts fetched successfully'));
});

export { createGroup, deleteGroup , getGroupPosts};