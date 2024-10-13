import React, { useEffect, useState } from "react";
import { Subtract16Regular } from '@fluentui/react-icons';
import { FluentProvider, webLightTheme} from "@fluentui/react-components";
import TitleBar from "./components/TitleBar";
import LeftSideBar from "./components/LeftSideBar";
import GroupsBar from "./components/GroupsBar";
import GroupContentSection from "./components/GroupContentSection";
import { GroupProvider } from "./context/groupContext";
import { env } from "./utils/env";

const App: React.FC = () => {

    useEffect(() => {

        window.electronAPI.initRoot();
        
    }, [])

    const userId = env.USER_ID

    return (
        <div className="flex w-full max-h-screen overflow-hidden">
            <GroupProvider>
                <FluentProvider theme={webLightTheme} className="w-full min-h-screen">
                    <div className="flex flex-col w-full h-full">
                        <TitleBar/>
                        <div className="flex h-full w-full justify-center items-center">
                            <LeftSideBar/>
                            <div className="w-full h-full bg-customDarkGrey">
                                <div className="w-full h-full bg-customDarkGrey3 rounded-tl-[10px] flex justify-center items-center">
                                    <GroupsBar userId={userId}/>
                                    <GroupContentSection userId={userId}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </FluentProvider>
            </GroupProvider>
        </div>
    );
};

export default App;