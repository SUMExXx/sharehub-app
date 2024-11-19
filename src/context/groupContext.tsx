import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the types for context values
interface GroupContextType {
  groupId: string;
  setGroupId: React.Dispatch<React.SetStateAction<string>>;
  groupName: string;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
  groupDesc: string;
  setGroupDesc: React.Dispatch<React.SetStateAction<string>>;
  forceReload: string;
  setForceReload: React.Dispatch<React.SetStateAction<string>>;
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {

  const data = sessionStorage.getItem('groupId');
  
  let gid = ""
  if(data != null){
    gid = data;
  }

  const [groupId, setGroupId] = useState<string>(gid);
  const [groupName, setGroupName] = useState<string>("");
  const [groupDesc, setGroupDesc] = useState<string>("");
  const [forceReload, setForceReload] = useState<string>("");

  return (
    <GroupContext.Provider value={{ groupId, setGroupId, groupName, setGroupName, groupDesc, setGroupDesc, forceReload, setForceReload }}>
      {children}
    </GroupContext.Provider>
  );
};
