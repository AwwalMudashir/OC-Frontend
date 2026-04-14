export type EducationTimelineItem = {
  id?: number;
  period: string;
  title: string;
  qualification: string;
};

export type EducationTimelineRequest = {
  title: string;
  qualification: string;
  startYear: string;
  endYear: string;
};

export type JobTimelineItem = {
  id?: number;
  title: string;
  desc: string;
};

export type JobTimelineRequest = {
  title: string;
  desc: string;
};

export type EventItem = {
  id?: number;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  imageUrl?: string | null;
  imageUrls?: string[] | null;
  videoLink?: string | null;
  createdAt?: string;
};

export type CreateEventRequest = {
  title: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  images: File[];
  videoLink: string;
};

export type DonationItem = {
  id?: number;
  amount?: number;
  email?: string;
  fullName?: string;
  donorName?: string;
  name?: string;
  createdAt?: string;
  status?: string;
  reference?: string;
};