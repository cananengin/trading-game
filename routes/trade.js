const express = require('express');
const router = express.Router();
const { Portfolio, Share, Trade } = require('../models');

router.post('/buy', async (req, res) => {
  const { portfolioId, shareSymbol, quantity } = req.body;
  try {
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(400).send('Invalid portfolio');
    }

    const share = await Share.findOne({ where: { symbol: shareSymbol } });
    if (!share) {
      return res.status(400).send('Invalid share');
    }

    const trade = await Trade.create({
      type: 'BUY',
      quantity,
      price: share.price,
      PortfolioId: portfolioId,
      ShareId: share.id
    });

    res.status(201).send(trade);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/sell', async (req, res) => {
  const { portfolioId, shareSymbol, quantity } = req.body;
  try {
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(400).send('Invalid portfolio');
    }

    const share = await Share.findOne({ where: { symbol: shareSymbol } });
    if (!share) {
      return res.status(400).send('Invalid share');
    }

    const totalBought = await Trade.sum('quantity', {
      where: { PortfolioId: portfolioId, ShareId: share.id, type: 'BUY' }
    });

    const totalSold = await Trade.sum('quantity', {
      where: { PortfolioId: portfolioId, ShareId: share.id, type: 'SELL' }
    });

    const availableQuantity = totalBought - totalSold;

    if (quantity > availableQuantity) {
      return res.status(400).send('Insufficient quantity');
    }

    const trade = await Trade.create({
      type: 'SELL',
      quantity,
      price: share.price,
      PortfolioId: portfolioId,
      ShareId: share.id
    });

    res.status(201).send(trade);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
