const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require("./config/db");
const { userRouter } = require("./router/userRouter");
const {authMiddleware,limiter} = require("./middleware/authenticate");
const { quizeRouter } = require('./router/quizeRouter');
const cron = require('node-cron');
const {Quiz} = require('./model/quizeModel');

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the Quize App")
})

app.use("/user", userRouter);
// Apply Middleware to all routes
app.use(authMiddleware);
// app.use(limiter);
app.use(limiter)



// Routes
app.use("/quizzes", quizeRouter);

// Cron job to update quiz status
cron.schedule('* * * * *', async () => {
  try {
    const currentDateTime = new Date();

    const activeQuizzes = await Quiz.find({
      startDate: { $lte: currentDateTime },
      endDate: { $gt: currentDateTime }
    });

    activeQuizzes.forEach(async (quiz) => {
      quiz.status = 'Active'; // Or any status based on your criteria
      await quiz.save();
    });

    const endedQuizzes = await Quiz.find({ endDate: { $lte: currentDateTime } });
    endedQuizzes.forEach(async (quiz) => {
      quiz.status = 'Finished';
      await quiz.save();
    });

    console.log('Quiz statuses updated successfully');
  } catch (error) {
    console.error('Error updating quiz statuses:', error);
  }
});

/* -------------- Server Running Port present here --------------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, async(req,res) => {
    try{
        await connectDB;
       console.log("Database Connected Successfully")
    }
    catch(error){
        console.log("Not connected to Database",error.message)
    }
  console.log(`Server running on port ${PORT}`);
});
