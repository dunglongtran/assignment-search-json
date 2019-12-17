import {
  plainToClass,
  plainToClassFromExist,
  classToClass,
  classToPlain
} from "class-transformer";
import { IUser, User, AUser, Ticket, Organization } from "../models";
import {
  DATA_MANAGER,
  findUsers,
  findOrganizations,
  findTickets
} from "../utils/DataUtils";
import { terminal } from "terminal-kit";

export function showSearch(name: string, key: string, value: string): any {
  switch (name) {
    case "user":
      return showSearchUser(key, value);
    case "ticket":
      return showSearchTicket(key, value);
    case "organization":
      return showSearchOrganization(key, value);
  }
}
function printSearch(data: Array<Object>) {
  const result = { number_of_result: data.length, search_result: data };
  console.log(result);
}
function getSearch(data: Array<Object>) {
  if (data.length > 0) {
    printSearch(data);
  } else {
    terminal.blue("No result found\n");
  }
}
async function showSearchUser(key: string, value: string): Promise<void> {
  const users = await findUsers(key, value);
  getSearch(users);
}
async function showSearchTicket(key: string, value: string): Promise<void> {
  const tickets = await findTickets(key, value);
  getSearch(tickets);
}
async function showSearchOrganization(
  key: string,
  value: string
): Promise<void> {
  const organizations = await findOrganizations(key, value);
  getSearch(organizations);
}
