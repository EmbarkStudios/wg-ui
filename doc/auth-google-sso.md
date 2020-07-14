# Google SSO Implementation

This is a short documentation on how you can setup wg-ui and Google OAuth. 

There are a few different projects on GitHub related to SSO and OAuth2, the most popular just now is [oauth2-proxy/oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy) but we at Embark Studios opted to use [buzzfeed/sso](https://github.com/buzzfeed/sso). This was done before the growth of oauth2-proxy.

## SSO Proxy & Auth

When setting up [buzzfeed/sso](https://github.com/buzzfeed/sso) we followed the quickstart documentation provided by the project found [here](https://github.com/buzzfeed/sso/blob/master/docs/quickstart.md).  
In our setup we use the binaries provided by releases, and not a docker based solution. 

## Systemd

Below is two simple services to keep both `sso-auth` and `sso-proxy` running. 
As you can notice we use environment files instead of parameters for the binaries. 

```
[Unit]
Description=sso-auth
After=network.target

[Service]
Type=simple
Restart=always
EnvironmentFile=/path/to/sso-auth.env
ExecStart=/path/to/sso-auth

[Install]
WantedBy=multi-user.target
```
```
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_HTTPONLY=true
SESSION_COOKIE_DOMAIN=.domain.com
SESSION_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SESSION_COOKIE_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLIENT_PROXY_ID=<shared with proxy's environment file>
CLIENT_PROXY_SECRET=<shared with proxy's environment file>
SERVER_SCHEME=https
SERVER_HOST=sso.domain.com
SERVER_PORT=8000
AUTHORIZE_EMAIL_DOMAINS=domain.com
AUTHORIZE_PROXY_DOMAINS=domain.com
PROVIDER_DOMAIN_CLIENT_ID=123456789000-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
PROVIDER_DOMAIN_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
PROVIDER_DOMAIN_TYPE=google
PROVIDER_DOMAIN_SLUG=google
VIRTUAL_HOST=sso.domain.com
CLUSTER=sso
STATSD_HOST=127.0.0.1
STATSD_PORT=8125
```

```
[Unit]
Description=sso-proxy
After=network.target

[Service]
Type=simple
Restart=always
EnvironmentFile=/path/to/sso-proxy.env
ExecStart=/path/to/sso-proxy

[Install]
WantedBy=multi-user.target
```
```
DEFAULT_ALLOWED_EMAIL_DOMAINS=domain.com
UPSTREAM_CONFIGS=/path/to/upstream_configs.yaml
PROVIDER_URL=https://sso.domain.com
PROVIDER_URL_INTERNAL=http://localhost:8000
CLIENT_ID=<shared with auth's environment file>
CLIENT_SECRET=<shared with auth's environment file>
COOKIE_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
COOKIE_SECURE=true
VIRTUAL_HOST=*.domain.com
CLUSTER=sso
STATSD_HOST=127.0.0.1
STATSD_PORT=8125
```

You will also need a yaml file which defines backend service (wg-ui) which is defined in sso-proxy.env as `UPSTREAM_CONFIGS`

```
- service: wg-ui
  default:
    from: vpn.domain.com
    to: http://localhost:8080/
```

## nginx

We use nginx for all HTTP(S) to endusers, below you can find an example for configuration.

```
server {
        listen 443 http2;
        listen [::]:443 http2;

        server_name vpn.domain.com;

        ssl on;
        ssl_certificate /path/to/domain.com.bundle.crt;
        ssl_certificate_key /path/to/domain.com.key;

        location / {
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Proto https;
                proxy_pass http://localhost:4180;
        }
}
server {
        listen 443 http2;
        listen [::]:443 http2;

        server_name sso.domain.com;

        ssl on;
        ssl_certificate /path/to/domain.com.bundle.crt;
        ssl_certificate_key /path/to/domain.com.key;

                location / {
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Proto https;
                proxy_pass http://localhost:8000;
        }
}
```
