import qs from 'query-string';

export const paths = {
  course: (id?: string): string => (id ? `/course/${id}` : '/course/:id'),
  courses: '/courses',
  error: (code?: number): string => (code ? `/error/${code}` : '/error/:code'),
  landing: '/',
  login: '/login',
  privacy: '/privacy',
  recent: '/recent',
  register: '/register',
  resetPassword: '/reset-password',
  review: {
    create: '/review',
    update: (id?: string): string => (id ? `/review/${id}` : '/review/:id'),
  },
  reviews: (params?: { [key: string]: string }): string =>
    params ? `/reviews?${qs.stringify(params)}` : '/reviews',
  setPassword: '/set-password',
  terms: '/terms',
  userProfile: '/user/profile',
  userReviews: '/user/reviews',
  userPersonalization: '/user/personalization',
};
