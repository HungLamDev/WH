import moment from "moment";
export const currentDay = moment(moment.now());
export const previousDate = moment().subtract(3, 'days'); // Lấy ngày trước đó 3 ngày
