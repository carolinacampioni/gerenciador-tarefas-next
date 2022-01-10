import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { LoginResponse } from "../types/LoginResponse";
import { FormModal } from "../components/Form";



type LoginProps = {
    setToken(s: string) : void
}

export const Login : NextPage<LoginProps> = ({setToken}) => {

    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setError] = useState('');


    const closeModal = () => {
        setShowModal(false);
        setError('');
    }

    const doLogin = async () => {
        try {
            if (!login || !password) {
                setError('favor preencher os dados');
                return;
            }

            setError('');

            const body = {
                login,
                password
            };

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
                const loginResponse = result.data as LoginResponse;
                localStorage.setItem('accessToken', loginResponse.token);
                localStorage.setItem('userName', loginResponse.name);
                localStorage.setItem('userEmail', loginResponse.email);
                setToken(loginResponse.token);
            }
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
                setError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar login, tente novamente');
        }
    }

    return (
  
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {msgError && <p>{msgError}</p>}
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email" />
                    <input type="text" placeholder="Informe seu email"
                        value={login} onChange={evento => setLogin(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha" />
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button onClick={doLogin}>Login</button>
                <a href="#" onClick={() => setShowModal(true)}>Registre-se</a>
                <FormModal
                 showModal={showModal}
                 closeModal={closeModal}></FormModal>
           
            </div>
          
        </div>
    )
}