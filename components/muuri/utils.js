export const cols = 24;

export const spanPec = (1 / cols).toFixed(5);

export function getValidResizeSpan(initSpan, disWidth, spanWidth) {
  let coe = disWidth >= 0 ? 1 : -1; 
  let absDisWidth = Math.abs(disWidth);
  let fold = parseInt(absDisWidth / spanWidth);
  let rem = absDisWidth % spanWidth;
  if (rem >= spanWidth / 2) {
    return initSpan + (fold + 1) * coe;
  } else {
    return initSpan + fold * coe;
  }
}

export function getValidResizeRow(initRow, disHeight, rowHeight) {
  let coe = disHeight >= 0 ? 1 : -1;
  let absDisHeight = Math.abs(disHeight);
  let fold = parseInt(absDisHeight / rowHeight);
  let rem = absDisHeight % rowHeight;
  if (rem >= rowHeight / 2) {
    return initRow + (fold + 1) * coe;
  } else {
    return initRow + fold * coe;
  }
}

// export function getValidWidth(startSpan, disX, spanWidth) {
//   let coe = disX >= 0 ? 1 : -1; 
//   let unValidDisX = Math.abs(disX);
//   let fold = parseInt(unValidDisX / spanWidth);
//   let rem = unValidDisX % spanWidth;
//   if (rem >= spanWidth / 2) {
//     return (((startSpan + (fold + 1) * coe) / cols) * 100).toFixed(5) + '%';
//   } else {
//     return (((startSpan + fold * coe) / cols) * 100).toFixed(5) + '%';
//   }
// }

// export function getValidHeight(startRow, disY, rowHeight) {
//   let coe = disY >= 0 ? 1 : -1;
//   let unValidDisY = Math.abs(disY);
//   let fold = parseInt(unValidDisY / rowHeight);
//   let rem = unValidDisY % rowHeight;
//   if (rem >= rowHeight / 2) {
//     return (startRow + (fold + 1) * coe) * rowHeight + 'px';
//   } else {
//     return (startRow + fold * coe) * rowHeight + 'px';
//   }
// }