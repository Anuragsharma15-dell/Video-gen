import { fal } from "@fal-ai/client";

// Call Fal video model and return the generation result
// `prompt` will come from your API request body
export const Falvideo = async (prompt) => {
  const result = await fal.subscribe(
    "fal-ai/kling-video/v2.5-turbo/pro/text-to-video",
    {
      input: {
        prompt,
        duration: "5",
        aspect_ratio: "16:9",
        negative_prompt: "blur, distort, and low quality",
        cfg_scale: 0.5,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS" && update.logs) {
          update.logs
            .map((log) => log.message)
            .forEach((msg) => console.log("[fal]", msg));
        }
      },
    }
  );

  // `result` usually contains `data` and `requestId`
  return result;
};