import React, { useContext, useEffect, useState } from "react";
import { Subtract16Regular } from '@fluentui/react-icons';
import { Group } from "../models/group";
import GroupInfoBox from "./GroupInfoBox";
import { GroupContext } from "../context/groupContext";
import GroupImagesBox from "./GroupImagesBox";

interface GroupContentSectionProps {
    userId: string;
}

interface GroupsData{
    groups: Group[]
}
const GroupContentSection: React.FC<GroupContentSectionProps> = ({userId}) => {

    const groupContext = useContext(GroupContext);

    if (!groupContext) {
        throw new Error("MyComponent must be used within a GroupProvider");
    }

    const { groupId, setGroupId, groupName, setGroupName, groupDesc, setGroupDesc } = groupContext;
    
    useEffect(() => {
        //
    }, [groupContext]);

    return (
        <div className="flex flex-col bg-customDarkGrey3 h-full max-h-[calc(100vh-40px)] w-full">
            <GroupInfoBox groupId={groupId} groupName={groupName} groupDesc={groupDesc}/>
            <GroupImagesBox groupId={groupId}/>
            <div className="w-full bg-customDarkGrey flex justify-start items-center">
                <button className="text-[#8E8E8E] rounded-[10px] p-[16px] transition-colors duration-200 hover:bg-customMediumGrey flex items-center justify-center">
                    <Subtract16Regular />
                </button>
            </div>
        </div>
    );
};

export default GroupContentSection;