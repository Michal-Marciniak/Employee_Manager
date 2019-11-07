<template>
    <div id="new-employee">
        <h3>Add New Employee</h3>
        <div class="row">
            <!-- @submit.prevent to lepszy sposób na dostęp do elementów formy -->
            <!-- submit.prevent zapewnia to że strona nie ładuje się ponownie -->
            <form @submit.prevent="addNewEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="employee_id" required>
                        <label>Employee ID</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="name" required>
                        <label>Employee Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="department" required>
                        <label>Department</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="position" required>
                        <label>Position</label>
                    </div>
                </div>
                    <button type="submit" class="btn">Add</button>
                    <router-link to="/" class="btn grey">Cancel</router-link>
            </form>    
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'new-employee',
    data() {
        return {
            employee_id: null,
            name: null,
            department: null,
            position: null
        }
    },
    methods: {
        addNewEmployee() {
            db.collection('employees').add({
                // dzięki v-model mamy dostep do employee_id,
                // które wpisał użytkownik
                department: this.department, 
                employee_id: this.employee_id,
                name: this.name,
                position: this.position
            })
            .then(this.$router.push('/'))
            .catch(err => console.log(err));
        }
    }
}
</script>

<style scoped>

</style>