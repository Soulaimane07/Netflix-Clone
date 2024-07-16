package com.example.demo.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.PaymentRepo;
import com.example.demo.model.Payment;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@RestController
@RequestMapping("api/v1/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Autowired
    PaymentRepo repo;

    @PostMapping("/")
    public Payment createPaymentLink() throws Exception {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams
            .builder()
            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:3000/Success")
            .setCancelUrl("http://localhost:3000/Failed")
            .addLineItem(SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(
                    SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("usd")
                        .setUnitAmount((long) (10 * 100))
                        .setProductData(
                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName("test1")
                                .build()
                        )
                        .build()
                )
                .build()
            )
            .build();

        Session session = Session.create(params);
        Payment payment = new Payment();
        payment.setPaymenturl(session.getUrl());
        repo.save(payment);
        return payment;
    }
}