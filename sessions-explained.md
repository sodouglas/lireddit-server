# Sessions explained

1. Write session data: `req.session.userId = user.id;`
2. Pass to session store (RedisStore): { userId = 1 } -> sess:oafjwijei
3. Set session cookie on browser (express-session): oiafwojeijf15180578

4. On each client request, session cookie gets sent to server: oiafwojeijf15180578 -> redis-server
5. Server decrypts session cookie to get key: oiafwojeijf15180578 -> sess:oafjwijei
6. Request sent to Redis to pull data back from key: sess:oafjwijei -> { userId = 1 }