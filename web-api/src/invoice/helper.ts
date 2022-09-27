import { Task } from './dto/invoice-request.dto';

export class HelperInvoice {
  getSummTask(tasks: Task[]) {
    return tasks.reduce((accum: number, element: { cost: number }) => {
      accum = element.cost + accum;
      return accum;
    }, 0);
  }
  getFormatedDate(dateNow: Date) {
    return (
      dateNow.getDate() +
      '.' +
      ('0' + (dateNow.getMonth() + 1)) +
      '.' +
      dateNow.getFullYear()
    );
  }
}
