//transition
let btnsTransition = document.querySelectorAll('.btnClick');
btnsTransition.forEach(element => {
    element.addEventListener('click', (e)=>{
        const currentLink = e.currentTarget.href;
        e.preventDefault();
        document.body.classList.toggle('animation');
        document.body.addEventListener('animationend', (e)=>{
            window.location = currentLink;
        });
    });
});