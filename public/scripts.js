function passcheck()
{
  //  var p1=document.getElementById("p1").value;
   // var p2=document.getElementById("p2").value;
    if(document.getElementById("p1").value==document.getElementById("p2").value)
    {
        document.getElementById("msg").style.display="block";
        document.getElementById("msg").style.color="green";
        document.getElementById("msg").innerHTML="Passwords matched";
    }
    else{
        document.getElementById("msg").style.display="block";
        document.getElementById("msg").style.color="red";
        document.getElementById("msg").innerHTML="Passwords do not match";
    }
    //document.getElementById("msg").style.display="none";
}
function fun1(){
    document.getElementById("msg").style.display="block";
  }
  function fun2(){
    document.getElementById("msg").style.display="none";
  }

function clickfun(){
    var x=document.getElementById("p1");
    var y=document.getElementById("p2");
    if(x.type=="password" ){
      x.type="text";
    }
    else{
      x.type="password";
    }
    if(y.type=="password" ){
      y.type="text";
    }
    else{
      y.type="password";
    }
  }