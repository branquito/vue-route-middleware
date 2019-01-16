<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/account">Account</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
