package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="paymenturl", length = 1000)
    private String paymenturl;

    public Payment(){}

    public Payment(String paymenturl){
        super();
        this.paymenturl = paymenturl;
    }

    public int getId(){
        return id;
    }

    public String getPaymenturl() {
        return paymenturl;
    }

    public void setPaymenturl(String paymenturl) {
        this.paymenturl = paymenturl;
    }
}
