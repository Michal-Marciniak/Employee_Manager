<template>
    <div class="container">
        <div class="row">
            <form class="column s12 m8 offset-m2">
                <h3>Register</h3>
                <div class="login card-panel grey lighten-4 black-text">
                    <div class="input-field">
                        <i class="material-icons prefix">email</i>
                        <input type="text" id="email" v-model="email">
                        <label class="black-text" for="email">Email</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">lock</i>
                        <input type="password" id="password" v-model="password">
                        <label class="black-text" for="password">Password</label>
                    </div>
                    <button v-on:click="register" class="btn grey lighten-4 black-text">Register</button>
                    <router-link to="/login" class="btn red">Cancel</router-link>
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
        register: function(e) {

            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(newUser => {
                alert(`account for ${this.email} created successfully`)

                // wszystkie ścieżki zostają ponownie załadowane
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