import Fastify from 'fastify';
import yargs from 'yargs';
import { initDb } from './db.js';
import { insertEvent } from './events.js';

// Parse command line arguments
const argv = yargs(process.argv.slice(2))
    .option('host', {
        alias: 'h',
        description: 'Server host',
        type: 'string',
        default: '0.0.0.0'
    })
    .option('port', {
        alias: 'p',
        description: 'Server port',
        type: 'number',
        default: 8989
    })
    .help()
    .argv;

// Create Fastify instance
const fastify = Fastify({ logger: true });

// Declare an index route
fastify.get('/', function (request, reply) {
    reply.send({hello: 'world', welcomeTo: 'The CemTrak Event Logging API'})
})

// Route to handle event insertion
fastify.post('/events', async (request, reply) => {
    try {
        const event = request.body;
        await insertEvent(event);
        reply.code(201).send({ message: 'OK' });
    } catch (error) {
        reply.code(400).send({ error: error.message });
    }
});

// Start the server
const start = async () => {
    try {
        // Initialize database connection
        await initDb();

        // Start listening on the specified host and port
        await fastify.listen({ host: argv.host, port: argv.port });
        fastify.log.info(`Server listening at http://${argv.host}:${argv.port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();