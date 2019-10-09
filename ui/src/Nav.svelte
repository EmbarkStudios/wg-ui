<script>
  import TopAppBar, {Row, Section, Title} from "@smui/top-app-bar";
  import { Router, Link, Route } from "svelte-routing";
  import About from "./About.svelte";
  import Clients from "./Clients.svelte";
  import NavLink from "./NavLink.svelte";

  export let user;
</script>

<style>
  @media screen and (max-width: 800px) {
    .user {
      display: none;
    }
  }
</style>

<TopAppBar variant="static" color="primary">
  <Row>
    <Section>
      <Title>WireGuard VPN</Title>
    </Section>
    <Section align="end" toolbar>
      <small class="user">Logged in as {user}</small>
    </Section>
  </Row>
</TopAppBar>
