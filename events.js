import { db } from './db.js';

// Function to insert an event into the cemtrak_events table
export const insertEvent = async (event) => {
    // Validate required fields
    if (!event.external_id || !event.state) {
        throw new Error('external_id and state are required fields.');
    }

    // Validate state value
    const validStates = ['high', 'med', 'low', 'off'];
    if (!validStates.includes(event.state)) {
        throw new Error(`Invalid state value: ${event.state}. Must be one of: ${validStates.join(', ')}`);
    }

    // Prepare SQL statement
    const sql = `
    INSERT INTO cemtrak_events (external_id, state, timestamp)
    VALUES (?, ?, ?)
  `;

    // Execute SQL statement with sanitized values
    await db.run(sql, [
        event.external_id,
        event.state,
        event.timestamp || new Date().toISOString() // Use provided timestamp or current timestamp with milliseconds
    ]);
};