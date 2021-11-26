import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../middlewares/connectDb';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { LoginRequest } from '../../types/LoginRequest';
import jwt from 'jsonwebtoken';
import { LoginResponse } from '../../types/LoginResponse';

const loginEndpoint = async(req:NextApiRequest, res:NextApiResponse <DefaultResponseMsg | LoginResponse> ) => {

    if(req.method === 'POST'){
        const user = req.body as LoginRequest;
        const {MY_SECRET_KEY} = process.env;
        if(!MY_SECRET_KEY){
            return res.status(500).json({error: 'Key não existe'});
            }

        if(!user.login && !user.password){
        return  res.status(400).json({msg: 'Favor informar usuário e senha.'});
    }
            
        const usersFound = await UserModel.find({email: user.login, password: md5(user.password)});
    
        if(usersFound && usersFound.length > 0){
            const user = usersFound[0];
            const token = jwt.sign({_id: user._id}, MY_SECRET_KEY);
            
            const result = {
                name: user.name,
                email: user.email,
                token
            }

            return res.status(200).json(result);
        }
    
        return  res.status(400).json({error: 'Usuário ou senha não encontrados.'});
    }

    return res.status(405).json({ error: 'Metodo informado não é válido.'});
}


export default connectDb(loginEndpoint);