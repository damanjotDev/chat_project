import { redisInstance } from "../../redis/redis";
import { ApiError } from "../../utils/api-error";
import { generateMongooseID } from "../../utils/generate-mongo-id";
import { CreateMessageDto } from "./dto";
import { createMultipleMessagesService } from "./message-service";

export const pushMessageRedis = async (user, payload:CreateMessageDto): Promise<any> => {
    try {
        const new_payload = {...payload} ;
        new_payload['_id'] = generateMongooseID();
        new_payload['createdAt'] = new Date();
        new_payload['updatedAt'] = new Date();
        new_payload['messageSentBy'] = user?._id

        await redisInstance.rpush(payload.chatId, JSON.stringify(new_payload))

        // for(let i=0;i<10000;i++){
        //     redisInstance.rpush(payload.chatId,JSON.stringify({...new_payload, _id: generateMongooseID()}))
        // }

        const messages = await pullMessageRedis(payload.chatId);
        if(messages?.length>=100){
            const res = await createMultipleMessagesService(user, messages)
            deleteMessagesRedis(payload.chatId)
            return res
        }

        return new_payload
    } catch (error) {
        console.log('error',error)
        throw new ApiError(400, 'Something went wrong while creating message')
    }
}


export const pullMessageRedis = async (chatId): Promise<any> => {
    try {
        const res =  await redisInstance.lrange(chatId, 0, -1)
        const messages = res.map(serializedMessage => JSON.parse(serializedMessage));
        return messages
    } catch (error) {
        console.log('error',error)
        throw new ApiError(400, 'Something went wrong while pulling message')
    }
}


export const deleteMessagesRedis = async (chatId): Promise<any> => {
    try {
        const res =  await redisInstance.del(chatId)
        return res
    } catch (error) {
        console.log('error',error)
        throw new ApiError(400, 'Something went wrong while deleting messages')
    }
}