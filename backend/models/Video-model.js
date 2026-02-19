import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    aiAvatar: {
      avatarId: {
        type: String,
        required: false, // Optional if user wants to use default avatar
      },
      avatarName: {
        type: String,
        required: false,
      },
      avatarImageUrl: {
        type: String,
        required: false,
      },
    },
    videoUrl: {
      type: String,
      required: false, // Will be populated after video generation
    },
    videoPath: {
      type: String,
      required: false, // Local file path if stored on server
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    duration: {
      type: Number, // Duration in seconds
      required: false,
    },
    thumbnail: {
      type: String, // URL or path to thumbnail image
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    settings: {
      resolution: {
        type: String,
        enum: ["720p", "1080p", "4K"],
        default: "1080p",
      },
      frameRate: {
        type: Number,
        default: 30,
      },
      quality: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
    },
    errorMessage: {
      type: String,
      required: false, // Store error message if generation fails
    },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;



