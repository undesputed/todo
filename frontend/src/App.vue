<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/list">Todo List</router-link>
    </nav> -->

    <div>
      <b-navbar type="light" variant="light">
        <b-navbar-nav>
          <b-nav-item><router-link to="/">Home</router-link></b-nav-item>

          <b-nav-item><router-link to="/list">Todo List</router-link></b-nav-item>

          <b-nav-item-dropdown text="User" right v-if="isLoggedIn">
            <b-dropdown-item>Account</b-dropdown-item>
            <b-dropdown-item @click="logOut">Logout</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-if="!isLoggedIn"><router-link to="/login">Login</router-link></b-nav-item>
          <b-nav-item v-if="!isLoggedIn"><router-link to="/register">Register</router-link></b-nav-item>

        </b-navbar-nav>
      </b-navbar>
    </div>

    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    checkLoggedIn() {
      const token = localStorage.getItem('jwt');
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    logOut() {
      localStorage.clear();

      window.location.reload();
    }
  },
  mounted() {
    this.checkLoggedIn();
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
