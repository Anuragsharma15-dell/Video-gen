import { z} from "zod"
export const userSchema = z.object({
    username:z.string().min(3).max(20),
    email:z.string().email(),
    password:z.string().min(8).max(20),

})

export const videoSchema = z.object({
    title: z.string().min(1).max(100),
    prompt: z.string().min(1).max(1000),
    description: z.string().max(500).optional(),
    aiAvatar: z.object({
        avatarId: z.string().optional(),
        avatarName: z.string().optional(),
        avatarImageUrl: z.string().url().optional(),
    }).optional(),
    settings: z.object({
        resolution: z.enum(["720p", "1080p", "4K"]).optional(),
        frameRate: z.number().min(24).max(60).optional(),
        quality: z.enum(["low", "medium", "high"]).optional(),
    }).optional(),
})