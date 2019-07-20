<script>
  import { Router, Link, Route } from "svelte-routing";
  import About from "./About.svelte";
  import Clients from "./Clients.svelte";
  import EditClient from "./EditClient.svelte";
  import Nav from "./Nav.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <Nav />
  <main role="main" class="container">
    <div>
      <Route path="client/:clientId" component="{EditClient}" />
      <Route path="about" component="{About}" />
      <Route path="/"><Clients /></Route>
    </div>
  </main>
</Router>
