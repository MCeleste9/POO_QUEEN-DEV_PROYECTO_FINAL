//------variables---------
const auth = firebase.auth();
var uid , email_signin , pass_signin, username , email_signup , pass_signup;
var isSignin = true;
//---------------Registre una nueva cuenta-------------//
function register(){
    document.querySelector('.Loading-Modal').style.display = "block"
        const promise = auth.createUserWithEmailAndPassword(email_signup, pass_signup).then(function(){
            uid = firebase.auth().currentUser.uid;
            console.log(uid);
            info();

       }).catch(function(error){
           alert(error);
           document.querySelector('.Loading-Modal').style.display = "none"
       });   
       
        document.getElementById('password').value = ''
        document.getElementById('email').value = ''

    return false;

}
//---------------Iniciar sesión---------------------------//
function signIn(){
        document.querySelector('.Loading-Modal').style.display = "block"
        const promise = auth.signInWithEmailAndPassword(email_signin, pass_signin);
        promise.catch(e => {alert(e.message);document.querySelector('.Loading-Modal').style.display = "none"});
}
//----------------------Desconectar--------------------//
function SignOut(){
    auth.signOut();
    console.log('SignOut')
}
//----------------Validación de entrada-----------------//
function inputValues(){
    email_signin = document.getElementById("email-signin").value;
    pass_signin = document.getElementById("password-signin").value;
    username = document.getElementById("name").value;
    email_signup = document.getElementById("email").value;
    pass_signup = document.getElementById("password").value;
if(isSignin){
    if( email_signin != null && email_signin != "" && pass_signin != null && pass_signin != ""){
        return true
    }
    else{
        return false
    }
}else{
    if( email_signup != null && email_signup != "" && pass_signup != null && pass_signup != "" && username != null && username != ""){
        return true
    }
    else{
        return false
    }
}

}
//--------Guardar nueva información de cuenta--------------------//
function info(){
    firebase.database().ref("users/"+uid).set({ 
        "uid": uid ,
        "Email": email_signup,
        "Avatar" : "https://firebasestorage.googleapis.com/v0/b/chat-app2-b59ab.appspot.com/o/JSIMG%2Fpp.png?alt=media&token=17b65eef-fe8d-4ff0-9b8f-3ada4ffd4e11",
        "Password": pass_signup,
        'UserName': username
    });
}
//----------------Usuario si está registrada--------------------//
auth.onAuthStateChanged(function(user){
		
    if(user){
        console.log('User LoggedIn')
       uid = user.uid;
       localStorage.setItem("uid",uid); 
       window.setInterval(function(){
        window.location.replace("index.html");
       },2000)
    
    }else{
        console.log("No Active User");
        //Ninguna usuario ha iniciado sesión
    }
});
//------------------Si la usuario presiona Enter desde el envío-----------//
window.addEventListener('keypress' , function(e){
    if (e.keyCode == 13) {
        if(isSignin){
            //Si la usuario está intentando iniciar sesión
            if(inputValues()){
              signIn()
            }else{ alert('Please fill out All fields')};
  
            }else{
            //Si la usuario está intentando registrarse
            if(inputValues()){
              register()
          }else{ alert('Please fill out All fields')}
            }
    }
})
//-----------------Desde Ui y cambios. ----------------//
const tab_btns = document.querySelectorAll("[data-target-tab]");
const tab_contents = document.querySelectorAll(".registration-form .content");

tab_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tab_btns.forEach((btn) => btn.classList.remove("active"));
    tab_contents.forEach((btn) => btn.classList.remove("active"));

    btn.classList.toggle("active");
    document.querySelector(btn.dataset.targetTab).classList.add("active");
    if(document.querySelector(btn.dataset.targetTab).getAttribute('id') === 'signup'){
   isSignin = false
}else {
        isSignin = true
    }

  });
});

/* */
const ripple_btns = document.querySelectorAll(".btn-ripple");

ripple_btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let x_coord = e.clientX;
    let y_coord = e.clientY;

    let btn_pos_top = e.target.offsetTop;
    let btn_pos_Left = e.target.offsetLeft;

    let x = x_coord - btn_pos_Left;
    let y = y_coord - btn_pos_top;

    const span = document.createElement("span");
    span.classList.add("ripple");
    span.style.top = `${y}px`;
    span.style.left = `${x}px`;

    this.appendChild(span);

    setTimeout(() => {
      this.removeChild(span);
    }, 400);
  });
});

/* mostrar y ocultar la contraseña */
const reg_eyes = document.querySelectorAll(".eye");

reg_eyes.forEach((eye) => {
  eye.addEventListener("click", () => {
    const pass_field = eye.previousElementSibling.previousElementSibling;
    if (pass_field.type === "password") {
      pass_field.setAttribute("type", "text");
      eye.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      pass_field.setAttribute("type", "password");
      eye.classList.replace("fa-eye", "fa-eye-slash");
    }
  });
});

/* -----------------------------------------------------------
     Envío de formulario
----------------------------------------------------------------
*/
const element = document.querySelectorAll('form');
element.forEach((form) =>{
    form.addEventListener('submit', event => {
        event.preventDefault();
          if(isSignin){
          //Si la usuario está intentando iniciar sesión
          if(inputValues()){
            signIn()
          }else{ alert('Please fill out All fields')};

          }else{
          //Si la usuario está intentando registrarse
          if(inputValues()){
            register()
        }else{ alert('Please fill out All fields')}
          }
      })
})

