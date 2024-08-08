module.exports = {
  formatDate(createdAt) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const day = createdAt.getDate();
    const month = months[createdAt.getMonth()];
    const year = createdAt.getFullYear();
    const time = createdAt.toLocaleTimeString();

    return month + ' ' + day + ', ' + year + ' at ' + time;
  },
};
