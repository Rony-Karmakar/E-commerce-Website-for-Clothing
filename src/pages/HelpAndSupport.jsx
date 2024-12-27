import React, { useState } from "react";
import PostIssue from "../components/PostIssue";
import IssueList from "../components/IssueList";

const HelpAndSupport = () => {
    const [activeTab, setActiveTab] = useState('post-issue')
    const [issues, setIssues] = useState([
        { id: 1, title: "Late delivery", description: "My order is 3 days late", status: "Open", reply: "We apologize for the delay. Your order will be delivered tomorrow." },
        { id: 2, title: "Wrong item received", description: "I received a different product than what I ordered", status: "Closed", reply: "We're sorry for the mix-up. Please return the item using the prepaid label, and we'll send the correct item right away." },
    ])

    const addIssue = (newIssue) => {
        setIssues([...issues, { ...newIssue, id: issues.length + 1, status: "Open" }])
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Help & Support</h1>
            <div className="mb-4">
                <div className="flex border-b border-gray-300">
                    <button
                        className={`py-2 px-4 ${activeTab === 'post-issue' ? 'border-b-2 border-black font-semibold' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('post-issue')}
                    >
                        Post an Issue
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'view-issues' ? 'border-b-2 border-black font-semibold' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('view-issues')}
                    >
                        View Issues
                    </button>
                </div>
            </div>
            {activeTab === 'post-issue' ? (
                <PostIssue onSubmit={addIssue} />
            ) : (
                <IssueList issues={issues} />
            )}
        </div>
    )
}

export default HelpAndSupport;