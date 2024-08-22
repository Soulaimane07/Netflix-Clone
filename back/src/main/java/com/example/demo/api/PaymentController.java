package com.example.demo.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import com.example.demo.Repo.PaymentRepo;
import com.example.demo.model.Payment;

@RestController
@RequestMapping("api/v1/payments")
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class PaymentController {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Autowired
    PaymentRepo repo;

    @PostMapping("/")
    public Payment createPaymentLink(@RequestBody CreatePaymentRequest request) throws Exception {
        Stripe.apiKey = stripeSecretKey;

        String productId = request.getProductId();
        String priceId = request.getPriceId();

        SessionCreateParams params = SessionCreateParams.builder()
            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:3000/browse")
            .setCancelUrl("http://localhost:3000/subscribe")
            .addLineItem(SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPrice(priceId)
                .build()
            )
            .build();

            System.out.println(productId);
            System.out.println(priceId);

        Session session = Session.create(params);
        Payment payment = new Payment();
        payment.setPaymenturl(session.getUrl());
        repo.save(payment);
        return payment;
    }
}