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

    const photoUpload = async () => {
        if(groupId != ""){
            await window.electronAPI.uploadImage(groupId).then((response: number) => {
                console.log(response)
                if(response == 200){
                    sessionStorage.setItem('groupId', groupId);
                    window.location.reload();
                }
            })
        }
    }

    return (
        <div className="flex flex-col bg-customDarkGrey3 h-full max-h-[calc(100vh-40px)] w-full">
            <GroupInfoBox groupId={groupId} groupName={groupName} groupDesc={groupDesc}/>
            <GroupImagesBox groupId={groupId}/>
            <div className="w-full bg-customDarkGrey flex justify-start items-center p-[10px]">
                <button onClick={photoUpload} className="text-white flex justify-center items-center p-[10px] gap-[10px] bg-customDarkGrey w-full group rounded-[10px] transition-colors duration-200 hover:bg-customMediumGrey">
                    Add Photo
                </button>
            </div>
        </div>
    );
};

export default GroupContentSection;