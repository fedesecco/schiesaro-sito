export interface CoordinateParts {
  major: string;
  minor: string;
}

export function splitCoordinate(value: string): CoordinateParts {
  const [whole = '00', fraction = '000000'] = value.split('.');

  return {
    major: `${whole}.`,
    minor: fraction.padEnd(6, '0').slice(0, 6),
  };
}
