import express from 'express';
import graphqlHTTP from 'express-graphql';
import responseTime from './middlewares/reponseTime';
import cors from './middlewares/cors';
import config from './config';
import context from './context';
import schema from './schema';
import database from './database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseTime);
app.use(cors);

app.use('/graphql', graphqlHTTP({
  context,
  graphiql: true,
  schema,
}));

async function start(): Promise<void> {
  try {
    // check database connection
    await database.raw('SELECT 1 + 1 AS result');

    if ('migrations' in config.database) {
      await database.migrate.latest({ directory: config.database.migrations.directory });
    }

    if ('seeds' in config.database) {
      await database.seed.run({ directory: config.database.seeds.directory });
    }

    app.listen(config.port, () => {
      console.log(`Server started at http://localhost:${ config.port }`);
      console.log(`You can execute graphql queries at http://localhost:${ config.port }/graphql`);
    });
  } catch(error) {
    process.exit(1);
  }
}

start();
