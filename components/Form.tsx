import { NextPage } from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";
import {Modal} from 'react-bootstrap';

type FormProps = {
        showModal: boolean
        closeModal() : void
}

export const FormModal : NextPage<FormProps> = ({ 
    showModal,
    closeModal
}) => {
    const [msgError, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const close = () => {
        setName('');
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        closeModal();
    }
    
    const doRegister = async () => {
       try{
                if(!name  || !email|| !password){
                    setError('Favor preencher todos os campos');
                    return;
                }

                if(password !== confirmPassword){
                    setError('As senhas devem ser iguais');
                    return;
                }

                const body = {
                    name,
                    email,
                    password
                }

                await executeRequest('user', 'POST', body);
                setError('Usuário registrado com sucesso.');

    } catch (e : any) {
        if(e?.response?.data?.error){
            console.log(e?.response);
            setError(e?.response?.data?.error);
            return;
        }
        console.log(e);
        setError('Ocorreu erro ao registrar usuário, tente novamenete');
    }
    }

    return (

        <Modal
        show={showModal}
        onHide={close}
        className="container-modal">
             <Modal.Body>
             
        <div className="container-form">
          
        <form className="form" >
        <div className="title">
                <span>Registro de Usuário</span>
            </div>

           {msgError && <p>{msgError}</p>}
        <div className="input">
        <img src="/mail.svg" alt="Informe seu email" />
                <input name="name" type="text" placeholder="Informe seu Nome"  className="input"
                value={name} onChange={evento => setName(evento.target.value)}/>
  
        </div>
        <div className="input">
        <img src="/mail.svg" alt="Informe seu email" />
                <input name="email" type="text" placeholder="Informe seu Email"  className="input"
                value={email} onChange={evento => setEmail(evento.target.value)}/>

        </div>
        <div className="input">
                 <img src="/lock.svg" alt="Informe seu email" />
                <input name="password" type="password" placeholder="Informe sua Senha"   className={`input`} 
                    value={password} onChange={evento => setPassword(evento.target.value)} />
            </div>
            <div className="input">
            <img src="/lock.svg" alt="Informe seu email" />
                <input name="confirmPassword" type="password" placeholder="Confirme sua Senha" 
                value={confirmPassword} onChange={evento => setConfirmPassword(evento.target.value)} className={`input`} />
            </div>
       
    </form>
    </div>
    </Modal.Body>
        <Modal.Footer>
                <button type="submit" onClick={doRegister}  >
                    Registrar  
                </button>
                <a onClick={ ()=> closeModal()} className="btn btn-link">Cancelar</a>
        </Modal.Footer> 
     </Modal>
    );
}