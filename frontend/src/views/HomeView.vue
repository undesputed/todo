<template>
  <div class="hello">
    <div class="form-body">
      <div class="row">
        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <h3>Create New Todo Lists</h3>
              <p>Fill in the data below.</p>
              <form class="requires-validation" @submit="onSubmit">

                <div class="col-md-12">
                  <input class="form-control" type="text" v-model="form.title" name="name" placeholder="Title" required>
                  <div class="valid-feedback">Title</div>
                  <div class="invalid-feedback">Title field cannot be blank!</div>
                </div>

                <div class="col-md-12">
                  <input class="form-control" v-model="form.description" type="text" name="email"
                    placeholder="Todo Description" required>
                  <div class="valid-feedback">Email field is valid!</div>
                  <div class="invalid-feedback">Email field cannot be blank!</div>
                </div>

                <div class="col-md-12 mt-3">
                  <input class="form-control" :min="minDate" v-model="form.dueDate" type="Date" name="email"
                    placeholder="Due Date">
                  <div class="valid-feedback">Email field is valid!</div>
                  <div class="invalid-feedback">Email field cannot be blank!</div>
                </div>

                <div class="form-button mt-3">
                  <button id="submit" type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TodoDateService from '../services/TodoDataService';
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        dueDate: '',
        completed: false,
        createdAt: new Date().toISOString().split("T")[0],
        author: '',
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      const token = localStorage.getItem("jwt");
      if (token) {
        this.form.author = this.currentUser();
        if (this.form.title === "" && this.form.description === "") {
          alert("Title and Description are required!!");
          return;
        }

        TodoDateService.create(this.form)
          .then(response => {
            console.log(response);
            alert("New Todo Added");
            this.form.title = '';
            this.form.description = '';
            this.form.dueDate = '';
            if (window.confirm('Do you want to add more?')) {
              return;
            } else {
              this.$router.push("/list");
            }
          }).catch(e => {
            console.log(e);
          })
        console.log(this.form);
      } else {
        this.$router.push("/login");
        alert("Please Login first!!")
      }
    },
    currentUser() {
      const token = localStorage.getItem("jwt");
      const decoded = jwtDecode(token);
      return decoded.id;
    }
  },
  computed: {
    minDate() {
      // Get the current date
      const currentDate = new Date();

      // Format the current date to 'yyyy-MM-dd' (required by the date input field)
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap');

#hello {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
}


.form-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.form-holder .form-content {
  position: relative;
  text-align: center;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 60px;
}

.form-content .form-items {
  border: 3px solid #fff;
  padding: 40px;
  display: inline-block;
  width: 100%;
  min-width: 540px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  text-align: left;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.form-content h3 {
  color: #fff;
  text-align: left;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-content h3.form-title {
  margin-bottom: 30px;
}

.form-content p {
  color: #fff;
  text-align: left;
  font-size: 17px;
  font-weight: 300;
  line-height: 20px;
  margin-bottom: 30px;
}


.form-content label,
.was-validated .form-check-input:invalid~.form-check-label,
.was-validated .form-check-input:valid~.form-check-label {
  color: #fff;
}

.form-content input[type=text],
.form-content input[type=password],
.form-content input[type=email],
.form-content select {
  width: 100%;
  padding: 9px 20px;
  text-align: left;
  border: 0;
  outline: 0;
  border-radius: 6px;
  background-color: #fff;
  font-size: 15px;
  font-weight: 300;
  color: #8D8D8D;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  margin-top: 16px;
}


.btn-primary {
  background-color: #6C757D;
  outline: none;
  border: 0px;
  box-shadow: none;
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active {
  background-color: #495056;
  outline: none !important;
  border: none !important;
  box-shadow: none;
}

.form-content textarea {
  position: static !important;
  width: 100%;
  padding: 8px 20px;
  border-radius: 6px;
  text-align: left;
  background-color: #fff;
  border: 0;
  font-size: 15px;
  font-weight: 300;
  color: #8D8D8D;
  outline: none;
  resize: none;
  height: 120px;
  -webkit-transition: none;
  transition: none;
  margin-bottom: 14px;
}

.form-content textarea:hover,
.form-content textarea:focus {
  border: 0;
  background-color: #ebeff8;
  color: #8D8D8D;
}

.mv-up {
  margin-top: -9px !important;
  margin-bottom: 8px !important;
}

.invalid-feedback {
  color: #ff606e;
}

.valid-feedback {
  color: #2acc80;
}

.example-datepicker {
  color: black !important;
}
</style>
