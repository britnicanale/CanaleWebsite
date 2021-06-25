function toggleActive(new_tab){
    var tabs = ["about-me", "resume", "skills", "experience", "education", "projects"]
    tabs.forEach(tab => {
        element = document.getElementById('nav-link-' + tab);
        console.log(element)
        if (tab == new_tab){
            element.classList.add('active');
        }else{
            element.classList.remove('active');
        }
    })
}

function showAllExperience(){
    elements = document.getElementsByClassName('all');
    for (element of elements){
        element.style.display = 'block';
        console.log("block")
    }
}

function showProgrammingExperience(){
    elements = document.getElementsByClassName('all');
    for (element of elements) {
        console.log(element.classList)
        if (element.classList.contains('programming')) {
            element.style.display = 'block';
            console.log("block")
            console.log(element)
        }
        else{
            element.style.display = 'none';
            console.log("none")
            console.log(element)
        }
    }
}

function showGeneralExperience(){
    elements = document.getElementsByClassName('all');
    for (element of elements){
        console.log(element.classList)
        if (element.classList.contains('general')) {
            element.style.display = 'block';
            console.log("block")
            console.log(element)
        }
        else{
            element.style.display = 'none';
            console.log("none")
            console.log(element)
        }
    }
}