import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the types for context values
interface GroupContextType {
  groupId: string;
  setGroupId: React.Dispatch<React.SetStateAction<string>>;
  groupName: string;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
  groupDesc: string;
  setGroupDesc: React.Dispatch<React.SetStateAction<string>>;
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [groupId, setGroupId] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [groupDesc, setGroupDesc] = useState<string>("");

  return (
    <GroupContext.Provider value={{ groupId, setGroupId, groupName, setGroupName, groupDesc, setGroupDesc }}>
      {children}
    </GroupContext.Provider>
  );
};
