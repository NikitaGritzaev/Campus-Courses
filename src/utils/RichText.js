import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
export const RichToHtml = (state) => draftToHtml(convertToRaw(state.getCurrentContent()));