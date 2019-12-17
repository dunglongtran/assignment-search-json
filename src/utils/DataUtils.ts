import { readFile } from "fs";
import * as path from "path";
import { promisify } from "util";
import { plainToClass, classToPlain } from "class-transformer";
import {
  IUser,
  IOrganization,
  ITicket,
  User,
  Ticket,
  Organization,
  AUser,
  ATicket,
  AOrganization
} from "../models";

const readPromise = promisify(readFile);
class DataManager {
  public USERS: User[] = [];
  public ORGANIZATIONS: Organization[] = [];
  public TICKETS: Ticket[] = [];
  constructor() {
    this.loadData();
  }
  public async loadData() {
    await Promise.all([
      this.USERS.length === 0 ? this.getUsers() : null,
      this.TICKETS.length === 0 ? this.getOrganization() : null,
      this.ORGANIZATIONS.length === 0 ? this.getTickets() : null
    ]);
  }
  public async getUsers(): Promise<User[]> {
    if (this.USERS.length === 0) {
      await readPromise(path.join(__dirname, "../data/users.json"), "utf8")
        .then((content: string) => JSON.parse(content))
        .then((users: Object[]) => {
          this.USERS = plainToClass(User, users);
        });
    }
    return this.USERS;
  }
  public async getTickets(): Promise<Ticket[]> {
    if (this.TICKETS.length === 0) {
      await readPromise(path.join(__dirname, "../data/tickets.json"), "utf8")
        .then((content: string) => JSON.parse(content))
        .then((tickets: Object[]) => {
          this.TICKETS = plainToClass(Ticket, tickets);
        });
    }
    console.log(this.TICKETS.length);
    return this.TICKETS;
  }
  public async getOrganization(): Promise<Organization[]> {
    if (this.ORGANIZATIONS.length === 0) {
      await readPromise(
        path.join(__dirname, "../data/organizations.json"),
        "utf8"
      )
        .then((content: string) => JSON.parse(content))
        .then((organizations: Object[]) => {
          this.ORGANIZATIONS = plainToClass(Organization, organizations);
        });
    }
    return this.ORGANIZATIONS;
  }
}

export const DATA_MANAGER = new DataManager();

export async function findUsers(key: string, value: string): Promise<User[]> {
  await DATA_MANAGER.loadData();
  const users: User[] = await DATA_MANAGER.getUsers();

  const founded: User[] = users.filter((user: User) => {
    if (user[key] instanceof Array) {
      return (user[key] as Array<typeof value>).includes(value);
    }
    return user[key] + "" === value;
  });
  const results: User[] = founded.map(
    (user: User): User => classToPlain(user) as User
  );

  return results;
}
export async function findTickets(
  key: string,
  value: string
): Promise<Ticket[]> {
  await DATA_MANAGER.loadData();
  const tickets = await DATA_MANAGER.getTickets();

  const founded = tickets.filter(ticket => {
    if (ticket[key] instanceof Array) {
      return (ticket[key] as Array<typeof value>).includes(value);
    }
    return ticket[key] + "" === value;
  });

  const results: Ticket[] = founded.map(
    (ticket): Ticket => classToPlain(ticket) as Ticket
  );

  return results;
}
export async function findOrganizations(
  key: string,
  value: string
): Promise<Organization[]> {
  await DATA_MANAGER.loadData();
  const organizations = await DATA_MANAGER.getOrganization();

  const founded = organizations.filter(organization => {
    if (organization[key] instanceof Array) {
      return (organization[key] as Array<typeof value>).includes(value);
    }
    return organization[key] + "" === value;
  });
  const results: Organization[] = founded.map(
    (organization: Organization): Organization =>
      classToPlain(organization) as Organization
  );
  return results;
}
