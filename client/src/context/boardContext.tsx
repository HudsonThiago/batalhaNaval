import React, { createContext, useContext, useState, ReactNode } from 'react';

type BoardContextType = {
  board: number[];
  setBoard: React.Dispatch<React.SetStateAction<number[]>>;
  changed: boolean
  changeState: ()=>void
};

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

type BoardProviderProps = {
  children: ReactNode;
};

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<number[]>([]);
  const [changed, setChanged] = useState<boolean>(true);
    
    const changeState=()=>{
        setChanged(changed===true?false:true)
    }

  return (
    <BoardContext.Provider value={{ board, setBoard, changed, changeState }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};