<template>
    <nav>
        <div class="nav-wrapper blue">
            <div class="container">
                <router-link v-if="isLoggedIn" to="/" class="brand-logo">Employee Manager</router-link>
                <ul class="right">
                    <li v-if="isLoggedIn"><router-link to="/aboutme">About Me</router-link></li>
                    <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/login">Log in</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
                    <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Log out</button></li>
                </ul>
            </div>       
        </div> 
    </nav>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'logout',
    data() {
        return {
            isLoggedIn: false,
            currentUser: null
        }
    },
    created() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.go({ path: this.$router.path });
            })
        }
    }
}
</script>