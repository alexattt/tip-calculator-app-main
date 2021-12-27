window.addEventListener('load', function () {

  let billAmountInput = this.document.getElementById('bill-amount')
  let numOfPeopleInput = this.document.getElementById('num-of-people')
  let errorMsg = this.document.getElementById('error-msg')

  let fivePercentBtn = this.document.getElementById('five-p')
  let tenPercentBtn = this.document.getElementById('ten-p')
  let fifteenPercentBtn = this.document.getElementById('fifteen-p')
  let twentyFivePercentBtn = this.document.getElementById('twentyfive-p')
  let fiftyPercentBtn = this.document.getElementById('fifty-p')
  let customTipInput = this.document.getElementById('custom-tip')

  let tipPerPersonField = this.document.getElementsByName('tip-per-person')
  let totalPerPersonField = this.document.getElementsByName('total-per-person')

  let resetBtn = this.document.getElementById('reset-btn')

  function deactivateButtons() {
    fivePercentBtn.classList.remove('active-tip-btn')
    tenPercentBtn.classList.remove('active-tip-btn')
    fifteenPercentBtn.classList.remove('active-tip-btn')
    twentyFivePercentBtn.classList.remove('active-tip-btn')
    fiftyPercentBtn.classList.remove('active-tip-btn')
  }

  let billAmount = 0
  let numOfPeople = 0
  let tipBtnIsActive = []
  let customTip = 0
  let tipAmounts = [0.5, 0.10, 0.15, 0.25, 0.5]

  function emptyCustomTip() {
    customTipInput.value = "Custom"
    customTip = 0
  }

  function activateButton(tipBtn) {
    deactivateButtons()
    emptyCustomTip()
    tipBtn.classList.add('active-tip-btn')
  }

  billAmountInput.addEventListener('change', function() {
    billAmount = billAmountInput.value
  })

  numOfPeopleInput.addEventListener('change', function() {
    numOfPeople = numOfPeopleInput.value
  })

  customTipInput.addEventListener('click', function() {
    deactivateButtons()
  })

  customTipInput.addEventListener('change', function() {
    customTip = customTipInput.value
  })

  fivePercentBtn.addEventListener('click', function() {
    activateButton(fivePercentBtn)
  })

  tenPercentBtn.addEventListener('click', function() {
    activateButton(tenPercentBtn)
  })

  fifteenPercentBtn.addEventListener('click', function() {
    activateButton(fifteenPercentBtn)
  })

  twentyFivePercentBtn.addEventListener('click', function() {
    activateButton(twentyFivePercentBtn)
  })

  fiftyPercentBtn.addEventListener('click', function() {
    activateButton(fiftyPercentBtn)
  })

  function isTipBtnActive() {
    tipBtnIsActive = [fivePercentBtn.classList.contains('active-tip-btn'), tenPercentBtn.classList.contains('active-tip-btn'), fifteenPercentBtn.classList.contains('active-tip-btn'),
                    twentyFivePercentBtn.classList.contains('active-tip-btn'), fiftyPercentBtn.classList.contains('active-tip-btn')]
    setTimeout(isTipBtnActive, 1000)
  }
  isTipBtnActive();

  function calculateTip() {

    if ((billAmount > 0) && (numOfPeople > 0) && (tipBtnIsActive.includes(true) || customTip > 0)) {
      if (customTip > 0) {
        errorMsg.classList.remove('element-visible')
        numOfPeopleInput.classList.remove('error-input')

        tipAmount = customTip / 100
        tipPerPerson = (billAmount * tipAmount) / numOfPeople
        totalPerPerson = tipPerPerson + (billAmount / numOfPeople)

        tipPerPersonField[0].placeholder = `$${Math.round(tipPerPerson * 100) / 100}`
        totalPerPersonField[0].placeholder = `$${Math.round(totalPerPerson * 100) / 100}`
      }
      else {
        errorMsg.classList.remove('element-visible')
        numOfPeopleInput.classList.remove('error-input')

        tipAmount = tipAmounts[tipBtnIsActive.indexOf(true)]
        tipPerPerson = (billAmount * tipAmount) / numOfPeople
        totalPerPerson = tipPerPerson + (billAmount / numOfPeople)

        tipPerPersonField[0].placeholder = `$${Math.round(tipPerPerson * 100) / 100}`
        totalPerPersonField[0].placeholder = `$${Math.round(totalPerPerson * 100) / 100}`
      }
    }
    else if ((billAmount > 0) && (numOfPeople == 0) && (tipBtnIsActive.includes(true) || customTip > 0)) {
      errorMsg.classList.add('element-visible')
      numOfPeopleInput.classList.add('error-input')
    }
    setTimeout(calculateTip, 500)
  }
  calculateTip()

  resetBtn.addEventListener('click', function() {
    tipPerPersonField[0].placeholder = '$0.00'
    totalPerPersonField[0].placeholder = '$0.00'
    deactivateButtons()
    emptyCustomTip()
    billAmountInput.value = 0
    numOfPeopleInput.value = 0
    billAmount = 0
    numOfPeople = 0
    customTip = 0
  })
})