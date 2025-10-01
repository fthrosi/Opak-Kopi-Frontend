import api from "./index";
import type { FeedbackFormData } from "@/types/feedback";
export const submitFeedback = async (feedbackData: FeedbackFormData) => {
  try {
    const response = await api.post("/feedbacks/add", feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

export const fetchFeedbacksByUser = async () => {
    try {
        const response = await api.get("/feedbacks/user");
        return response.data;
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        throw error;
    }
};

export const fetchAllFeedbacks = async () => {
    try {
        const response = await api.get("/feedbacks/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching all feedbacks:", error);
        throw error;
    }
};

export const updateFeedbackStatus = async (feedbackId: number, status: string) => {
    try {
        const response = await api.put(`/feedbacks/update/${feedbackId}`, { status });  
        return response.data;
    } catch (error) {
        console.error("Error updating feedback status:", error);
        throw error;
    }
};
