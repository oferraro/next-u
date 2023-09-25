const cssClass = {
    reloadCSS(name) {
        const mainCSS = document.getElementById(name);
        const newCSS = mainCSS.cloneNode();
        mainCSS.remove();
        document.body.appendChild(newCSS);
    }
}