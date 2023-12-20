// routes/quizzes.js
const express = require('express');
const quizeRouter = express.Router();
const {Quiz} = require('../model/quizeModel');

// Create a Quiz
quizeRouter.post('/', async (req, res) => {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;
    const newQuiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate,
      endDate
    });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created', quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Active Quiz
quizeRouter.get('/active', async (req, res) => {
  try {
    const currentDate = new Date();
    const activeQuiz = await Quiz.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    });
    res.json({ activeQuiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Quiz Result
quizeRouter.get('/:id/result', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    // Check if the quiz has ended (add logic to handle 5 minutes delay)
    if (quiz.endDate < new Date()) {
      // Provide quiz results
      res.json({ correctAnswer: quiz.rightAnswer, additionalInfo: 'Result information' });
    } else {
      res.status(400).json({ message: 'Quiz has not ended yet' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Quizzes
quizeRouter.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({ quizzes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {quizeRouter};
