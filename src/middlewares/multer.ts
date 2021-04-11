import multer from "multer";
import { getTempFolder } from "../utils/getTempFolder";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_: any, __: any, callback) => {
      callback(null, getTempFolder());
    },
    filename: (_: any, file: any, callback) => {
      const fileParts = file.originalname.split(".");
      const fileExtension = "." + fileParts[fileParts.length - 1];
      file.extension = fileExtension;
      callback(null, file.filename);
    },
  }),
});
