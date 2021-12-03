import { NextPage } from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";
import { LoginRequest } from "../types/LoginRequest";
import { LoginResponse } from "../types/LoginResponse";

type LoginProps = {
    setToken(s: string) : void
}

export const Login : NextPage<LoginProps> = ({setToken}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setError] = useState('');

    const doLogin= async()=>{
        try{
            if(!login || !password){
                setError('Favor preencher todos os dados.');
                return;
            }

            setError('');

            const body={
                login,
                password
            } as LoginRequest;

            const result = await executeRequest('login', 'POST', body);

            if(result && result.data){
                const loginResponse = result.data as LoginResponse;
                localStorage.setItem('accessToken', loginResponse.token);
                localStorage.setItem('userName', loginResponse.name);
                localStorage.setItem('userEmail', loginResponse.email);
                setToken(loginResponse.token);

            }
        }catch(e){
            
            if(e?.response?.data?.error){
                console.log(e?.response);
                setError(e?.response?.data?.error);
                return;
            }
            setError('Ocorreu um erro ao efetuar o login');
            console.log(e);
        }
    }

    return(
        <div className="container-login">
            <img src="/logo.svg" alt="Logo FIAP" className="logo"/>
          
           <div className="form">
           {msgError && <p>{msgError}</p>}
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu usuário."/>
                    <input type="text" placeholder="Informe seu e-mail." value={login} onChange={event=> setLogin(event.target.value)}/>
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha."/>
                    <input type="password" placeholder="Informe sua senha." value={password} onChange={event=> setPassword(event.target.value)}/>
                </div>
                <button onClick={doLogin}>Login</button>
                </div>
        </div>
    )
}