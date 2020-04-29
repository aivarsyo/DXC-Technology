import {
    gsap
} from "gsap";
import Glide from '@glidejs/glide';
import carousel from '@glidejs/glide';

window.addEventListener("DOMContentLoaded", start);

let i = 0;

function start() {
    importJSON();
    modalBehaviour();
    setupForm();
    //readMoreAction();
}

function importJSON() {

    fetch('slideInfo.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data)
            data.forEach(importSlideData);
            data.forEach(modifyCard);
            slideMount();
            repairCardText();
            readMoreAction();
        });

}

function importSlideData(data) {

    const li = document.createElement("li");
    const topSlideLeft = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const topSlideRight = document.createElement("div");

    li.classList.add("glide__slide");
    document.querySelector(".glide__slides").appendChild(li);

    topSlideLeft.classList.add("topSlideLeft");
    li.appendChild(topSlideLeft);

    topSlideLeft.appendChild(p1);
    topSlideLeft.appendChild(p2);

    topSlideRight.classList.add("topSlideRight");
    topSlideRight.style.backgroundImage = "url(" + data.backgroundPhoto + ".jpg)";
    li.appendChild(topSlideRight);

    p1.textContent = data.title;
    p2.textContent = data.description;


}

function slideMount() {

    const config = {
        type: carousel,
        perView: 1
    }

    var glide = new Glide('.glide', config);

    /* data.forEach(checkSlide);

    function checkSlide(data) {
        glide.on('run', function () {
            var currentIndex = glide.index;

            if (data.id == currentIndex) {
                document.querySelector("#worksContainer").style.background = data.bodyBck;
            }
        })
    } */

    glide.mount();
}

/* async function importArticleSVG() {

    let response = await fetch("article.svg");

    let mySvgData = await response.text();

    document.querySelector("#articleCard").innerHTML = mySvgData;

} */

function modifyCard(data) {

    i++;

    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    console.log(data);

    clone.querySelector("#cardCategory").innerHTML = data.cardCategory;
    clone.querySelector("#cardTitle").innerHTML = data.cardTitle;
    clone.querySelector("#cardDescription").innerHTML = data.cardDescription;
    clone.querySelector("image").setAttribute("xlink:href", "card" + i + ".jpg");

    document.querySelector(".articles").appendChild(clone);
}

function repairCardText() {

    document.querySelectorAll("#cardTitle, #cardDescription").forEach(element => {
        d3plus.textwrap()
            .container(d3.select(element))
            .resize(false)
            .draw();
    })
}

function modalBehaviour() {

    // Get the modal
    var modal = document.getElementById("signUpForm");

    // Get the button that opens the modal
    var btn = document.querySelector("#signUp button");

    // Get the <span> element that closes the modal
    var span = document.querySelector(".close");

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function setupForm() {

    const form = document.querySelector("#containerForm > form");
    window.form = form;
    const elements = form.elements;
    window.elements = elements;

    form.setAttribute("novalidate", true);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let validForm = true;
        const formElements = form.querySelectorAll("input");
        formElements.forEach((el) => {
            el.classList.remove("invalid");
        })


        if (form.checkValidity() && validForm) {
            localStorage.setItem("checkUser", "signedUp");

            document.querySelector("#containerForm > form").style.display = "none";
            const thanks = document.createElement("p");
            thanks.textContent = "Thank you for signing up! Now you can see articles about the different topics we write every month.";
            thanks.classList.add("thanks");
            document.querySelector("#containerForm").appendChild(thanks);

            const articles = document.querySelector(".articles");
            const clone = articles.cloneNode(true);
            clone.classList.add("articlesInForm");
            document.querySelector("#containerForm").appendChild(clone);
        } else {
            // !awesome
            formElements.forEach((el) => {
                if (!el.checkValidity()) {
                    el.classList.add("invalid");
                }
            })
        }

    })
};

function readMoreAction() {

    document.querySelectorAll(".readMore").forEach(element => {
        element.addEventListener("click", function () {
            console.log("clicked");
            if (localStorage.getItem("checkUser")) {
                window.location = "assets.html";
            } else {
                document.querySelector("#signUpForm").style.display = "block";
            }
        })
    })
}