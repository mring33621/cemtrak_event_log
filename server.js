import Fastify from 'fastify';
import yargs from 'yargs';
import {db, initDb} from './db.js';
import {insertEvent} from './events.js';

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
const fastify = Fastify({logger: true});

// Declare an index route
fastify.get('/', function (request, reply) {
    reply.send({hello: 'world', welcomeTo: 'The CemTrak Event Logging API'})
})

// Route to handle event insertion
fastify.post('/events', async (request, reply) => {
    try {
        const event = request.body;
        await insertEvent(event);
        reply.code(201).send({message: 'OK'});
    } catch (error) {
        reply.code(400).send({error: error.message});
    }
});

// CSV GET route
fastify.get('/events/datadump', async (request, reply) => {
    try {
        const rows = await db.all('SELECT * FROM cemtrak_events ORDER BY timestamp ASC');

        // Convert data to CSV format
        const csvHeader = 'external_id,state,timestamp\n';
        const csvRows = rows.map(row =>
            `${row.external_id},${row.state},${row.timestamp}`
        ).join('\n');
        const csvData = csvHeader + csvRows;

        reply
            .code(200)
            .header('Content-Type', 'text/csv')
            .header('Content-Disposition', 'attachment; filename="cemtrak_events.csv"')
            .send(csvData);

    } catch (error) {
        // Handle potential errors
        reply.code(500).send({error: error.message});
    }
});

// Start the server
const start = async () => {
    try {
        // Initialize database connection
        await initDb();

        // Start listening on the specified host and port
        await fastify.listen({host: argv.host, port: argv.port});
        fastify.log.info(`Server listening at http://${argv.host}:${argv.port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();