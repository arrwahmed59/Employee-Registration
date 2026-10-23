// input
var employeeNameInput = document.getElementById("employeeName");
var jobTitleInput = document.getElementById("jobTitle");
var employeeEmailInput = document.getElementById("employeeEmail");
var employeePhoneInput = document.getElementById("employeePhone");
var departmentInput = document.getElementById("department");
var hireDateInput = document.getElementById("hireDate");

// arr
var employeeContainer = [];
var currentIndex = -1;

// localstorage
if (localStorage.getItem("employees")) {
  employeeContainer = JSON.parse(localStorage.getItem("employees"));
  displayEmployees(employeeContainer);
}

// saving
function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employeeContainer));
}

// addorupdate
function addOrUpdateEmployee() {
  var employee = {
    name: employeeNameInput.value,
    jobTitle: jobTitleInput.value,
    email: employeeEmailInput.value,
    phone: employeePhoneInput.value,
    department: departmentInput.value,
    hireDate: hireDateInput.value,
  };

  if (currentIndex === -1) {
    // add new
    employeeContainer.push(employee);
  } else {
    // update
    employeeContainer[currentIndex] = employee;
    currentIndex = -1;
    document.getElementById("submitBtn").textContent = "Add Employee";
  }

  saveToLocalStorage();
  clearForm();
  displayEmployees(employeeContainer); 
}

// display
function displayEmployees(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += 
           `<tr>
            <td>${arr[i].name}</td>
            <td>${arr[i].jobTitle}</td>
            <td>${arr[i].email}</td>
            <td>${arr[i].phone}</td>
            <td>${arr[i].department}</td>
            <td>${arr[i].hireDate}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1 " onclick="fillFormForUpdate(${i})">Update</button></td>
            <td><button class="btn btn-danger btn-sm " onclick="deleteEmployee(${i})">Delete</button></td>
           </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

// search
function searchEmployees(term) {
  var matchedEmployees = [];
  term = term.toLowerCase(); 

  for (var i = 0; i < employeeContainer.length; i++) {
    var employee = employeeContainer[i];
    var values = Object.values(employee).join(" ").toLowerCase();

    if (values.includes(term)) {
      matchedEmployees.push(employee);
    }
  }
  console.log("Matched:", matchedEmployees); 
  displayEmployees(matchedEmployees);
}

// delete
function deleteEmployee(index) {
  employeeContainer.splice(index, 1);
  saveToLocalStorage();

  if (currentIndex === index) {
    clearForm();
    currentIndex = -1;
    document.getElementById("submitBtn").textContent = "Add Employee";
  }
  displayEmployees(employeeContainer);
}

// clearing
function clearForm() {
  employeeNameInput.value = "";
  jobTitleInput.value = "";
  employeeEmailInput.value = "";
  employeePhoneInput.value = "";
  departmentInput.value = "";
  hireDateInput.value = "";
}



function fillFormForUpdate(index) {
  var employee = employeeContainer[index];
  employeeNameInput.value = employee.name;
  jobTitleInput.value = employee.jobTitle;
  employeeEmailInput.value = employee.email;
  employeePhoneInput.value = employee.phone;
  departmentInput.value = employee.department;
  hireDateInput.value = employee.hireDate;

  currentIndex = index;
  document.getElementById("submitBtn").textContent = "Update Employee";
}

// عشان الصفحه متحملش تاني بعد الابديت
document.getElementById("employeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); 
    addOrUpdateEmployee();
  });
