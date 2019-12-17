import {
  plainToClass,
  plainToClassFromExist,
  classToClass,
  classToPlain,
  Type
} from "class-transformer";
import { IUser, User, AUser, Ticket, Organization } from "../models";
import {
  DATA_MANAGER,
  findUsers,
  findOrganizations,
  findTickets
} from "../utils/DataUtils";
import { terminal } from "terminal-kit";
import { keys } from "ts-transformer-keys";

export function showDescribe(name: string, key: string, value: string): any {
  switch (name) {
    case "user":
      return showDescribeUser(key, value);
    case "ticket":
      return showDescribeTicket(key, value);
    case "organization":
      return showDescribeOrganization(key, value);
  }
}
function printDescribe(title: string, data: Array<Object>) {
  terminal.blue(
    `${title.toUpperCase()} can be searched by any fields below \n`
  );
  for (let key of data) {
    terminal.green(`${key}\n`);
  }
}
function getDescribe(title: string, data: Array<Object>) {
  if (data.length > 0) {
    printDescribe(title, data);
  } else {
    terminal.blue("No result found\n");
  }
}
async function showDescribeUser(key: string, value: string): Promise<void> {
  await DATA_MANAGER.loadData();
  const user = DATA_MANAGER.USERS[0];
  getDescribe("user", Object.keys(user));
}
async function showDescribeTicket(key: string, value: string): Promise<void> {
  await DATA_MANAGER.loadData();
  const ticket = DATA_MANAGER.TICKETS[0];
  getDescribe("ticket", Object.keys(ticket));
}
async function showDescribeOrganization(
  key: string,
  value: string
): Promise<void> {
  await DATA_MANAGER.loadData();
  const organization = DATA_MANAGER.ORGANIZATIONS[0];
  getDescribe("organization", Object.keys(organization));
}
