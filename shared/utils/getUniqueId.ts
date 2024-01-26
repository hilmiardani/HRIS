import fpjs from "@fingerprintjs/fingerprintjs";
// TODO get unique id
const getUniqueId = async () => {
  const fpInstance = await fpjs.load();
  const visitor = await fpInstance.get();
  return visitor.visitorId;
};

export default getUniqueId;
