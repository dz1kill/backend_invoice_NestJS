#!/bin/bash
DIR="$( cd "$( dirname "$0" )" && pwd )"
SEEDS_PATH="$DIR/seeds.sql"

CONTAINER="postgres"
DB_USER="postgres"
DB_NAME="postgres"

docker exec -i $CONTAINER psql -U $DB_USER $DB_NAME < $SEEDS_PATH
