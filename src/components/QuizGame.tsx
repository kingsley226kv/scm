
import React, { useState, ChangeEvent } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  answer: string;
}

interface QuizGameProps {
  taskId: number;
  onComplete: () => void;
}

const quizQuestions: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      text: 'In which year was our mall established?',
      answer: '2010',
    },
    {
      id: 2,
      text: 'How many floors does the mall have?',
      answer: '5',
    },
    {
      id: 3,
      text: 'What is the mall\'s mascot?',
      answer: 'bear',
    },
  ],
  4: [
    {
      id: 1,
      text: 'Mother\'s Day is celebrated on which Sunday in May?',
      answer: 'second',
    },
    {
      id: 2,
      text: 'What flower is traditionally associated with Mother\'s Day?',
      answer: 'carnation',
    },
    {
      id: 3,
      text: 'Who is the founder of Mother\'s Day?',
      answer: 'Anna Maria Jarvis',
    },
    {
      id: 4,
      text: 'What year is the first celebrated Mother\'s Day?',
      answer: '1908',
    },
  ],
};

const QuizGame: React.FC<QuizGameProps> = ({ taskId, onComplete }) => {
  const questions = quizQuestions[taskId] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleAnswer = () => {
    if (!answer.trim()) {
      toast.error('Please enter an answer');
      return;
    }

    const isCorrect = answer.toLowerCase().trim() === questions[currentQuestion].answer.toLowerCase();
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct answer!');
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
      } else {
        setShowResults(true);
      }
    } else {
      toast.error('Incorrect answer. Try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnswer();
    }
  };

  if (showResults) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold">Quiz Challenge Complete!</h2>
        <p className="text-xl">
          Your Score: {score}/{questions.length}
        </p>
        <Button onClick={onComplete} className="mt-4">
          Complete Task
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 text-sm text-gray-500">
          Question {currentQuestion + 1}/{questions.length}
        </div>
        <h3 className="text-xl font-bold mb-4">{questions[currentQuestion].text}</h3>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Type your answer here..."
            value={answer}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full"
          />
        </div>
        
        <Button onClick={handleAnswer} className="w-full mt-6">
          Check Answer
        </Button>
      </div>
    </div>
  );
};

export default QuizGame;
