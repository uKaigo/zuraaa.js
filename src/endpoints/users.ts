import Endpoint from "../structures/endpoint";
import User, { UserData } from "../structures/user";
import Bot, { BotData } from "../structures/bot";

export default class Users extends Endpoint {
  async get(id: string) {
    const data: UserData = await this.request("GET", `users/${id}`);

    return new User(data, this);
  }

  async getBots(id: string) {
    const data: BotData[] = await this.request("GET", `users/${id}/bots`);

    return data.map((bot) => new Bot(bot));
  }
}
