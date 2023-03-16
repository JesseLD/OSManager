const navbar = document.querySelector('nav')
navbar.style.display='none'

const btn = document.querySelector('#print')


btn.addEventListener('click',(e)=>{
  btn.style.opacity = '0'
  window.print()
})