# Shibboleth SP Implementation

This is a short documentation on how you can setup wg-ui with Shibboleth SP (and apache)
as auth proxy

The documentation will not cover how to configure `shibd` or the IdP part of this integration.
The [upstream documentation](https://wiki.shibboleth.net/confluence/) or
[SWAMIDs
documentation](https://wiki.sunet.se/display/SWAMID/SAML+WebSSO+Service+Provider+Best+Current+Practice)
could point you in the right direction.

## SSO Proxy & Auth

This example uses
[eduPersonPrincipalName](https://www.internet2.edu/media/medialibrary/2013/09/04/internet2-mace-dir-eduperson-201203.html#eduPersonPrincipalName)
(or eppn as Shibboleth calls it) as the  primary key to identify users. Make
sure that it is released from the IdP to the SP as a SAML attribute. The
attributes(s) are then forward/proxied as request header to the application.

The only thing that needs to be configured in the Wireguard UI end is that the
application needs to be started with the `--auth-user-header` flag set to
`eppn`.

### The `apache` configuration

```
<VirtualHost *:443>
    <LocationMatch "/">
        AuthType Shibboleth
        Require shib-attr entitlement ~ ^urn:mace:swami.se:gmai:vpn:user$
        ShibRequireSessionWith idp.example.com
        ShibUseHeaders On
    </LocationMatch>

    SSLCertificateFile    /path/to/vpn.example.com.pem
    SSLCertificateKeyFile /path/to/vpn.example.com.key
    SSLCertificateChainFile /path/to/CA.crt

    ProxyPass "/" "http://127.0.0.1:8080/"
    ProxyPassReverse "/" "http://127.0.0.1:8080/"
</VirtualHost>
```

#### Configuration in depth

```
Require shib-attr entitlement ~ ^urn:mace:swami.se:gmai:su-vpn:user$
```
By default apache and shibd lets everyone through and since Wireguard UI has no
knowlege about the user in beforehand we release another
([eduPersonEntitlement](https://www.internet2.edu/media/medialibrary/2013/09/04/internet2-mace-dir-eduperson-201203.html#eduPersonEntitlement) (or entitlement as Shibboleth calls it))
from the IdP to the SP and require a specific value on the user in order to be
allowed to use the service.

```
ShibUseHeaders On
```

This enables `shibd` to publish SAML attributes to the application (in this case
proxy) through request headers.
