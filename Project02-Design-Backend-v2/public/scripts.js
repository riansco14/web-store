const currentPage = window.location.pathname;
const menuItens = document.querySelectorAll(".links a");

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}
console.log(menuItens);


//Paginação
//[1...15,16,17,19,20]
//totalPages=20
//selectedPage=15
//qntShow=5


function pagination(totalPages, selectedPage) {
    let pages = [],
        oldPage

    const sides = parseInt(5 / 2);

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAntesSelectedPage = currentPage >= (selectedPage - sides);
        const pagesDepoisSelectedPage = currentPage <= (selectedPage + sides);

        if (firstAndLastPage || pagesAntesSelectedPage && pagesDepoisSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage);

            oldPage = currentPage
        }

    }
    
    return pages
}


function createPagination(divPagination) {
    let filterValue=divPagination.getAttribute("data-filter");
    const totalPages=Number(divPagination.getAttribute("data-total"));
    const selectedPage=Number(divPagination.getAttribute("data-page"));
    divPagination.innerHTML = "";
    for (i of pagination(totalPages, selectedPage)) {
        if (String(i).includes("...")) {
            let span = document.createElement("a");
            span.appendChild(document.createTextNode(i));
            divPagination.appendChild(span);
        }
        else {
            let a = document.createElement("a");
            a.appendChild(document.createTextNode(i));
            if (filterValue)
                a.setAttribute("href", `/instrutores?filter=${filterValue}&page=${i}`);
            else
                a.setAttribute("href", `/instrutores?page=${i}`);
            divPagination.appendChild(a);
        }
    }
}

let divPagination=document.querySelector(".pagination");

if(divPagination)
    createPagination(divPagination);


