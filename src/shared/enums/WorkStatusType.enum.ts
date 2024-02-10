export enum LocalSeoWorkStatus {
  GMB_FULL_OPTIMIZATION = 'GMB FULL OPTIMIZATION',
  GMB_OFF_PAGE = 'GMB OFF PAGE'
}

export enum PaidMarketingWorkStatus {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  OTHERS = 'OTHERS'
}

export enum SocialMediaWorkStatus {
  NO_OF_REVIEWS = 'NO OF REVIEWS',
  LIKES_FOLLOWERS = 'LIKES/FOLLOWERS',
  NO_OF_GMB_REVIEWS = 'NO OF GMB REVIEWS',
  FACEBOOK_POSTING = 'FACEBOOK POSTING',
  INSTAGRAM_POSTING = 'INSTAGRAM POSTING',
  OTHERS_POSTING = 'OTHERS POSTING'
}

export enum WebSeoWorkStatus {
  ON_PAGE = 'ON PAGE',
  BACK_LINKS = 'BACK_LINKS',
  EXTRA_LINKS = 'EXTRA_LINKS',
  PAID_GUEST_POSTING = 'PAID_GUEST_POSTING',
  MONTHLY_SEO = 'MONTHLY_SEO'
}

export enum WordPressWorkStatus {
  ECOMMERCE = 'E-COMMERCE',
  REDESIGN_WEBSITE = 'REDESIGN_WEBSITE',
  ON_PAGE_WEBSITE = 'ON_PAGE_WEBSITE',
  FULL = 'FULL'
}

export enum WriterWorkStatus {
  ON_PAGE = 'ON PAGE',
  BLOG = 'BLOG'
}

// Arrays for each enum
export const LocalSeoWorkStatusValues: LocalSeoWorkStatus[] = Object.values(LocalSeoWorkStatus)
export const PaidMarketingWorkStatusValues: PaidMarketingWorkStatus[] = Object.values(PaidMarketingWorkStatus)
export const SocialMediaWorkStatusValues: SocialMediaWorkStatus[] = Object.values(SocialMediaWorkStatus)
export const WebSeoWorkStatusValues: WebSeoWorkStatus[] = Object.values(WebSeoWorkStatus)
export const WordPressWorkStatusValues: WordPressWorkStatus[] = Object.values(WordPressWorkStatus)
export const WriterWorkStatusValues: WriterWorkStatus[] = Object.values(WriterWorkStatus)