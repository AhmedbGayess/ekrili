import {
  ariana,
  beja,
  benarous,
  bizerte,
  gabes,
  gafsa,
  jendouba,
  kairouan,
  kasserine,
  kebili,
  kef,
  mahdia,
  manouba,
  medenine,
  monastir,
  nabeul,
  sfax,
  bouzid,
  siliana,
  sousse,
  tataouine,
  tozeur,
  tunis,
  zaghouan
} from "./locations.js";
const setDelegation = (governorate) => {
  let delegations;

  if (governorate === "") {
    delegations = [];
  } else if (governorate === "Ariana") {
    delegations = ariana;
  } else if (governorate === "Beja") {
    delegations = beja;
  } else if (governorate === "Ben Arous") {
    delegations = benarous;
  } else if (governorate === "Bizerte") {
    delegations = bizerte;
  } else if (governorate === "Gabes") {
    delegations = gabes;
  } else if (governorate === "Gafsa") {
    delegations = gafsa;
  } else if (governorate === "Jendouba") {
    delegations = jendouba;
  } else if (governorate === "Kairouan") {
    delegations = kairouan;
  } else if (governorate === "Kasserine") {
    delegations = kasserine;
  } else if (governorate === "Kebili") {
    delegations = kebili;
  } else if (governorate === "Le Kef") {
    delegations = kef;
  } else if (governorate === "Mahdia") {
    delegations = mahdia;
  } else if (governorate === "Manouba") {
    delegations = manouba;
  } else if (governorate === "Medenine") {
    delegations = medenine;
  } else if (governorate === "Monastir") {
    delegations = monastir;
  } else if (governorate === "Nabeul") {
    delegations = nabeul;
  } else if (governorate === "Sfax") {
    delegations = sfax;
  } else if (governorate === "Sidi Bouzid") {
    delegations = bouzid;
  } else if (governorate === "Siliana") {
    delegations = siliana;
  } else if (governorate === "Sousse") {
    delegations = sousse;
  } else if (governorate === "Tataouine") {
    delegations = tataouine;
  } else if (governorate === "Tozeur") {
    delegations = tozeur;
  } else if (governorate === "Tunis") {
    delegations = tunis;
  } else if (governorate === "Zaghouan") {
    delegations = zaghouan;
  }

  return delegations;
};

export default setDelegation;
