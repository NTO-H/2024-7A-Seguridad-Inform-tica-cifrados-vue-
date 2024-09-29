<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
body {
  margin: 0;
  
}
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

@media screen and (max-width: 600px) {
  #app {
    background: linear-gradient(0deg, #FFFFFFFF 0%, #ffffff 50%, #ffffff 90%, #B1FFB0FF 110%);
    margin: 0;
    width: 100%;
    height: 100vh;

    body {
      margin: 0;
    }
  }

}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
