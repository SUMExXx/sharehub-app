import React from "react";
import { Subtract16Regular } from '@fluentui/react-icons';

const LeftSideBar: React.FC = () => {

    return (
        <div className="h-full p-[4px] flex-col flex justify-start items-center bg-customDarkGrey">
            <button className="text-[#8E8E8E] rounded-[10px] p-[16px] transition-colors duration-200 hover:bg-customMediumGrey flex items-center justify-center">
                <Subtract16Regular />
            </button>
        </div>
    );
};

export default LeftSideBar;