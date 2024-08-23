import { ImagePickerAsset } from "expo-image-picker"

export type schdeuleType = {
    classname : string,
    day : string,
    start_time : string
    end_time : string
    location : string
}

export type Profile = {
    firstName : string,
    lastName : string,
    emplid : string,
    student_email : string,
    ethnicty : string,
    usCitizen : string,
    scheduleImg : ImagePickerAsset | undefined,
    scheduleInfo : string[],
    major : string,
    studentYear : string,
    careerChoice : string
}

export type Upcomings = {
    upcomingType : string,
    time : string[],
    speaker : string,
    subject : string,
    pic : string,
    
}
