export type TicketsDataType = TicketsDataTypeObj[];

export interface TicketsDataTypeObj {
  price: number;
  carrier: string;
  segments: { duration: number; stops: string[]; origin: string; destination: string; date: string }[];
}

export interface TicketState {
  ticketsData: TicketsDataType;
  loading?: boolean;
  error?: null | boolean;
}

export interface FilteredDataType {
  filterTicketsData: TicketsDataType;
}

export enum TiscketsActionType {
  FETH_TIKETS = 'FETH_TIKETS',
  FETH_TIKETS_ERROR = 'FETH_TIKETS_ERROR',
  FETH_TIKETS_SUCCESS = 'FETH_TIKETS_SUCCESS',
  FETH_TIKETS_SUCCESS_PART = 'FETH_TIKETS_SUCCESS_PART',
}

interface FetchTicketsAction {
  type: TiscketsActionType.FETH_TIKETS;
}
interface FetchTicketsSuccessAction {
  type: TiscketsActionType.FETH_TIKETS_SUCCESS;
}
interface FetchTicketsErrorAction {
  type: TiscketsActionType.FETH_TIKETS_ERROR;
  payload: boolean;
}
interface FetchTicketsSuccessPartAction {
  type: TiscketsActionType.FETH_TIKETS_SUCCESS_PART;
  payload: TicketsDataType;
}
export type TicketsAction =
  | FetchTicketsAction
  | FetchTicketsSuccessAction
  | FetchTicketsErrorAction
  | FetchTicketsSuccessPartAction;
