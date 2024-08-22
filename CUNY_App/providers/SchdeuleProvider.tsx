import { PropsWithChildren, createContext, useContext, useState } from "react";
import { schdeuleType } from "../types";
type scheduleContextProp = {
    scheduleInfo : schdeuleType[],
    onSetScheduleInfo : (prayer: schdeuleType[]) => void
}
const ScheduleContext = createContext<scheduleContextProp>({
    scheduleInfo: [],
    onSetScheduleInfo: () => {}
})

const ScheduleTimesProvider = ( {children} : PropsWithChildren ) =>{
    const[ scheduleInfo , setScheduleInfo] = useState<schdeuleType[]>([]);

    const onSetScheduleInfo = ( prayer: schdeuleType[] ) =>{
        setScheduleInfo(prayer)
}

return(
    <ScheduleContext.Provider
        value={{scheduleInfo, onSetScheduleInfo}}
    >
        {children}
    </ScheduleContext.Provider>
)
}

export default ScheduleTimesProvider

export const useSchedule = () =>  useContext(ScheduleContext) ;