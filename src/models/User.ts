import { Expose, Transform, plainToClass } from "class-transformer";
import { DATA_MANAGER } from "../utils/DataUtils";
import { ITicket } from "./Ticket";
export interface IUser {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  alias: string;
  created_at: string;
  active: boolean;
  verified: boolean;
  shared: boolean;
  locale: string;
  timezone: string;
  last_login_at: string;
  email: string;
  phone: string;
  signature: string;
  organization_id: number;
  tags: string[];
  suspended: boolean;
  role: string;
}
export abstract class AUser implements IUser {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  alias: string;
  created_at: string;
  active: boolean;
  verified: boolean;
  shared: boolean;
  locale: string;
  timezone: string;
  last_login_at: string;
  email: string;
  phone: string;
  signature: string;
  organization_id: number;
  tags: string[];
  suspended: boolean;
  role: string;
}

export class User extends AUser {
  @Expose({ name: "organization_name" })
  getOrganizationName(): string {
    const organizations = DATA_MANAGER.ORGANIZATIONS;

    const names: string[] = organizations
      .filter(organization => organization._id === this.organization_id)
      .map(organization => organization.name);
    return names[0] || "";
  }
  @Expose({ name: "submitted_tickets" })
  getSubmittedTicket(): string[] {
    const tickets = DATA_MANAGER.TICKETS;
    // console.log("getSubmittedTicket", tickets);
    const names: string[] = tickets
      .filter((ticket: ITicket) => ticket.submitter_id === this._id)
      .map(ticket => ticket.subject);
    return names || [];
  }
  assigned_tickets: string[];
  @Expose({ name: "assigned_tickets" })
  getAssignedTickets(): string[] {
    const tickets = DATA_MANAGER.TICKETS;
    const names: string[] = tickets
      .filter(ticket => ticket.assignee_id === this._id)
      .map(ticket => ticket.subject);
    return names || [];
  }
}
