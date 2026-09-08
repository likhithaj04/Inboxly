import NodeCache from "node-cache";

const emailCache = new NodeCache({
    stdTTL: 3600 // 
});

export default emailCache;