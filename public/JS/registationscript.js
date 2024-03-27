// const { checklogin } = require("../../controllers/api/registation");

// ========================= validation start ========================//
const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}

function validation_regi(){
    const requiredFields = ['first_name', 'last_name', 'dob', 'email', 'mobile_number','gender'];
    const onlyLetters = ['first_name', 'last_name'];
    const onlyNumber = ['mobile_number'];

    const merge1 = merge(requiredFields, onlyLetters);
    const mergearr = merge(merge1, onlyNumber);

    for (const field of mergearr) {
        const tag = document.getElementById(field);
        const value = tag.value.trim();
        const errorSpan = document.getElementById(`error_${field}`);

        if (requiredFields.includes(field) && value == '') {
            errorSpan.textContent = `Please fill in the ${field.replace('_', ' ')}`;
        } else if (onlyLetters.includes(field) && !(value.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/))) {
            errorSpan.textContent = 'Please Enter only letters';                            // check only alphabets
        } else if (onlyNumber.includes(field) && !(value.match(/^[0-9]+$/))) {
            errorSpan.textContent = 'Please Enter only number';                            // check only number
        } else if (field == "mobile_number" && value.length != 10) {                        // check mobile number validation
            errorSpan.textContent = 'Mobile Number must be 10 digit';
        } else {
            errorSpan.textContent = '';
        }
    }

    for (const field of mergearr) {
        const errorSpan = document.getElementById(`error_${field}`);
        if (errorSpan.textContent != '') {
            return false;
        }
    }
    return true;
}

// for call validation_regi() function
function validation_insert(){
    if(validation_regi()){
        insert();
    }
}

function validation_password(){
    const requiredFields = ['create_password','confirm_password'];

    for (const field of requiredFields) {
        const tag = document.getElementById(field);
        const value = tag.value.trim();
        const errorSpan = document.getElementById(`error_${field}`);
        if (value == '') {
            errorSpan.textContent = `Please fill in the ${field.replace('_', ' ')}`;
        }else{
            errorSpan.textContent = '';
            const create_password = document.getElementById("create_password");
            const confirm_password = document.getElementById("confirm_password");
            const confirm_errorSpan = document.getElementById(`error_confirm_password`);

            if(create_password.value != confirm_password.value){
                confirm_errorSpan.textContent = `confirm password not match`;
            }else{
                confirm_errorSpan.textContent = ``;
            }
        } 
    }

    for (const field of requiredFields) {
        const errorSpan = document.getElementById(`error_${field}`);
        if (errorSpan.textContent != '') {
            return false;
        }
    }
    return true;
}

// for call validation_password() function
function validation_activeuser(){
    if (validation_password()) {
        activeuser()
    }
}

// ================== end ====================//

function insert(){

    let formData = new FormData(document.querySelector(`#regi-from`));
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/api/registation");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   
    const Data = new URLSearchParams(formData);
    console.log(Data);
   
    xhr.onload = () => {
        if (xhr.status == 200) {
          const res = JSON.parse(xhr.responseText);
          console.log(res);
          document.getElementById("insert-btn").style.display =  "none";
          const alert = document.getElementById("alert");
          alert.style.display = "block";
          const a = alert.getElementsByTagName("a")[0];
          if(res[0].status == 400){
                if(res[0].hasOwnProperty('activation_code')){
                    a.textContent = `${res[0].msg} But account not active please active account link : http://localhost:3000/activation?acvcode=${res[0].activation_code}`;
                    a.href = `/activation?acvcode=${res[0].activation_code}`;
                } else{
                    a.textContent = res[0].msg;
                    a.href = `#`;
                }
          }else {
              a.textContent = `Thank You for Registration ! click link for activation : http://localhost:3000/activation?acvcode=${res[0].activation_code}`;
              a.href = `/activation?acvcode=${res[0].activation_code}`;
          }

        } else {
            console.log(`Error: ${xhr}`);
        }
    };
    xhr.send(Data);

}

function activeuser(){
    let formData = new FormData(document.querySelector(`#active-from`));
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/api/activation");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   
    const Data = new URLSearchParams(formData);
    // console.log(Data);
   
    xhr.onload = () => {
        if (xhr.status == 200) {
          const res = JSON.parse(xhr.responseText);
          console.log(res[0]);

          if(res[0].status == 200){
            document.getElementById("active-btn").style.display =  "none";
            const alert = document.getElementById("alert");
            alert.style.display = "block";
            const a = alert.getElementsByTagName("a")[0];
            a.textContent = "Your Account Is Actived ! Click Here to Login";
            a.href = `/login`;
          }
        } else {
            console.log(`Error: ${xhr}`);
        }
    };
    xhr.send(Data);
}

// ==================== forgot password =====================//

function forgotpassword(){
    let formData = new FormData(document.querySelector(`#forgotpassword-form`));
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/api/GenerateforgotpasswordLink");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   
    const Data = new URLSearchParams(formData);
    // console.log(Data);
   
    xhr.onload = () => {
        if (xhr.status == 200) {
          const res = JSON.parse(xhr.responseText);
          console.log(res);
          const alert = document.getElementById("alert");
          alert.style.display = "block";
          const a = alert.getElementsByTagName("a")[0];
          
          if(res.status == 400){
              console.log(a);
                a.textContent = `${res.msg}`;
                a.href = `#`;
            }else if(res.status == 200){
                document.getElementById("forgot-btn").style.display =  "none";
                a.textContent = `${res.msg}${res.code}`;
                a.href = `/resetpassword?acvcode=${res.code}`;
          }
        } else {
            console.log(`Error: ${xhr}`);
        }
    };
    xhr.send(Data);
}

function passwordreset(){
    let formData = new FormData(document.querySelector(`#password-reset-form`));
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/api/createNewPassword");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   
    const Data = new URLSearchParams(formData);
    // console.log(Data);
   
    xhr.onload = () => {
        if (xhr.status == 200) {
          const res = JSON.parse(xhr.responseText);
          console.log(res);
          const alert = document.getElementById("alert");
          alert.style.display = "block";
          const a = alert.getElementsByTagName("a")[0];
          
          if(res.status == 400){
              console.log(a);
                a.textContent = `${res.msg}`;
                a.href = `#`;
            }else if(res.status == 200){
                document.getElementById("password-reset").style.display =  "none";
                a.textContent = `${res.msg}`;
                a.href = `#`;
          }
        } else {
            console.log(`Error: ${xhr}`);
        }
    };
    xhr.send(Data);
}

function login(){
    console.log("hello");
    // if(!checklogin()){
        
    // } else {
        let formData = new FormData(document.querySelector(`#login-form`));
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/api/login");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       
        const Data = new URLSearchParams(formData);
        // console.log(Data);
       
        xhr.onload = () => {
            if (xhr.status == 200) {
              const res = JSON.parse(xhr.responseText);
              console.log("res:",res);
              const alert = document.getElementById("alert-login");
              alert.style.display = "block";
              const a = alert.getElementsByTagName("a")[0];
              
              if(res.status == 400){
                //   console.log(a);
                    a.textContent = `${res.msg}`;
                    a.href = `#`;
                    
              }else if(res.status == 200){
    
                    document.getElementById("login-btn").style.display =  "none";
                    a.textContent = `${res.msg}`;
                    // console.log("log :",document.cookie);
                    a.href = `#`;
                    const timer = setTimeout(function() {
                        window.location='http://localhost:3000/'
                    }, 2000);
             }
            } else {
                console.log(`Error: ${xhr}`);
            }
        };
        xhr.send(Data);
    // }

}

function setCookie(name,value,minutes){
    let now = new Date();
    let time = now.getTime();

    time += minutes * 60000;
    now.setTime(time);
    document.cookie = name + '=' + value + '; expires=' + now.toUTCString() + '; path=/';
}
