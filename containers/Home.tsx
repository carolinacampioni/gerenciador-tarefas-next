import { Header } from "../components/Header";
import { NextPage } from "next";

type HomeProps = {
    setToken(s: string) : void
}


export const Home: NextPage<HomeProps> = ({setToken}) => {
    
    const sair=()=>{
        localStorage.removeItem('accessToken' );
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setToken('');

    }
    
    return(
       <>
       <Header sair={sair}/>
       </>
    )
}