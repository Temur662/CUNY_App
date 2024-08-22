import { View, Text, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { pipeline } from '@xenova/transformers';
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Button, Icon, TextInput } from 'react-native-paper';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { BlurView } from 'expo-blur';
import { useSchedule } from '@/providers/SchdeuleProvider';
import { useRouter } from 'expo-router';
import { Profile } from '@/types';
import { useProfile } from '@/providers/ProfileProvider';
const SignUp = () => {
  const [ currentStage, setCurrentStage ] = useState(0)
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ studentEmail, setStudentEmail ] = useState('')
  const [ emplid, setEmplid ] = useState('')
  const [ ethnicity, setEthnicity ] = useState('')
  const [ usCitizen, setUSCitizen ] = useState('')
  const [ personalDone, setPersonalDone ] = useState(false)
  const { onSetProfile } = useProfile()
  const [ major, setMajor ] = useState('')
  const [ studentYear, setStudentYear ] = useState('')
  const [ carrerChoice, setCareerChoice ] = useState('')
  const[ schedule, setSchedule ] = useState<ImagePicker.ImagePickerAsset>()
  const [ scheduleInfo, setScheduleInfo ] = useState([])
  const { onSetScheduleInfo } = useSchedule()
  const [ careerInfoDone, setCareerInfoDone ] = useState(false)
  const router = useRouter()
  const EthnicityPicker = () => {
    const choices = [ 'American Indian/Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or other Pacific Islander', 'White' ]
    return(
        <Menu>
            <MenuTrigger style={{ width : '100%', height : '100%', borderWidth : 1 }}>
                <Text>{ethnicity}</Text>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
                {choices.map((item) => (
                    <MenuOption onSelect={() => setEthnicity(item)}>
                        <Text>{item}</Text>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    )
  }
  const Citizen = () => {
    return(
        <Menu>
            <MenuTrigger style={{ width : '100%', height : '100%', borderWidth : 1 }}>
                <Text>{usCitizen}</Text>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
                <MenuOption onSelect={() => setUSCitizen('Yes')}>
                    <Text>Yes</Text>
                </MenuOption>
                <MenuOption onSelect={() => {setUSCitizen('No')}}>
                    <Text>No</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
  }
  const MajorPicker = () => {
    const majors = ['Computer Science', 'Finace', 'Biology']
    return(
        <Menu>
            <MenuTrigger style={{ width : '100%', height : '100%', borderWidth : 1 }}>
                <Text>{major}</Text>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
                {majors.map((item) => (
                    <MenuOption onSelect={() => setMajor(item)}>
                        <Text>{item}</Text>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    )
  }
  const StudentYearPicker = () => {
    const years = ['Freshman', 'Sophmore', 'Junior', 'Senior']
    return(
        <Menu>
            <MenuTrigger style={{ width : '100%', height : '100%', borderWidth : 1 }}>
                <Text>{studentYear}</Text>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
                {years.map((item) => (
                    <MenuOption onSelect={() => setStudentYear(item)}>
                        <Text>{item}</Text>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    )
  }
  const CareerChoice = () => {
    const choices = ['Software Engineer', 'Finacial Advisor', 'Doctor']
    return(
        <Menu>
            <MenuTrigger style={{ width : '100%', height : '100%', borderWidth : 1 }}>
                <Text>{carrerChoice}</Text>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
                {choices.map((item) => (
                    <MenuOption onSelect={() => setCareerChoice(item)}>
                        <Text>{item}</Text>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    )
  }
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_TOKEN);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json",  }});
  const queryTest = async () => {
    console.log('called')
    const result = await model.generateContent([
        {
          fileData: {
            mimeType: 'image/jpeg',
            fileUri: 'https://pklldvgwaccokqcygmzr.supabase.co/storage/v1/object/public/fliers/Tajweed_Class.JPG'
          }
        },
        { text: "What is this?" },
      ]);

      console.log(result.response.text())

  }

  const onSelectImage = async () => {
    const options : ImagePicker.ImagePickerOptions = {
      mediaTypes : ImagePicker.MediaTypeOptions.Images,
      allowsEditing : true
    }
    const result = await ImagePicker.launchImageLibraryAsync(options)

    if( !result.canceled ){
      const img = result.assets[0]
      setSchedule(img)
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const imagepart = {
        inlineData: {
        data: base64,
        mimeType : 'image/jpeg'
      }}
      const prompt = "Based on this image of a students schedule return as a json array in the following form: '{ 'classname' : name of the class, 'day' : weekday of student class, 'start time' : start time of student class, 'end time' : end time of student class, 'location': room location of class }'"
      const gemini = await model.generateContent([prompt, imagepart]);
      setScheduleInfo(gemini.response.text())
      onSetScheduleInfo(gemini.response.text())
    }
  }
  useEffect(() => {
   if( firstName && lastName && studentEmail && ethnicity && usCitizen && emplid ){
    setPersonalDone(true)
   }else{
    setPersonalDone(false)
   }
  }, [firstName, lastName, studentEmail, ethnicity, usCitizen, emplid])
  const setProfile = () => {
    const newProfile : Profile =  {
        firstName : firstName,
        lastName : lastName,
        emplid : emplid,
        student_email : studentEmail,
        ethnicty : ethnicity,
        usCitizen : usCitizen,
        scheduleImg : schedule,
        scheduleInfo : scheduleInfo,
        major : major,
        studentYear : studentYear,
        careerChoice : carrerChoice
    }
    onSetProfile(newProfile)
  }
  useEffect(() => {
    if( ethnicity && schedule && carrerChoice && studentYear){
        setCareerInfoDone(true)
    }else{
        setCareerInfoDone(false)
    }
  }, [ethnicity, schedule, carrerChoice, studentYear])
  const stageInfo = ['Personal Information', 'Career Information']
  return (
    <View className='flex-1'>
        <Stack.Screen options={{ headerBackTitleVisible : false, headerTransparent : true, headerTitle : '' }} />
        <SafeAreaView className='flex-1'>
            <View className='w-[100%] bg-[#0D509D] h-[15%] flex-row items-center justify-evenly'>
                { stageInfo.map((item, index) => {
                    return(
                        <View style={{ width : '30%', height : '70%' }} className='items-center justify-center flex-col'> 
                            <View style={[{ backgroundColor : currentStage == index ? 'white' : 'gray'}, {borderRadius : 50, width : '48%', height : '70%' }]}>

                            </View>
                            <Text className='text-center text-white'>{item}</Text>
                        </View>
                    )
                    })
                }
            </View>
            <View className='flex-col gap-y-2 w-[100%] bg-gray-300 mt-2 p-4 py-8' style={{ borderRadius : 50 }}>
                <View className='w-[100%] items-center justify-center'>
                { currentStage == 0 &&  <Text className='text-2xl font-bold'>Personal Information</Text> }  
                {currentStage == 1 && <Text className='text-2xl font-bold'>Career Information</Text>}              
                </View>
                { currentStage == 0 && (
                    <>
                    <TextInput 
                    mode='outlined'
                    label={'First Name'}
                    value={firstName}
                    onChangeText={setFirstName}
                    style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center'}}
                    />
                    <TextInput 
                        mode='outlined'
                        label={'Last Name'}
                        value={lastName}
                        onChangeText={setLastName}
                        style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center'}}
                    />
                    <TextInput 
                    mode='outlined'
                    label={'Emplid'}
                    value={emplid}
                    onChangeText={setEmplid}
                    style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center'}}
                    />
                    <TextInput 
                        mode='outlined'
                        label={'Student Email'}
                        value={studentEmail}
                        onChangeText={setStudentEmail}
                        style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center'}}
                    />
                    <Text className='text-lg pl-5'>Ethnicity</Text>
                    <View style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center', borderRadius : 5, height: 40, justifyContent : 'center'}}>
                        <EthnicityPicker />
                    </View>
                    <Text className='text-lg pl-5'>Are you a U.S Citizen?</Text>
                    <View style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center', borderRadius : 5, height: 40, justifyContent : 'center'}}>
                        <Citizen />
                    </View>
                    <View className=' mt-4 justify-end'>
                        <Button mode='contained' buttonColor='green' style={{ width : '90%', alignSelf : 'center'}} disabled={!personalDone} onPress={() => {setCurrentStage(1)} }>Continue</Button>
                    </View>
                    </>
                    )
                }
                { currentStage == 1 && (
                    <>
                        <Text className='text-lg pl-5'>Major</Text>
                        <View style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center', borderRadius : 5, height: 40, justifyContent : 'center'}}>
                            <MajorPicker />
                        </View>
                        <Text className='text-lg pl-5'>Current Academic Year</Text>
                        <View style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center', borderRadius : 5, height: 40, justifyContent : 'center'}}>
                            <StudentYearPicker />
                        </View>
                        <Text className='text-lg pl-5'>Interested Career Field</Text>
                        <View style={{ backgroundColor : 'white', width : '90%', alignSelf : 'center', borderRadius : 5, height: 40, justifyContent : 'center'}}>
                            <CareerChoice />
                        </View>
                        <Pressable className='h-[140] w-[150] items-center justify-center bg-white self-center' onPress={onSelectImage} style={{ borderRadius : 20 }}>
                        {schedule ? <Image source={{ uri : schedule.uri || undefined }} style={{width: "100%", height:"100%", objectFit: "contain"}} /> : (
                            <View className=' overflow-hidden w-[100%] h-[100%]' style={{ borderRadius : 20 }}>
                                <BlurView intensity={50} style={{ backgroundColor : '#E0E0E0' , height : '100%', width : '100%', borderRadius : 20, alignItems : 'center', justifyContent : 'center'}} >
                                    <View className='p-2 rounded-full bg-gray-50' >
                                        <Icon source={"camera"} size={60} color='#007AFF'/>
                                    </View>
                                </BlurView>
                                </View>
                                )}
                        </Pressable>
                        <View className='mt-8 justify-end'>
                            <Button mode='contained' buttonColor='green' style={{ width : '90%', alignSelf : 'center'}} disabled={!careerInfoDone} onPress={() => {setProfile();router.back()}}>Submit</Button>
                        </View>
                    </>
                )}
                </View>
                
                
             
        </SafeAreaView>
    </View>
  )
}

export default SignUp