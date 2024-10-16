import React, { useState } from "react";
import { Subtract16Regular } from '@fluentui/react-icons';

interface GroupInfoBoxProps{
    groupId: string,
    groupName: string,
    groupDesc: string,
}

const GroupInfoBox: React.FC<GroupInfoBoxProps> = ({groupId, groupName, groupDesc}) => {

    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        if(groupId){
            window.electronAPI.copyToClipBoard(`${groupId}`);
            setCopied(true);
            setTimeout( () => {
                setCopied(false);
            }, 3000)
        }
    }
    
    return (
        <div className="flex px-[20px] py-[10px] border-t border-customDarkGrey2 gap-[20px] justify-start items-center w-full bg-customDarkGrey">
            <div className="flex justify-center items-center h-[40px] min-w-[40px] rounded-full bg-customMediumGrey group-hover:bg-customLightGrey transition-colors duration-200">
            
            </div>
            <div className="h-full w-full flex-col flex justify-center items-start">
                <span className="text-white">{groupName}</span>
                <span className="text-customLightGrey">{groupDesc}</span>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={copyCode} className="text-[#8E8E8E] rounded-[10px] p-[16px] transition-colors duration-200 hover:bg-customMediumGrey flex items-center justify-center min-w-[160px]">
                    {
                        copied?  <span>Code Copied</span>:<span>Invite to group</span>
                    }
                </button>
            </div>
        </div>
    );
};

export default GroupInfoBox;