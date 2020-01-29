function determineSquareColor(row, col) {
  let color;
  if ((row % 2 == 0 && col % 2 == 0) || (row % 2 == 1 && col % 2 == 1)) {
    color = '#f5f5dc'; // light
  }
  if ((row % 2 == 0 && col % 2 == 1) || (row % 2 == 1 && col % 2 == 0)) {
    color = '#deb887'; // dark
  }
  return color ? color : 'red';
}
