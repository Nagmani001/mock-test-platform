import React, { useState } from 'react';
import { Plus, Trash2, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/config/utils';
import { toast } from 'sonner';

interface Question {
  id: string;
  question: string;
  type: string;
  words?: number;
  totalMarks: number;
  successMarks: number;
  failureMarks: number;
  comprehension?: string[]
}

interface TestData {
  title: string;
  totalQuestions: number;
  language: string;
  totalTimeHour: number;
  totalTimeMinute: number;
  totalTimeSecond: number;
  sectionId: string;
}

const CreateProblemPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState<TestData>({
    title: '',
    totalQuestions: 0,
    language: '',
    totalTimeHour: 0,
    totalTimeMinute: 0,
    totalTimeSecond: 0,
    sectionId: ''
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const testTypes = [
    'ESSAY',
    'LETTER',
    'COMPREHENSION',
  ];

  const sections = [
    { id: '1', name: 'Descriptive writing' },
  ];

  const handleTestDataChange = (field: keyof TestData, value: string | number) => {
    setTestData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      type: 'ESSAY',
      words: 100,
      successMarks: 10,
      failureMarks: 0,
      totalMarks: 0,
      comprehension: [""]
    };
    setQuestions(prev => [...prev, newQuestion]);
    setTestData(prev => ({ ...prev, totalQuestions: prev.totalQuestions + 1 }));
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    setTestData(prev => ({ ...prev, totalQuestions: Math.max(0, prev.totalQuestions - 1) }));
  };

  const updateQuestion = (id: string, field: keyof Question, value: string | number) => {
    setQuestions(prev => prev.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const finalData = {
      ...testData,
      questions
    };
    console.log('Creating test:', finalData);
    try {
      await axios.post(`${BASE_URL}/create-test`, {
        title: finalData.title,
        totalQuestions: finalData.totalQuestions,
        totalTimeHour: finalData.totalTimeHour,
        totalTimeMinute: finalData.totalTimeMinute,
        totalTimeSecond: finalData.totalTimeSecond,
        sectionId: finalData.sectionId == "Descriptive writing" && "2cff8ad6-8959-4614-b060-7c9a9bb6a7d0",
        questions: finalData.questions
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      setLoading(false);
      toast.success("Test created successfully");
      await new Promise(r => setTimeout(r, 1500));
      window.location.reload();
    } catch (err: any) {
      if (err.status == 400) {
        toast.error("Something went wrong , Please try again later")
      }
    }
  };
  console.log(testData.sectionId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Test</h1>
        <p className="text-gray-600">Design a comprehensive test with multiple questions</p>
      </div>

      {/* Test Basic Information */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Test Title *
              </label>
              <input
                type="text"
                id="title"
                value={testData.title}
                onChange={(e) => handleTestDataChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter test title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>


            {/* Section */}
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-2">
                Section *
              </label>
              <select
                id="section"
                value={testData.sectionId}
                onChange={(e) => {
                  if (e.target.value == "Descriptive writing") {
                    handleTestDataChange('sectionId', e.target.value)
                  }
                }
                } className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.sectionId ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select a section</option>
                {sections.map(section => (
                  <option key={section.id} value={section.name}>
                    {section.name}
                  </option>
                ))}
              </select>
              {errors.sectionId && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.sectionId}
                </p>
              )}
            </div>

            {/* Total Time */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Time Limit
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={testData.totalTimeHour}
                    onChange={(e) => handleTestDataChange('totalTimeHour', parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600">hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={testData.totalTimeMinute}
                    onChange={(e) => handleTestDataChange('totalTimeMinute', parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600">minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={testData.totalTimeSecond}
                    onChange={(e) => handleTestDataChange('totalTimeSecond', parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600">seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Questions ({questions.length})</h2>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>

          {errors.questions && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.questions}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-6 relative">
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Question {index + 1}
                    </span>
                  </div>

                  {/* Question Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Text *
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors[`question_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      rows={5}
                      cols={25}
                      placeholder="Enter the question text"
                    />
                    {errors[`question_${index}`] && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors[`question_${index}`]}
                      </p>
                    )}
                  </div>

                  {question.type === "COMPREHENSION" ? (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comprehension Question
                      </label>

                      {question.comprehension?.map((comp, compIndex) => (
                        <div key={compIndex} className="flex gap-x-2 items-center">
                          <input
                            type="text"
                            value={comp}
                            onChange={(e) => {
                              setQuestions((prev) =>
                                prev.map((q) =>
                                  q.id === question.id
                                    ? {
                                      ...q,
                                      comprehension: q.comprehension?.map((c, i) =>
                                        i === compIndex ? e.target.value : c
                                      ),
                                    }
                                    : q
                                )
                              );
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Comprehension ${compIndex + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setQuestions((prev) =>
                                prev.map((q) =>
                                  q.id === question.id
                                    ? {
                                      ...q,
                                      comprehension: q.comprehension?.filter(
                                        (_, i) => i !== compIndex
                                      ),
                                    }
                                    : q
                                )
                              );
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          setQuestions((prev) =>
                            prev.map((q) =>
                              q.id === question.id
                                ? {
                                  ...q,
                                  comprehension: [...(q.comprehension || []), ""],
                                }
                                : q
                            )
                          );
                        }}
                        className="mt-2 flex items-center gap-x-2 text-blue-600 hover:text-blue-800"
                      >
                        <Plus className="w-4 h-4" />
                        Add Comprehension
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Words
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={question.words}
                        onChange={(e) =>
                          updateQuestion(question.id, "words", parseInt(e.target.value) || 0)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Question Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Type
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {testTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Word Count */}

                    {/* Success Marks */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Success Marks *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={question.successMarks}
                        onChange={(e) => updateQuestion(question.id, 'successMarks', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors[`marks_${index}`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                      />
                      {errors[`marks_${index}`] && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors[`marks_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Failure Marks */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Failure Marks
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={question.failureMarks}
                        onChange={(e) => updateQuestion(question.id, 'failureMarks', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Marks
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={question.totalMarks}
                        onChange={(e) => updateQuestion(question.id, 'totalMarks', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {questions.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions added yet</h3>
              <p className="text-gray-500 mb-4">Click "Add Question" to start creating your test</p>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add First Question
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm text-gray-600">
            {questions.length > 0 && (
              <p>Total Questions: {questions.length} | Total Marks: {questions.reduce((sum, q) => sum + q.successMarks, 0)}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{loading ?
                <span className="loading loading-dots loading-md"></span>
                : "Create Test"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProblemPage;
