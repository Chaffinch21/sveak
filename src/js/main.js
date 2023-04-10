window.onload = function(){
  const headerItemEl = document.querySelectorAll('.header__item');
  const taskOneEl = document.querySelector('.price');
  const taskTwoEl = document.querySelector('.progress');
  const taskThreeEl = document.querySelector('.header-template');
  const taskFourEl = document.querySelector('.page');
  const pageButtonEl = document.querySelectorAll('.page__button');
  const buttonTextEl = document.querySelectorAll('.button__text');
  const pricePropertysNameEl = document.querySelectorAll('.price-propertys__name');
  const pricePropertysValueEl = document.querySelectorAll('.price-propertys__value');
  const burgerWrap = document.querySelector('.header-wrap');
  const header = document.querySelector('.header-template');
  const progressBtn = document.querySelector('.progress__btn');
  const burgerEl = document.querySelector('.burger-js');
  const productListEl = document.querySelector('.product__list');
  const productItemEl = document.querySelectorAll('.product__item');
  const cardEl = document.querySelector('.card');
  const formOne = document.querySelector('.form__one');
  const formTwo = document.querySelector('.form__two');
  const formThree = document.querySelector('.form__three');
  const COUNT_SYMBOL = 400;
  const COUNT_NUMBER = 12;
  const TIME_ANIMATION = 4000;
  const MAX_LOAD = 100;

  if(taskOneEl) {
    headerItemEl.forEach(el=>{
      if (el.classList.contains('active')){el.classList.remove('active')}
    })
    headerItemEl[0].classList.add('active');

    pricePropertysNameEl.forEach(el=>{
      const newsText = el.textContent;
      if(newsText.length > COUNT_SYMBOL) {
        el.textContent = newsText.slice(0, COUNT_SYMBOL) + '...';
      }
    })

    pricePropertysValueEl.forEach(el=>{
      const newsText = el.textContent;
      if(newsText.length > COUNT_NUMBER) {
        el.textContent = newsText.slice(0, COUNT_NUMBER) + '...';
      }
    })
  }

  function circularArc(r, val){
    let c = Math.PI*(r*2);
    let pct = (val/100)*c;
    return pct;
  }

  if(taskTwoEl) {
    headerItemEl.forEach(el=>{
      if (el.classList.contains('active')){el.classList.remove('active')}
    })
    headerItemEl[1].classList.add('active');

    let circle = document.getElementById('bar');
    let radius = circle.getAttribute('r');
    let circlesArr = Array.from(document.getElementById('svg').children);
    circlesArr.splice(0,1);
    progressBtn.disabled = true;

    const resetLoad = () => {
      circlesArr.forEach(el=>{
        el.classList.add('fast');
        circle.style.strokeDashoffset = 0;
        document.getElementById('cont').setAttribute('data-pct', 0);
      })
    }

    const loadProgressBar = (val) => {
      circlesArr.forEach(el=> el.classList.remove('fast'))
      circle.style.strokeDashoffset = -circularArc(radius, val);
      progressBtn.disabled = true;
      printNumber(0, val, TIME_ANIMATION/val);
      setTimeout(function(){
        progressBtn.disabled = false;
      }, TIME_ANIMATION)
    }

    const printNumber = (from, to, time) => {
      const interval = setInterval(()=>{
        document.getElementById('cont').setAttribute('data-pct', from);
        from === to && clearInterval(interval);
        from=from+1;
      }, time)
    }

    loadProgressBar(69);
    document.getElementById('percent').addEventListener('change', function(ev){
      let val = parseInt(ev.target.value);
      if (isNaN(val)) {
        val = MAX_LOAD;
      } else {
        if (val < 0) { val = 0;}
        if (val > MAX_LOAD) { val = MAX_LOAD;}
        resetLoad();
        setTimeout(function(){
          loadProgressBar(val);
        }, 500)
      }
    })

    progressBtn.addEventListener('click', function(){
      let val = parseInt(document.getElementById('percent').value);
      progressBtn.disabled = true;
      resetLoad()
      setTimeout(function(){
        loadProgressBar(val);
      }, 500)
    })
  }

  if(taskThreeEl) {
    burgerWrap.style.top = (header.offsetHeight - burgerWrap.offsetHeight)/2+'px';
    burgerEl.addEventListener('click', function(ev){
      document.querySelector('body').classList.toggle('open-burger');
    })

    const hiddenCard = function(){
      const marginCard = +getComputedStyle(productItemEl[0]).marginRight.slice(0, -2);
      let countRow = parseInt((productListEl.offsetWidth-marginCard)/(cardEl.offsetWidth+marginCard));
      let ost = productItemEl.length%countRow;
      console.log(countRow);
      for (let i = 1; i<=ost; i++) {
        productItemEl[productItemEl.length-i].style.display = 'none';
      }
    }
    hiddenCard();
    window.addEventListener('resize', function(event) {
      if (window.innerWidth<1023) {
        burgerWrap.style.top = (header.offsetHeight - burgerWrap.offsetHeight)/2+'px';
      }

      productItemEl.forEach(el=> {
        el.style.display = 'flex';
      })
      hiddenCard();
    }, true);
  }

  if(taskFourEl) {
    headerItemEl.forEach(el=>{
      if (el.classList.contains('active')){el.classList.remove('active')}
    })
    headerItemEl[3].classList.add('active');

    const manageIcons = function(){
      buttonTextEl.forEach(el=>{
        if(el.classList.contains('hidden')){
          el.classList.remove('hidden');
        }
      })
      if((pageButtonEl[0].scrollWidth > pageButtonEl[0].clientWidth) || 
        (pageButtonEl[1].scrollWidth > pageButtonEl[1].clientWidth) || 
        (pageButtonEl[2].scrollWidth > pageButtonEl[2].clientWidth)){
          pageButtonEl.forEach(element => {
            console.log('1');
            element.firstElementChild.classList.add('hidden');
          });
      }
    }
    manageIcons();
    window.addEventListener('resize', function() {
      if (window.innerWidth<750) {
        manageIcons();
      }
    }, true);

    formOne.addEventListener('submit', function(ev){
      ev.preventDefault();
      let text = ev.target.firstElementChild.value;
      buttonTextEl[0].innerHTML = text;
      manageIcons();
      ev.target.reset();
    });

    formTwo.addEventListener('submit', function(ev){
      ev.preventDefault();
      let text = ev.target.firstElementChild.value;
      buttonTextEl[1].innerHTML = text;
      manageIcons();
    })

    formThree.addEventListener('submit', function(ev){
      ev.preventDefault();
      let text = ev.target.firstElementChild.value;
      buttonTextEl[2].innerHTML = text;
      manageIcons();
    })
  }
}