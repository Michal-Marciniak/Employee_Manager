<template>
    <div id="dashboard">
        
            <ul class="collection with-header">
                <li class="collection-header"><h4>Employees</h4></li>
                <li class="collection-item" v-for="employee in employees" v-bind:key="employee.id">
                    <div class="chip">{{ employee.department }}</div>
                    {{ employee.employee_id }}:{{ employee.name }}

                    <router-link class="secondary-content" 
                        v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id} }">
                        <i class="fa fa-eye"></i>
                    </router-link>
                </li>
            </ul>
        
            <div class="fixed-action-btn">
                <!-- btn-floating sprawia że przycisk będzie w dolnym rogu -->
                <router-link to="/new" class="btn-floating btn-large red">
                    <i class="fa fa-plus"></i>
                </router-link>
            </div>

    </div>
</template>

<script>
// importujemy bazę danych
import db from './firebaseInit'

export default {
    name: 'dashboard',
    data() {
        return {
            employees: []
        }
    },
    created() {
        db.collection('employees').orderBy('department').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const employee_data = {
                    // id to firestore id (hash), id !== employee_id
                    'id': doc.id,
                    'employee_id': doc.data().employee_id,
                    'name': doc.data().name,
                    'department': doc.data().department,
                    'postion': doc.data().postion
                };

                this.employees.push(employee_data);
            })
        })
    }
}
</script>

<style scoped>

</style>