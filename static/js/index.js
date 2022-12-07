var sideBar;
var nav;
var footer;
var content;
var title;
var navLinks = {};

const sections = ['experience', 'skills', 'projects', 'education', 'resume'];
const contacts = [
    {
        text: 'britnicanale@gmail.com',
        link: 'mailto:britnicanale@gmail.com',
        imageName: '',
        element: 'i',
        classes: 'fas fa-envelope icon'
    },
    {
        text: 'LinkedIn',
        link: 'https://linkedin.com/in/britni-canale/',
        imageName: 'linkedin-logo.png',
        element: 'img',
        classes: 'icon'
    },
    {
        text: 'GitHub',
        link: 'https://github.com/britnicanale/',
        imageName: 'github-logo.png',
        element: 'img',
        classes: 'icon'
    }
]


function createSidebar() {
    currentSection = window.location.href.split('/').pop();

    sideBar = document.getElementById('sidebar');
    sideBar.style['background-color'] = '#000000';
    sideBar.style['position'] = 'fixed';
    sideBar.style['height'] = '100%';

    nav = document.createElement('nav');
    nav.classList.add('nav');
    nav.classList.add('flex-column');
    
    sideBar.appendChild(nav);

    title = document.createElement('h2');
    nav.appendChild(title);

    titleLink = document.createElement('a');
    titleLink.innerHTML = 'Britni Canale';
    titleLink.href = '/';
    titleLink.classList.add('nav-link');
    title.appendChild(titleLink);

    sections.forEach((section) => {
        let link =  document.createElement('a');
        link.innerHTML = section;
        if (section == currentSection) {
            link.classList.add('active');
        }
        link.href = '/' + section;
        link.classList.add('nav-link');
        navLinks[section] = link;
        nav.appendChild(link);
    });

    footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.style.position = 'fixed';
    footer.style.bottom = 0;
    sideBar.appendChild(footer);

    contacts.forEach((contact) => {
        let link =  document.createElement('a');
        link.classList.add('nav-link');
        link.href = contact.link;
        link.target = '_blank';

        let icon = document.createElement(contact.element);
        icon.className = contact.classes;
        if (contact.element == 'img') {
            icon.src = 'static/' + contact.imageName;
        }

        let linkName = document.createElement('span');
        linkName.innerHTML = contact.text;

        navLinks[contact] = link;
        footer.appendChild(link);
        link.appendChild(icon);
        link.appendChild(linkName);
    });

}

function initWebsite() {
    content = document.getElementById('content');

    createSidebar();

    main = document.getElementById('main');
    main.style['margin-left'] = sideBar.offsetWidth;
}

initWebsite();