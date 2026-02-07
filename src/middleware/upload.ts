import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

const FILE_SIZE_LIMIT = 500 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uuidv4()}${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
  else
    cb(
      new Error(
        `Invalid file type. Only ${ALLOWED_TYPES.join(", ")} are allowed.`,
      ),
    );
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
});

export default upload;
