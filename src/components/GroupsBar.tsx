import React, { useContext, useEffect, useState } from "react";
import { Subtract16Regular } from '@fluentui/react-icons';
import path from 'path';
import GroupBox from "./GroupBox";
import { Group } from "../models/group";
import { env } from "../utils/env";
import { GroupContext } from "../context/groupContext";

interface GroupsBarProps {
    userId: string;
}

interface GroupsData{
    groups: Group[]
}

const GroupsBar: React.FC<GroupsBarProps> = ({userId}) => {

    const [groupsData, setGroupsData] = useState<GroupsData>();

    const [reload, setReload] = useState<boolean>(false);

    const {forceReload, setForceReload} = useContext(GroupContext);

    const [text, setText] = useState<string>('');

    const [groupName, setGroupName] = useState<string>('');
    const [groupDesc, setGroupDesc] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    };

    const handleGroupDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupDesc(event.target.value);
    };

    const [click, setClick] = useState(false);

    const [groupClick, setGroupClick] = useState(false);

    const createGroupClick = () => {
        setGroupClick(true);
    }

    const cancelGroupClick = () => {
        setGroupClick(false);
    }

    const joinClick = () => {
        setClick(true);
    }

    const cancel = () => {
        setClick(false);
    }

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

    const join = async () => {
        try {
            await fetch(`${env.API_BASE_URL}/users/joinGroup?gid=${text}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId }),
            }).then( async (response) => {
                if(response.status == 404){
                    throw new Error(`Invalid Code`);
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                setForceReload(forceReload+"a");
                setReload(!reload);
                window.location.reload();
            })
        } catch (error) {
            console.error("Error:", error); 
        }
    }

    const createGroup = async () => {
        try {
            await fetch(`${env.API_BASE_URL}/users/createGroup`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId, group_name: groupName, group_desc: groupDesc }),
            }).then( async (response) => {
                if(response.status == 404){
                    throw new Error(`Invalid Code`);
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                setForceReload(forceReload+"a");
                setReload(!reload);
                window.location.reload();

            })
        } catch (error) {
            console.error("Error:", error); 
        }
    }
    
    return (
        <div className="flex flex-col p-[10px] bg-customDarkGrey2 h-full md:w-[500px] w-[300px] duration-300 transition-transform rounded-tl-[10px]">
            <div className="flex justify-between items-center p-[10px]">
                <span className="text-white">Groups</span>
                <button onClick={createGroupClick} className="text-white rounded-[10px] py-[8px] px-[16px] transition-colors duration-200 hover:bg-customMediumGrey bg-customDarkGrey flex items-center justify-center">
                    New Group
                </button>
            </div>
            {
                groupClick?
                <div className="min-h-[calc(100vh-40px)] backdrop-blur-sm h-[calc(100vh-40px)] min-w-screen w-[100vw] left-0 absolute top-[40px] flex justify-center items-center">
                    <div className="w-[400px] h-[200px] rounded-[10px] bg-customDarkGrey2 shadow-lg flex flex-col gap-[20px] p-[20px] justify-center items-center">
                        <input
                            type="text"
                            id="textField"
                            value={groupName}
                            onChange={handleGroupName}
                            placeholder="Group Name"
                            className="px-[20px] py-[10px] rounded-[10px] bg-customLightGrey outline-none placeholder-customMediumGrey text-customDarkGrey2 w-full"
                        />
                        <input
                            type="text"
                            id="textField"
                            value={groupDesc}
                            onChange={handleGroupDesc}
                            placeholder="Group Description"
                            className="px-[20px] py-[10px] rounded-[10px] bg-customLightGrey outline-none placeholder-customMediumGrey text-customDarkGrey2 w-full"
                        />
                        <div className="flex justify-center items-center w-full gap-[10px]">
                            <button onClick={createGroup} className="text-white flex justify-center items-center p-[10px] gap-[10px] bg-customDarkGrey w-full group rounded-[10px] transition-colors duration-200 hover:bg-customMediumGrey">
                                Create Group
                            </button>
                            <button onClick={cancelGroupClick} className="text-white flex justify-center items-center py-[10px] px-[20px] gap-[10px] bg-customDarkGrey h-full group rounded-[10px] transition-colors duration-200 hover:bg-customMediumGrey">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div> :
                <></>
            }
            <div className="flex flex-col justify-start items-center w-full gap-[10px] h-full">
                {   
                    groupsData?.groups.map((group, index) => 
                        <GroupBox key={index} groupIdProp={group.id} groupNameProp={group.name} groupDescProp={group.desc || ""} />
                    )
                }
            </div>
            {
                click? 
                    <div className="flex flex-col w-full gap-[20px]">
                        <input
                            type="text"
                            id="textField"
                            value={text}
                            onChange={handleChange}
                            placeholder="Group Code"
                            className="px-[20px] py-[10px] rounded-[10px] bg-customLightGrey outline-none placeholder-customMediumGrey text-customDarkGrey2"
                        />
                        <div className="flex justify-center items-center w-full gap-[10px]">
                            <button onClick={join} className="text-white flex justify-center items-center p-[10px] gap-[10px] bg-customDarkGrey w-full group rounded-[10px] transition-colors duration-200 hover:bg-customMediumGrey">
                                Join
                            </button>
                            <button onClick={cancel} className="text-white flex justify-center items-center py-[10px] px-[20px] gap-[10px] bg-customDarkGrey h-full group rounded-[10px] transition-colors duration-200 hover:bg-customMediumGrey">
                                Cancel
                            </button>
                        </div>
                    </div> : 
                    <button onClick={joinClick} className="text-white flex justify-center items-center p-[10px] gap-[10px] bg-customDarkGrey w-full group rounded-[10px] transition-colors duration-200 hover:bg-customMediumGrey">
                        Join Group
                    </button>
            }
        </div>
    );
};

export default GroupsBar;