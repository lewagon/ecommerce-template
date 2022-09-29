---
layout: default
title: About
permalink: /contact/
---

<div class="container">
  <div class="row">
    <div class="col">
      <h2 class="py-5">Leave a Message</h2>
      <form id="form-contact" action="{{ '/' | relative_url }}" method="get" aria-label="Contact Form">
        <div class="mb-3">
          <label for="full_name" class="label">Full Name</label>
          <input type="text" required="required" class="form-control" name="full_name" placeholder="Enter your name">
        </div>

        <div class="mb-3">
          <label for="email" class="label">Email</label>
          <input type="text" required="required" class="form-control" name="email" placeholder="your@email.com">
        </div>

        <div class="mb-3">
          <label for="order_number" class="label">Order number</label>
          <input type="text" class="form-control" name="order_number" placeholder="Your order number" id="Order-number">
        </div>

        <div class="mb-3">
          <label for="message" class="label">Message</label>
          <textarea id="message" required="required" name="message" placeholder="Message text..." class="form-control"></textarea>
        </div>

        <input type="submit" value="Send Message" class="btn btn-primary">
      </form>

    </div>

    <div class="col p-4">
      <h3 class="py-5">Contact Info</h3>

      <p>4293  Euclid Avenue, Los Angeles, CA 90012</p>
      <p>+1 213 974-3898</p>
    </div>
  </div>
</div>


