// types/activity.js
export const ActivitySchema = {
  id: String,
  title: String,
  description: String,
  location: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  date: String,
  time: String,
  maxParticipants: Number,
  currentParticipants: Number,
  moods: Array,
  creator: Object,
  participants: Array,
  status: String,
  isMystery: Boolean,
  createdAt: String,
  updatedAt: String
};
