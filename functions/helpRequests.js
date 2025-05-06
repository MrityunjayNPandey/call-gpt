const HelpRequest = require("../db/models/HelpRequest");
const KnowledgeBase = require("../db/models/KnowledgeBase");
const { globalKnowledgeBase } = require("../services/gpt-service");

const getHelpRequests = async (status) => {
  const helpRequests = await HelpRequest.find({
    status: status,
  }).sort({ createdAt: -1 });

  return helpRequests;
};
const respondToHelpRequest = async (requestId, response) => {
  const updatedRequest = await HelpRequest.findOneAndUpdate(
    { _id: requestId, status: "pending" },
    {
      supervisorResponse: response,
      status: "resolved",
      resolvedAt: new Date(),
    },
    { new: true }
  );

  if (!updatedRequest) {
    throw new Error("Help request not found");
  }

  await KnowledgeBase.create({
    question: updatedRequest.question,
    answer: updatedRequest.answer,
  });

  globalKnowledgeBase.push({
    question: updatedRequest.question,
    answer: updatedRequest.answer,
  });

  return helpRequest;
};

module.exports = {
  respondToHelpRequest,
  getHelpRequests,
};
