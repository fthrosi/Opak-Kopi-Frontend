export type FeedbackFormData = {
  topic: string;
  message: string;
};

type user = {
  id: number;
  name: string;
}

export type FeedbackData = {
    id: number;
    topic: string;
    message: string;
    status: string;
    created_at: string;
    user: user;
};