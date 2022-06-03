export interface Geolocation {
  type: string;
  coordinates: [number, number];
}

export type Meteorite = {
  id: number,
  name: string,
  recclass: string,
  mass: number,
  fall: string,
  year: number,
  reclat: number,
  reclong: number,
  geolocation: Geolocation
}

export function parse(obj: any): Meteorite {
  const { id, name, recclass, mass, fall, year, reclat, reclong, geolocation } = obj;

  return {
    id: +id,
    name,
    recclass,
    mass: mass ? +mass : 0,
    fall,
    year: new Date(year).getFullYear(),
    reclat: +reclat,
    reclong: +reclong,
    geolocation
  } as Meteorite;
}
