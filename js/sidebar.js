fetch("../components/sidebar.html").then(response => response.text()).then(data => {
    document.getElementById("sidebar").innerHTML = data;

    const paginaAtual = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll("#sidebar a");

    for (const link of links) {
      const href = link.getAttribute("href");

      if (href.endsWith(paginaAtual)) {
        link.classList.add("ativo");
      }
    }
});