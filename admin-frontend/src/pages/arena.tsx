import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Clock, Star, CheckCircle, XCircle, MessageSquare, Save } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: string;
  words: number;
  questionTimeHour: number;
  questionTimeMinute: number;
  successMarks: number;
  failureMarks: number;
  userAnswer: string;
  isCorrect?: boolean;
  adminRating?: number;
  adminFeedback?: string;
}

interface SubmissionDetail {
  id: string;
  userName: string;
  userEmail: string;
  testTitle: string;
  submittedAt: string;
  totalScore: number;
  status: 'pending' | 'reviewed' | 'graded';
  language: string;
  totalQuestions: number;
  timeSpent: string;
  questions: Question[];
}

const SubmissionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  // Mock data - in a real app, this would come from an API based on the ID
  const submission: SubmissionDetail = {
    id: id || '1',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    testTitle: 'Advanced React Concepts',
    submittedAt: '2024-01-15T10:30:00Z',
    totalScore: 85,
    status: 'graded',
    language: 'JavaScript',
    totalQuestions: 5,
    timeSpent: '45m 30s',
    questions: [
      {
        id: '1',
        question: 'Explain the concept of React hooks and provide an example of useState.',
        type: 'Essay',
        words: 200,
        questionTimeHour: 0,
        questionTimeMinute: 10,
        successMarks: 20,
        failureMarks: 0,
        userAnswer: 'React hooks are functions that allow you to use state and other React features in functional components. useState is a hook that lets you add state to functional components. For example: const [count, setCount] = useState(0); allows you to create a state variable count with initial value 0 and a setter function setCount.',
        isCorrect: true,
        adminRating: 18,
        adminFeedback: 'Good explanation with a clear example. Could have mentioned more about the rules of hooks.'
      },
      {
        id: '2',
        question: 'What is the difference between useEffect and useLayoutEffect?',
        type: 'Essay',
        words: 150,
        questionTimeHour: 0,
        questionTimeMinute: 8,
        successMarks: 15,
        failureMarks: 0,
        userAnswer: 'useEffect runs after the component renders and DOM updates are painted to the screen. useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, making it useful for DOM measurements.',
        isCorrect: true,
        adminRating: 14,
        adminFeedback: 'Accurate explanation. Good understanding of the timing difference.'
      },
      {
        id: '3',
        question: 'How do you optimize React component performance?',
        type: 'Essay',
        words: 250,
        questionTimeHour: 0,
        questionTimeMinute: 15,
        successMarks: 25,
        failureMarks: 0,
        userAnswer: 'To optimize React performance, you can use React.memo for preventing unnecessary re-renders, useMemo for expensive calculations, useCallback for function references, lazy loading with React.lazy, and proper key props in lists.',
        isCorrect: true,
        adminRating: 22,
        adminFeedback: 'Comprehensive answer covering multiple optimization techniques.'
      },
      {
        id: '4',
        question: 'Explain the Context API and when to use it.',
        type: 'Essay',
        words: 200,
        questionTimeHour: 0,
        questionTimeMinute: 12,
        successMarks: 20,
        failureMarks: 0,
        userAnswer: 'Context API allows you to pass data through the component tree without having to pass props down manually at every level. It\'s useful for global data like themes, authentication state, or language preferences.',
        isCorrect: true,
        adminRating: 16,
        adminFeedback: 'Good basic explanation. Could have mentioned useContext hook and potential performance considerations.'
      },
      {
        id: '5',
        question: 'What are React portals and how do you use them?',
        type: 'Essay',
        words: 150,
        questionTimeHour: 0,
        questionTimeMinute: 10,
        successMarks: 15,
        failureMarks: 0,
        userAnswer: 'React portals provide a way to render children into a DOM node that exists outside the parent component\'s DOM hierarchy. They are created using ReactDOM.createPortal() and are commonly used for modals, tooltips, and dropdowns.',
        isCorrect: true,
        adminRating: 15,
        adminFeedback: 'Perfect explanation with clear use cases mentioned.'
      }
    ]
  };

  const handleRatingChange = (questionId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [questionId]: rating }));
  };

  const handleFeedbackChange = (questionId: string, feedbackText: string) => {
    setFeedback(prev => ({ ...prev, [questionId]: feedbackText }));
  };

  const handleSaveRating = (questionId: string) => {
    console.log(`Saving rating for question ${questionId}:`, {
      rating: ratings[questionId],
      feedback: feedback[questionId]
    });
    // In a real app, this would make an API call
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">{submission.testTitle}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{submission.userName}</span>
                <span className="text-gray-400">({submission.userEmail})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(submission.submittedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Time spent: {submission.timeSpent}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
            </span>
            {submission.status === 'graded' && (
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-xl font-bold text-gray-900">{submission.totalScore}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Language</p>
            <p className="font-medium text-gray-900">{submission.language}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Questions</p>
            <p className="font-medium text-gray-900">{submission.totalQuestions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time Spent</p>
            <p className="font-medium text-gray-900">{submission.timeSpent}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium text-gray-900">{submission.status}</p>
          </div>
        </div>
      </div>

      {/* Questions and Answers */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Questions and Responses</h2>

        {submission.questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Question Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                    Question {index + 1}
                  </span>
                  <span className="text-sm text-gray-600">{question.type}</span>
                  <span className="text-sm text-gray-600">
                    {question.words} words • {question.questionTimeMinute}m
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{question.question}</h3>
                <p className="text-sm text-gray-600">
                  Success marks: {question.successMarks} | Failure marks: {question.failureMarks}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {question.isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
            </div>

            {/* User Answer */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Student Response:</h4>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-800 leading-relaxed">{question.userAnswer}</p>
              </div>
            </div>

            {/* Admin Rating Section */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Admin Rating & Feedback</h4>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (out of {question.successMarks} marks)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max={question.successMarks}
                    value={ratings[question.id] ?? question.adminRating ?? ''}
                    onChange={(e) => handleRatingChange(question.id, parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">/ {question.successMarks}</span>
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback
                </label>
                <textarea
                  value={feedback[question.id] ?? question.adminFeedback ?? ''}
                  onChange={(e) => handleFeedbackChange(question.id, e.target.value)}
                  placeholder="Provide detailed feedback for the student..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={() => handleSaveRating(question.id)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Rating</span>
              </button>

              {/* Current Feedback Display */}
              {question.adminFeedback && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Current Feedback:</p>
                      <p className="text-sm text-blue-800">{question.adminFeedback}</p>
                      {question.adminRating && (
                        <p className="text-sm text-blue-700 mt-1">
                          Current Rating: {question.adminRating}/{question.successMarks} marks
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Overall Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Final Actions</h3>
            <p className="text-gray-600">Complete the review process for this submission</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Save Draft
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Mark as Graded
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailPage;
