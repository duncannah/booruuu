# booruuu - a browser-based imageboard browser

This is an imageboard (booru) browser that runs on the browser that eliminates annoyances that are frequent when using imageboards, such as advertisements, ugly interfaces, intentional throttling, etc...

This is still in alpha stage, so bugs are pretty common; most things will just not work.

![Screenshot](doc/screenshot.png)

# Online demo

Here's an online demo that might or might not work: https://booruuu.ermansay.in/

# Currently supported websites

-   Safebooru
-   e926
-   e621 🔞
-   Danbooru 🔞
-   Gelbooru 🔞
-   Sankaku Channel 🔞

# How to run

Make sure you ran `yarn install` on both the main component and the `client` component to get the dependencies.

For general development (runs both API server and client server): `yarn run dev`.

Run API server only: `PORT=5000 yarn run start`.

To compile client (to be served by a web server): `cd client; PUBLIC_URL=./ yarn run build`.

Setting `PUBLIC_URL` as `./` should be fine, since we're not using any routers.

# Using it with NGINX

In a production environment, it is a good idea to serve the client files through an actual web server like NGINX. But sometimes, there are cases where you can't expose an additional port (firewalls, reverse proxies, etc), so what you can do instead is a reverse proxy from NGINX to the API server.

The client makes requests to `./api/` by default, so you can set up the reverse proxy there.

Here's an example NGINX configuration. Let's say the client is served at `/booru`, and the API server is at `localhost:5000`:

```
location /booru/api/ {
	proxy_pass http://localhost:5000/;
	proxy_set_header Connection "";
	proxy_http_version 1.1;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
}
```

This will proxy all requests made to `/booru/api/` to the API server.

# License

This software is licensed under GNU Affero General Public License v3.0. A copy is available [here](LICENSE).
