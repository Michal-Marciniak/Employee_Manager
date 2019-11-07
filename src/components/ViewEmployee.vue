<template>
    <div id="view-employee">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{ name }}</h4></li>
            <li class="collection-item">ID : {{ employee_id }}</li>
            <li class="collection-item">Department : {{ department }}</li>
            <li class="collection-item">Position : {{ position }}</li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteEmployee" class="btn red">Delete</button>

        <div class="fixed-action-btn">
            <!-- btn-floating sprawia że przycisk będzie w dolnym rogu -->
            <router-link v-bind:to="{name: 'edit-employee', 
                                     params: employee_id = employee_id}" class="btn-floating btn-large">
                <i class="fa fa-edit red"></i>
            </router-link>
        </div>

    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'view-employee',
    data() {
        return {
            employee_id: null,
            name: null,
            department: null,
            position: null
        }
    },
    // w beforeRouteEnter NIE mamy dostępu do this
    // bo obiekt nie został jeszcze załadowany
    // możemy dostać się do this, za pomocą przekazania callback do next() 
    beforeRouteEnter(to, from, next) {
        db.collection('employees').where('employee_id','==', to.params.employee_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // mamy dostęp do instancji componentu poprzez vm
               next(vm => {
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
        deleteEmployee() {
            if(confirm('Are you sure?')) {
                db.collection('employees').where('employee_id','==',this.$route.params.employee_id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                        this.$router.push({path: '/'})
                    })
                })
            }
        }
    }
}
</script>

<style scoped>

</style>