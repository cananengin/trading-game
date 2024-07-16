const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const initializeDatabase = require("./initializeDatabase");

app.use(express.json());

const { Portfolio, Share, Trade } = require("./models");

initializeDatabase();

app.post("/api/buy", async (req, res) => {
  try {
    const { portfolioId, symbol, quantity } = req.body;

    const portfolio = await Portfolio.findByPk(portfolioId);
    const share = await Share.findOne({ where: { symbol } });

    if (!portfolio || !share) {
      return res.status(400).send({ message: "Portfolio or share not found" });
    }

    const trade = await Trade.create({
      type: "BUY",
      quantity,
      price: share.price,
      PortfolioId: portfolioId,
      ShareId: share.id,
    });

    res.status(201).send(trade);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/api/sell", async (req, res) => {
  try {
    const { userId, portfolioId, symbol, quantity } = req.body;

    const portfolio = await Portfolio.findByPk(portfolioId);
    const share = await Share.findOne({ where: { symbol } });

    if (!portfolio || !share) {
      return res.status(400).send({ message: "Portfolio or share not found" });
    }

    const trades = await Trade.findAll({
      where: {
        PortfolioId: portfolioId,
        ShareId: share.id,
      },
    });

    const userShares = trades.reduce(
      (total, trade) => total + trade.quantity,
      0
    );

    if (userShares < quantity) {
      return res.status(400).send({ message: "Not enough shares to sell" });
    }

    const totalBought = trades
      .filter((trade) => trade.type === "BUY")
      .reduce((sum, trade) => sum + trade.quantity, 0);

    const totalSold = trades
      .filter((trade) => trade.type === "SELL")
      .reduce((sum, trade) => sum + trade.quantity, 0);

    const availableShares = totalBought - totalSold;

    if (quantity > availableShares) {
      return res.status(400).send({ message: "Not enough shares to sell" });
    }

    const trade = await Trade.create({
      type: "SELL",
      quantity,
      price: share.price,
      PortfolioId: portfolioId,
      ShareId: share.id,
    });

    res.status(201).send(trade);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
