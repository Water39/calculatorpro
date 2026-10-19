const prices = { basic: 200, options: 300, property: 500 };
const form = document.getElementById('calculator');
const quantity = document.getElementById('quantity');
const product = document.getElementById('product');
const packaging = document.getElementById('packaging');
const engraving = document.getElementById('engraving');
const optionsGroup = document.getElementById('optionsGroup');
const propertyGroup = document.getElementById('propertyGroup');
const error = document.getElementById('quantityError');
const total = document.getElementById('total');
const details = document.getElementById('details');
const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency', currency: 'RUB', maximumFractionDigits: 0
});

function calculate() {
  const type = product.value;

  optionsGroup.hidden = type !== 'options';
  propertyGroup.hidden = type !== 'property';
  packaging.disabled = type !== 'options';
  engraving.disabled = type !== 'property';

  const count = quantity.valueAsNumber;
  const valid = Number.isInteger(count) && count >= 1 && count <= 1000000;
  error.hidden = valid;
  quantity.setAttribute('aria-invalid', String(!valid));
  if (!valid) {
    total.textContent = '—';
    details.textContent = 'Для расчета укажите корректное количество.';
    return;
  }

  let unitPrice = prices[type];
  if (type === 'options') unitPrice += Number(packaging.value);
  if (type === 'property' && engraving.checked) unitPrice += 150;
  total.textContent = currency.format(count * unitPrice);
  details.textContent = `${count.toLocaleString('ru-RU')} шт. × ${currency.format(unitPrice)}`;
}

form.addEventListener('input', calculate);
form.addEventListener('change', calculate);
form.addEventListener('submit', event => event.preventDefault());
calculate();
