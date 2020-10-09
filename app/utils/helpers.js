import moment from 'moment';

export const api = 'http://localhost:3000/';
export const formatVND = number =>
  number.toLocaleString('vi', { style: 'currency', currency: 'VND' });

export function subtotal(reports) {
  let sum = 0;
  reports.forEach(element => {
    if (element && element.total) {
      sum += element.total;
    }
  });
  return formatVND(sum);
}

export const momentDateTime = date => moment(date).format('MM/DD/YYYY, h:mm');

export function totalReportOfDay(orders) {
  const dateNow = moment().format('YYYY-MM-DDT00:00');

  if (orders) {
    const filterOrder = orders.filter(x => x.orderDate >= dateNow);
    if (filterOrder) {
      return formatVND(subtotal(filterOrder));
    }
    return formatVND(0);
  }
  return formatVND(0);
}

export function totalOrderOfDay(orders) {
  const dateNow = moment().format('YYYY-MM-DDT00:00');

  if (orders) {
    const filterOrder = orders.filter(x => x.orderDate >= dateNow);
    if (filterOrder) {
      return filterOrder.length;
    }
    return 0;
  }
  return 0;
}

export const checkUseRole = (module, action, useRole) => {

  let flag = false;
  useRole.filter(res => {
    if (res.module === module) {
      if (res.permissions.indexOf(action.toString()) !== -1) {
        flag = true;
      }
    }
  });
  return flag;
  // console.log(module);
};
