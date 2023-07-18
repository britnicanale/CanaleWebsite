function toggleActive(new_tab){
    var tabs = ["about-me", "resume", "skills", "experience", "education", "projects"]
    tabs.forEach(tab => {
        element = document.getElementById('nav-link-' + tab);
        if (tab == new_tab){
            element.classList.add('active');
        }else{
            element.classList.remove('active');
        }
    })
}