import {Request, Response} from "express";
import { CreateMessageService } from "../services/CreateMessageService";


class CreateMessageController{
    async handle(request: Request, response: Response){
        const { message } = request.body;

        const { user_id} = request;

        const service = new CreateMessageService();

        const result = await service.execute(message, user_id);

       

        return response.json(result);
        
        //continuar aqui
        //https://youtu.be/Wg7EuMtk7FE?t=6417
        
    }
}

export { CreateMessageController };