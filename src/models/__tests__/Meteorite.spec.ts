import { describe, it, expect } from 'vitest'

//import { mount } from '@vue/test-utils'
import { parse } from '../Meteorite';

describe('Meteorite', () => {
  it('Can pase valid JSON reponse', () => {
      const data = {
        "name": "Portales Valley",
        "id": "18874",
        "nametype": "Valid",
        "recclass": "H6",
        "mass": "71400",
        "fall": "Fell",
        "year": "1998-01-01T00:00:00.000",
        "reclat": "34.175000",
        "reclong": "-103.295000",
        "geolocation": {
          "type": "Point",
          "coordinates": [
              -103.295,
              34.175
          ]
        },
      };
      
    //const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    //expect(wrapper.text()).toContain('Hello Vitest')
    expect(() => parse(data)).not.toThrowError();
  })
})



// let a: Meteorite = parse({
//     "name": "Portales Valley",
//     "id": "18874",
//     "nametype": "Valid",
//     "recclass": "H6",
//     "mass": "71400",
//     "fall": "Fell",
//     "year": "1998-01-01T00:00:00.000",
//     "reclat": "34.175000",
//     "reclong": "-103.295000",
//     "geolocation": {
//       "type": "Point",
//       "coordinates": [
//           -103.295,
//           34.175
//       ]
//     },
//   });