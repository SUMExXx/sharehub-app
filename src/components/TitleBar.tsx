import React from "react";
import { Subtract16Regular, Square16Regular, Dismiss16Regular } from '@fluentui/react-icons';

const TitleBar: React.FC = () => {

    const handleMinimize = () => {
        window.electronAPI.minimizeWindow();
    };

    const handleMaximize = () => {
        window.electronAPI.maximizeWindow();
    };

    const handleClose = () => {
        window.electronAPI.closeWindow();
    };

    return (
        <div className="w-full h-[40px] min-h-[40px] bg-customDarkGrey flex justify-center items-center">
            <div className="w-full">
                
            </div>
            <div className="h-full flex justify-center items-center">
                <button onClick={handleMinimize} className="text-customLightGrey h-full px-[16px] transition-colors duration-200 hover:bg-customMediumGrey flex items-center justify-center">
                    <Subtract16Regular />
                </button>
                <button onClick={handleMaximize} className="text-customLightGrey h-full px-[16px] transition-colors duration-200 hover:bg-customMediumGrey flex items-center justify-center">
                    <Square16Regular />
                </button>
                <button onClick={handleClose} className="text-customLightGrey h-full px-[16px] transition-colors duration-200 hover:bg-customMediumGrey flex items-center justify-center">
                    <Dismiss16Regular />
                </button>
            </div>
        </div>
    );
};

export default TitleBar;