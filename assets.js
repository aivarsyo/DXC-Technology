let i = 0;

importJSON();

function importJSON() {

    fetch('slideInfo.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data)
            data.forEach(modifyCard);
            repairCardText();
        });

}

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