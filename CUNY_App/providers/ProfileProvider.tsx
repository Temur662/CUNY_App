import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Profile } from "../types";
type ProfileContextType = {
    profile : Profile;
    onSetProfile: (profile : Profile) => void;
}
export const ProfileContext = createContext<ProfileContextType>({
    profile : {
        firstName : '',
        lastName : '',
        emplid : '',
        student_email : '',
        ethnicty : '',
        usCitizen : '',
        scheduleImg : undefined,
        scheduleInfo : [],
        major : '',
        studentYear : '',
        careerChoice : ''
    },
    onSetProfile : () => {}
}
);

const ProfileProvider = ( {children} : PropsWithChildren ) =>{
    const [ profile, setProfile ] = useState<Profile>({
        firstName : '',
        lastName : 'D',
        emplid : '1',
        student_email : '',
        ethnicty : '',
        usCitizen : '',
        scheduleImg : undefined,
        scheduleInfo : [],
        major : '',
        studentYear : '',
        careerChoice : ''
    })
    const onSetProfile = ( newProfile : Profile ) => {
        setProfile(newProfile)
    }
    const onSetStudentSchedule = ( img : string ) => {

    }
    return(
        <ProfileContext.Provider value={{profile, onSetProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}


export default ProfileProvider

export const useProfile = () => useContext(ProfileContext);