<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <h1>Actividades</h1>
        </li>
        <li>
          <router-link to="/">Tarea 1: Cifrado con César</router-link>
        </li>
        <li>
          <router-link to="/about">Tarea 3: Métodos simétricos, asimétricos y hash</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;

}

h1 {

  font-weight: bold;
  text-align: center;

  font-size: 30px;
}

#app {
  display: flex;
  /* Usamos flexbox para alinear nav y router-view */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #52657a;
  height: 100vh;
  width: 100%;
  background-color: rgb(244, 243, 243);
  /* Cambia esto si deseas un fondo diferente */

}

nav {
  box-shadow: 0px 0px 5px 5px #ededed4b;
  padding: 30px;
  background-color: rgb(255, 255, 255);
  /* Cambia esto si deseas un fondo diferente */
  width: 300px;
  /* Establece un ancho fijo para la navegación */
}

nav ul {
  list-style-type: none;
  /* Elimina los puntos de la lista */
  padding: 0;
  /* Elimina el padding */
  margin: 0;
  /* Elimina el margin */
}

nav li {
  margin-bottom: 15px;
  /* Espaciado entre los elementos de la lista */
}

nav a {
  font-weight: bold;
  color: #656e78;
  text-decoration: none;
  /* Elimina subrayado */
}

router-view {
  flex: 1;
  /* Permite que el router-view ocupe el espacio restante */
  padding: 30px;
  /* Espaciado interno opcional */
}

@media screen and (max-width: 600px) {
  #app {
    flex-direction: column;
    /* Cambia a columna en pantallas pequeñas */
    background: linear-gradient(0deg, #FFFFFFFF 0%, #ffffff 50%, #ffffff 90%, #B1FFB0FF 110%);
    margin: 0;
    width: 100%;
    height: 100vh;
  }

  nav {
    width: 100%;
    /* La navegación ocupa todo el ancho en pantallas pequeñas */
  }
}

nav a.router-link-exact-active {
  color: #f403c0;
}
</style>
