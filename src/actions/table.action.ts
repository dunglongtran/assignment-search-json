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

export function showTable(name: string, key: string, value: string): any {
  switch (name) {
    case "user":
      return showTableUser(key, value);
    case "ticket":
      return showTableTicket(key, value);
    case "organization":
      return showTableOrganization(key, value);
  }
}
function printTable(headers: string[], body: Array<any>) {
  const WordTable = require("word-table");
  const wtable = new WordTable(headers, body);
  console.log(wtable.string());
}
function getTable(data: Array<Object>) {
  if (data.length > 0) {
    const headers = Object.keys(data[0]);
    printTable(headers, data.map(item => headers.map(header => item[header])));
  } else {
    terminal.blue("No result found\n");
  }
}
async function showTableUser(key: string, value: string): Promise<void> {
  const users = await findUsers(key, value);
  getTable(users);
}
async function showTableTicket(key: string, value: string): Promise<void> {
  const tickets = await findTickets(key, value);
  getTable(tickets);
}
async function showTableOrganization(
  key: string,
  value: string
): Promise<void> {
  const organizations = await findOrganizations(key, value);
  getTable(organizations);
}
