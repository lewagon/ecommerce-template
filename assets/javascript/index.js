window.dataLayer = window.dataLayer || [];

const renderBadge = () => {
  const badge = document.querySelector('#cart-badge')
  badge.innerText = cartLS.list().reduce((prev, curr) => prev + curr.quantity, 0)
}

const listenToAdd = (buttons) => {
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const { id, name, price, location } = event.currentTarget.dataset
      if (cartLS.exists(id)) {
        cartLS.quantity(id, 1)
      } else {
        cartLS.add({ id, name, price })
      }
      dataLayer.push({
        event: 'addToCart',
        item: { id, name, price },
        location: location
      })
    })
  })
}

const cartItemsListeners = () => {
  const addToCartButtons = document.querySelectorAll('.cart .add-to-cart')
  listenToAdd(addToCartButtons)

  const cartItemRemoveButtons = document.querySelectorAll('.cart-item-remove')
  cartItemRemoveButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const { id, name, price, quantity } = event.currentTarget.dataset
      cartLS.remove(id)
      dataLayer.push({
        event: 'removeCartItem',
        item: { id, name, price },
        quantity: -parseInt(quantity),
        location: 'cart',
      })
    })
  })

  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart')
  removeFromCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const { id, name, price } = event.currentTarget.dataset
      cartLS.quantity(id, -1)
      dataLayer.push({
        event: 'removeOneFromCart',
        item: { id, name, price },
        location: 'cart',
      })
    })
  })
}


const renderCart = () => {
  renderBadge();

  const cartBody = document.querySelector('.cart');
  cartBody.innerHTML = cartLS.list().map((item, index) => {
    return `<tr>
      <td>#${index + 1}</td>
      <td>${item.name}</td>
      <td>
        <button type="button" class="btn btn-block btn-sm btn-outline-primary remove-from-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">-</button>
      </td>
      <td>${item.quantity}</td>
      <td>
        <button type="button" class="btn btn-block btn-sm btn-outline-primary add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-location="cart">+</button>
      </td>
      <td class="text-right">${item.price * item.quantity}€</td>
      <td class="text-right"><button class="btn btn-outline-danger btn-sm cart-item-remove" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-quantity="${item.quantity}">Remove</button></td>
    </tr>`
  }).join('');

  const total = document.querySelector('.total')
  total.innerText = `${cartLS.total()}€`;

  cartItemsListeners();
}

renderCart();
cartLS.onChange(renderCart);

const addToCartButtons = document.querySelectorAll('.add-to-cart')
listenToAdd(addToCartButtons)

const contactForm = document.getElementById('form-contact')
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    dataLayer.push({
      event: 'contactFormSubmit', location: 'contact', contact: Object.fromEntries(new FormData(event.currentTarget)) })
  })
}

const checkoutButton = document.getElementById('checkout-button')
checkoutButton.addEventListener('click', (event) => {
  dataLayer.push({
    event: 'goToCheckout',
    location: 'cart',
    cart: cartLS.list(),
    totalPrice: cartLS.total(),
    totalQuantity: cartLS.list().reduce((prev, curr) => prev + curr.quantity, 0)
  })
  cartLS.destroy()
  const modal = bootstrap.Modal.getInstance('#cartModal')
  modal.hide()
})

const cards = document.querySelectorAll('.card-hover')
cards.forEach((card) => {
  card.addEventListener('mouseenter', (event) => {
    event.currentTarget.classList.add('shadow-sm')
  })
  card.addEventListener('mouseleave', (event) => {
    event.currentTarget.classList.remove('shadow-sm')
  })
})
