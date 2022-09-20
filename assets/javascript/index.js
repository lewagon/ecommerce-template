const renderBadge = () => {
  const badge = document.querySelector('.badge')
  badge.innerText = cartLS.list().reduce((prev, curr) => prev + curr.quantity, 0)
}

const renderCart = () => {
  renderBadge();

  const cartBody = document.querySelector('.cart');
  cartBody.innerHTML = cartLS.list().map((item, index) => {
    return `<tr>
      <td>#${index + 1}</td>
      <td>${item.name}</td>
      <td style="width: 60px;">
        <button type="button" class="btn btn-block btn-sm btn-outline-primary" onclick="cartLS.quantity('${item.id}',-1)">-</button>
      </td>
      <td>${item.quantity}</td>
      <td style="width: 60px;">
        <button type="button" class="btn btn-block btn-sm btn-outline-primary" onclick="cartLS.quantity('${item.id}',1)">+</button>
      </td>
      <td class="text-right">${item.price * item.quantity}€</td>
      <td class="text-right"><button class="btn btn-outline-danger btn-sm" onclick="cartLS.remove('${item.id}')">Remove</button></td>
    </tr>`
  }).join('');

  const total = document.querySelector('.total')
  total.innerText = `${cartLS.total()}€`;
}

renderCart();
cartLS.onChange(renderCart);

const buttons = document.querySelectorAll('.add-to-cart')
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const { id, name, price } = event.currentTarget.dataset
    cartLS.add({ id, name, price })
  })
});
