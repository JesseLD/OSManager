const navbar = document.querySelector('nav')
const btn = document.querySelector('#print')
const buttons = document.querySelector('.buttons')

function hideElementsOnPrint(){
  navbar.style.display='none'

}

hideElementsOnPrint();$

btn.addEventListener('click',(e)=>{
  buttons.style.opacity = '0'
  window.print()
})




