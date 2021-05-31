function toggleCollapse(name){
    var element = document.getElementById('collapse' + name);
    var currentState = element.style.display;
    if (currentState == "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
}
