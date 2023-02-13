import { serverConfig } from "../configs/server.config.js";
import cartMongoDao from "./cart/cart-mongo.dao.js";
import productMongoDao from "./product/product-mongo.dao.js";
import orderMongoDao from "./order/order-mongo.dao.js";
import chatMongoDao from "./chat/chat-mongo.dao.js";
const getStorage = () => {
  const storageType = serverConfig.STORAGE_TYPE;
  switch (storageType) {
    case 'mongo':
      return {
        product: new productMongoDao(),
        cart: new cartMongoDao(),
        order: new orderMongoDao(),
        chat: new chatMongoDao()
      }
      break;
    default:
      return {
        product: new productMongoDao(),
        cart: new cartMongoDao(),
        order: new orderMongoDao(),
        chat: new chatMongoDao()
      }
      break;
  }
}

export { getStorage as Storage }