fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })

//   footer 
fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;

  });