export enum TicketStatus {
  NOT_STARTED_YET = 'Not Started Yet',
  BLOCKAGE = 'Blockage',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}

export const TicketStatusValues: TicketStatus[] = Object.values(TicketStatus)
