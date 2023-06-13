export function getPieChartPiecePath(
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const isCircle = endAngle - startAngle === 360;

  if (isCircle) {
    endAngle--;
  }

  const start = polarToCartesian(radius, startAngle);
  const end = polarToCartesian(radius, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ];

  if (isCircle) {
    d.push('Z');
  } else {
    d.push('L', radius, radius, 'L', start.x, start.y, 'Z');
  }

  return d.join(' ');
}

function round(n: number) {
  return Math.round(n * 10) / 10;
}

function polarToCartesian(radius: number, angleInDegrees: number) {
  var radians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: round(radius + radius * Math.cos(radians)),
    y: round(radius + radius * Math.sin(radians)),
  };
}

export function calculatePointOnCircle(
  radius: number,
  angle: number,
  center: { x: number; y: number }
) {
  let calculatedAngle = 360 - angle + 90;
  if (calculatedAngle > 360) {
    calculatedAngle -= 360;
  }

  const radians = calculatedAngle * (Math.PI / 180);
  const x = center.x + radius * Math.cos(radians);
  const y = center.y + radius * -Math.sin(radians);
  return { x, y };
}
