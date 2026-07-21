import FeedbackDetailsPage from "@/features/admin/feedback/[id]/page";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({
  params,
}: Props) {
  return (
    <FeedbackDetailsPage
      params={params}
    />
  );
}