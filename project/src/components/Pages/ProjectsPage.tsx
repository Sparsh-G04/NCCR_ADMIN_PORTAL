import React, { useState } from 'react';
import { MapPin, Calendar, TrendingUp, Shield, Eye, ArrowLeft } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsPageProps {
  projects: Project[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return <ProjectDetailPage project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Projects Management</h1>
        <p className="text-gray-600">Monitor and manage all carbon credit projects</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Account ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Credits Issued</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Start Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Risk Assessment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Buffer Credits</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Country</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{project.id}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{project.accountId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="font-medium text-emerald-700">{project.creditsIssued.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(project.startDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.riskAssessment === 'Low' ? 'bg-green-100 text-green-800' :
                      project.riskAssessment === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {project.riskAssessment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{project.bufferCredits.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.country}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
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

function ProjectDetailPage({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Project Details: {project.id}</h1>
        <p className="text-gray-600">Comprehensive project information and timeline</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Map and Core Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Satellite Map Placeholder */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Location</h3>
            <div 
              className="w-full h-64 bg-cover bg-center rounded-lg border border-gray-300"
              style={{
                backgroundImage: 'url("https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop")'
              }}
            >
              <div className="w-full h-full bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-lg p-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">
                    {project.metadata.coordinates.lat.toFixed(4)}, {project.metadata.coordinates.lng.toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-600">{project.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Project ID</p>
                <p className="font-medium text-gray-800">{project.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account ID</p>
                <p className="font-medium text-gray-800">{project.accountId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Area</p>
                <p className="font-medium text-gray-800">{project.metadata.area} hectares</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Methodology</p>
                <p className="font-medium text-gray-800">{project.metadata.methodology}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Timeline</h3>
            <div className="space-y-4">
              {project.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    event.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{event.event}</h4>
                      <span className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    {event.creditsIssued !== undefined && (
                      <p className="text-sm text-emerald-600 mt-1">
                        Credits Issued: {event.creditsIssued.toLocaleString()}
                      </p>
                    )}
                    {event.acvaId && (
                      <p className="text-sm text-gray-600 mt-1">ACVA: {event.acvaId}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Metadata</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ownership</p>
                <p className="font-medium text-gray-800">{project.metadata.ownership}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Documentation</p>
                <div className="space-y-2">
                  {project.metadata.documentation.map((doc, index) => (
                    <div key={index} className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer">
                      <span>📄 {doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Credit Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Issued</span>
                <span className="font-medium text-emerald-700">{project.creditsIssued.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Buffer Credits</span>
                <span className="font-medium text-amber-700">{project.bufferCredits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${
                  project.status === 'Active' ? 'text-green-700' : 
                  project.status === 'Pending' ? 'text-yellow-700' : 'text-gray-700'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}