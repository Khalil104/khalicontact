 //Animation au défilement
 document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
  
    const observer = new IntersectionObserver((entries) =>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
  
                observer.unobserve(entry.target);
                //Stop observer après l'animation
            }
        });
    }, { threshold: 0.1});
  
    elements.forEach(element => observer.observe(element));
  });

// by Abdoul Rachid BISSARE / +229 01 63 61 49 80  