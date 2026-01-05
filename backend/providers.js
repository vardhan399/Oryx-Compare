const axios = require("axios");

async function getAllOffers(amount) {
  const results = {};

  // ---- MoonPay ----
  try {
    const res = await axios.get(
      "https://api.moonpay.com/v3/currencies/btc/buy_quote",
      {
        params: {
          apiKey: "pk_live_R5Lf25uBfNZyKwccAZpzcxuL3ZdJ3Hc",
          baseCurrencyAmount: amount,
          baseCurrencyCode: "usd",
          fixed: true,
          areFeesIncluded: true,
          regionalPricing: true,
          quoteType: "principal",
        },
      }
    );

    if (res.data?.quoteCurrencyAmount) {
      results.moonpay = res.data.quoteCurrencyAmount.toString();
    }
  } catch (err) {
    console.error("MoonPay error:", err.message);
  }

  // ---- Paybis ----
  try {
    const res = await axios.post(
      "https://api.paybis.com/public/processing/v2/quote/buy-crypto",
      {
        currencyCodeFrom: "USD",
        currencyCodeTo: "BTC",
        requestedAmount: {
          amount: amount.toString(),
          currencyCode: "USD",
        },
        requestedAmountType: "from",
        promoCode: null,
        paymentMethod: "credit-card",
      }
    );

    const btc =
      res.data?.paymentMethods?.[0]?.amountTo?.amount;

    if (btc) {
      results.paybis = btc.toString();
    }
  } catch (err) {
    console.error("Paybis error:", err.message);
  }

  // ---- Guardarian ----
  try {
    const res = await axios.get(
      "https://api-payments.guardarian.com/v1/estimate",
      {
        params: {
          to_currency: "BTC",
          from_amount: amount,
          from_currency: "USD",
          from_network: "USD",
          to_network: "BTC",
        },
        headers: {
          "X-Api-Key": "c14d927f-cb01-4561-9520-28ec22c92710",
        },
      }
    );

    if (res.data?.value) {
      results.guardarian = res.data.value.toString();
    }
  } catch (err) {
    console.error("Guardarian error:", err.message);
  }
    // ---- Transak ----
  try {
    const res = await axios.get(
      "https://api.transak.com/api/v1/pricing/public/quotes",
      {
        params: {
          fiatCurrency: "USD",
          cryptoCurrency: "BTC",
          paymentMethod: "credit_debit_card",
          isBuyOrSell: "BUY",
          fiatAmount: amount,
          partnerApiKey: "02624956-010b-4775-8e31-7b9c8b82df76",
          network: "mainnet",
        },
      }
    );

    if (res.data?.response?.cryptoAmount) {
      results.transak = res.data.response.cryptoAmount.toString();
    }
  } catch (err) {
    console.error("Transak error:", err.message);
  }


  return results;
}

module.exports = { getAllOffers };
