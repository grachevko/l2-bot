// @ts-ignore
import Client from "l2js-client/Client";

const l2 = new Client();
l2.enter({
  /* required */ Username: "admin",
  /* required */ Password: "admin",
  /* required */ Ip: "127.0.0.1",
  /* optional */ ServerId: 1, // Bartz
  /* optional */ CharSlotIndex: 0
}).catch((e: any) => console.log(e));

export default l2;
