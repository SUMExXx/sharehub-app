import { clipboard } from "electron";

const copyToClipboard = async (text: string) => {
    clipboard.writeText(text);
};

export default copyToClipboard;