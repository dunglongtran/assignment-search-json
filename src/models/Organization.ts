import { DATA_MANAGER } from "../utils/DataUtils";
import { Expose } from "class-transformer";

export interface IOrganization {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  domain_names: string[];
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags: string[];
}
export abstract class AOrganization implements IOrganization {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  domain_names: string[];
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags: string[];
}
export class Organization extends AOrganization {
  // tickets: string[];
  @Expose({ name: "tickets" })
  getTickets(): string[] {
    const tickets = DATA_MANAGER.TICKETS;

    const names: string[] = tickets
      .filter(ticket => ticket.organization_id === this._id)
      .map(ticket => ticket.subject);

    return names;
  }
  // users: string[];
  @Expose({ name: "users" })
  getUsers(): string[] {
    const users = DATA_MANAGER.USERS;

    const names: string[] = users
      .filter(user => user.organization_id === this._id)
      .map(user => user.name);
    return names;
  }
}
