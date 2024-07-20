#!/bin/sh

 cd src

npx sequelize-cli db:migrate


exec "$@"