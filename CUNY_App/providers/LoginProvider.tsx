import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Profile } from "../types";
type LoginContext = {
    login : boolean;
    onsetLogin : ( logged : boolean ) => void
}
export const LoginContext = createContext<LoginContext>({
    login : false,
    onsetLogin: () => {}
}
);

const LoginProvider = ( {children} : PropsWithChildren ) =>{
    const [ login, setLogin ] = useState(false)
    const onsetLogin = ( logged : boolean ) => {
        setLogin(logged)
    }
    return(
        <LoginContext.Provider value={{login, onsetLogin}}>
            {children}
        </LoginContext.Provider>
    )
}


export default LoginProvider

export const useLogin = () => useContext(LoginContext);