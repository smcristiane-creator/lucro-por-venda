const $ = (id) => document.getElementById(id);
const currency = (value) => new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(Number.isFinite(value) ? value : 0);
const number = (id) => {
  const value = Number($(id).value);
  return Number.isFinite(value) && value >= 0 ? value : 0;
};
const fields = ['sale-price','product-cost','fees','shipping','other-costs','taxes','quantity'];
function getProfitData() {
  const price = number('sale-price');
  const product = number('product-cost');
  const fees = number('fees');
  const shipping = number('shipping');
  const other = number('other-costs');
  const taxes = number('taxes');
  const quantity = Math.max(1, Math.floor(number('quantity')));
  const costs = product + fees + shipping + other + taxes;
  const profit = price - costs;
  const margin = price > 0 ? (profit / price) * 100 : 0;
  return {price, product, fees, shipping, other, taxes, quantity, costs, profit, margin};
}
function updateTargetPrice() {
  const costs = number('target-costs');
  const marginInput = number('target-margin');
  const margin = Math.min(99.9, marginInput);
  const price = margin >= 100 ? Infinity : costs / (1 - margin / 100);
  $('target-price').textContent = Number.isFinite(price) ? currency(price) : 'Margem inválida';
  $('target-explanation').textContent = Number.isFinite(price)
    ? `Para buscar uma margem de ${margin.toLocaleString('pt-BR',{maximumFractionDigits:1})}%, considerando os custos informados.`
    : 'Informe uma margem menor que 100%.';
  $('use-target-price').disabled = !Number.isFinite(price) || price <= 0;
  $('use-target-price').dataset.price = Number.isFinite(price) ? price.toFixed(2) : '';
}
function renderProfit() {
  const d = getProfitData();
  const money = (v) => currency(v);
  $('unit-profit').textContent = money(d.profit);
  $('unit-profit').style.color = d.profit < 0 ? '#ad3030' : 'var(--green)';
  $('unit-margin').textContent = `${d.margin.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:2})}%`;
  $('margin-bar').style.width = `${Math.max(0, Math.min(100, d.margin))}%`;
  $('result-price').textContent = money(d.price);
  $('unit-costs').textContent = money(d.costs);
  $('total-revenue').textContent = money(d.price * d.quantity);
  $('total-costs').textContent = money(d.costs * d.quantity);
  $('total-profit').textContent = money(d.profit * d.quantity);
  const status = $('profit-status');
  if (d.price <= 0) {
    status.textContent = 'Informe um preço válido';
    status.className = 'status-pill status-neutral';
  } else if (d.profit < 0) {
    status.textContent = 'Venda com prejuízo';
    status.className = 'status-pill status-negative';
  } else if (d.profit === 0) {
    status.textContent = 'Empate: sem lucro';
    status.className = 'status-pill status-neutral';
  } else {
    status.textContent = 'Venda com lucro';
    status.className = 'status-pill status-positive';
  }
  $('target-costs').value = d.costs.toFixed(2);
  updateTargetPrice();
}
fields.forEach(id => $(id).addEventListener('input', renderProfit));
$('target-costs').addEventListener('input', updateTargetPrice);
$('target-margin').addEventListener('input', updateTargetPrice);
$('reset-profit').addEventListener('click', () => {
  const defaults = {'sale-price':100,'product-cost':40,'fees':8,'shipping':5,'other-costs':7,'taxes':6,'quantity':1};
  Object.entries(defaults).forEach(([id,value]) => $(id).value = value);
  $('target-margin').value = 30;
  renderProfit();
});
$('use-target-price').addEventListener('click', () => {
  const price = Number($('use-target-price').dataset.price);
  if (Number.isFinite(price) && price > 0) {
    $('sale-price').value = price.toFixed(2);
    renderProfit();
    $('calculadora').scrollIntoView({behavior:'smooth'});
  }
});
$('download-report').addEventListener('click', () => {
  const d = getProfitData();
  const rows = [
    ['Resumo Lucro por Venda','Valor'],
    ['Preço de venda por unidade',d.price.toFixed(2)],
    ['Custo do produto',d.product.toFixed(2)],
    ['Taxas de venda',d.fees.toFixed(2)],
    ['Frete pago por você',d.shipping.toFixed(2)],
    ['Outras despesas',d.other.toFixed(2)],
    ['Impostos estimados',d.taxes.toFixed(2)],
    ['Custos totais por unidade',d.costs.toFixed(2)],
    ['Lucro estimado por unidade',d.profit.toFixed(2)],
    ['Margem estimada (%)',d.margin.toFixed(2)],
    ['Quantidade',String(d.quantity)],
    ['Faturamento total', (d.price*d.quantity).toFixed(2)],
    ['Custos totais', (d.costs*d.quantity).toFixed(2)],
    ['Lucro estimado total', (d.profit*d.quantity).toFixed(2)],
    ['Observação','Estimativa simplificada; não é apuração contábil.']
  ];
  const csv = '\uFEFF' + rows.map(row => row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(';')).join('\r\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'resumo-lucro-por-venda.csv'; a.click();
  URL.revokeObjectURL(url);
});
$('interest-button').addEventListener('click', () => {
  // Altere para o e-mail comercial real antes de publicar.
  const email = 'SEUEMAIL@EXEMPLO.COM';
  if (email === 'SEUEMAIL@EXEMPLO.COM') {
    alert('Antes de publicar, abra script.js e troque SEUEMAIL@EXEMPLO.COM pelo seu e-mail comercial.');
    return;
  }
  const subject = encodeURIComponent('Quero novidades sobre o Kit Financeiro Lucro por Venda');
  const body = encodeURIComponent('Olá! Tenho interesse em receber informações sobre o Kit Financeiro Lucro por Venda.');
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});
$('year').textContent = new Date().getFullYear();
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));
renderProfit();
