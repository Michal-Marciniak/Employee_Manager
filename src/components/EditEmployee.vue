<template>
    <div id="edit-employee">
        <h3>Edit Employee Data</h3>
        <div class="row">
            <!-- @submit.prevent to lepszy sposób na dostęp do elementów formy -->
            <!-- submit.prevent zapewnia to że strona nie ładuje się ponownie -->
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input disabled type="text" v-model="employee_id" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="department" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="position" required>
                    </div>
                </div>
                    <button @click="updateEmployee" type="submit" class="btn">Edit</button>
                    <router-link v-bind:to="{name: 'view-employee',
                                             params: employee_id = employee_id}" 
                                             class="btn grey">Cancel</router-link>
            </form>    
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'edit-employee',
    data() {
        return {
            employee_id: null,
            name: null,
            department: null,
            position: null
        }
    },
    beforeRouteEnter(to, from, next) {
        db.collection('employees').where('employee_id','==', to.params.employee_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // mamy dostęp do instancji componentu poprzez vm
               next(vm => {
                   // pola będą automatycznie wypełnione danymi
                   vm.employee_id = doc.data().employee_id,
                   vm.name = doc.data().name,
                   vm.department = doc.data().department,
                   vm.position = doc.data().position
               })
            })
        })
    },
    watch: {
        // wywołuje ponownie metodę fetchData
        // jeśli wartość ścieżki się zmieni
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('employees').where('employee_id','==',
            this.$route.params.employee_id).get()
            .then(querySnapshot => {
                // dzięki funkcji beforeRouteEnter mamy dostęp do this
                querySnapshot.forEach(doc => {
                    this.employee_id = doc.data().employee_id,
                    this.name = doc.data().name,
                    this.department = doc.data().department,
                    this.position = doc.data().position
                })
            })
        },
        updateEmployee() {
            db.collection('employees').where('employee_id','==',
            this.$route.params.employee_id).get()
            .then(querySnapshot => {
                // dzięki funkcji beforeRouteEnter mamy dostęp do this
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        employee_id: this.employee_id,
                        name: this.name,
                        department: this.department,
                        position: this.position
                    })
                    .then(() => {
                        this.$route.push({ name: 'view-employee', params: employee_id = this.employee_id })
                    })
                })
            })
        }
    }
}
</script>

<style scoped>

</style>