import mongoose from "mongoose";
import video from "../Modals/video.js";

export const uploadvideo = async (req, res) => {
  if (req.file === undefined) {
    return res
      .status(404)
      .json({ message: "plz upload a mp4 video file only" });
  } else {
    try {
      const file = new video({
        videotitle: req.body.videotitle,
        filename: req.file.originalname,
        filepath: req.file.path,
        filetype: req.file.mimetype,
        filesize: req.file.size,
        videochanel: req.body.videochanel,
        uploader: req.body.uploader,
      });
      await file.save();
      return res.status(201).json("file uploaded successfully");
    } catch (error) {
      console.error(" error:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};
const SAMPLE_VIDEOS = [
  {
    _id: "demo_1",
    videotitle: "Sample YouTube Video - Big Buck Bunny",
    filename: "BigBuckBunny.mp4",
    filetype: "video/mp4",
    filepath: "https://www.w3schools.com/html/mov_bbb.mp4",
    filesize: "15MB",
    videochanel: "Blender Open Studio",
    Like: 1420,
    views: 35200,
    uploader: "demo_user_1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo_2",
    videotitle: "Sintel - Animated Short",
    filename: "Sintel.mp4",
    filetype: "video/mp4",
    filepath: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    filesize: "22MB",
    videochanel: "Open Cinema",
    Like: 2310,
    views: 49800,
    uploader: "animator_guy",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo_3",
    videotitle: "Flower Showcase - Tech & Nature",
    filename: "Flower.mp4",
    filetype: "video/mp4",
    filepath: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    filesize: "10MB",
    videochanel: "Tech World",
    Like: 670,
    views: 12300,
    uploader: "tech_reviewer",
    createdAt: new Date().toISOString(),
  },
];

export const getallvideo = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(SAMPLE_VIDEOS);
    }
    const files = await video.find();
    if (!files || files.length === 0) {
      return res.status(200).json(SAMPLE_VIDEOS);
    }
    return res.status(200).send(files);
  } catch (error) {
    console.error("Database connection note/error, returning sample videos fallback:", error?.message || error);
    return res.status(200).json(SAMPLE_VIDEOS);
  }
};
