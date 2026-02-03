import type { Register }  from "../types.js";



export function registerService ({email, password, name, surname}: Register){
  if(!email || typeof email != "string"){
    throw new Error('invalid email')
  }
  if(!password || typeof password != "string"){
    throw new Error('invalid password')
  }
  if(!name || typeof name != "string"){
    throw new Error('invalid name')
  }
  if(!surname || typeof surname != "string"){
    throw new Error('invalid surname')
  }
}
