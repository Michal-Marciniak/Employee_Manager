<template>
    <div class="container">
        <div class="row">
            <form class="column s12 m8 offset-m2">
                <h3>Login</h3>
                <div class="login card-panel blue lighten-2 white-text">
                    <div class="input-field">
                        <i class="material-icons prefix">email</i>
                        <input type="text" id="email" v-model="email">
                        <label class="white-text" for="email">Email</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">lock</i>
                        <input type="password" id="password" v-model="password">
                        <label class="white-text" for="password">Password</label>
                    </div>
                    <button v-on:click="login" class="btn grey lighten-4 black-text">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login: function(e) {

            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(loggedUser => {
                alert('You are logged in')
                // .go powoduje że strona ładuję się ponownie
                // potrzebne po to aby załadował się navbar
                this.$router.go({ path: this.$router.path })
            })
            .catch(err => {
                alert(err.message);
            })   
            
            e.preventDefault();
        }
    }
}
</script>

<style scoped>

</style>