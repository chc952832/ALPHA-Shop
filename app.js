const cartProducts = [
  { 
    name: '破壞補丁修身牛仔褲',
    imgUrl: 'product-img-1',
    price: '3,999'
  },
  {
    name: '刷色直筒牛仔褲',
    imgUrl: 'product-img-2',
    price: '1,299'
  }
]

////變數
const productWrapper = document.querySelector('.product-wrapper')
const stepPanel = document.querySelector('.step-panel')
const steps = stepPanel.querySelectorAll('.step') 
const formContent = document.querySelector('.form-content')
const formPart = formContent.querySelectorAll('.part')
const connectLine = document.querySelectorAll('.connect-line')
const btnControl = document.getElementById('btn-control')
const prevBtn = document.querySelector('.btn-previous')
const nextBtn = document.querySelector('.btn-next')
const navIcons = document.querySelector('.nav-icons')
let total = 5298
let step = 0
let deliveryFee = 0
let mode = 'light'



//// 函式

// 根據按鈕控制step樣式
function handleStepControl(event) {
  // 預防頁面重整
  event.preventDefault()
  const nowStep = steps[step]
  if (event.target.classList.contains('btn-next') && step < 2) {
    const nextStep = steps[step + 1]
    // 調整這一步跟下一步的step樣式
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formPart[step].classList.toggle('d-none')
    formPart[step + 1].classList.toggle('d-none')
    step += 1
    // connect line樣式調整
    if (step === 1){
      connectLine[1].classList.add('active')
    }
  } else if (event.target.classList.contains('btn-previous')) {
    const prevStep = steps[step - 1]
    // 調整這一步跟上一步的step樣式
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formPart[step].classList.toggle('d-none')
    formPart[step - 1].classList.toggle('d-none')
    step -= 1
    // connect line樣式
    if (step === 1) {
      connectLine[1].classList.remove('active')
    }
  }
  // 按鈕樣式調整
  setBtnDisabled()
}

// form button control
function setBtnDisabled() {
  if (step === 0) {
    // 第一步時隱藏上一步按鈕
    prevBtn.classList.add('v-hidden')
    prevBtn.setAttribute('disabled', 'disabled')
  } else {
    prevBtn.removeAttribute('disabled')
    prevBtn.classList.remove('v-hidden')
  }
  if (step === 2 ) {
    // 最後一步時改變按鈕內容
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步 →'
  }
}
// 控制運費區塊樣式, 並連帶調整cart區塊運費及總額
function handleDeliveryStyle(event) {
  let totalPrice = document.querySelector('.total-price')
  if (event.target.id === 'delivery-DHL' && deliveryFee === 0) {
    event.target.parentElement.classList.add('active')
    event.target.parentElement.previousElementSibling.classList.remove('active')
    deliveryFee = 500
    let deliveryFeeText = document.querySelector('.delivery-fee')
    deliveryFeeText.innerHTML = `$${deliveryFee}`
    total += deliveryFee
    totalPrice.innerHTML = '$' + total.toLocaleString()
  } else if (event.target.id === 'delivery-standard' && deliveryFee === 500) {
    event.target.parentElement.classList.add('active')
    event.target.parentElement.nextElementSibling.classList.remove('active')
    deliveryFee = 0
    let deliveryFeeText = document.querySelector('.delivery-fee')
    total -= 500
    deliveryFeeText.innerHTML = '免費'
    totalPrice.innerHTML = '$' + total.toLocaleString()
  } 
}

// 渲染購物籃清單
function renderCartElement(){
  let rawHTML = ""
  cartProducts.forEach(product => {
    rawHTML += `<div class="product">
                <img src="./src/image/${product.imgUrl}.png" class="product-picture" alt="product-picture">
                <div class="product-detail">
                  <span class="product-title">${product.name}</span>
                  <div class="cart-btns">
                    <button class="cart-btn minus-btn">-</button>
                    <span class="product-amount">1</span>
                    <button class="cart-btn plus-btn">+</button>
                  </div>
                  <span class="product-price">$${product.price}</span>
                </div> 
              </div>`
  })
  rawHTML += `<div class="cart-detail">
              <div class="delivery-fee-wrapper">
                <span class="delivery-fee-title">運費</span>
                <span class="delivery-fee">免費</span>
              </div>
              <div class="total">
                <span class="total-title">小計</span>
                <span class="total-price">$${total.toLocaleString()}</span>
              </div>
            </div>`
  productWrapper.innerHTML = rawHTML
}

// 控制購物籃加減按鈕, 並渲染小計
function handleCartBtns(event) {
  let target = event.target
  let totalPrice = document.querySelector('.total-price')
  let productPrice = Number(target.parentElement.nextElementSibling.innerText.slice(1).replace(',',''))
  if (target.classList.contains('minus-btn')) {
    let amount = Number(target.nextElementSibling.innerText)
    if (amount > 1) {
      amount -= 1
      total -= productPrice
      target.nextElementSibling.innerText = amount
    }
  } else if (target.classList.contains('plus-btn')) {
    let amount = Number(target.previousElementSibling.innerText)
    amount += 1
    total += productPrice
    target.previousElementSibling.innerText = amount
  }
  totalPrice.innerHTML = '$' + total.toLocaleString()
}

// 更改畫面深淺模式
function changeMode(event) {
  if (event.target.classList.contains('mode-toggle-icon') && mode === 'light') {
  mode = 'dark'
  document.documentElement.setAttribute('data-theme', 'dark')
  } else if (event.target.classList.contains('mode-toggle-icon') && mode === 'dark') {
    mode = 'light'
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

// 渲染購物車商品頁面
renderCartElement()

// 綁上事件監聽器進行事件監聽
productWrapper.addEventListener('click', handleCartBtns)
btnControl.addEventListener('click', handleStepControl)
formContent.addEventListener('click', handleDeliveryStyle)
navIcons.addEventListener('click', changeMode)

