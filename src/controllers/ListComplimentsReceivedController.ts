import { Request, Response } from "express";

import { ListUserReceiveComplimentsService } from "../services/ListUserReceivedComplimentsService";


class ListComplimentsReceivedController{

    async handle(request: Request, response: Response){
        const { user_id } = request;

        const listUserReceivedComplimentsService = new ListUserReceiveComplimentsService();

        const compliments = await listUserReceivedComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListComplimentsReceivedController }