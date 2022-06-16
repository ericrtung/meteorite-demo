export interface Geolocation {
  type: string;
  coordinates: [number, number];
}

export class Meteorite {
  id          : number = 0;
  name        : string = "";
  recclass    : string = "";
  mass        : number = 0;
  fall        : number = 0;
  year        : number = 0;
  reclat      : number = 0;
  reclong     : number = 0;
  geolocation : Geolocation = { type: "", coordinates:[0,0] };

  constructor(obj: Meteorite) { 
    Object.assign(this, obj);
    this.year = new Date(obj.year).getFullYear();
  }
}

