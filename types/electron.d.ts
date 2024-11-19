export {};

declare global {
    interface Window {
        electronAPI: {
            minimizeWindow: () => void;
            maximizeWindow: () => void;
            closeWindow: () => void;
            initRoot: () => Promise<void>;
            saveImage: (groupId: string, imageId: string) => Promise<any>;
            copyToClipBoard: (text: string) => Promise<void>;
            uploadImage: (groupId: string) => Promise<any>;
        };
    }
}
