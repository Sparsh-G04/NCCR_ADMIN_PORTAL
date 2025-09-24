import React, { useState } from 'react';
import { FileText, Calendar, CheckCircle, XCircle, Clock, Eye, ArrowLeft, TrendingUp } from 'lucide-react';
import { Verification } from '../../types';

interface VerificationPageProps {
  verifications: Verification[];
}

export default function VerificationPage({ verifications }: VerificationPageProps) {
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (selectedVerification) {
    return (
      <VerificationDetailPage 
        verification={selectedVerification} 
        onBack={() => setSelectedVerification(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Verification Management</h1>
        <p className="text-gray-600">Review periodic verification reports and approve credit issuance</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Account ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cycles Done</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Cycle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ACVA</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Credits Recommended</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {verifications.map((verification, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{verification.projectId}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{verification.accountId}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {verification.cyclesDone} completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">Cycle {verification.currentCycle}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {verification.acvaId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="font-medium text-emerald-700">{verification.creditsRecommended.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(verification.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                        {verification.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedVerification(verification)}
                      className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VerificationDetailPage({ verification, onBack }: { verification: Verification; onBack: () => void }) {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = () => {
    console.log('Approving verification for project:', verification.projectId);
    console.log('Credits to issue:', verification.creditsRecommended);
    console.log('Buffer credits to deduct:', verification.bufferCreditsDeducted);
    // Here you would call the blockchain smart contract to issue credits
    setDecision('approve');
  };

  const handleReject = () => {
    console.log('Rejecting verification for project:', verification.projectId);
    setDecision('reject');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Verifications
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Verification Review: {verification.projectId}</h1>
        <p className="text-gray-600">Review verification report and approve credit issuance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Verification Report */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-emerald-500" />
              Verification Report - Cycle {verification.currentCycle}
            </h3>
            <div className="space-y-4">
              {verification.verificationReport ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Submitted by ACVA</p>
                  <p className="font-medium text-gray-800">{verification.verificationReport}</p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                    <FileText className="w-4 h-4 mr-2" />
                    View Report
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-yellow-300 rounded-lg p-8 text-center">
                  <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-yellow-600 mb-2">Awaiting ACVA Submission</p>
                  <p className="text-gray-600">Verification report not yet submitted</p>
                </div>
              )}
            </div>
          </div>

          {/* Credit Calculation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Credit Calculation</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-lg p-4">
                <h4 className="font-medium text-emerald-800 mb-2">Credits Recommended</h4>
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600 mr-2" />
                  <span className="text-2xl font-bold text-emerald-700">{verification.creditsRecommended.toLocaleString()}</span>
                </div>
                <p className="text-sm text-emerald-600 mt-1">Based on verified carbon removal</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 mb-2">Buffer Credits Deducted</h4>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-amber-700">{verification.bufferCreditsDeducted.toLocaleString()}</span>
                </div>
                <p className="text-sm text-amber-600 mt-1">Risk buffer allocation</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Timeline</h3>
            <div className="space-y-4">
              {Array.from({ length: verification.cyclesDone + 1 }, (_, i) => i + 1).map((cycle) => (
                <div key={cycle} className="flex items-start space-x-4">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    cycle <= verification.cyclesDone ? 'bg-green-500' : 
                    cycle === verification.currentCycle ? 'bg-yellow-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">Verification Cycle {cycle}</h4>
                      <span className="text-sm text-gray-600">
                        {cycle <= verification.cyclesDone ? 'Completed' : 
                         cycle === verification.currentCycle ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                    {cycle === verification.currentCycle && (
                      <p className="text-sm text-emerald-600 mt-1">
                        Current cycle - {verification.creditsRecommended.toLocaleString()} credits recommended
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Project ID</p>
                <p className="font-medium text-gray-800">{verification.projectId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account ID</p>
                <p className="font-medium text-gray-800">{verification.accountId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ACVA Assigned</p>
                <p className="font-medium text-gray-800">{verification.acvaId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Verification Date</p>
                <p className="font-medium text-gray-800">{new Date(verification.verificationDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Cycles Completed</span>
                <span className="font-medium text-gray-800">{verification.cyclesDone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Cycle</span>
                <span className="font-medium text-gray-800">{verification.currentCycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${
                  verification.status === 'Approved' ? 'text-green-700' : 
                  verification.status === 'Rejected' ? 'text-red-700' : 'text-yellow-700'
                }`}>
                  {verification.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Panel */}
      {verification.status === 'Pending' && verification.verificationReport && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Decision</h3>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <p>Review the verification report and make a decision:</p>
              <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                <li>✅ Approve: Credits issued automatically via smart contract</li>
                <li>❌ Reject: No credits issued, ACVA must resubmit report</li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleReject}
                className="inline-flex items-center px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="inline-flex items-center px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve & Issue Credits
              </button>
            </div>
          </div>
          
          {decision && (
            <div className={`mt-4 p-4 rounded-lg ${
              decision === 'approve' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${decision === 'approve' ? 'text-green-800' : 'text-red-800'}`}>
                {decision === 'approve' 
                  ? `✅ Verification approved! ${verification.creditsRecommended.toLocaleString()} credits issued via smart contract.` 
                  : '❌ Verification rejected! ACVA must resubmit corrected report.'
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}