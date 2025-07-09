export type GetRoomsQuestionsResponse = Array<{
  id: string;
  question: string;
  answer?: string | null;
  createAt: string;
  isGeneratingAnswer?: boolean;
}>;
