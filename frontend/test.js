// import { Address, ipfs, json } from "@graphprotocol/graph-ts";
const { ipfs} = require("@graphprotocol/graph-ts");

async function test() {
  let metadata = ipfs.cat('bafybeibm7dlehj2cbiiqv35gywkpaa75b5gqsmp44kw6isego27fomjwwu');
  console.log("METADATA", metadata);
}

test();
