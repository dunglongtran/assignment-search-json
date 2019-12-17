import { Type, Expose } from "class-transformer";
import { DATA_MANAGER } from "../utils/DataUtils";
export interface ITicket {
  _id: string;
  url: string;
  external_id: string;
  created_at: string;
  type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  submitter_id: number;
  assignee_id: number;
  organization_id: number;
  tags: string[];
  has_incidents: boolean;
  due_at: string;
  via: string;
}
export abstract class ATicket implements ITicket {
  _id: string;
  url: string;
  external_id: string;
  created_at: string;
  type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  submitter_id: number;
  assignee_id: number;
  organization_id: number;
  tags: string[];
  has_incidents: boolean;
  due_at: string;
  via: string;
}
export class Ticket extends ATicket {
  // submitter_name: string;
  @Expose({ name: "submitter_name" })
  getSubmitterNames(): string[] {
    const users = DATA_MANAGER.USERS;

    const names: string[] = users
      .filter(user => user._id === this.submitter_id)
      .map(user => user.name);

    return names;
  }
  // assignee_name: string;
  @Expose({ name: "assignee_name" })
  getAssigneeNames(): string[] {
    const users = DATA_MANAGER.USERS;

    const names: string[] = users
      .filter(user => user._id === this.assignee_id)
      .map(user => user.name);

    return names;
  }

  @Expose({ name: "organization_name" })
  getOrganizationName(): string {
    const organizations = DATA_MANAGER.ORGANIZATIONS;

    const names: string[] = organizations
      .filter(organization => organization._id === this.organization_id)
      .map(organization => organization.name);
    return names[0] || "";
  }
}
