CREATE TABLE cemtrak_events
(
    external_id VARCHAR(255) NOT NULL,
    state       VARCHAR(4)   NOT NULL CHECK (state IN ('high', 'med', 'low', 'off')),
    timestamp   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);