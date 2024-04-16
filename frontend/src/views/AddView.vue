<template>
  <div class="about">
    <h1 class="mt-5 fw-bolder text-success">Todo List</h1>


    <table id="tableComponent" class="table table-bordered table-striped" v-if="isLoggedIn">
      <thead>
        <tr>
          <th>ID Number</th>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ formatDate(item.dueDate) }}</td>
          <td>{{ item.status === 0 ? "To Do" : item.status === 1 ? "In Progress" : "Completed" }}</td>
          <td>
            <button id="show-btn" @click="editItem(item._id)">Edit</button>
            <button @click="deleteItem(item._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Update Modal -->
    <div>
      <b-modal ref="my-modal" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <b-container>
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group id="input-group-1" label="Todo Title:" label-for="input-1">
                <b-form-input id="input-1" v-model="form.title" type="text" placeholder="Enter Todo Title"
                  required></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-1" label="Description:" label-for="input-1">
                <b-form-input id="input-1" v-model="form.description" type="text" placeholder="Enter Description"
                  required></b-form-input>
              </b-form-group>

              <div>
                <label for="example-datepicker">Choose a date</label>
                <b-form-datepicker id="example-datepicker" v-model="form.dueDate" class="mb-2"></b-form-datepicker>
              </div>

              <b-form-group class="status" label="Update Status" v-slot="{ ariaDescribedby }">
                <b-form-radio-group id="radio-group-2" v-model="form.status" :aria-describedby="ariaDescribedby"
                  name="radio-sub-component">
                  <b-form-radio value="0">To Do</b-form-radio>
                  <b-form-radio value="1">In Progress</b-form-radio>
                  <b-form-radio value="2">Completed</b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger" @click="hideModal">Close</b-button>
            </b-form>
          </b-container>
        </div>
        <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
        <b-button class="mt-3" variant="outline-primary" block @click="update">Submit</b-button> -->
      </b-modal>
    </div>
  </div>
</template>

<script>
import TodoDateService from '../services/TodoDataService';
import { jwtDecode } from "jwt-decode";

export default {
  name: "TodoList",
  data() {
    return {
      items: [],
      currentTodo: null,
      currentIndex: -1,
      title: '',
      modal: false,
      id: '',
      form: {
        title: '',
        description: '',
        dueDate: '',
        completed: null,
        status: 0,
      },
      isLoggedIn: false
    }
  },

  methods: {
    checkLoggedIn() {
      const token = localStorage.getItem('jwt');
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.$router.push("/login")
        alert("Please Login!!")
      }
    },
    retrieveTodoLists() {
      const author = this.currentUser()
      TodoDateService.getAllByAuthor(author)
        .then(response => {
          this.items = response.data
          console.log(response.data);
        }).catch(e => {
          console.log(e);
        })
    }, currentUser() {
      const token = localStorage.getItem("jwt");
      const decoded = jwtDecode(token);
      return decoded.id;
    },

    refreshList() {
      this.retrieveTodoLists();
      this.currentTodo = null;
      this.currentIndex = -1;
    },

    setActiveTodo(todo, index) {
      this.currentTodo = todo;
      this.currentIndex = index;
    },
    editItem(id) {
      this.$refs['my-modal'].show()
      this.id = id;
      TodoDateService.get(id)
        .then(response => {
          console.log(response.data);
          this.form.title = response.data.title
          this.form.description = response.data.description
          this.form.dueDate = response.data.dueDate
          this.form.completed = response.data.completed
          this.form.status = response.data.status
        }).catch(e => {
          console.log(e);
        })
    },
    deleteItem(id) {
      TodoDateService.delete(id)
        .then(response => {
          this.refreshList();
          alert(response.data.message);
        }).catch(e => {
          console.log(e);
        })
    },
    update() {
      console.log("Hello world");
      // TodoDateService.update(this.id)
    },
    formatDate(dateString) {
      // Format date string into a human-readable format like "November 4, 1984"
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    },
    hideModal() {
      this.$refs['my-modal'].hide()
      this.id = '';
      this.refreshList();
    },

    onSubmit(event) {
      event.preventDefault()
      if (this.form.title === "" && this.form.description === "") {
        alert("Title and Description are required!!");
        return;
      }
      TodoDateService.update(this.id, this.form)
        .then(response => {
          console.log(response);
          this.hideModal();
          this.onReset();
          alert(`${this.id} Updated Successfully!!`);
        }).catch(e => {
          console.log(e);
        })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.description = ''
      this.form.dueDate = null
      this.form.completed = false
      this.form.createdAt = new Date()
    }
  },
  mounted() {
    this.retrieveTodoLists();
    this.checkLoggedIn();
  }
}
</script>

<style>
.status {
  text-align: left;
}
</style>