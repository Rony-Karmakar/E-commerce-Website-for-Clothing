import React from 'react'

export default function IssueList({ issues }) {
    return (
        <div className="space-y-6">
            {issues.map((issue) => (
                <div key={issue.id} className="bg-white border border-gray-300 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{issue.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${issue.status === 'Open' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600'}`}>
                            {issue.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Issue ID: {issue.id}</p>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium mb-1">Description:</h4>
                            <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                        {issue.reply && (
                            <div>
                                <h4 className="text-sm font-medium mb-1">Admin Reply:</h4>
                                <p className="text-sm text-gray-600">{issue.reply}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

