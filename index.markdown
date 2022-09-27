---
layout: default
---

<div class="container">
  <h2 class="py-5">All toys</h2>
</div>

<div class="container">
  <div class="row row-cols-4">
    {% for product in site.products %}
      <div class="col">
        <div class="card card-hover text-center mb-3">
          <a href="{{ product.url | relative_url }}" class="text-decoration-none">
            <img src="{{ product.image | relative_url }}" alt="{{ product.name }} product image" class="w-100">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <span class="badge rounded-pill text-bg-primary">€ {{ product.price }} EUR</span>
            </div>
          </a>
        </div>
      </div>
    {% endfor %}
  </div>
