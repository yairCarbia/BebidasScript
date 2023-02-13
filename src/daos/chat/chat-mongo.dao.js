import { mongoConnect } from "../../configs/mongo.config.js";
import { chatModel } from "../../models/chat.model.js"
import chatMongoContainer from "../../containers/mongo/chat-mongo.container.js"

class chatMongoDao extends chatMongoContainer {
    constructor() {
        super(mongoConnect, chatModel);
    };
};

export default chatMongoDao;