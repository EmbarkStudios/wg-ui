<script>
  import { Router, Link, Route } from "svelte-routing";
  import About from "./About.svelte";
  import Clients from "./Clients.svelte";
  import NavLink from "./NavLink.svelte";

  export let user;
</script>

<header>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="/">Wireguard VPN</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item"><NavLink to="/">Clients</NavLink></li>
        <li class="nav-item"><NavLink to="about">About</NavLink></li>
      </ul>
    </div>

    <div class="text-light">
     <small>Logged in as {user}</small>
    </div>
  </nav>
</header>
