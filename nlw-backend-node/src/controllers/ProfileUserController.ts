import {Request, Response} from "express";
import { ProfileUserServer } from "../services/ProfileUserServer";


class ProfileUserController{
    async handle(request: Request, response: Response){
     
        const { user_id } = request

        const service = new ProfileUserServer();

        const result = await service.execute(user_id);

        return response.json(result);
        
        
    }
}

export { ProfileUserController };