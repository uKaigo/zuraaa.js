import Users from "./endpoints/users";
import Bots from "./endpoints/bots";

export default class Client {
  users: Users;
  bots: Bots;

  constructor() {
    this.users = new Users(this);
    this.bots = new Bots(this);
  }
}
