<template>
  <div id="app">
    <header>
      <h1>Welcome to My Vue App</h1>
    </header>
    <main>
      <button @click="login">Login</button>
    </main>
  </div>
</template>

<script setup>
const login = () => {
  alert("Login button clicked!");
};
</script>

<style>
#app {
  text-align: center;
  padding: 50px;
  background-color: white;
  max-width: 600px;
  margin: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

header h1 {
  color: #333;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
