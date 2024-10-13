import React, { useEffect, useState } from "react";
import { Subtract16Regular } from '@fluentui/react-icons';
import path from 'path';
import GroupBox from "./GroupBox";
import { Group } from "../models/group";
import { env } from "../utils/env";

interface GroupsBarProps {
    userId: string;
}

interface GroupsData{
    groups: Group[]
}

const GroupsBar: React.FC<GroupsBarProps> = ({userId}) => {

    const [groupsData, setGroupsData] = useState<GroupsData>();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await fetch(`${env.API_BASE_URL}/users/getGroups`, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: userId }),
                }).then( async (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const result = await response.json();
                    setGroupsData(result);
                })
                } catch (error) {
                    console.error("Error:", error); 
                }
        };
        
        initializeApp();
    }, []);

    useEffect(() => {
        // if (groupsData) {
        //     console.log("Groups data has been updated:", groupsData);
        // }
    }, [groupsData]);
    
    return (
        <div className="flex flex-col p-[10px] bg-customDarkGrey2 h-full md:w-[500px] w-[300px] duration-300 transition-transform rounded-tl-[10px]">
            <div className="flex justify-between items-center p-[10px]">
                <span className="text-white">Groups</span>
                <button className="text-white rounded-[10px] py-[8px] px-[16px] transition-colors duration-200 hover:bg-customMediumGrey bg-customDarkGrey flex items-center justify-center">
                    New Group
                </button>
            </div>
            <div className="flex flex-col justify-center items-start w-full gap-[10px]">
                {   
                    groupsData?.groups.map((group, index) => 
                        <GroupBox key={index} groupIdProp={group.id} groupNameProp={group.name} groupDescProp={group.desc || ""} />
                    )
                }
            </div>
        </div>
    );
};

export default GroupsBar;