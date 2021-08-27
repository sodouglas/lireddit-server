# LiReddit Tutorial

Source: [Fullstack React GraphQL TypeScript Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)

# Tech Stack

* React
* Node.js
* Next.js
* GraphQL
* PostgreSQL
* TypeGraphQL
* Redis
* MikroORM/TypeORM
* TypeScript
* URQL/Apollo

# Helpful stuff

`sudo lsof -i :4000`
`kill -9 $PID`
OR
`npx kill-port 4000`
OR
`pkill -f node`

`sudo -u postgres psql lireddit`

`pg_ctl -D /home/linuxbrew/.linuxbrew/var/postgres start`
`/home/linuxbrew/.linuxbrew/opt/postgresql/bin/postgres -D /home/linuxbrew/.linuxbrew/var/postgres`

```
npx mikro-orm schema:create --dump   # Dumps create schema SQL
npx mikro-orm schema:update --dump   # Dumps update schema SQL
npx mikro-orm schema:drop --dump     # Dumps drop schema SQL
```