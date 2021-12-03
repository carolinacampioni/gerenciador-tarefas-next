import { useEffect,useState } from "react";
import { NextPage } from "next";

type HeaderProps = {
    sair(): void
}

export const Header : NextPage<HeaderProps> = ({sair}) => {

    const[name, setName] = useState('');
    
    useEffect(() => {
        if(typeof window !== 'undefined'){
            const userName = localStorage.getItem('userName');
            if(userName){
              const fullName = userName.split(' ');
              if(fullName && fullName.length > 0){
                setName(fullName[0]);
              }
            }
        }
      }, [])

    return(
        <div className="container-header">
            <img src="/logo.svg" alt="Logo FIAP" className="logo"></img>
            <button>Adicionar Tarefa</button>
            <div className="mobile">
                <span>Olá,{name}.</span>
                <img src="/exit-mobile.svg" alt="Logo FIAP" className="logo" onClick={sair}></img>
            </div>
            <div className="desktop">
                <span>Olá,{name}.</span>
                <img src="/exit-desktop.svg" alt="Logo FIAP" className="logo" onClick={sair}></img>
            </div>
        </div>
    )
}