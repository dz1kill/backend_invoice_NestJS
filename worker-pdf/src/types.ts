export type Owner = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  address: string;
  phone: string;
};
export type Task = {
  taskName: string;
  cost: number;
};
export type ObjectForPDF = {
  sendEmail: string;
  clientEmail: string;
  name: string;
  address: string;
  scope: string;
  firstName: string;
  lastName: string;
  summCost: number;
  completedTasks: Task[];
  dateFormatDDMMYYYY: string;
  invoiceId: string;
};
