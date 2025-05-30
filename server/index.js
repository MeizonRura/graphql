import cors from "cors"
import express from "express"
import { createHandler } from "graphql-http/lib/use/express"
import { ruruHTML } from "ruru/server"
import { root } from "./graphql/resolvers"
import { schema } from "./graphql/schema"

const app = express()

app.use(cors())
app.use(express.json())

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: root,
    formatError(err) {
      if (err.originalError === false) {
        return err
      }

      return {
        message: err.message,
        status: err.originalError?.status || 500,
        path: err.path,
      }
    },
  }),
)

app.get("/", (req, res) => {
  res.type("html")
  return res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000)
