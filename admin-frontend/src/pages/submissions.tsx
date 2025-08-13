import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, Star, Clock, User, ChevronRight, FileText } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../config/utils';

interface Submission {
  id: string;
  userName: string;
  testTitle: string;
  submittedAt: string;
  score: number;
  status: 'pending' | 'reviewed' | 'graded';
  language: string;
  totalQuestions: number;
  timeSpent: string;
}

const SubmissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [submission, setSubmissions] = useState({});

  console.log("submissions", submission);
  useEffect(() => {
    const main = async () => {
      const submission = await axios.get(`${BASE_URL}/submission/getAll`);
      setSubmissions(submission.data.msg);

    }
    main();
  }, []);
  // Mock data - in a real app, this would come from an API
  const submissions: Submission[] = [
    {
      id: '1',
      userName: 'John Doe',
      testTitle: 'Advanced React Concepts',
      submittedAt: '2024-01-15T10:30:00Z',
      score: 85,
      status: 'graded',
      language: 'JavaScript',
      totalQuestions: 10,
      timeSpent: '45m 30s'
    },
    {
      id: '2',
      userName: 'Jane Smith',
      testTitle: 'Python Data Structures',
      submittedAt: '2024-01-15T14:20:00Z',
      score: 0,
      status: 'pending',
      language: 'Python',
      totalQuestions: 15,
      timeSpent: '1h 20m'
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      testTitle: 'Database Management',
      submittedAt: '2024-01-14T16:45:00Z',
      score: 92,
      status: 'graded',
      language: 'SQL',
      totalQuestions: 8,
      timeSpent: '35m 15s'
    },
    {
      id: '4',
      userName: 'Sarah Wilson',
      testTitle: 'Web Development Basics',
      submittedAt: '2024-01-14T11:15:00Z',
      score: 0,
      status: 'reviewed',
      language: 'HTML/CSS',
      totalQuestions: 12,
      timeSpent: '52m 10s'
    },
    {
      id: '5',
      userName: 'David Brown',
      testTitle: 'Advanced Algorithms',
      submittedAt: '2024-01-13T09:30:00Z',
      score: 78,
      status: 'graded',
      language: 'Java',
      totalQuestions: 6,
      timeSpent: '1h 5m'
    }
  ];

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.testTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || submission.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
          <p className="text-gray-600">Review and manage test submissions</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredSubmissions.length} of {submissions.length} submissions
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or test title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="graded">Graded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            onClick={() => navigate(`/submissions/${submission.id}`)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* User & Test Info */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">{submission.userName}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{submission.testTitle}</p>
                  <p className="text-xs text-gray-500">{submission.language} • {submission.totalQuestions} questions</p>
                </div>

                {/* Date & Time */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Submitted</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatDate(submission.submittedAt)}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Time spent: {submission.timeSpent}</span>
                  </div>
                </div>

                {/* Score & Status */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Score</span>
                  </div>
                  {submission.status === 'graded' ? (
                    <p className="text-xl font-bold text-gray-900">{submission.score}%</p>
                  ) : (
                    <p className="text-sm text-gray-500">Not graded yet</p>
                  )}
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </span>
                </div>

                {/* Action */}
                <div className="flex items-center justify-end">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1 transform duration-200">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SubmissionsPage;
