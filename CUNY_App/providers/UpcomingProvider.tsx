import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Upcomings } from "@/types";
type UpcomingContextType = {
    upcoming : Upcomings[];
    onSetUpComings: (upcoming : Upcomings) => void;
}
export const UpcomingContext = createContext<UpcomingContextType>({
    upcoming : [],
    onSetUpComings : () => {}
}
);

const UpcomingProvider = ( {children} : PropsWithChildren ) =>{
    const [ upcoming, setUpcoming ] = useState<Upcomings[]>([])
   
     const onSetUpComings = ( upcomingg : Upcomings ) => {

       const newUpcoming : Upcomings = {
            upcomingType: upcomingg.upcomingType,
            time: upcomingg.time,
            speaker: upcomingg.speaker,
            subject: upcomingg.subject,
            pic: upcomingg.pic
       }
    
       setUpcoming( (prev : Upcomings[]) => {
            const exists = prev.some(
                existing  => existing.speaker == newUpcoming.speaker
            )
            if( exists ){ return prev }
            return [newUpcoming, ...upcoming]
        })
    } 

    return(
        <UpcomingContext.Provider value={{upcoming, onSetUpComings}}>
            {children}
        </UpcomingContext.Provider>
    )
}

export default UpcomingProvider

export const useUpcoming = () => useContext(UpcomingContext);