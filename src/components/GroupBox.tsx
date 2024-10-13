import React, { useContext } from "react";
import { Subtract16Regular } from '@fluentui/react-icons';
import { GroupContext } from "../context/groupContext";

interface GroupBoxProps{
    groupIdProp: string,
    groupNameProp: string,
    groupDescProp: string,
}

const GroupBox: React.FC<GroupBoxProps> = ({groupIdProp, groupNameProp, groupDescProp}) => {

    const groupContext = useContext(GroupContext);

    if (!groupContext) {
        throw new Error("MyComponent must be used within a GroupProvider");
    }

    const { groupId, setGroupId, groupName, setGroupName, groupDesc, setGroupDesc } = groupContext;
    
    const setGroup = () => {
        setGroupId(groupIdProp);
        setGroupName(groupNameProp);
        setGroupDesc(groupDescProp);
    }
    
    return (
        <button onClick={setGroup} className="flex justify-start items-center p-[10px] gap-[10px] bg-customDarkGrey h-full w-full group rounded-[10px] transition-colors duration-200 hover:bg-customMediumGrey">
            <div className="flex justify-center items-center h-[40px] min-w-[40px] rounded-full bg-customMediumGrey group-hover:bg-customLightGrey transition-colors duration-200">
                
            </div>
            <div className="h-full flex-col flex justify-center items-start">
                <span className="text-white">{groupNameProp}</span>
                <span className="text-customLightGrey">{groupDescProp}</span>
            </div>
        </button>
    );
};

export default GroupBox;