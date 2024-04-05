import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import mongoose from 'mongoose';

const CreateMessageJoiValidation = asyncHandler(async (req, res, next) => {

    const messageObject = Joi.object({
        body: Joi.string().allow(null),
        image: Joi.string().allow(null),
        file: Joi.string().allow(null),
        video: Joi.string().allow(null),
        chatId: Joi.string().required().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('id must be mongoose id');
            }
            return new mongoose.Types.ObjectId(value);;
        }),
        userIds: Joi.array().items(
            Joi.string().required().custom((value, helpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error('id must be mongoose id');
                }
                return new mongoose.Types.ObjectId(value);;
            }),
        )
    }).or('body', 'image', 'file', 'video').required();

    const { error, value } = messageObject.validate(req.body);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateMessageJoiValidation }