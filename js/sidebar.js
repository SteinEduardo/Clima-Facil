fetch("../components/sidebar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("sidebar").innerHTML = data;
  }); 


 
    const cidade = "Curitiba";
    const cidade = inputUsuario;

