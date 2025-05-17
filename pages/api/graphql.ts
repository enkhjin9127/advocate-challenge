import { connectMongoose } from "@/mongoose/mongoose-connection";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ApolloServer } from "apollo-server-cloud-functions";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schemas";

let db: any = null;

async function getDb() {
  if (!db) {
    db = await connectMongoose();
  }
  return db;
}
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  introspection: true,
  csrfPrevention: true,
  cache: new InMemoryLRUCache(),
  context: async ({ req, res }) => {
    const db = await getDb();
    return { db, req, res, headers: req.headers };
  },
});

export const config = { api: { bodyParser: false, externalResolver: true } };
export default server.createHandler();
