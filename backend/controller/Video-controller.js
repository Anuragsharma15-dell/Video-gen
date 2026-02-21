import VideoModel from "../models/Video-model.js";
import { videoSchema } from "../zod.js";

// POST /prompt - Create a video with a prompt
export const createVideoWithPrompt = async (req, res) => {
    try {
        // Validate request body
        const validateData = await videoSchema.parseAsync(req.body);
        
        // Get user from auth middleware (should be set by authmiddleware)

        const userId = req.user?._id || req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ 
                message: "Unauthorized. Please login to create videos." 
            });
        }

        // Create video document
        const videoData = {
            user: userId,
            title: validateData.title,
            prompt: validateData.prompt,
            description: validateData.description,
            status: "pending",
            ...(validateData.aiAvatar && { aiAvatar: validateData.aiAvatar }),
            ...(validateData.settings && { settings: validateData.settings }),
        };

        const video = await VideoModel.create(videoData);

        // Populate user details
        await video.populate("user", "username email");

        res.status(201).json({
            message: "Video creation request submitted successfully",
            video: {
                id: video._id,
                title: video.title,
                prompt: video.prompt,
                status: video.status,
                aiAvatar: video.aiAvatar,
                createdAt: video.createdAt,
            },
        });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Invalid data",
                errors: error.errors,
            });
        }
        res.status(500).json({
            message: "Error creating video",
            error: error.message,
        });
    }
};

// GET /prompt - Get videos (with optional filtering)
export const getVideos = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        const { status, limit = 10, page = 1 } = req.query;

        // Build query
        const query = {};
        if (userId) {
            query.user = userId; // Get only user's videos if authenticated
        }
        if (status) {
            query.status = status;
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch videos
        const videos = await VideoModel.find(query)
            .populate("user", "username email")
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        const total = await VideoModel.countDocuments(query);

        res.status(200).json({
            message: "Videos retrieved successfully",
            videos,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving videos",
            error: error.message,
        });
    }
};

