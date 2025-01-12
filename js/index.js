// FOCUS MANAGEMENT
// 1. Move Focus to the Menu When It Opens
// 2. Trap Focus Within the Menu
// 3. Restore Focus When the Menu Closes

// ARIA ATTRIBUTES FOR SCREENREADERS
// aria-expanded, aria-controls, aria-hidden

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileCloseButton = document.getElementById('mobile-close-button');
const mobileMenu = document.querySelector('#slideout-menu');
const mobileFocusableElements = mobileMenu.querySelectorAll('a, button');
const mobileFirstFocusableElement = mobileFocusableElements[0];
const mobileLastFocusableElement = mobileFocusableElements[mobileFocusableElements.length - 1];

const trapFocus = (menu) => {
    menu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                console.log('shift+tab button pressed');
                if(document.activeElement === mobileFirstFocusableElement) {
                    e.preventDefault();
                    mobileLastFocusableElement.focus()
                }
            } else {
                console.log('Tab button pressed');
                if(document.activeElement === mobileLastFocusableElement) {
                    e.preventDefault();
                    mobileFirstFocusableElement.focus();
                }
            }
        }
    })
}

mobileMenuButton.addEventListener('click', ()=>{
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
    mobileMenu.setAttribute('aria-hidden', (isExpanded).toString());
    mobileMenu.classList.toggle('open');
    if(isExpanded){
        mobileMenuButton.focus();
    } else {
        mobileFirstFocusableElement.focus();
        trapFocus(mobileMenu);
    }
});

mobileCloseButton.addEventListener('click', ()=> {
    if (mobileMenuButton.hasAttribute('aria-expanded')) {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.toggle('open');
    mobileMenuButton.focus();
});

mobileMenu.addEventListener('keydown', (e)=> {
    if (e.key === 'Escape') {
        mobileCloseButton.click();
    }
})

// Add click event listener to document
document.addEventListener('click', (event) => {
    // Check if click is outside the menu and the menu button
    if (!mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target) &&
        mobileMenu.getAttribute('aria-hidden') === 'false') {
        mobileCloseButton.click();
    }
});


// hide on scroll down, show on scroll up
// let scrollPosOld = window.scrollY;
// body.onscroll = () => {
//     let scrollPosNew = window.scrollY;
//     if (scrollPosNew > scrollPosOld) {
//         navbar.classList.add('hide')
//     } else {
//         navbar.classList.remove('hide')
//     }
//     scrollPosOld = scrollPosNew;
// }